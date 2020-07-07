---
title: 'Concepts of Docker'
description: 'A quick overview of Docker'
date: 'July 06, 2020'
---

# A quick introduction to docker

Docker is an open platform for developing, shipping and running applications with containers in a simply, quickly and collaboratively way. The use of containers to deploy applications is called containerization.

## Why containerization?

- **Flexible**: Even the most complex applications can be containerized.
- **Lightweight**: Containers leverage and share the host kernel, making them much more efficient in terms of system resources than VMs
- **Portable**: You can build locally, deploy to the cloud and run anywhere.
- **Loseely coupled**: Containers are highly self sufficient and encapsulated, allowing you to replace or upgrade one without disrupting others.
- **Scalable**: You can increase and automatically distribute container replicas across a datacenter.
- **Secure**: Containers apply aggresive constraints and isolations to processes without any configuration required on the part of the user.

## Image

Single file with all the dependencies and configuration required to run a program

## Container

Is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another

When you install docker for windows/mac there are two tools available in this package:

## Docker client ([Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/))

Tool to execute commands. When a command is executed... is going to invoke docker daemon, this tool is communicating with docker server through a rest API exposed by daemon

## Docker server ([Docker daemon](https://docs.docker.com/config/daemon/))

Tool that is responsible for creating images, running containers, etc.

<img src="/posts/concepts-of-docker-1.jpg" alt="Docker process" width="60%" />

## Installing docker on MacOS

Steps:

- Sign up for a Docker Hub Account at docker.com
- Download/install Docker for mac
- Login to Docker
- Verify Docker installation with `docker version`

## Thanks for reading.
