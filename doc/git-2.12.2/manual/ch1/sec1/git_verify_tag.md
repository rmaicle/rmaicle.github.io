---
title: git-verify-tag
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/ch1/sec1/git_verify_tag
group: git-2.12.2
subgroup: manual
---

NAME
====

git-verify-tag - Check the GPG signature of tags

SYNOPSIS
========

    git verify-tag [--format=<format>] <tag>...

DESCRIPTION
===========

Validates the gpg signature created by *git tag*.

OPTIONS
=======

`--raw`

:   Print the raw gpg status output to standard error instead of the normal human-readable output.

`-v`; `--verbose`

:   Print the contents of the tag object before validating it.

`<tag>...`

:   SHA-1 identifiers of Git tag objects.

GIT
===

Part of the linkgit:git\[1\] suite
