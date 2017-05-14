---
title: git-merge-tree
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/ch1/sec1/git_merge_tree
group: git-2.12.2
subgroup: manual
---

NAME
====

git-merge-tree - Show three-way merge without touching index

SYNOPSIS
========

    git merge-tree <base-tree> <branch1> <branch2>

DESCRIPTION
===========

Reads three tree-ish, and output trivial merge results and conflicting stages to the standard output. This is similar to what three-way *git read-tree -m* does, but instead of storing the results in the index, the command outputs the entries to the standard output.

This is meant to be used by higher level scripts to compute merge results outside of the index, and stuff the results back into the index. For this reason, the output from the command omits entries that match the &lt;branch1&gt; tree.

GIT
===

Part of the linkgit:git\[1\] suite
