---
title: 'Flowing data - node streams meet S3 for massive uploads'
description: 'concise exploration of leveraging Node.js streams for efficient, large-scale data uploads directly to Amazon S3'
date: 'February 10, 2024'
---

# Flowing Data - Node streams meet S3 for massive uploads

We're working in a company that handles social events; we are in charge of a microservice called **event planner**, currently we have a simple logic that registers social events data one by one but we're experiencing a high traffic and our API is failing due we're reaching some AWS service limits.
After realizing our microservice is in pain and receiving feedback from our clients, we decided to scale up the service by adding a **batch registration** logic.
The idea is simple: **Allow us and our clients to upload a substantial amount of social events data in a single operation through our scalable and resilient API**.

In this blog I will explain to you only the **validation** process because really my purpose is to show you how to handle huge files from s3 using node streams.

## Architecture

![architecture](/posts/flowing-data-node-streams-meet-s3-for-massive-uploads/architecture.png)

1. User sends a POST request to our `create-presigned-url` endpoint
2. Will receive an s3 `presigned POST URL`
3. They grab their csv file containing social events and start the upload to given URL
4. The s3 bucket will be pending of previous upload and when it detects it's already there, it will emit an `event notification` to be sent to a `sqs queue` (this queue will have a dlq to catch failure messages)
5. A lambda will `poll` messages from the queue so it can start the validation process

