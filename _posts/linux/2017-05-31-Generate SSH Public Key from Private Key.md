---
title: Generate SSH Public Key from Private Key
excerpt: 
date: 2017-05-31T02:58:46UTC
updates:
  - date: run currdate.sh
    message: Edits and corrections
layout: post
categories: [post, linux]
tags: [ssh, ssh-keygen, OpenSSH]
draft: true
published: true
permalink: /posts/M9k2Ax9aZZd4RLP
thumbnail:
image:
  layout: auto_width
  source: 
  attribution: 
video:
  source: 
  attribution: 
  layout: top
videos:
  - source: 
    attribution: 
    layout: 
sources:
  - label: article title (source)
    link:
related:
---

Using `ssh-keygen`, a public key can be generated from a private key.

~~~
ssh-keygen -f ~/.ssh/id_rsa -y > ~/.ssh/id_rsa.pub
~~~

The `-y` option reads a private OpenSSH format file and print an OpenSSH public key to `stdout`.
&#x25cf;
