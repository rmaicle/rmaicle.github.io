---
title: git-verify-commit
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec1/git_verify_commit
group: git
---

NAME
====

git-verify-commit - Check the GPG signature of commits

SYNOPSIS
========

    git verify-commit <commit>…

DESCRIPTION
===========

Validates the GPG signature created by *git commit -S*.

OPTIONS
=======

`--raw`

:   Print the raw gpg status output to standard error instead of the normal human-readable output.

`-v`; `--verbose`

:   Print the contents of the commit object before validating it.

`<commit>…`

:   SHA-1 identifiers of Git commit objects.

GIT
===

Part of the linkgit:git\[1\] suite
