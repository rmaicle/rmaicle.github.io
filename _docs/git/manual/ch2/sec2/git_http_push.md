---
title: git-http-push
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec2/git_http_push
group: git
---

NAME
====

git-http-push - Push objects over HTTP/DAV to another repository

SYNOPSIS
========

    git http-push [--all] [--dry-run] [--force] [--verbose] <url> <ref> [<ref>…]

DESCRIPTION
===========

Sends missing objects to remote repository, and updates the remote branch.

**NOTE**: This command is temporarily disabled if your libcurl is older than 7.16, as the combination has been reported not to work and sometimes corrupts repository.

OPTIONS
=======

`--all`

:   Do not assume that the remote repository is complete in its current state, and verify all objects in the entire local ref’s history exist in the remote repository.

`--force`

:   Usually, the command refuses to update a remote ref that is not an ancestor of the local ref used to overwrite it. This flag disables the check. What this means is that the remote repository can lose commits; use it with care.

`--dry-run`

:   Do everything except actually send the updates.

`--verbose`

:   Report the list of objects being walked locally and the list of objects successfully sent to the remote repository.

`-d`; `-D`

:   Remove &lt;ref&gt; from remote repository. The specified branch cannot be the remote HEAD. If -d is specified the following other conditions must also be met:

    -   Remote HEAD must resolve to an object that exists locally

    -   Specified branch resolves to an object that exists locally

    -   Specified branch is an ancestor of the remote HEAD

`<ref>…`

:   The remote refs to update.

Specifying the Refs
===================

A *&lt;ref&gt;* specification can be either a single pattern, or a pair of such patterns separated by a colon ":" (this means that a ref name cannot have a colon in it). A single pattern *&lt;name&gt;* is just a shorthand for *&lt;name&gt;:&lt;name&gt;*.

Each pattern pair consists of the source side (before the colon) and the destination side (after the colon). The ref to be pushed is determined by finding a match that matches the source side, and where it is pushed is determined by using the destination side.

-   It is an error if &lt;src&gt; does not match exactly one of the local refs.

-   If &lt;dst&gt; does not match any remote ref, either

    -   it has to start with "refs/"; &lt;dst&gt; is used as the destination literally in this case.

    -   &lt;src&gt; == &lt;dst&gt; and the ref that matched the &lt;src&gt; must not exist in the set of remote refs; the ref matched &lt;src&gt; locally is used as the name of the destination.

Without ‘--force\`, the &lt;src&gt; ref is stored at the remote only if &lt;dst&gt; does not exist, or &lt;dst&gt; is a proper subset (i.e. an ancestor) of &lt;src&gt;. This check, known as "fast-forward check", is performed in order to avoid accidentally overwriting the remote ref and lose other peoples’ commits from there.

With `--force`, the fast-forward check is disabled for all refs.

Optionally, a &lt;ref&gt; parameter can be prefixed with a plus *+* sign to disable the fast-forward check only on that ref.

GIT
===

Part of the linkgit:git\[1\] suite
