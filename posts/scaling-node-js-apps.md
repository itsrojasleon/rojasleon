---
title: 'Scaling NODE JS applications'
description: 'Scale node js apps using the cluster module and Docker with Kubernetes'
date: 'January 10, 2022'
---

# Scaling NODE JS applications

We'll be using two strategies to scale a simple node js server, the internal node js module called `cluster` and then we'll jupm right into the world of containers with docker and kubernetes

## Simple node server

Node js by default uses a single thread and if we block it, that's it. The server will no longer accept incoming requests.
Here's an example of how to acomplish it

```javascript
// index.js
const { createServer } = require('http');
const { pid } = process;

const server = createServer((req, res) => {
  // Handle POST requests
  if (req.method === 'POST') {
    // Simulates CPU intensive work
    let i = 5000000000;

    while (i > 0) {
      i--;
    }

    return res.end(`POST request handled by ${pid}`);
  }

  // Handle GET requests
  res.end(`GET request handled by ${pid}`);
});

server.listen(8000, () => {
  console.log(`Started at ${pid}`);
});
```

```shell
# Launch the app
$ node index.js
```

We're simulating an intensive post request process, this will block the single process that it is running. If we visit the server via localhost or curl we can see what's happening under the hood.

```shell
# And in other terminal window this one to call the intensive process
$ curl -X POST http://localhost:8000

# In a window terminal run this sentence
# You won't see any response bacause our thread is blocked
$ curl http://localhost:8000
```

So, how do we scale?
How do we make sure that the server will not break and can continue accepting requests?

## Cluster

Making user of the cluster internal module we're applying `vertical scaling` strategy, this means we're adding more resources to current machine to accommodate the growth of our application

```javascript
// index.js
const { createServer } = require('http');
const cluster = require('cluster');
const { cpus } = require('os');

if (cluster.isMaster) {
  const availableCpus = cpus();

  console.log(`Clustering to ${availableCpus.length} processes`);

  availableCpus.map(() => cluster.fork());
} else {
  const { pid } = process;

  const server = createServer((req, res) => {
    // Handle POST requests
    if (req.method === 'POST') {
      // Simulates CPU intensive work
      let i = 5000000000;

      while (i > 0) {
        i--;
      }

      return res.end(`POST request handled by ${pid}`);
    }

    // Handle GET requests
    res.end(`GET request handled by ${pid}`);
  });

  server.listen(8000, () => {
    console.log(`Started at ${pid}`);
  });
}
```

1. When we launch the app for the very first time we're executing the master process, in this case `cluster.isMaster` is set to `true`, so the first if statement runs and creates many workers depending of the CPU cores available in our machine (in my case there are four) to take advantage of all the available processing power.

2. When `cluster.fork` is executed from the master process, the app runs again but in `worker mode` (cluster.isMaster is now set to `false` and `cluster.isWorker` is set to `true`) so we go to the else statement and we start many instances of our server.

Running the app this time we get:

```shell
$ node index.js

> Clustering to 4 processes

> Started at 9190
> Started at 9191
> Started at 9192
> Started at 9193
```

And then we visit our app with curl everything will work just fine, one process will be in charge of the intensive work and still other processes listening for new connections. Great!

```shell
$ curl -X POST http://localhost:8000

$ curl http://localhost:8000
```

## Docker and Kubernetes

When working with containers it is pretty easy to increase the number of containers to serve more traffic, or decrease the number of containers if there is not a lot of traffic, this is known as `horizontal scaling`.

The following is again a simple web server with some light changes

```javascript
// index.js
const { createServer } = require('http');
const { hostname } = require('os');
const VERSION = 1;

const server = createServer((req, res) => {
  // Handle POST requests
  if (req.method === 'POST') {
    // Simulates CPU intensive work
    let i = 5000000000;

    while (i > 0) {
      i--;
    }

    return res.end(`POST request from ${hostname()} (v${VERSION})`);
  }

  // Handle GET requests
  res.end(`GET request from ${hostname()} (v${VERSION})`);
});

server.listen(8000);
```

Run it in the terminal

```shell
$ node index.js
```

Access it with curl

```shell
$ curl -X POST http://localhost:8000
$ curl http://localhost:8000
```

We can see that the problem persists, we once again blocked the single process that was running.

Let's dockerize our application with docker

1. Create a package.json

```shell
# You can do it with
$ npm init -y
```

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Add a script tag with the following structure:

```json
...
"scripts": {
  "start": "node index.js"
},
...
```

Create a docker image

```dockerfile
# Dockerfile
FROM node:alpine
EXPOSE 8000
WORKDIR /app
COPY . .
CMD ["npm", "start"]
```

At this point our project should look like this:

```shell
# Root project
index.js
Dockerfile
package.json
```

Let's build our docker image with:

```shell
docker build -t simple-web-server .
```

Now with pass to the world of kubernetes to orchestrate docker containers.
We'll now create a Kubernetes deployment to manage pods (a pod is more or less a container, technically is it not, but we can see it as a docker container) with the `kubectl` command

```shell
kubectl create deployment simple-deployment --image:simple-web-server

> deployment.apps/simple-deployment created
```

Previous step will generate exacly one pod that is available

We can take a look at the created deployments with:

```shell
kubectl get deployments
```

To see our pods:

```shell
kubectl get pods
```

So now there's a deployment object and there's only a single POD object that is running our application. We need somehow tell kubernetes that we want to expose and visit our application

```shell
kubectl expose deployment simple-deployment --type=LoadBalancer --port=8000
```

If we do same previous step to reach out our app, we'll see the same problem...

```shell
$ curl -X POST http://localhost:8000
$ curl http://localhost:8000
```

Now to scale we need to increase the number of pods running our app

```shell
kubectl scale --replicas=5 deployment simple-deployment

# If we run
kubectl get pods
# We'll see that in fact there 5 pods created
```

If we visit our app, kubernetes will handle the traffic through all running pods and we can retrieve the desired data without blocking any processes.

NOTE: We've been creating deployments through the kubectl CLI, this is not recommended in real applications, in order to migrate this to a real app we can make use of `.yaml` files to specify the configuration for each kubernetes service.
