---
title: Terminology
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/section_7
group: git
---

__alternate object database__
: Via the alternates mechanism, a [repository](#def_repository) can inherit part of its [object database](#def_object_database) from another object database, which is called an "alternate".

__bare repository__
: A bare repository is normally an appropriately named [directory](#def_directory) with a `.git` suffix that does not have a locally checked-out copy of any of the files under revision control. That is, all of the Git administrative and control files that would normally be present in the hidden `.git` sub-directory are directly present in the `repository.git` directory instead, and no other files are present and checked out. Usually publishers of public repositories make bare repositories available.

__blob object__
: Untyped [object](#def_object), e.g. the contents of a file.

__branch__
: A "branch" is an active line of development. The most recent [commit](#def_commit) on a branch is referred to as the tip of that branch. The tip of the branch is referenced by a branch [head](#def_head), which moves forward as additional development is done on the branch. A single Git [repository](#def_repository) can track an arbitrary number of branches, but your [working tree](#def_working_tree) is associated with just one of them (the "current" or "checked out" branch), and [HEAD](#def_HEAD) points to that branch.

__cache__
: Obsolete for: [index](#def_index).

__chain__
: A list of objects, where each [object](#def_object) in the list contains a reference to its successor (for example, the successor of a [commit](#def_commit) could be one of its [parents](#def_parent)).

__changeset__
: BitKeeper/cvsps speak for "[commit](#def_commit)". Since Git does not store changes, but states, it really does not make sense to use the term "changesets" with Git.

__checkout__
: The action of updating all or part of the [working tree](#def_working_tree) with a [tree object](#def_tree_object) or [blob](#def_blob_object) from the [object database](#def_object_database), and updating the [index](#def_index) and [HEAD](#def_HEAD) if the whole working tree has been pointed at a new [branch](#def_branch).

__cherry-picking__
: In [SCM](#def_SCM) jargon, "cherry pick" means to choose a subset of changes out of a series of changes (typically commits) and record them as a new series of changes on top of a different codebase. In Git, this is performed by the "git cherry-pick" command to extract the change introduced by an existing [commit](#def_commit) and to record it based on the tip of the current [branch](#def_branch) as a new commit.

__clean__
: A [working tree](#def_working_tree) is clean, if it corresponds to the [revision](#def_revision) referenced by the current [head](#def_head). Also see "[dirty](#def_dirty)".

__commit__
: As a noun: A single point in the Git history; the entire history of a project is represented as a set of interrelated commits. The word "commit" is often used by Git in the same places other revision control systems use the words "revision" or "version". Also used as a short hand for [commit object](#def_commit_object).

: As a verb: The action of storing a new snapshot of the project’s state in the Git history, by creating a new commit representing the current state of the [index](#def_index) and advancing [HEAD](#def_HEAD) to point at the new commit.

__commit object__
: An [object](#def_object) which contains the information about a particular [revision](#def_revision), such as [parents](#def_parent), committer, author, date and the [tree object](#def_tree_object) which corresponds to the top [directory](#def_directory) of the stored revision.

__commit-ish (also committish)__
: A [commit object](#def_commit_object) or an [object](#def_object) that can be recursively dereferenced to a commit object. The following are all commit-ishes: a commit object, a [tag object](#def_tag_object) that points to a commit object, a tag object that points to a tag object that points to a commit object, etc.

__core Git__
: Fundamental data structures and utilities of Git. Exposes only limited source code management tools.

__DAG__
: Directed acyclic graph. The [commit objects](#def_commit_object) form a directed acyclic graph, because they have parents (directed), and the graph of commit objects is acyclic (there is no [chain](#def_chain) which begins and ends with the same [object](#def_object)).

__dangling object__
: An [unreachable object](#def_unreachable_object) which is not [reachable](#def_reachable) even from other unreachable objects; a dangling object has no references to it from any reference or [object](#def_object) in the [repository](#def_repository).

__detached HEAD__
: Normally the [HEAD](#def_HEAD) stores the name of a [branch](#def_branch), and commands that operate on the history HEAD represents operate on the history leading to the tip of the branch the HEAD points at. However, Git also allows you to [check out](#def_checkout) an arbitrary [commit](#def_commit) that isn’t necessarily the tip of any particular branch. The HEAD in such a state is called "detached".

: Note that commands that operate on the history of the current branch (e.g. `git commit` to build a new history on top of it) still work while the HEAD is detached. They update the HEAD to point at the tip of the updated history without affecting any branch. Commands that update or inquire information *about* the current branch (e.g. `git
branch --set-upstream-to` that sets what remote-tracking branch the current branch integrates with) obviously do not work, as there is no (real) current branch to ask about in this state.

__directory__
The list you get with "ls" :-)

__dirty__
: A [working tree](#def_working_tree) is said to be "dirty" if it contains modifications which have not been [committed](#def_commit) to the current [branch](#def_branch).

__evil merge__
: An evil merge is a [merge](#def_merge) that introduces changes that do not appear in any [parent](#def_parent).

__fast-forward__
: A fast-forward is a special type of [merge](#def_merge) where you have a [revision](#def_revision) and you are "merging" another [branch](#def_branch)'s changes that happen to be a descendant of what you have. In such a case, you do not make a new [merge](#def_merge) [commit](#def_commit) but instead just update to his revision. This will happen frequently on a [remote-tracking branch](#def_remote_tracking_branch) of a remote [repository](#def_repository).

__fetch__
: Fetching a [branch](#def_branch) means to get the branch’s [head ref](#def_head_ref) from a remote [repository](#def_repository), to find out which objects are missing from the local [object database](#def_object_database), and to get them, too. See also linkgit:git-fetch\[1\].

__file system__
: Linus Torvalds originally designed Git to be a user space file system, i.e. the infrastructure to hold files and directories. That ensured the efficiency and speed of Git.

__Git archive__
: Synonym for [repository](#def_repository) (for arch people).

__gitfile__
: A plain file `.git` at the root of a working tree that points at the directory that is the real repository.

__grafts__
: Grafts enables two otherwise different lines of development to be joined together by recording fake ancestry information for commits. This way you can make Git pretend the set of [parents](#def_parent) a [commit](#def_commit) has is different from what was recorded when the commit was created. Configured via the `.git/info/grafts` file.

: Note that the grafts mechanism is outdated and can lead to problems transferring objects between repositories; see linkgit:git-replace\[1\] for a more flexible and robust system to do the same thing.

__hash__
: In Git’s context, synonym for [object name](#def_object_name).

__head__
: A [named reference](#def_ref) to the [commit](#def_commit) at the tip of a [branch](#def_branch). Heads are stored in a file in `$GIT_DIR/refs/heads/` directory, except when using packed refs. (See linkgit:git-pack-refs\[1\].)

__HEAD__
: The current [branch](#def_branch). In more detail: Your [working tree](#def_working_tree) is normally derived from the state of the tree referred to by HEAD. HEAD is a reference to one of the [heads](#def_head) in your repository, except when using a [detached HEAD](#def_detached_HEAD), in which case it directly references an arbitrary commit.

__head ref__
: A synonym for [head](#def_head).

__hook__
: During the normal execution of several Git commands, call-outs are made to optional scripts that allow a developer to add functionality or checking. Typically, the hooks allow for a command to be pre-verified and potentially aborted, and allow for a post-notification after the operation is done. The hook scripts are found in the `$GIT_DIR/hooks/` directory, and are enabled by simply removing the `.sample` suffix from the filename. In earlier versions of Git you had to make them executable.

__index__
: A collection of files with stat information, whose contents are stored as objects. The index is a stored version of your [working tree](#def_working_tree). Truth be told, it can also contain a second, and even a third version of a working tree, which are used when [merging](#def_merge).

__index entry__
: The information regarding a particular file, stored in the [index](#def_index). An index entry can be unmerged, if a [merge](#def_merge) was started, but not yet finished (i.e. if the index contains multiple versions of that file).

__master__
: The default development [branch](#def_branch). Whenever you create a Git [repository](#def_repository), a branch named "master" is created, and becomes the active branch. In most cases, this contains the local development, though that is purely by convention and is not required.

__merge__
: As a verb: To bring the contents of another [branch](#def_branch) (possibly from an external [repository](#def_repository)) into the current branch. In the case where the merged-in branch is from a different repository, this is done by first [fetching](#def_fetch) the remote branch and then merging the result into the current branch. This combination of fetch and merge operations is called a [pull](#def_pull). Merging is performed by an automatic process that identifies changes made since the branches diverged, and then applies all those changes together. In cases where changes conflict, manual intervention may be required to complete the merge.

: As a noun: unless it is a [fast-forward](#def_fast_forward), a successful merge results in the creation of a new [commit](#def_commit) representing the result of the merge, and having as [parents](#def_parent) the tips of the merged [branches](#def_branch). This commit is referred to as a "merge commit", or sometimes just a "merge".

__object__
: The unit of storage in Git. It is uniquely identified by the [SHA-1](#def_SHA1) of its contents. Consequently, an object can not be changed.

__object database__
: Stores a set of "objects", and an individual [object](#def_object) is identified by its [object name](#def_object_name). The objects usually live in `$GIT_DIR/objects/`.

__object identifier__
: Synonym for [object name](#def_object_name).

__object name__
: The unique identifier of an [object](#def_object). The object name is usually represented by a 40 character hexadecimal string. Also colloquially called [SHA-1](#def_SHA1).

__object type__
: One of the identifiers "[commit](#def_commit_object)", "[tree](#def_tree_object)", "[tag](#def_tag_object)" or "[blob](#def_blob_object)" describing the type of an [object](#def_object).

__octopus__
: To [merge](#def_merge) more than two [branches](#def_branch).

__origin__
: The default upstream [repository](#def_repository). Most projects have at least one upstream project which they track. By default *origin* is used for that purpose. New upstream updates will be fetched into [remote-tracking branches](#def_remote_tracking_branch) named origin/name-of-upstream-branch, which you can see using `git branch -r`.

__pack__
: A set of objects which have been compressed into one file (to save space or to transmit them efficiently).

__pack index__
: The list of identifiers, and other information, of the objects in a [pack](#def_pack), to assist in efficiently accessing the contents of a pack.

__pathspec__
: Pattern used to limit paths in Git commands.

: Pathspecs are used on the command line of "git ls-files", "git ls-tree", "git add", "git grep", "git diff", "git checkout", and many other commands to limit the scope of operations to some subset of the tree or worktree. See the documentation of each command for whether paths are relative to the current directory or toplevel. The pathspec syntax is as follows:

    - any path matches itself
    - the pathspec up to the last slash represents a directory prefix. The scope of that pathspec is limited to that subtree.
    - the rest of the pathspec is a pattern for the remainder of the pathname. Paths relative to the directory prefix will be matched against that pattern using fnmatch(3); in particular, *\** and *?* *can* match directory separators.

: For example, Documentation/\*.jpg will match all .jpg files in the Documentation subtree, including Documentation/chapter\_1/figure\_1.jpg.

: A pathspec that begins with a colon `:` has special meaning. In the short form, the leading colon `:` is followed by zero or more "magic signature" letters (which optionally is terminated by another colon `:`), and the remainder is the pattern to match against the path. The "magic signature" consists of ASCII symbols that are neither alphanumeric, glob, regex special characters nor colon. The optional colon that terminates the "magic signature" can be omitted if the pattern begins with a character that does not belong to "magic signature" symbol set and is not a colon.

: In the long form, the leading colon `:` is followed by a open parenthesis `(`, a comma-separated list of zero or more "magic words", and a close parentheses `)`, and the remainder is the pattern to match against the path.

: A pathspec with only a colon means "there is no pathspec". This form should not be combined with other pathspec.

    _top_
    : The magic word `top` (magic signature: `/`) makes the pattern match from the root of the working tree, even when you are running the command from inside a subdirectory.

    _literal_
    : Wildcards in the pattern such as `*` or `?` are treated as literal characters.

    _icase_
    : Case insensitive match.

    _glob_
    : Git treats the pattern as a shell glob suitable for consumption by fnmatch(3) with the FNM\_PATHNAME flag: wildcards in the pattern will not match a / in the pathname. "Documentation/git.html" but not "Documentation/ppc/ppc.html" or "tools/perf/Documentation/perf.html".

    : Two consecutive asterisks ("`**`") in patterns matched against full pathname may have special meaning:

        - A leading "`**`" followed by a slash means match in all directories. For example, "`**/foo`" matches file or directory "`foo`" anywhere, the same as pattern "`foo`". "`**/foo/bar`" matches file or directory "`bar`" anywhere that is directly under directory "`foo`".
        - A trailing "`/**`" matches everything inside. For example, "`abc/**`" matches all files inside directory "abc", relative to the location of the `.gitignore` file, with infinite depth.
        - A slash followed by two consecutive asterisks then a slash matches zero or more directories. For example, "`a/**/b`" matches "`a/b`", "`a/x/b`", "`a/x/y/b`" and so on.
        - Other consecutive asterisks are considered invalid.

          Glob magic is incompatible with literal magic.

    _attr_
    : After `attr:` comes a space separated list of "attribute requirements", all of which must be met in order for the path to be considered a match; this is in addition to the usual non-magic pathspec pattern matching. See linkgit:gitattributes\[5\].

    : Each of the attribute requirements for the path takes one of these forms:

        - "`ATTR`" requires that the attribute `ATTR` be set.
        - "`-ATTR`" requires that the attribute `ATTR` be unset.
        - "`ATTR=VALUE`" requires that the attribute `ATTR` be set to the string `VALUE`.
        - "`!ATTR`" requires that the attribute `ATTR` be unspecified.

    _exclude_
    : After a path matches any non-exclude pathspec, it will be run through all exclude pathspec (magic signature: `!` or its synonym `^`). If it matches, the path is ignored. When there is no non-exclude pathspec, the exclusion is applied to the result set as if invoked without any pathspec.

__parent__
: A [commit object](#def_commit_object) contains a (possibly empty) list of the logical predecessor(s) in the line of development, i.e. its parents.

__pickaxe__
: The term [pickaxe](#def_pickaxe) refers to an option to the diffcore routines that help select changes that add or delete a given text string. With the `--pickaxe-all` option, it can be used to view the full [changeset](#def_changeset) that introduced or removed, say, a particular line of text. See linkgit:git-diff\[1\].

__plumbing__
: Cute name for [core Git](#def_core_git).

__porcelain__
: Cute name for programs and program suites depending on [core Git](#def_core_git), presenting a high level access to core Git. Porcelains expose more of a [SCM](#def_SCM) interface than the [plumbing](#def_plumbing).

__per-worktree ref__
: Refs that are per-[worktree](#def_working_tree), rather than global. This is presently only [HEAD](#def_HEAD) and any refs that start with `refs/bisect/`, but might later include other unusual refs.

__pseudoref__
: Pseudorefs are a class of files under `$GIT_DIR` which behave like refs for the purposes of rev-parse, but which are treated specially by git. Pseudorefs both have names that are all-caps, and always start with a line consisting of a [SHA-1](#def_SHA1) followed by whitespace. So, HEAD is not a pseudoref, because it is sometimes a symbolic ref. They might optionally contain some additional data. `MERGE_HEAD` and `CHERRY_PICK_HEAD` are examples. Unlike [per-worktree refs](#def_per_worktree_ref), these files cannot be symbolic refs, and never have reflogs. They also cannot be updated through the normal ref update machinery. Instead, they are updated by directly writing to the files. However, they can be read as if they were refs, so `git rev-parse
        MERGE_HEAD` will work.

__pull__
: Pulling a [branch](#def_branch) means to [fetch](#def_fetch) it and [merge](#def_merge) it. See also linkgit:git-pull\[1\].

__push__
: Pushing a [branch](#def_branch) means to get the branch’s [head ref](#def_head_ref) from a remote [repository](#def_repository), find out if it is a direct ancestor to the branch’s local head ref, and in that case, putting all objects, which are [reachable](#def_reachable) from the local head ref, and which are missing from the remote repository, into the remote [object database](#def_object_database), and updating the remote head ref. If the remote [head](#def_head) is not an ancestor to the local head, the push fails.

__reachable__
: All of the ancestors of a given [commit](#def_commit) are said to be "reachable" from that commit. More generally, one [object](#def_object) is reachable from another if we can reach the one from the other by a [chain](#def_chain) that follows [tags](#def_tag) to whatever they tag, [commits](#def_commit_object) to their parents or trees, and [trees](#def_tree_object) to the trees or [blobs](#def_blob_object) that they contain.

__rebase__
: To reapply a series of changes from a [branch](#def_branch) to a different base, and reset the [head](#def_head) of that branch to the result.

__ref__
: A name that begins with `refs/` (e.g. `refs/heads/master`) that points to an [object name](#def_object_name) or another ref (the latter is called a [symbolic ref](#def_symref)). For convenience, a ref can sometimes be abbreviated when used as an argument to a Git command; see linkgit:gitrevisions\[7\] for details. Refs are stored in the [repository](#def_repository).

: The ref namespace is hierarchical. Different subhierarchies are used for different purposes (e.g. the `refs/heads/` hierarchy is used to represent local branches).

: There are a few special-purpose refs that do not begin with `refs/`. The most notable example is `HEAD`.

__reflog__
: A reflog shows the local "history" of a ref. In other words, it can tell you what the 3rd last revision in *this* repository was, and what was the current state in *this* repository, yesterday 9:14pm. See linkgit:git-reflog\[1\] for details.

__refspec__
: A "refspec" is used by [fetch](#def_fetch) and [push](#def_push) to describe the mapping between remote [ref](#def_ref) and local ref.

__remote repository__
: A [repository](#def_repository) which is used to track the same project but resides somewhere else. To communicate with remotes, see [fetch](#def_fetch) or [push](#def_push).

__remote-tracking branch__
: A [ref](#def_ref) that is used to follow changes from another [repository](#def_repository). It typically looks like *refs/remotes/foo/bar* (indicating that it tracks a branch named *bar* in a remote named *foo*), and matches the right-hand-side of a configured fetch [refspec](#def_refspec). A remote-tracking branch should not contain direct modifications or have local commits made to it.

__repository__
: A collection of [refs](#def_ref) together with an [object database](#def_object_database) containing all objects which are [reachable](#def_reachable) from the refs, possibly accompanied by meta data from one or more [porcelains](#def_porcelain). A repository can share an object database with other repositories via [alternates mechanism](#def_alternate_object_database).

__resolve__
: The action of fixing up manually what a failed automatic [merge](#def_merge) left behind.

__revision__
: Synonym for [commit](#def_commit) (the noun).

__rewind__
: To throw away part of the development, i.e. to assign the [head](#def_head) to an earlier [revision](#def_revision).

__SCM__
: Source code management (tool).

__SHA-1__
: "Secure Hash Algorithm 1"; a cryptographic hash function. In the context of Git used as a synonym for [object name](#def_object_name).

__shallow clone__
: Mostly a synonym to [shallow repository](#def_shallow_repository) but the phrase makes it more explicit that it was created by running `git clone --depth=...` command.

__shallow repository__
: A shallow [repository](#def_repository) has an incomplete history some of whose [commits](#def_commit) have [parents](#def_parent) cauterized away (in other words, Git is told to pretend that these commits do not have the parents, even though they are recorded in the [commit object](#def_commit_object)). This is sometimes useful when you are interested only in the recent history of a project even though the real history recorded in the upstream is much larger. A shallow repository is created by giving the `--depth` option to linkgit:git-clone\[1\], and its history can be later deepened with linkgit:git-fetch\[1\].

__submodule__
: A [repository](#def_repository) that holds the history of a separate project inside another repository (the latter of which is called [superproject](#def_superproject)).

__superproject__
: A [repository](#def_repository) that references repositories of other projects in its working tree as [submodules](#def_submodule). The superproject knows about the names of (but does not hold copies of) commit objects of the contained submodules.

__symref__
: Symbolic reference: instead of containing the [SHA-1](#def_SHA1) id itself, it is of the format *ref: refs/some/thing* and when referenced, it recursively dereferences to this reference. *[HEAD](#def_HEAD)* is a prime example of a symref. Symbolic references are manipulated with the linkgit:git-symbolic-ref\[1\] command.

__tag__
: A [ref](#def_ref) under `refs/tags/` namespace that points to an object of an arbitrary type (typically a tag points to either a [tag](#def_tag_object) or a [commit object](#def_commit_object)). In contrast to a [head](#def_head), a tag is not updated by the `commit` command. A Git tag has nothing to do with a Lisp tag (which would be called an [object type](#def_object_type) in Git’s context). A tag is most typically used to mark a particular point in the commit ancestry [chain](#def_chain).

__tag object__
: An [object](#def_object) containing a [ref](#def_ref) pointing to another object, which can contain a message just like a [commit object](#def_commit_object). It can also contain a (PGP) signature, in which case it is called a "signed tag object".

__topic branch__
: A regular Git [branch](#def_branch) that is used by a developer to identify a conceptual line of development. Since branches are very easy and inexpensive, it is often desirable to have several small branches that each contain very well defined concepts or small incremental yet related changes.

__tree__
: Either a [working tree](#def_working_tree), or a [tree object](#def_tree_object) together with the dependent [blob](#def_blob_object) and tree objects (i.e. a stored representation of a working tree).

__tree object__
: An [object](#def_object) containing a list of file names and modes along with refs to the associated blob and/or tree objects. A [tree](#def_tree) is equivalent to a [directory](#def_directory).

__tree-ish (also treeish)__
: A [tree object](#def_tree_object) or an [object](#def_object) that can be recursively dereferenced to a tree object. Dereferencing a [commit object](#def_commit_object) yields the tree object corresponding to the [revision](#def_revision)'s top [directory](#def_directory). The following are all tree-ishes: a [commit-ish](#def_commit-ish), a tree object, a [tag object](#def_tag_object) that points to a tree object, a tag object that points to a tag object that points to a tree object, etc.

__unmerged index__
: An [index](#def_index) which contains unmerged [index entries](#def_index_entry).

__unreachable object__
: An [object](#def_object) which is not [reachable](#def_reachable) from a [branch](#def_branch), [tag](#def_tag), or any other reference.

__upstream branch__
: The default [branch](#def_branch) that is merged into the branch in question (or the branch in question is rebased onto). It is configured via branch.&lt;name&gt;.remote and branch.&lt;name&gt;.merge. If the upstream branch of *A* is *origin/B* sometimes we say "*A* is tracking *origin/B*".

__working tree__
: The tree of actual checked out files. The working tree normally contains the contents of the [HEAD](#def_HEAD) commit’s tree, plus any local changes that you have made but not yet committed.
