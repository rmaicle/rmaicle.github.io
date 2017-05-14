---
title: Symbolic Identifiers
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/chapter_4
group: git-2.12.2
subgroup: manual
---

Any Git command accepting any <object> can also use the following symbolic notation:

`HEAD`
: indicates the head of the current branch.

`<tag>`
: a valid tag name (i.e. a `refs/tags/<tag>` reference).

`<head>`
: a valid head name (i.e. a `refs/heads/<head>` reference).

For a more complete list of ways to spell object names, see "SPECIFYING REVISIONS" section in gitrevisions(7).
