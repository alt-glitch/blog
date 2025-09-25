---
title: An attempt to understand container runtime
tags: rabbit hole, containers, go, security
date created: 2022-01-16
description: Demystifying containers with `containerd`
---

## Introduction

Lately I've been diving into the rabbit hole of cloud native landscape. I came across the topic of containers and container runtime and found myself trying to make sense of the 3237 different technologies working together. After getting a faint idea, I decided to make this blog post, which originated from my notes on the same topic. The purpose is to make sure I am able to refer to this in the future in case I get confused again (will probably happen in like 8 hours after posting this).

If you're also trying to make sense of container runtimes and have the following terms running around in your brain;

1. **Container** 🗃️
2. **Container Runtime** 🏃🏾🏃🏾
3. **OCI / Open Container Initiative** 🏛️
4. `containerd` ¿¿¿
5. `runc`¿¿¿

Then do read on. If you end up more confused than before, or if you find any issue with my understanding of the topic, feel free to yell at me on [Twitter](https://twitter.com/alt__glitch).

## Glossary

To set proper context for container runtimes, it is best to go over a few things.

### Container

A container is a set of compute constraints used to execute an application in.
Think of it as an _environment_ for executing processes where you can configure the isolation and the limitations of the process.

As you probably know, the purpose of a container is to encapsulate a small microservice or binary application along with all their dependencies to run it reliably anywhere, regardless of where you run it\*.

> \*As long as the "where" you run it is an **OCI compliant container runtime**. Read on, there's a logic to this jargon

### OCI (Open Container Initiative)

The OCI is an open governance structure (formed by Docker, CoreOS etc.) to decide on container formats and runtimes. It basically develops specifications and standards adhering to containers which are to be followed to keep things uniform (and less confusing than it already is!).

It currently has two specifications;

1. [Runtime specification](https://github.com/opencontainers/runtime-spec/blob/main/runtime.md) to define the working and lifecycle of a container during _runtime_
   - Example, it defines **how** exactly does your docker container work when you run `docker container create golang:alpine`

   - In the specification, you can see that an OCI-spec container needs to have some properties. ![[Pasted image 20220116112152.webp]]

2. [Image specification](https://github.com/opencontainers/image-spec/blob/main/spec.md) to define the standard format of a container image.

So if you one day decided to make a docker killer and next-gen Kubernetes killer container orchestration daemon/client, you would have to adhere to the OCI specifications.

---

## Container Runtimes (and the explanation to the container architecture)

Container runtime is the software component that executes the containerized applications on a host system. They are responsible for loading the images, monitoring, maintaining and isolating the system resources. Containers need to be launched in a standardized way no matter which platform they are running on.

Examples of some container runtimes are [CRI-O](https://cri-o.io/), Docker, [containerd](https://containerd.io) and [runC](https://github.com/opencontainers/runc).

If you start reading up about all these container runtimes, you will notice some things in common.

![[Pasted image 20220116113439.webp]]

![[Pasted image 20220116113645.webp]]

Both, `containerd `and `cri-o` list OCI specification through using `runC`. But, aren't they container runtimes too? And isn't `runC` another container runtime?

![[Pasted image 20220116113916.webp]]

There is a logic to this confusion too.

### My explanation

- **OCI** defines how a container should be set up, run, executed, and what comprises in its state etc.
- **runC** is the lightweight and universal container runtime which handles all the low-level details of spawning a container and takes care of the Linux primitives like cgroups and namespaces which handle the system and resource isolation of a container.
- **cri-o** or **containerd** manage the lifecycle of a container starting from execution from an image, supervision, networking and killing the container.
- Extra - **Docker** (or more precisely `dockerd`) is another abstraction of `containerd`\*. It manages even more things like orchestration, scaling, volumes etc.

{{< figure src="https://i.stack.imgur.com/5aXF6.png" caption="Source: [Stack Overflow](https://stackoverflow.com/questions/41645665/how-containerd-compares-to-runc)">}}

{{< figure src="https://www.tutorialworks.com/assets/images/container-ecosystem.drawio.png" caption="Source: [Tutorialworks](https://www.tutorialworks.com/difference-docker-containerd-runc-crio-oci/)" >}}

> \*`containerd` was developed by Docker and then donated to CNCF a while back and moreover, Kubernetes is deprecating Docker because using `containerd` directly is more efficient than `dockerd`.

---

## Getting some hands dirty with `containerd`

Okay! That was a lot of confusing theory. Fingers crossed I haven't added to your confusion, and you're only as confused as you were before, in which case, let's get some hands dirty with `containerd`.

If you have installed docker on your system before, then you will also have installed the `containerd` daemon, and it's CLI tool `ctr`. If not, then go ahead and install `containerd` on your system.

![[Pasted image 20220116122828.webp]]

Go ahead and start `containerd` daemon and leave it running. Let's use `ctr` to pull an image, start and manage containers

### `containerd` with `ctr`

#### Playing around with images

Just like with docker (albeit with more steps) you can pull an image, remove it or even import one.

Go ahead and pull an image;

```bash
sudo ctr images pull docker.io/library/golang:latest
```

You can list the images using;

```bash
sudo ctr images ls -q  # -q for only the name
```

![[Pasted image 20220116135826.webp]]

If you want, you can delete the images too. Just use the `rm` command;

```bash
sudo ctr images rm docker.io/library/redis:alpine
```

![[Pasted image 20220116142141.webp]]

If you have an existing Dockerfile, you can import that to `containerd` too! First, go and save the image as a `.tar` file.

```docker
docker save -o hello-world.tar hello-world
# docker save -o tar-filename.tar image-name
```

![[Pasted image 20220116142828.webp]]

Then go ahead and import it with;

```bash
sudo ctr images import hello-world.tar
```

![[Pasted image 20220116143008.webp]]

#### Playing around with containers

To create a container, the `container create` command is used;

```bash
sudo ctr container create docker.io/library/hello-world:latest hello-1
```

![[Pasted image 20220116144740.webp]]

Now that we have a container, we have to execute it. Note that we have just created the container and have to execute the tasks and processes inside it. As of now, it's just an _isolated and restricted box_ without a process running inside it. Hence, [a container isn't a process](https://iximiuz.com/en/posts/oci-containers/).

To "run" the container like you would in docker using `docker run`, we start a task;

```bash
sudo ctr task start hello-1
```

The result is that we see docker's default hello-world container running! Notice how many more steps we had to follow to get this hello-world image, and then running it as compared to docker. That's because as you go lower the abstraction layer you get more power but also more responsibility (of doing more work to achieve the same thing).

![[Pasted image 20220116145906.webp]]

You can even get a shell if the container supports it.
![[Pasted image 20220116150451.webp]]

As a bonus, go to the terminal where your `containerd` was running to see its debug outputs while you create and execute containers.

To clean up, use the `ctr container rm` command to delete the containers.

---

### `containerd` With Golang

Given `containerd` is actually abstracted further and not directly used, it's quite interesting to see how it's done. Here we will see how to use `containerd` programmatically using its Go package and APIs

If you visit the [getting started page](https://containerd.io/docs/getting-started/) of `containerd`, it gives you sample code to use the daemon. I'm not sure if I can do a better job of explaining the code better than them, but I am still showing my version of a basic getting started code. I added a function to view the existing images and print their names.

```go
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"syscall"
	"time"

	"github.com/containerd/containerd"
	"github.com/containerd/containerd/cio"
	"github.com/containerd/containerd/namespaces"
	"github.com/containerd/containerd/oci"
)

func main() {
	if err := redisExample(); err != nil {
		log.Fatal(err)
	}
}

func redisExample() error {
	// connecting with containerd.sock
	client, err := containerd.New("/run/containerd/containerd.sock")
	if err != nil {
		return err
	}
	defer client.Close()

	// creating a namespace and pulling redis image
	ctx := namespaces.WithNamespace(context.Background(), "example")
	image, err := client.Pull(ctx, "docker.io/library/redis:alpine", containerd.WithPullUnpack)
	if err != nil {
		return err
	}
	log.Printf("Successfully pulled %s image\n", image.Name())

	// use a little bit of containerd golang api to view the available images
	images, err := client.ListImages(ctx)
	if err != nil {
		return err
	}
	printImage(images, ctx)

	fmt.Scanln()

	// get the PID of the go process
	fmt.Printf("pid: %d\n", os.Getpid())

	// create a container with OCI runspec (runc) from a given image
	container, err := client.NewContainer(
		ctx,
		"redis-server",
		containerd.WithNewSnapshot("redis-server-snapshot", image),
		containerd.WithNewSpec(oci.WithImageConfig(image)),
	)
	if err != nil {
		return err
	}
	defer container.Delete(ctx, containerd.WithSnapshotCleanup)
	log.Printf("Successfully created container with ID %s", container.ID())

	// create a task from a container
	task, err := container.NewTask(ctx, cio.NewCreator(cio.WithStdio))
	if err != nil {
		return err
	}
	defer task.Delete(ctx)

	// wait for things to set up before starting the processes
	exitStatusC, err := task.Wait(ctx)
	if err != nil {
		log.Println(err)
	}

	// execute the redis-server
	if err := task.Start(ctx); err != nil {
		return err
	}
	time.Sleep(3 * time.Second)

	// kill if ctrl-c
	if err := task.Kill(ctx, syscall.SIGTERM); err != nil {
		return err
	}

	// wait for process to fully exit and print out the exit status

	status := <-exitStatusC
	code, _, err := status.Result()
	if err != nil {
		return err
	}
	log.Print("redis-server exited with status %d\n", code)

	return nil
}

func printImage(images []containerd.Image, ctx context.Context) error {
	for i := 0; i < len(images); i++ {
		log.Printf("Name of Image is: %s\n", images[i].Name())
		size, err := images[i].Size(ctx)
		if err != nil {
			return err
		}
		log.Printf("Size of the image is %d Mib", size/1000000)
	}
	return nil
}
```

---

## Wrapping up

So we've gone through understanding what a container runtime is, what `containerd` does and where it plugs in. We messed around with it through `ctr` and also got a brief idea how it's abstracted and used by tools like docker etc.

Here is my rough understanding of using `containerd`.

![[Pasted image 20220116155631.webp]]

I hope I was moderately helpful in explaining or going through these concepts and haven't confused you further. If you're also studying cloud native technologies or just want to discuss security and tech with me, feel free to contact me!

### References

I wouldn't have been able to get a clear view of containers if it weren't for Ivan Velichko's [blogs](https://iximiuz.com/en/posts/oci-containers/). If you're like me, trying to make sense of the world of Containers, Kubernetes and Networking, do check out his [blogs](https://iximiuz.com/en/)!

The `containerd` [getting started](https://containerd.io/docs/getting-started/) page and [documentation](https://pkg.go.dev/github.com/containerd/containerd#section-readme) is priceless in understanding its programmatic use.
