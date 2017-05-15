---
title: Submodules
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_8
group: git-2.13.0
subgroup: user_manual
---

## Pitfalls with submodules

Always publish the submodule change before publishing the change to the superproject that references it. If you forget to publish the submodule change, others won’t be able to clone the repository:

    $ cd ~/git/super/a
    $ echo i added another line to this file >> a.txt
    $ git commit -a -m "doing it wrong this time"
    $ cd ..
    $ git add a
    $ git commit -m "Updated submodule a again."
    $ git push
    $ cd ~/git/cloned
    $ git pull
    $ git submodule update
    error: pathspec '261dfac35cb99d380eb966e102c1197139f7fa24' did not match any file(s) known to git.
    Did you forget to 'git add'?
    Unable to checkout '261dfac35cb99d380eb966e102c1197139f7fa24' in submodule path 'a'

In older Git versions it could be easily forgotten to commit new or modified files in a submodule, which silently leads to similar problems as not pushing the submodule changes. Starting with Git 1.7.0 both `git status` and `git diff` in the superproject show submodules as modified when they contain new or modified files to protect against accidentally committing such a state. `git
diff` will also add a `-dirty` to the work tree side when generating patch output or used with the `--submodule` option:

    $ git diff
    diff --git a/sub b/sub
    --- a/sub
    +++ b/sub
    @@ -1 +1 @@
    -Subproject commit 3f356705649b5d566d97ff843cf193359229a453
    +Subproject commit 3f356705649b5d566d97ff843cf193359229a453-dirty
    $ git diff --submodule
    Submodule sub 3f35670..3f35670-dirty:

You also should not rewind branches in a submodule beyond commits that were ever recorded in any superproject.

It’s not safe to run `git submodule update` if you’ve made and committed changes within a submodule without checking out a branch first. They will be silently overwritten:

    $ cat a.txt
    module a
    $ echo line added from private2 >> a.txt
    $ git commit -a -m "line added inside private2"
    $ cd ..
    $ git submodule update
    Submodule path 'a': checked out 'd266b9873ad50488163457f025db7cdd9683d88b'
    $ cd a
    $ cat a.txt
    module a

> **Note**
>
> The changes are still visible in the submodule’s reflog.

If you have uncommitted changes in your submodule working tree, `git
submodule update` will not overwrite them. Instead, you get the usual warning about not being able switch from a dirty branch.

Many of the higher-level commands were originally implemented as shell scripts using a smaller core of low-level Git commands. These can still be useful when doing unusual things with Git, or just as a way to understand its inner workings.
