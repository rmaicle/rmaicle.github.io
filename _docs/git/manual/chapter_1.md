---
title: Overview
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/chapter_1
group: git
---

Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals.

See [gittutorial(7)](https://www.kernel.org/pub/software/scm/git/docs/gittutorial.html) to get started, then see [giteveryday(7)](https://www.kernel.org/pub/software/scm/git/docs/giteveryday.html) for a useful minimum set of commands. The [Git User’s Manual](https://www.kernel.org/pub/software/scm/git/docs/user-manual.html) has a more in-depth introduction.

After you mastered the basic concepts, you can come back to this page to learn what commands Git offers. You can learn more about individual Git commands with "git help command". [gitcli(7)](https://www.kernel.org/pub/software/scm/git/docs/gitcli.html) manual page gives you an overview of the command-line command syntax.

A formatted and hyperlinked copy of the latest Git documentation can be viewed at [`https://git.github.io/htmldocs/git.html`](https://git.github.io/htmldocs/git.html).

    git [--version]
        [--help]
        [-C <path>]
        [-c <name>=<value>]
        [--exec-path[=<path>]]
        [--html-path]
        [--man-path]
        [--info-path]
        [-p | --paginate | --no-pager]
        [--no-replace-objects]
        [--bare]
        [--git-dir=<path>]
        [--work-tree=<path>]
        [--namespace=<name>]
        <command> [<args>]

Options

`--version`
: Prints the Git suite version that the *git* program came from.

`--help`
: Prints the synopsis and a list of the most commonly used commands. If the option `--all` or `-a` is given then all available commands are printed. If a Git command is named this option will bring up the manual page for that command.

: Other options are available to control how the manual page is displayed. See [git-help(1)](https://www.kernel.org/pub/software/scm/git/docs/git-help.html) for more information, because `git --help ...` is converted internally into `git help ...`.

`-C <path>`
: Run as if git was started in `<path>` instead of the current working directory. When multiple `-C` options are given, each subsequent non-absolute `-C <path>` is interpreted relative to the preceding `-C <path>`.

: This option affects options that expect path name like `--git-dir` and `--work-tree` in that their interpretations of the path names would be made relative to the working directory caused by the `-C` option. For example the following invocations are equivalent:

    ~~~
git --git-dir=a.git --work-tree=b -C c status
git --git-dir=c/a.git --work-tree=c/b status
    ~~~

`-c <name>=<value>`
: Pass a configuration parameter to the command. The value given will override values from configuration files. The &lt;name&gt; is expected in the same format as listed by *git config* (subkeys separated by dots).

: Note that omitting the `=` in `git -c foo.bar ...` is allowed and sets `foo.bar` to the boolean true value (just like `[foo]bar` would in a config file). Including the equals but with an empty value (like `git -c foo.bar= ...`) sets `foo.bar` to the empty string.

`--exec-path[=<path>]`
: Path to wherever your core Git programs are installed. This can also be controlled by setting the GIT\_EXEC\_PATH environment variable. If no path is given, *git* will print the current setting and then exit.

`--html-path`
: Print the path, without trailing slash, where Git’s HTML documentation is installed and exit.

`--man-path`
: Print the manpath (see `man(1)`) for the man pages for this version of Git and exit.

`--info-path`
: Print the path where the Info files documenting this version of Git are installed and exit.

`-p`
`--paginate`
: Pipe all output into *less* (or if set, $PAGER) if standard output is a terminal. This overrides the `pager.<cmd>` configuration options (see the "Configuration Mechanism" section).

`--no-pager`
: Do not pipe Git output into a pager.

`--git-dir=<path>`
: Set the path to the repository. This can also be controlled by setting the `GIT_DIR` environment variable. It can be an absolute path or relative path to current working directory.

`--work-tree=<path>`
: Set the path to the working tree. It can be an absolute path or a path relative to the current working directory. This can also be controlled by setting the GIT\_WORK\_TREE environment variable and the core.worktree configuration variable (see core.worktree in [git-config(1)](https://www.kernel.org/pub/software/scm/git/docs/git-config.html) for a more detailed discussion).

`--namespace=<path>`
: Set the Git namespace. See [gitnamespaces(7)](https://www.kernel.org/pub/software/scm/git/docs/gitnamespaces.html) for more details. Equivalent to setting the `GIT_NAMESPACE` environment variable.

`--bare`
: Treat the repository as a bare repository. If GIT\_DIR environment is not set, it is set to the current working directory.

`--no-replace-objects`
: Do not use replacement refs to replace Git objects. See [git-replace(1)](https://www.kernel.org/pub/software/scm/git/docs/git-replace.html) for more information.

`--literal-pathspecs`
: Treat pathspecs literally (i.e. no globbing, no pathspec magic). This is equivalent to setting the `GIT_LITERAL_PATHSPECS` environment variable to `1`.

`--glob-pathspecs`
: Add "glob" magic to all pathspec. This is equivalent to setting the `GIT_GLOB_PATHSPECS` environment variable to `1`. Disabling globbing on individual pathspecs can be done using pathspec magic `":(literal)"`

`--noglob-pathspecs`
: Add "literal" magic to all pathspec. This is equivalent to setting the `GIT_NOGLOB_PATHSPECS` environment variable to `1`. Enabling globbing on individual pathspecs can be done using pathspec magic `":(glob)"`

`--icase-pathspecs`
: Add "icase" magic to all pathspec. This is equivalent to setting the `GIT_ICASE_PATHSPECS` environment variable to `1`.
