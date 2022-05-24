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
export const superHyperDuperFunction = () => {
  const env = process.env.NODE_ENV; // DON'T DO THIS WITHIN LAYERS

  if (env === 'production') {
    return 'A custom logic depending of NODE_ENV';
  }

  return 'Other logic';
};
```

`process.env.NODE_ENV` WILL ALWAYS BE `undefined`!

Why I can't do that? The answer is quite simple, a layer is just an archive containing additional code, such as libraries, dependencies, or even custom runtimes.

So, how can I handle the case where I need to pass down some env variables within the layer?

My personal recommendation is: **TRY TO DON'T USE THEM**. Layers should run independently without the risk of altering its behavior.

If you really want to pass down an env variable to function/class that lives within your layer, you could pass them as arguments.

```ts
// nodejs/utils.ts (lambda layer)
export const superHyperDuperFunction = (env: 'production' | 'development') => {
  if (env === 'production') {
    return 'A custom logic depending of env';
  }

  return 'Other logic';
};
```

And within you lambda function you can write:

```ts
// lambdas/index.ts
import { superHyperDuperFunction } from '/opt/utils';

export const handler = (event, ctx) => {
  superHyperDuperFunction(process.env.NODE_ENV);
};
```

You can write tons of env variables inside your lambda functions without any risk. Just make sure to define them.

## Final words

**DON'T USE ENV VARIABLES DIRECTLY WITHIN LAYERS**

[I made a simple project to replicate mentioned behavior using Typescript](https://github.com/rojasleon/simple-ts-lambda-layer). Hopefully you find it useful, and if you get stuck feel free contact me to support you.

Enjoy!
