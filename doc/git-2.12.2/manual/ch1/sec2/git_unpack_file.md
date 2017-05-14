---
title: git-unpack-file
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/ch1/sec2/git_unpack_file
group: git-2.12.2
subgroup: manual
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
