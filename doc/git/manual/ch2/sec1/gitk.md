---
title: gitk
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/sec1/gitk
group: git
---

NAME
====

gitk - The Git repository browser

SYNOPSIS
========

    gitk [<options>] [<revision range>] [--] [<path>…]

DESCRIPTION
===========

Displays changes in a repository or a selected set of commits. This includes visualizing the commit graph, showing information related to each commit, and the files in the trees of each revision.

OPTIONS
=======

To control which revisions to show, gitk supports most options applicable to the *git rev-list* command. It also supports a few options applicable to the *git diff-\** commands to control how the changes each commit introduces are shown. Finally, it supports some gitk-specific options.

gitk generally only understands options with arguments in the *sticked* form (see linkgit:gitcli\[7\]) due to limitations in the command-line parser.

rev-list options and arguments
------------------------------

This manual page describes only the most frequently used options. See linkgit:git-rev-list\[1\] for a complete list.

`--all`

:   Show all refs (branches, tags, etc.).

`--branches[=<pattern>]`; `--tags[=<pattern>]`; `--remotes[=<pattern>]`

:   Pretend as if all the branches (tags, remote branches, resp.) are listed on the command line as *&lt;commit&gt;*. If *&lt;pattern&gt;* is given, limit refs to ones matching given shell glob. If end is implied.

`--since=<date>`

:   Show commits more recent than a specific date.

`--until=<date>`

:   Show commits older than a specific date.

`--date-order`

:   Sort commits by date when possible.

`--merge`

:   After an attempt to merge stops with conflicts, show the commits on the history between two branches (i.e. the HEAD and the MERGE\_HEAD) that modify the conflicted files and do not exist on all the heads being merged.

`--left-right`

:   Mark which side of a symmetric difference a commit is reachable from. Commits from the left side are prefixed with a `<` symbol and those from the right with a `>` symbol.

`--full-history`

:   When filtering history with *&lt;path&gt;…*, does not prune some history. (See "History simplification" in linkgit:git-log\[1\] for a more detailed explanation.)

`--simplify-merges`

:   Additional option to `--full-history` to remove some needless merges from the resulting history, as there are no selected commits contributing to this merge. (See "History simplification" in linkgit:git-log\[1\] for a more detailed explanation.)

`--ancestry-path`

:   When given a range of commits to display display commits that exist directly on the ancestry chain between the *commit1* and *commit2*, i.e. commits that are both descendants of *commit1*, and ancestors of *commit2*. (See "History simplification" in linkgit:git-log\[1\] for a more detailed explanation.)

`-L<start>,<end>:<file>`; `-L:<funcname>:<file>`

:   Trace the evolution of the line range given by "&lt;start&gt;,&lt;end&gt;" (or the function name regex &lt;funcname&gt;) within the &lt;file&gt;. You may not give any pathspec limiters. This is currently limited to a walk starting from a single revision, i.e., you may only give zero or one positive revision arguments. You can specify this option more than once.

    **Note:** gitk (unlike linkgit:git-log\[1\]) currently only understands this option if you specify it "glued together" with its argument. Do **not** put a space after `-L`.

    &lt;start&gt; and &lt;end&gt; can take one of these forms:

    -   number

        If &lt;start&gt; or &lt;end&gt; is a number, it specifies an absolute line number (lines count from 1).

    -   /regex/

        This form will use the first line matching the given POSIX regex. If &lt;start&gt; is a regex, it will search from the end of the previous `-L` range, if any, otherwise from the start of file. If &lt;start&gt; is “^/regex/”, it will search from the start of file. If &lt;end&gt; is a regex, it will search starting at the line given by &lt;start&gt;.

    -   +offset or -offset

        This is only valid for &lt;end&gt; and will specify a number of lines before or after the line given by &lt;start&gt;.

    If “:&lt;funcname&gt;” is given in place of &lt;start&gt; and &lt;end&gt;, it is a regular expression that denotes the range from the first funcname line that matches &lt;funcname&gt;, up to the next funcname line. “:&lt;funcname&gt;” searches from the end of the previous `-L` range, if any, otherwise from the start of file. “^:&lt;funcname&gt;” searches from the start of file.

`<revision range>`

:   Limit the revisions to show. This can be either a single revision meaning show from the given revision and back, or it can be a range in the form "*&lt;from&gt;*..*&lt;to&gt;*" to show all revisions between *&lt;from&gt;* and back to *&lt;to&gt;*. Note, more advanced revision selection can be applied. For a more complete list of ways to spell object names, see linkgit:gitrevisions\[7\].

`<path>…`

:   Limit commits to the ones touching files in the given paths. Note, to avoid ambiguity with respect to revision names use "--" to separate the paths from any preceding options.

gitk-specific options
---------------------

`--argscmd=<command>`

:   Command to be run each time gitk has to determine the revision range to show. The command is expected to print on its standard output a list of additional revisions to be shown, one per line. Use this instead of explicitly specifying a *&lt;revision range&gt;* if the set of commits to show may vary between refreshes.

`--select-commit=<ref>`

:   Select the specified commit after loading the graph. Default behavior is equivalent to specifying *--select-commit=HEAD*.

Examples
========

`gitk v2.6.12.. include/scsi drivers/scsi`

:   Show the changes since version *v2.6.12* that changed any file in the include/scsi or drivers/scsi subdirectories

`gitk --since="2 weeks ago" -- gitk`

:   Show the changes during the last two weeks to the file *gitk*. The "--" is necessary to avoid confusion with the **branch** named *gitk*

`gitk --max-count=100 --all -- Makefile`

:   Show at most 100 changes made to the file *Makefile*. Instead of only looking for changes in the current branch look in all branches.

Files
=====

User configuration and preferences are stored at:

-   *$XDG\_CONFIG\_HOME/git/gitk* if it exists, otherwise

-   *$HOME/.gitk* if it exists

If neither of the above exist then *$XDG\_CONFIG\_HOME/git/gitk* is created and used by default. If *$XDG\_CONFIG\_HOME* is not set it defaults to *$HOME/.config* in all cases.

History
=======

Gitk was the first graphical repository browser. It’s written in tcl/tk.

*gitk* is actually maintained as an independent project, but stable versions are distributed as part of the Git suite for the convenience of end users.

gitk-git/ comes from Paul Mackerras’s gitk project:

    git://ozlabs.org/~paulus/gitk

SEE ALSO
========

`qgit(1)`

:   A repository browser written in C++ using Qt.

`tig(1)`

:   A minimal repository browser and Git tool output highlighter written in C using Ncurses.

GIT
===

Part of the linkgit:git\[1\] suite
