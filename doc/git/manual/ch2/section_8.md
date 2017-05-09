---
title: Environment Variables
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/section_8
group: git
---

Various Git commands use the following environment variables:

##### The Git Repository

These environment variables apply to *all* core Git commands. Nb: it is worth noting that they may be used/overridden by SCMS sitting above Git so take care if using a foreign front-end.

`GIT_INDEX_FILE`   
: This environment allows the specification of an alternate index file. If not specified, the default of `$GIT_DIR/index` is used.

`GIT_INDEX_VERSION`   
: This environment variable allows the specification of an index version for new repositories. It won’t affect existing index files. By default index file version 2 or 3 is used. See [git-update-index(1)](https://www.kernel.org/pub/software/scm/git/docs/git-update-index.html) for more information.

`GIT_OBJECT_DIRECTORY`   
: If the object storage directory is specified via this environment variable then the sha1 directories are created underneath - otherwise the default `$GIT_DIR/objects` directory is used.

`GIT_ALTERNATE_OBJECT_DIRECTORIES`   
: Due to the immutable nature of Git objects, old objects can be archived into shared, read-only directories. This variable specifies a ":" separated (on Windows ";" separated) list of Git object directories which can be used to search for Git objects. New objects will not be written to these directories.

    ~~~
Entries that begin with `"` (double-quote) will be interpreted
as C-style quoted paths, removing leading and trailing
double-quotes and respecting backslash escapes. E.g., the value
`"path-with-\"-and-:-in-it":vanilla-path` has two paths:
`path-with-"-and-:-in-it` and `vanilla-path`.
    ~~~

`GIT_DIR`   
: If the `GIT_DIR` environment variable is set then it specifies a path to use instead of the default `.git` for the base of the repository. The `--git-dir` command-line option also sets this value.

`GIT_WORK_TREE`   
: Set the path to the root of the working tree. This can also be controlled by the `--work-tree` command-line option and the core.worktree configuration variable.

`GIT_NAMESPACE`   
: Set the Git namespace; see [gitnamespaces(7)](https://www.kernel.org/pub/software/scm/git/docs/gitnamespaces.html) for details. The `--namespace` command-line option also sets this value.

`GIT_CEILING_DIRECTORIES`   
: This should be a colon-separated list of absolute paths. If set, it is a list of directories that Git should not chdir up into while looking for a repository directory (useful for excluding slow-loading network directories). It will not exclude the current working directory or a GIT\_DIR set on the command line or in the environment. Normally, Git has to read the entries in this list and resolve any symlink that might be present in order to compare them with the current directory. However, if even this access is slow, you can add an empty entry to the list to tell Git that the subsequent entries are not symlinks and needn’t be resolved; e.g., `GIT_CEILING_DIRECTORIES=/maybe/symlink::/very/slow/non/symlink`.

`GIT_DISCOVERY_ACROSS_FILESYSTEM`   
: When run in a directory that does not have ".git" repository directory, Git tries to find such a directory in the parent directories to find the top of the working tree, but by default it does not cross filesystem boundaries. This environment variable can be set to true to tell Git not to stop at filesystem boundaries. Like `GIT_CEILING_DIRECTORIES`, this will not affect an explicit repository directory set via `GIT_DIR` or on the command line.

`GIT_COMMON_DIR`   
: If this variable is set to a path, non-worktree files that are normally in $GIT\_DIR will be taken from this path instead. Worktree-specific files such as HEAD or index are taken from $GIT\_DIR. See [gitrepository-layout(5)](https://www.kernel.org/pub/software/scm/git/docs/gitrepository-layout.html) and [git-worktree(1)](https://www.kernel.org/pub/software/scm/git/docs/git-worktree.html) for details. This variable has lower precedence than other path variables such as GIT\_INDEX\_FILE, GIT\_OBJECT\_DIRECTORY…

### Git Commits

`GIT_AUTHOR_NAME`
`GIT_AUTHOR_EMAIL`
`GIT_AUTHOR_DATE`
`GIT_COMMITTER_NAME`
`GIT_COMMITTER_EMAIL`
`GIT_COMMITTER_DATE`
*EMAIL*   
: see [git-commit-tree(1)](https://www.kernel.org/pub/software/scm/git/docs/git-commit-tree.html)

### Git Diffs

`GIT_DIFF_OPTS`   
: Only valid setting is `"--unified=??"` or `"-u??"` to set the number of context lines shown when a unified diff is created. This takes precedence over any `"-U"` or `"--unified"` option value passed on the Git diff command line.

`GIT_EXTERNAL_DIFF`   
: When the environment variable `GIT_EXTERNAL_DIFF` is set, the program named by it is called, instead of the diff invocation described above. For a path that is added, removed, or modified, `GIT_EXTERNAL_DIFF` is called with 7 parameters:

    ~~~
path old-file old-hex old-mode new-file new-hex new-mode
    ~~~
: where:

    `<old|new>-file`
    : are files GIT\_EXTERNAL\_DIFF can use to read the contents of `<old|new>`,

    `<old|new>-hex`
    : are the 40-hexdigit SHA-1 hashes,

    `<old|new>-mode`
    : are the octal representation of the file modes.
    : The file parameters can point at the user’s working file (e.g. `new-file` in "git-diff-files"), `/dev/null` (e.g. `old-file` when a new file is added), or a temporary file (e.g. `old-file` in the index). `GIT_EXTERNAL_DIFF` should not worry about unlinking the temporary file --- it is removed when `GIT_EXTERNAL_DIFF` exits.
    : For a path that is unmerged, `GIT_EXTERNAL_DIFF` is called with 1 parameter, `<path>`;.
    : For each path `GIT_EXTERNAL_DIFF` is called, two environment variables, `GIT_DIFF_PATH_COUNTER` and `GIT_DIFF_PATH_TOTAL` are set.

`GIT_DIFF_PATH_COUNTER`   
: A 1-based counter incremented by one for every path.

`GIT_DIFF_PATH_TOTAL`   
: The total number of paths.

### other

`GIT_MERGE_VERBOSITY`
: A number controlling the amount of output shown by the recursive merge strategy. Overrides merge.verbosity. See [git-merge(1)](https://www.kernel.org/pub/software/scm/git/docs/git-merge.html)

`GIT_PAGER`
: This environment variable overrides `$PAGER`. If it is set to an empty string or to the value "cat", Git will not launch a pager. See also the `core.pager` option in [git-config(1)](https://www.kernel.org/pub/software/scm/git/docs/git-config.html).

`GIT_EDITOR`
: This environment variable overrides `$EDITOR` and `$VISUAL`. It is used by several Git commands when, on interactive mode, an editor is to be launched. See also [git-var(1)](https://www.kernel.org/pub/software/scm/git/docs/git-var.html) and the `core.editor` option in [git-config(1)](https://www.kernel.org/pub/software/scm/git/docs/git-config.html).

`GIT_SSH`
`GIT_SSH_COMMAND`
: If either of these environment variables is set then *git fetch* and *git push* will use the specified command instead of *ssh* when they need to connect to a remote system. The command will be given exactly two or four arguments: the *username@host* (or just *host*) from the URL and the shell command to execute on that remote system, optionally preceded by `-p` (literally) and the *port* from the URL when it specifies something other than the default SSH port.
: `$GIT_SSH_COMMAND` takes precedence over `$GIT_SSH`, and is interpreted by the shell, which allows additional arguments to be included. `$GIT_SSH` on the other hand must be just the path to a program (which can be a wrapper shell script, if additional arguments are needed).
: Usually it is easier to configure any desired options through your personal `.ssh/config` file. Please consult your ssh documentation for further details.

`GIT_SSH_VARIANT`
: If this environment variable is set, it overrides Git’s autodetection whether `GIT_SSH/GIT_SSH_COMMAND/core.ssh Command` refer to OpenSSH, plink or tortoiseplink. This variable overrides the config setting `ssh.variant` that serves the same purpose.

`GIT_ASKPASS`
: If this environment variable is set, then Git commands which need to acquire passwords or passphrases (e.g. for HTTP or IMAP authentication) will call this program with a suitable prompt as command-line argument and read the password from its STDOUT. See also the `core.askPass` option in [git-config(1)](https://www.kernel.org/pub/software/scm/git/docs/git-config.html).

`GIT_TERMINAL_PROMPT`
: If this environment variable is set to `0`, git will not prompt on the terminal (e.g., when asking for HTTP authentication).

`GIT_CONFIG_NOSYSTEM`
: Whether to skip reading settings from the system-wide `$(prefix)/etc/gitconfig` file. This environment variable can be used along with `$HOME` and `$XDG_CONFIG_HOME` to create a predictable environment for a picky script, or you can set it temporarily to avoid using a buggy `/etc/gitconfig` file while waiting for someone with sufficient permissions to fix it.

`GIT_FLUSH`
: If this environment variable is set to "1", then commands such as *git blame* (in incremental mode), *git rev-list*, *git log*, *git check-attr* and *git check-ignore* will force a flush of the output stream after each record have been flushed. If this variable is set to "0", the output of these commands will be done using completely buffered I/O. If this environment variable is not set, Git will choose buffered or record-oriented flushing based on whether stdout appears to be redirected to a file or not.

`GIT_TRACE`
: Enables general trace messages, e.g. alias expansion, built-in command execution and external command execution.
: If this variable is set to "1", "2" or "true" (comparison is case insensitive), trace messages will be printed to stderr.
: If the variable is set to an integer value greater than 2 and lower than 10 (strictly) then Git will interpret this value as an open file descriptor and will try to write the trace messages into this file descriptor.
: Alternatively, if the variable is set to an absolute path (starting with a */* character), Git will interpret this as a file path and will try to write the trace messages into it.
: Unsetting the variable, or setting it to empty, "0" or "false" (case insensitive) disables trace messages.

`GIT_TRACE_PACK_ACCESS`
: Enables trace messages for all accesses to any packs. For each access, the pack file name and an offset in the pack is recorded. This may be helpful for troubleshooting some pack-related performance problems. See `GIT_TRACE` for available trace output options.

`GIT_TRACE_PACKET`
: Enables trace messages for all packets coming in or out of a given program. This can help with debugging object negotiation or other protocol issues. Tracing is turned off at a packet starting with "PACK" (but see `GIT_TRACE_PACKFILE` below). See `GIT_TRACE` for available trace output options.

`GIT_TRACE_PACKFILE`
: Enables tracing of packfiles sent or received by a given program. Unlike other trace output, this trace is verbatim: no headers, and no quoting of binary data. You almost certainly want to direct into a file (e.g., `GIT_TRACE_PACKFILE=/tmp/my.pack`) rather than displaying it on the terminal or mixing it with other trace output.
: Note that this is currently only implemented for the client side of clones and fetches.

`GIT_TRACE_PERFORMANCE`
: Enables performance related trace messages, e.g. total execution time of each Git command. See `GIT_TRACE` for available trace output options.

`GIT_TRACE_SETUP`
: Enables trace messages printing the .git, working tree and current working directory after Git has completed its setup phase. See `GIT_TRACE` for available trace output options.

`GIT_TRACE_SHALLOW`
: Enables trace messages that can help debugging fetching / cloning of shallow repositories. See `GIT_TRACE` for available trace output options.

`GIT_LITERAL_PATHSPECS`
: Setting this variable to `1` will cause Git to treat all pathspecs literally, rather than as glob patterns. For example, running `GIT_LITERAL_PATHSPECS=1 git log -- '*.c'` will search for commits that touch the path `*.c`, not any paths that the glob `*.c` matches. You might want this if you are feeding literal paths to Git (e.g., paths previously given to you by `git ls-tree`, `--raw` diff output, etc).

`GIT_GLOB_PATHSPECS`
: Setting this variable to `1` will cause Git to treat all pathspecs as glob patterns (aka "glob" magic).

`GIT_NOGLOB_PATHSPECS`
: Setting this variable to `1` will cause Git to treat all pathspecs as literal (aka "literal" magic).

`GIT_ICASE_PATHSPECS`
: Setting this variable to `1` will cause Git to treat all pathspecs as case-insensitive.

`GIT_REFLOG_ACTION`
: When a ref is updated, reflog entries are created to keep track of the reason why the ref was updated (which is typically the name of the high-level command that updated the ref), in addition to the old and new values of the ref. A scripted Porcelain command can use set\_reflog\_action helper function in `git-sh-setup` to set its name to this variable when it is invoked as the top level command by the end user, to be recorded in the body of the reflog.

`GIT_REF_PARANOIA`
: If set to `1`, include broken or badly named refs when iterating over lists of refs. In a normal, non-corrupted repository, this does nothing. However, enabling it may help git to detect and abort some operations in the presence of broken refs. Git sets this variable automatically when performing destructive operations like [git-prune(1)](https://www.kernel.org/pub/software/scm/git/docs/git-prune.html). You should not need to set it yourself unless you want to be paranoid about making sure an operation has touched every ref (e.g., because you are cloning a repository to make a backup).

`GIT_ALLOW_PROTOCOL`
: If set, provide a colon-separated list of protocols which are allowed to be used with fetch/push/clone. This is useful to restrict recursive submodule initialization from an untrusted repository. Any protocol not mentioned will be disallowed (i.e., this is a whitelist, not a blacklist). If the variable is not set at all, all protocols are enabled. The protocol names currently used by git are:

    - `file`: any local file-based path (including `file://` URLs, or local paths)

    - `git`: the anonymous git protocol over a direct TCP connection (or proxy, if configured)

    - `ssh`: git over ssh (including `host:path` syntax, `ssh://`, etc).

    - `http`: git over http, both "smart http" and "dumb http". Note that this does *not* include `https`; if you want both, you should specify both as `http:https`.

    - any external helpers are named by their protocol (e.g., use `hg` to allow the `git-remote-hg` helper)