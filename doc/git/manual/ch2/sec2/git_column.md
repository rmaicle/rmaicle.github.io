---
title: git-column
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec2/git_column
group: git
---

NAME
====

git-column - Display data in columns

SYNOPSIS
========

    git column [--command=<name>] [--[raw-]mode=<mode>] [--width=<width>]
                 [--indent=<string>] [--nl=<string>] [--padding=<n>]

DESCRIPTION
===========

This command formats its input into multiple columns.

OPTIONS
=======

`--command=<name>`

:   Look up layout mode using configuration variable column.&lt;name&gt; and column.ui.

`--mode=<mode>`

:   Specify layout mode. See configuration variable column.ui for option syntax.

`--raw-mode=<n>`

:   Same as --mode but take mode encoded as a number. This is mainly used by other commands that have already parsed layout mode.

`--width=<width>`

:   Specify the terminal width. By default *git column* will detect the terminal width, or fall back to 80 if it is unable to do so.

`--indent=<string>`

:   String to be printed at the beginning of each line.

`--nl=<N>`

:   String to be printed at the end of each line, including newline character.

`--padding=<N>`

:   The number of spaces between columns. One space by default.

GIT
===

Part of the linkgit:git\[1\] suite
