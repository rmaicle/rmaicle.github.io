---
title: git-http-fetch
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/ch1/sec2/git_http_fetch
group: git-2.12.2
subgroup: manual
---

NAME
====

git-http-fetch - Download from a remote Git repository via HTTP

SYNOPSIS
========

    git http-fetch [-c] [-t] [-a] [-d] [-v] [-w filename] [--recover] [--stdin] <commit> <url>

DESCRIPTION
===========

Downloads a remote Git repository via HTTP.

**NOTE**: use of this command without -a is deprecated. The -a behaviour will become the default in a future release.

OPTIONS
=======

`commit-id`

:   Either the hash or the filename under \[URL\]/refs/ to pull.

`-c`

:   Get the commit objects.

`-t`

:   Get trees associated with the commit objects.

`-a`

:   Get all the objects.

`-v`

:   Report what is downloaded.

`-w <filename>`

:   Writes the commit-id into the filename under $GIT\_DIR/refs/&lt;filename&gt; on the local end after the transfer is complete.

`--stdin`

:   Instead of a commit id on the command line (which is not expected in this case), *git http-fetch* expects lines on stdin in the format

        <commit-id>['\t'<filename-as-in--w>]

`--recover`

:   Verify that everything reachable from target is fetched. Used after an earlier fetch is interrupted.

GIT
===

Part of the linkgit:git\[1\] suite
