---
title: git-unpack-file
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec2/git_unpack_file
group: git
---

NAME
====

git-unpack-file - Creates a temporary file with a blob’s contents

SYNOPSIS
========

    git unpack-file <blob>

DESCRIPTION
===========

Creates a file holding the contents of the blob specified by sha1. It returns the name of the temporary file in the following format: .merge\_file\_XXXXX

OPTIONS
=======

`<blob>`

:   Must be a blob id

GIT
===

Part of the linkgit:git\[1\] suite
