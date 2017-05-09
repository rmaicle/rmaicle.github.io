---
title: git-fmt-merge-msg
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec2/git_fmt_merge_msg
group: git
---

NAME
====

git-fmt-merge-msg - Produce a merge commit message

SYNOPSIS
========

    git fmt-merge-msg [-m <message>] [--log[=<n>] | --no-log]
    git fmt-merge-msg [-m <message>] [--log[=<n>] | --no-log] -F <file>

DESCRIPTION
===========

Takes the list of merged objects on stdin and produces a suitable commit message to be used for the merge commit, usually to be passed as the *&lt;merge-message&gt;* argument of *git merge*.

This command is intended mostly for internal use by scripts automatically invoking *git merge*.

OPTIONS
=======

`--log[=<n>]`

:   In addition to branch names, populate the log message with one-line descriptions from the actual commits that are being merged. At most &lt;n&gt; commits from each merge parent will be used (20 if &lt;n&gt; is omitted). This overrides the `merge.log` configuration variable.

`--no-log`

:   Do not list one-line descriptions from the actual commits being merged.

`--[no-]summary`

:   Synonyms to --log and --no-log; these are deprecated and will be removed in the future.

`-m <message>`; `--message <message>`

:   Use &lt;message&gt; instead of the branch names for the first line of the log message. For use with `--log`.

`-F <file>`; `--file <file>`

:   Take the list of merged objects from &lt;file&gt; instead of stdin.

CONFIGURATION
=============

`merge.branchdesc`

:   In addition to branch names, populate the log message with the branch description text associated with them. Defaults to false.

`merge.log`

:   In addition to branch names, populate the log message with at most the specified number of one-line descriptions from the actual commits that are being merged. Defaults to false, and true is a synonym for 20.

`merge.summary`

:   Synonym to `merge.log`; this is deprecated and will be removed in the future.

EXAMPLE
=======

    $ git fetch origin master
    $ git fmt-merge-msg --log <$GIT_DIR/FETCH_HEAD

Print a log message describing a merge of the "master" branch from the "origin" remote.

SEE ALSO
========

linkgit:git-merge\[1\]

GIT
===

Part of the linkgit:git\[1\] suite
