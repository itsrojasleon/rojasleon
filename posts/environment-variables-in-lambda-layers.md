---
title: 'Does exist environment variables within lambda layers?'
description: 'A quick explanation about the existence of environment variables within lambda layers'
date: 'May 24, 2022'
---

# Does environment variables exist within lambda layers?

Short answer: **NOT REALLY**

When working with lambda functions we might discover that there're quite slow due its heavy dependencies, it has tons of repetitive code across the lambdas, and soon, we decide to use **lambda layers** to solve the
previous issues. Great choice!

But, you need to make sure you don't provide an environment variable directly within your lambda layer when refactoring your project.
In code words, here's why I mean with that:

`Hello there`

`Hey`

```ts
// nodejs/index.ts (lambda layer)
export const fn = () => {
  const env = process.env.SOME_ENV_VAR; // DON'T DO THIS WITHIN LAYERS

  if (env === 'something_really_important') {
    return 'A custom logic depending of SOME_ENV_VAR';
  }

  return 'Other logic';
};
```

**process.env.SOME_ENV_VAR** WILL ALWAYS BE **undefined**!

Why I can't do that? The answer is quite simple, a layer is just an archive containing additional code, such as libraries, dependencies, or even custom runtimes.

So, how can I handle the case where I need to pass down some env variables within the layer?

- Make sure the env variable is defined first in your lambda runtime

```ts
// lambdas/create.ts (lambda function)
import { fn } from 'common-layer';

// This validation will make sure `IMPORTANT_ENV_VAR` is defined in the lambda
// runtime and also inside the layers that have the same variable.
if (!process.env.IMPORTANT_ENV_VAR) {
  throw new Error('IMPORTANT_ENV_VAR must be defined');
}

export const handler: APIGatewayProxyHandler = async () => {
  return { statusCode: 200, body: JSON.stringify({ response: fn() }) };
};
```

```ts
// nodejs/index.ts (lambda layer)
export const fn = () => {
  // This will be defined if lambda function has defined it before (previous block of code)
  const importantResponse = process.env.IMPORTANT_ENV_VAR;

  if (importantResponse === 'something_really_important') {
    return 'A custom logic depending of IMPORTANT_ENV_VAR';
  }

  return 'Other response';
};
```

## Conclusion

If a environment variable is defined in your lambda runtime it will be available inside your lambda layer ✅

But if you try to define an env variable directly inside your layer, it won't be defined 🚫

## Final words

[I made a simple project to replicate mentioned behavior using Typescript, and the conclusion is that... it does not work, have a look](https://github.com/rojasleon/simple-ts-lambda-layer). Hopefully you find it useful.

Enjoy!
