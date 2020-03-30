---
title: Understanding SSH - part one: History and overview
date: 2020-03-30
tags:
  - web
  - history
  - protocols
layout: layout
---

SSH, or Secure Shell, is an internet protocol that many of developers consider
as a natural part of their workflow. It helps to **securely** connect two
devices - a client and a server - over the **unsecured** network. It is
naturally interesting to have such tool in a situation where we need to manage
multiple servers and/or we do not have the physical access to the server
machines.

Here's my take on understanding it's history, purpose and the way it works.

### Beginnings

Before the arrival of SSH, computer scientists could take advantage of many
tools that were providing the basic functionality - connecting to a remote
terminal. That itself was a goal of early networking. At the time, the king of
operating systems, UNIX, was capable to execute shell commands on another
computer across a computer network.

In 1969 an application protocol call Telnet was developed to provide
interactive communication via terminal over Internet and local area network. At
the time internet access was virtually limited to academic institutions or
government facilities, therefore security was a minor concern for the Telnet
users.

A decade later, in 1982 Berkeley University released its suite of computer
programs called 'r-commands'. Those allowed users to connect to another UNIX
computer and were based on early implementation of TCP/IP protocol. For one
decade, r-commands were de facto standard for the remote connection.

In the 1990s though, the situation changed dramatically and unencrypted,
authorisation-lacking, prone to eavesdropping protocol had to give way to the
new soon-to-be standard of the secure remote connections. With the massive
arrival of millions of the Internet users, unencrypted data flying between a
server (we're talking about logins and passwords after all) was a no-go for
many specialists and scientists.

### Comes Tatu Ylönen

1995, Helsinki. A researcher gets angry about a password-sniffing attack
conducted at his University of Technology and decides to find a solution to the
maladies eating Telnet, rsh, rlogin and other programs. In July, he releases
the first version of SSH protocol (called **SSH-1**) as freeware. The tool
gains popularity and by the end of 1995 over 20,000 users around the world
employ SSH in their workflows.

In 2006 a new version (**SSH-2**) has been released. It is incompatible with
the first one, released over a decade earlier. The necessity of security
improvements forced the creators to implement [Diffie-Hellman key
exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
and enforced authentication on both ends.

### How does it work?

We have cleared the way and briefly answered the "why?" of SSH protocol. Now
it's time to get to the "how" part. What's under the hood of a simple `ssh`
command typed dozens of time per day?

There are some basic points and characteristics that we need to discuss here and
treat them as a starting point for further explanations. At the very general
level, SSH works within a network between a client and a server. Client is a
program that runs SSH protocol that wants to access a remote machine (Server).
Both of them need to be enabled for SSH (which in practice means using `ssh`
command in the terminal).

SSH covers three main security areas:
1. Ensuring privacy of communication, which in practice means encrypting the
   connection;
2. Authenticating client and server machines (making sure that no one who is
   not authorized connects to a server or acts as a server);
3. Checking integrity of the data that is exchanged between the machines
   (making sure, that for example, the information has not been changed on the
   way);

In the following parts I will discuss each of this aspects from a more
technical point of view and try to dive deep into the mechanics behind each of
them.
