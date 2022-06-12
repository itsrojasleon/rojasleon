---
title: 'Does exist environment variables within lambda layers?'
description: 'A quick explanation about the existence of environment variables within lambda layers'
date: 'May 24, 2022'
---

# Does environment variables exist within lambda layers?

Short answer: **NO**

When working with lambda functions we might discover that there're quite slow due its heavy dependencies, it has tons of repetitive code across the lambdas, and soon, we decide to use **lambda layers** to solve the
previous issues. Great choice!

But, you need to make sure you don't provide an environment variable directly within your lambda layer when refactoring your project.
In code words, here's why I mean with that:

```ts
// nodejs/index.ts (lambda layer)
export const fn = () => {
  const env = process.env.SOME_ENV_VAR; // DON'T DO THIS WITHIN LAYERS

  if (env === 'production') {
    return 'A custom logic depending of SOME_ENV_VAR';
  }

  return 'Other logic';
};
```

**process.env.SOME_ENV_VAR** WILL ALWAYS BE **undefined**!

Why I can't do that? The answer is quite simple, a layer is just an archive containing additional code, such as libraries, dependencies, or even custom runtimes.

So, how can I handle the case where I need to pass down some env variables within the layer?

My personal recommendation is: **TRY TO DON'T USE THEM**. Layers should run independently without the risk of altering its behavior.

## Special case where it's a bit OK to use env vars within lambda layers

If you're working with lambda functions and lambda layers in mode development (locally in your personal computer) I found that it's alright and useful to use some environment variables that are available in your local runtime such as **NODE_ENV** (nodejs), **IS_OFFLINE** (serverless offline), etc.
For example, to setup an AWS service and make it available within your docker local environment or something similar.

```js
// nodejs/index.ts (lambda layer)
import { S3Client } from '@aws-sdk/client-s3';
import { Stages } from '../stages';

export const s3Client = new S3Client({
  ...(process.env.NODE_ENV === Stages.Dev && {
    forcePathStyle: true,
    endpoint: 'http://localhost:4569',
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER'
    }
  })
});
```

Above code will just work in **your computer**, but in the **layer runtime** (within AWS) it won't work. So pay a lot of attention if you want to avoid nasty errors.

## Final words

[I made a simple project to replicate mentioned behavior using Typescript, and the conclusion is that... it does not work, have a look](https://github.com/rojasleon/simple-ts-lambda-layer). Hopefully you find it useful, and if you get stuck feel free contact me to support you.

Enjoy!
