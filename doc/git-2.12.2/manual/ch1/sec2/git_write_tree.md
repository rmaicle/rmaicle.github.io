---
title: git-write-tree
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/ch1/sec2/git_write_tree
group: git-2.12.2
subgroup: manual
---

NAME
====

git-write-tree - Create a tree object from the current index

SYNOPSIS
========

    git write-tree [--missing-ok] [--prefix=<prefix>/]

DESCRIPTION
===========

Creates a tree object using the current index. The name of the new tree object is printed to standard output.

The index must be in a fully merged state.

Conceptually, *git write-tree* sync()s the current index contents into a set of tree files. In order to have that match what is actually in your directory right now, you need to have done a *git update-index* phase before you did the *git write-tree*.

OPTIONS
=======

`--missing-ok`

:   Normally *git write-tree* ensures that the objects referenced by the directory exist in the object database. This option disables this check.

`--prefix=<prefix>/`

:   Writes a tree object that represents a subdirectory `<prefix>`. This can be used to write the tree object for a subproject that is in the named subdirectory.

GIT
===

Part of the linkgit:git\[1\] suite
