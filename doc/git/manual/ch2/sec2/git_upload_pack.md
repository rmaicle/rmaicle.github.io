---
title: git-upload-pack
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec2/git_upload_pack
group: git
---

NAME
====

git-upload-pack - Send objects packed back to git-fetch-pack

SYNOPSIS
========

    git-upload-pack [--[no-]strict] [--timeout=<n>] [--stateless-rpc]
                      [--advertise-refs] <directory>
    DESCRIPTION

    Invoked by 'git fetch-pack', learns what
    objects the other side is missing, and sends them after packing.

    This command is usually not invoked directly by the end user.
    The UI for the protocol is on the 'git fetch-pack' side, and the
    program pair is meant to be used to pull updates from a remote
    repository.  For push operations, see 'git send-pack'.


    OPTIONS

`--[no-]strict`

:   Do not try &lt;directory&gt;/.git/ if &lt;directory&gt; is no Git directory.

`--timeout=<n>`

:   Interrupt transfer after &lt;n&gt; seconds of inactivity.

`--stateless-rpc`

:   Perform only a single read-write cycle with stdin and stdout. This fits with the HTTP POST request processing model where a program may read the request, write a response, and must exit.

`--advertise-refs`

:   Only the initial ref advertisement is output, and the program exits immediately. This fits with the HTTP GET request model, where no request content is received but a response must be produced.

`<directory>`

:   The repository to sync from.

SEE ALSO
========

linkgit:gitnamespaces\[7\]

GIT
===

Part of the linkgit:git\[1\] suite
