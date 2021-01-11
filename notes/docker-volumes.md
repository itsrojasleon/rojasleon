---
title: 'Docker volumes for a react project'
description: 'Running a react project making use of docker volumes (not docker-compose)'
date: 'January 11, 2021'
author: 'rojasleon'
---

# Docker volumes

We're making use of [Next js](https://nextjs.org/) and [Docker](https://www.docker.com/) to run our application in development

## Creating and building our image

```dockerfile
# Dockerfile.dev
FROM node:alpine

WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
```

```shell
docker build -f Dockerfile.dev .
# This will generate a random id corresponding to our image
# If you wish, you can tag it with:
docker build -f Dockerfile.dev -t my_image_tag .
```

## Running our image as a container an listen on port 3000

```shell
docker run -p 3000:3000 [DOCKER_ID]
```

If we go to localhost:3000 we'll see the content displaying on the screen, but if we make changes in the code, we won't see the those changes reflected in the browser

## Making use of docker volumes

```shell
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app [DOCKER_ID]
```

Now if we make any changes to the react project we will the those changes reflected on the screen. That's the beauty of volumes in docker.