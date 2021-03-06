---
title: git-mktag
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/manual/ch1/sec2/git_mktag
group: git-2.13.0
subgroup: manual
---

NAME
====

git-mktag - Creates a tag object

SYNOPSIS
========

    git mktag

DESCRIPTION
===========

Reads a tag contents on standard input and creates a tag object that can also be used to sign other objects.

The output is the new tag’s &lt;object&gt; identifier.

Tag Format
==========

A tag signature file, to be fed to this command’s standard input, has a very simple fixed format: four lines of

    object <sha1>
    type <typename>
    tag <tagname>
    tagger <tagger>

followed by some *optional* free-form message (some tags created by older Git may not have `tagger` line). The message, when exists, is separated by a blank line from the header. The message part may contain a signature that Git itself doesn’t care about, but that can be verified with gpg.

GIT
===

Part of the linkgit:git\[1\] suite
