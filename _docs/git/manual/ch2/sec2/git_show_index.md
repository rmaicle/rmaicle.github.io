---
title: git-show-index
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec2/git_show_index
group: git
---

NAME
====

git-show-index - Show packed archive index

SYNOPSIS
========

    git show-index

DESCRIPTION
===========

Read the idx file for a Git packfile created with *git pack-objects* command from the standard input, and dump its contents.

The information it outputs is subset of what you can get from *git verify-pack -v*; this command only shows the packfile offset and SHA-1 of each object.

GIT
===

Part of the linkgit:git\[1\] suite