Using previous services [API GW](https://aws.amazon.com/api-gateway/), [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html), [S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/BucketRestrictions.html) and [SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-queues.html) will give us a lot of power. If you don't have some experience using those you can just click in the links and see some limits around them and you'll see right way that `holy crap dude, that's power`.

### Gotchas

- Why you think we did this `s3 event notification -> queue -> lambda` instead of just `s3 event notification -> lambda`?
  - Remember, we need to build a resilient app.
  - What would happen if something goes wrong with the lambda and we haven't even started the validation process? Well, we would find ourselves in a challenging situation because the event could be lost.
  - So by putting a queue we're saying: `if something goes wrong with this proces let's catch that error and retry after some time`.
- Also another common question is `why not just passing the social events info within the body request as an array?`
  - Take a look at this [example](https://github.com/rojasleon/aws-experiments/tree/main/lambda-max-payload)
  - By default lambda can handle up to [6MB](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) of data request, so we're a bit limited in the amount of data the user can pass to us. Remember, we must be extremely huge!

## Getting familiar with the codebase

### Infra

The project was built using [CDK - Typescript](https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-typescript.html) and you can find the documentation along with the code in this [github repo](https://github.com/rojasleon/rojasleon-code/tree/main/scalable-s3-uploads).

This is our `validation` lambda function resource that will be called when a file is uploaded into s3

```ts
// lib/app-stack.ts
private createValidateFilesLambda(queue: sqs.Queue, bucket: s3.Bucket) {
  const validateFilesLambda = this.createNodejsFunction({
    id: 'validateFilesLambda',
    filename: 'validate',
    timeout: 15 * 60 // 15 minutes.
  });
  validateFilesLambda.addEventSourceMapping('lambdaEventSource', {
    batchSize: 1,
    eventSourceArn: queue.queueArn,
    reportBatchItemFailures: true
  });

  bucket.grantRead(validateFilesLambda);
  bucket.grantWrite(validateFilesLambda);
  queue.grantConsumeMessages(validateFilesLambda);
}
```

the helper method called `createNodejsFunction` is this one

```ts
// lib/app-stack.ts
private createNodejsFunction(attrs: {
  id: string;
  filename: string;
  environment?: FunctionOptions['environment'];
  timeout: number;
}): lambda.NodejsFunction {
  return new lambda.NodejsFunction(this, attrs.id, {
    depsLockFilePath: 'bun.lockb',
    entry: `src/lambdas/${attrs.filename}.ts`,
    handler: 'handler',
    runtime: Runtime.NODEJS_20_X,
    bundling: {
      externalModules: ['@aws-sdk/*']
    },
    memorySize: 128,
    timeout: cdk.Duration.seconds(attrs.timeout),
    environment: attrs?.environment
  });
}
```

As you can see we will using a lambda function to validate incoming files from s3 using `NodeJS` with typescript. Under the hood `lambda.NodejsFunction` is using [esbuild](https://esbuild.github.io/) to bundle code from typescript into javascript. And probably a more interesting aspect of previous resource is that for the lambda we're gonna be using `128` of memory size. Heck yeah, you heard me well; `128` of pure power to handle huge files.

_You can jump right into the end to see how to choose the correct lambda memory size_.

### Backend

Open the [src/lambdas/validate.ts file](https://github.com/rojasleon/rojasleon-code/blob/main/scalable-s3-uploads/src/lambdas/validate.ts) and start looking around. We'll the building the final implementation starting from the following code to really focus on the most interesting parts of node streams with S3.
This code belongs to the validatation `lambda` that will be triggered by the `queue` and the queue jumped into the game because of a s3 event notification (after a file was uploaded into s3).

```ts
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { S3Event, SQSHandler } from 'aws-lambda';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import { PassThrough, Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { s3 } from '../clients';
import { createGzip, generateId, upload, validatorTransform } from '../utils';

export const handler: SQSHandler = async (event) => {
  const failedMessageIds: string[] = [];

  const promises = event.Records.map(async (r) => {
    try {
      console.time('validation');
      const s3Evt: S3Event = JSON.parse(r.body);

      const bucketName = s3Evt.Records[0].s3.bucket.name;
      const objectKey = s3Evt.Records[0].s3.object.key;

      // (1) Get file from s3
      // (2) Create a node pipeline to start transforming data
      // (3) Upload transformed file into s3

      console.timeEnd('validation');
    } catch (err) {
      console.log(err);
      failedMessageIds.push(r.messageId);
    }
  });

  await Promise.allSettled(promises);
  return {
    batchItemFailures: failedMessageIds.map((id) => ({
      itemIdentifier: id
    }))
  };
};
```

Let's attack step by step and explain some interesting behaviours that you may face in the future

#### (1) Getting a file from S3

Let's talk about node streams for a bit.
Node streams are interfaces in Node.js that allow reading from or writing to data sources in a continuous, memory-efficient manner.
For our use case we will be using this part of node to read a huge file in `chunks`, process them in `chunks` and upload them into s3 in `chunks`. So let's say we want to process a 200 MB `.json` file that lives in our computer file system and our computer only has space to store 100 MB of data (traveling back in time haha); we don't want to pu the 200 MB file in memory right away, what we want is to process let's say 20 MB of data in 10 shots. The interesting part is the following

- Initial shot executed: 20 MB allocated in memory `=>` Completion of initial shot: 20 MB of memory released
- Second shot executed: 20 MB allocated in memory `=>` Completion of second shot: 20 MB of memory released
- and so on...
  When we download an object from s3 using [GetObjectCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectCommand/) the file will be a readable stream; so it's really `IMPORTANT` to handle the file using node streams.
  If you download the file and immediately convert it into a string that's fine for a small file but for big files we will be in trouble due memory usage. For our use case we are using a [lambda with 128 MB](https://github.com/rojasleon/rojasleon-code/blob/477a1b129d8fa2e804070cb24de5c0963ebff6bd/scalable-s3-uploads/lib/app-stack.ts#L104) and we try to download a file of _1GB_ and convert it into a string it's obvious we cannot handle that operation.
  Let me show you an example:

```ts
const { Body } = await s3.send(
  new GetObjectCommand({ Bucket: bucketName, Key: objectKey })
);
if (!Body) throw new Error('file does not exist');

const fileStr = await Body.transformToString(); // ❌ This will load the data file into memory!
```

After running the process you will see the following error: `Runtime exited with error: signal: killed Runtime.ExitError`.

- Always keep in mind that if the file is small it's just fine to put the file data into memory, but if the file is huge don't even think about it
- For some reason, you can say:
  - _Well, I'll just increase the lambda memory size so I can put more data into memory and don't worry about handling huge files in a more efficient way_
  - My dear friend, that raise you'll be waiting for a long time won't come because you're not improving your node skills

So in order to read the incoming file what we have to do is pretty simple

```ts
const { Body } = await s3.send(
  new GetObjectCommand({ Bucket: bucketName, Key: objectKey })
);
if (!Body) throw new Error('file does not exist');

(Body as Readable).on('data', (c) => console.log({ c }));
```

The key part to understand is that `Body` is actually a `readable` stream by default. So with that we can start piping into another writable stream, or in our case we're gonna be piping into [Transforms](https://nodejs.org/api/stream.html#duplex-and-transform-streams) which are duplex streams or in other words, they allow us to read data from a source, transform it in some way and then write it into another stream or as output.

#### (2) Create a node pipeline to start transforming data

The `stream.pipeline()` method in Node.js is used to pipe between streams, forwarding errors, and properly cleaning up after the pipeline is fully done.

```ts
const out = new PassThrough();

pipeline(
  Body as Readable,
  parse({ columns: true }),
  validatorTransform(),
  stringify({ header: true }),
  createGzip(),
  out
).catch((err) => {
  throw err;
});
```

Note that we're importing the `pipeline()` from `node:stream/promises` and that function actually returns a `promise`. You may be wondering _"Why we're not using `await pipeline()`!"_, that's such an interesting question.
This approach allows for efficient, concurrent processing and uploading of data without waiting for the entire pipeline to complete. It leverages Node.js streams to minimize memory usage and handle large datasets by starting the upload as soon as data is available. However, it assumes the `upload` function can handle a stream that's still being written to, managing data flow and completion appropriately. This pattern is effective for overlapping computation with network IO, enhancing performance for data-intensive operations.
I can tell you that obviously when I was writing the app, of course I did it with `async pipeline()` and the behaviour is super weird; I can just tell you that we were terminating the lambda process with remarkable speed and no logs were printed right after the pipeline invocation. One short non-technical answer could be that the `pipeline()` and the `upload()` functions weren't in sync. Of course it goes beyond this so if you're curious about this scenario you can give it a shot and see what happens by yourself.

Without the pipeline we have to write something like this:

```ts
const out = new PassThrough();

(Body as Readable)
  .pipe(parse({ columns: true }))
  .on('error', handleError)
  .pipe(validatorTransform())
  .on('error', handleError)
  .pipe(stringify({ header: true }))
  .on('error', handleError)
  .pipe(gzip)
  .on('error', handleError)
  .pipe(out)
  .on('error', handleError)
  .on('finish', () => {
    // we're done!
  });

const handleError = (err) => {
  throw new Error(err);
};
```

I don't know about you but I love the `pipeline()` helper!
Here's an explanation of the existing node streams `Transform` (duplex stream)

```ts
pipeline(
  Body as Readable,
  // The `parse` transform stream from the `csv-parse` module processes CSV data in chunks, converting each chunk from CSV format into JavaScript objects or arrays, allowing for efficient, stream-based handling of large datasets.
  parse({ columns: true }),
  // The `validatorTransform` function creates a stream that validates each object against a schema, marking it as valid or invalid and appending any validation errors.
  validatorTransform(),
  // The `stringify` function from `csv-stringify` module converts JavaScript objects or arrays into CSV format, including a header row if specified.
  stringify({ header: true }),
  // Initializes a gzip stream with settings optimized for performance.
  // Uses `Z_BEST_SPEED` for quick compression, reducing CPU and memory usage.
  // `memLevel` at 7 balances memory and speed, ideal for resource-limited servers.
  // `Z_HUFFMAN_ONLY` strategy accelerates compression by simplifying the process.
  // `Z_SYNC_FLUSH` ensures compressed data is promptly available, supporting real-time processing.
  createGzip(),
  // The `out` variable is a `PassThrough` stream used as the final stage in the pipeline to initiate the upload to S3, serving as the data source for the upload process.
  out
);
```

#### (3) Upload transformed file into s3

Before we jump into the final solution for this process I'll show you some aspects that I faced for the first time when handling it.

- Did you consider using `PutObjectCommand` for this?
  - **Content-Length Required**: `PutObjectCommand` demands the total file size upfront via `Content-Length`. This is hard for large or unknown-size streams, complicating accurate size provision. - Under the hood, S3 tries to calculate the correct value for the `Content-Length` header so most of the time there's no need to specify that value manually.
  - **No Chunked Transfers**: S3's `PutObjectCommand` lacks support for `Transfer-Encoding: chunked`, limiting its use for large or dynamically generated data, as it requires known total size beforehand.
  - **Content-Length Errors**: Incorrect or missing `Content-Length` with `PutObjectCommand` leads to upload issues. AWS recommends the `Upload` multipart utility for such cases, which handles uploads in parts without pre-known size.
    - You'll see this error if you try to send do it anyway: `Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage`

In other words `PutObjectCommand` really sucks when leading with large node streams.

Time to introduce [Multipart uploads](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)

Really the purpose of multipart upload is to improve the reliability and efficiency of uploading large files to a storage service by allowing them to be broken into smaller parts and uploaded in parallel.
In your case, `focusing on real-time stream processing` into S3, the full benefits of multipart upload's parallelism and efficiency in handling large files are not fully utilized because the data is streamed and uploaded in a sequential manner as it becomes available, rather than being uploaded in parallel after being divided into predefined parts.
Streaming data directly to S3 in real-time optimizes resources by eliminating the need for local storage/file system (`fs`) or extra processing steps, allowing for efficient, on-the-fly data handling and storage with minimal overhead.

### Time to test

To get a `presigned POST URL` we can run the following command:

```shell
curl -X POST https://your-api-name.us-east-1.amazonaws.com/batch/generate-presigned-url

# You'll see a json response that will look something like this
{"message":"presigned POST URL generated","data":{"url": "https://scalable-s3-uploads-bucket-bla-bla.s3.us-east-1.amazonaws.com/", "fields": {...}}}
```

Copy the `data` value `{"url": "url", "fields": {...}}` and paste right [here](https://github.com/rojasleon/rojasleon-code/blob/e06d450f95b759eb9592d73bd669dc4f28108ec5/scalable-s3-uploads/scripts/upload-csv-file.ts#L36)

I built two TS scripts one to create and another to upload csv files:

| Task            | File                                                                                                                       | Command                                | Description                                                                                                                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create csv file | [create-csv-file.ts](https://github.com/rojasleon/rojasleon-code/blob/main/scalable-s3-uploads/scripts/create-csv-file.ts) | `$ bun run scripts/create-csv-file.ts` | Generates a 150 MB CSV file with 78,000 records. Configurable [here](https://github.com/rojasleon/rojasleon-code/blob/a291808059d3428b0ba7d916a697180a7bff8037/scalable-s3-uploads/scripts/create-csv-file.ts#L28). |
| Upload csv file | [upload-csv-file.ts](https://github.com/rojasleon/rojasleon-code/blob/main/scalable-s3-uploads/scripts/upload-csv-file.ts) | `$ bun run scripts/upload-csv-file.ts` | Initiates the upload process of the CSV file to S3.                                                                                                                                                                 |

You can open the Cloudwatch logs to see how long it took to process and of course you can more logs to measure or wherever you want to do.

### Choosing the correct lambda memory size

So far, we've been using a super weak lambda with just 128 MB. The purpose I chose that amount of memory it was because `well, I just really want to show the real power of streaming in node, we don't need a lot of power to handle bigger files than the current machine memory size`. That's it.
But for a serious application you gotta measure and choose the correct configuration for your lambdas.

I'm going to introduce you [aws-lambda-power-tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning). This tool will help us take the best decision to choose the correct lambda size for the current validation process.
To set up this project you need to read this [readme file](https://github.com/alexcasalboni/aws-lambda-power-tuning/blob/master/README-DEPLOY.md). I chose **1. The easiest way is to [deploy the app via the AWS Serverless Application Repository (SAR)](https://github.com/alexcasalboni/aws-lambda-power-tuning/blob/master/README-DEPLOY.md#option1)**.
So you can go ahead and follow the instructions to deploy the tool.

Right after that you can go to the `Steps Functions service` -> `State machines` and then click of the one that says `powerTuningStateMachine-xxxxx`, press on the `Start execution` button.
On the text input - execution payload you can pass this json value and make you provide `[lambda_arn] && [bucket_name] && [bucket_path.csv] && [queue_arn]`

```json
{
  "lambdaARN": "[lambda_arn]",
  "powerValues": [128, 256, 512, 1024, 2048],
  "num": 5,
  "payload": {
    "Records": [
      {
        "eventSource": "aws:sqs",
        "body": "{\"Records\":[{\"eventSource\":\"aws:s3\",\"s3\":{\"bucket\":{\"name\":\"[bucket_name]\"},\"object\":{\"key\":\"[bucket_path.csv]\"}}}]}",
        "attributes": {
          "ApproximateReceiveCount": "1",
          "SentTimestamp": "1234567890",
          "SenderId": "ABCDEF1234567890",
          "ApproximateFirstReceiveTimestamp": "1234567890"
        },
        "messageAttributes": {},
        "md5OfBody": "abcdef1234567890abcdef1234567890",
        "eventSourceARN": "[queue_arn]"
      }
    ]
  },
  "parallelInvocation": true,
  "strategy": "cost"
}
```

Then, press the `Start execution` button.
You'll see details of current execution and just after some minutes you'll see a `Execution input and output` tab next to the `Details` one, press that one. You must see something like this:

```json
{
  "power": 512,
  "cost": 0.0005369028000000001,
  "duration": 63917,
  "stateMachine": {
    "executionCost": 0.00028,
    "lambdaCost": 0.014398681500000001,
    "visualization": "https://lambda-power-tuning.show/#gAAAAQACAAQACA==;9f6PSCvmDEgArXlHAKICRwD8hUY=;aVgiOqXaHjrwvgw6ekcTOtAOFzo="
  }
}
```

Copy the `visualization` URL in a new browser tab and you'll see this:

![power-tuning](/posts/flowing-data-node-streams-meet-s3-for-massive-uploads/lambda-power-tuning.png)

So there you go, `512 MB` is the correct memory size optimizing for `COST` when handling s3 files with node streams. This is the fun part of measuring these things because we will thougth that the more memory we have the better but that's not always the case.

### Considerations

- You can change the createGzip function to use a different configuration, for example if you really care about having a really small file from 200 MB to 4 MB you can for sure do that but keep in mind that will consume more CPU and memory. So play around with the `createGzip` function and see what's the best configuration for your use case.
- Try out a different validation approach where you take full advantage of the multipart upload feature of S3. As you can see we're focusing on real-time stream processing into S3, the full benefits of multipart upload's parallelism and efficiency in handling large files are not fully utilized because the data is streamed and uploaded in a sequential manner as it becomes available, rather than being uploaded in parallel after being divided into predefined parts.
