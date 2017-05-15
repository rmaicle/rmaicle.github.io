---
title: Rewriting History and Maintaining Patch Series
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_5
group: git-2.13.0
subgroup: user_manual
---

## Creating the perfect patch series

Suppose you are a contributor to a large project, and you want to add a complicated feature, and to present it to the other developers in a way that makes it easy for them to read your changes, verify that they are correct, and understand why you made each change.

If you present all of your changes as a single patch (or commit), they may find that it is too much to digest all at once.

If you present them with the entire history of your work, complete with mistakes, corrections, and dead ends, they may be overwhelmed.

So the ideal is usually to produce a series of patches such that:

1.  Each patch can be applied in order.

2.  Each patch includes a single logical change, together with a message explaining the change.

3.  No patch introduces a regression: after applying any initial part of the series, the resulting project still compiles and works, and has no bugs that it didn’t have before.

4.  The complete series produces the same end result as your own (probably much messier!) development process did.

We will introduce some tools that can help you do this, explain how to use them, and then explain some of the problems that can arise because you are rewriting history.

## Keeping a patch series up to date using `git rebase`

Suppose that you create a branch `mywork` on a remote-tracking branch `origin`, and create some commits on top of it:

    $ git checkout -b mywork origin
    $ vi file.txt
    $ git commit
    $ vi otherfile.txt
    $ git commit
    ...

You have performed no merges into mywork, so it is just a simple linear sequence of patches on top of `origin`:

     o--o--O <-- origin
            \
             a--b--c <-- mywork

Some more interesting work has been done in the upstream project, and `origin` has advanced:

     o--o--O--o--o--o <-- origin
            \
             a--b--c <-- mywork

At this point, you could use `pull` to merge your changes back in; the result would create a new merge commit, like this:

     o--o--O--o--o--o <-- origin
            \        \
             a--b--c--m <-- mywork

However, if you prefer to keep the history in mywork a simple series of commits without any merges, you may instead choose to use linkgit:git-rebase\[1\]:

    $ git checkout mywork
    $ git rebase origin

This will remove each of your commits from mywork, temporarily saving them as patches (in a directory named `.git/rebase-apply`), update mywork to point at the latest version of origin, then apply each of the saved patches to the new mywork. The result will look like:

     o--o--O--o--o--o <-- origin
                     \
                      a'--b'--c' <-- mywork

In the process, it may discover conflicts. In that case it will stop and allow you to fix the conflicts; after fixing conflicts, use `git add` to update the index with those contents, and then, instead of running `git commit`, just run

    $ git rebase --continue

and Git will continue applying the rest of the patches.

At any point you may use the `--abort` option to abort this process and return mywork to the state it had before you started the rebase:

    $ git rebase --abort

If you need to reorder or edit a number of commits in a branch, it may be easier to use `git rebase -i`, which allows you to reorder and squash commits, as well as marking them for individual editing during the rebase. See [section\_title](#interactive-rebase) for details, and [section\_title](#reordering-patch-series) for alternatives.

## Rewriting a single commit

We saw in [section\_title](#fixing-a-mistake-by-rewriting-history) that you can replace the most recent commit using

    $ git commit --amend

which will replace the old commit by a new commit incorporating your changes, giving you a chance to edit the old commit message first. This is useful for fixing typos in your last commit, or for adjusting the patch contents of a poorly staged commit.

If you need to amend commits from deeper in your history, you can use [interactive rebase’s `edit` instruction](#interactive-rebase).

## Reordering or selecting from a patch series

Sometimes you want to edit a commit deeper in your history. One approach is to use `git format-patch` to create a series of patches and then reset the state to before the patches:

    $ git format-patch origin
    $ git reset --hard origin

Then modify, reorder, or eliminate patches as needed before applying them again with linkgit:git-am\[1\]:

    $ git am *.patch

## Using interactive rebases

You can also edit a patch series with an interactive rebase. This is the same as [reordering a patch series using `format-patch`](#reordering-patch-series), so use whichever interface you like best.

Rebase your current HEAD on the last commit you want to retain as-is. For example, if you want to reorder the last 5 commits, use:

    $ git rebase -i HEAD~5

This will open your editor with a list of steps to be taken to perform your rebase.

    pick deadbee The oneline of this commit
    pick fa1afe1 The oneline of the next commit
    ...

    # Rebase c0ffeee..deadbee onto c0ffeee
    #
    # Commands:
    #  p, pick = use commit
    #  r, reword = use commit, but edit the commit message
    #  e, edit = use commit, but stop for amending
    #  s, squash = use commit, but meld into previous commit
    #  f, fixup = like "squash", but discard this commit's log message
    #  x, exec = run command (the rest of the line) using shell
    #
    # These lines can be re-ordered; they are executed from top to bottom.
    #
    # If you remove a line here THAT COMMIT WILL BE LOST.
    #
    # However, if you remove everything, the rebase will be aborted.
    #
    # Note that empty commits are commented out

As explained in the comments, you can reorder commits, squash them together, edit commit messages, etc. by editing the list. Once you are satisfied, save the list and close your editor, and the rebase will begin.

The rebase will stop where `pick` has been replaced with `edit` or when a step in the list fails to mechanically resolve conflicts and needs your help. When you are done editing and/or resolving conflicts you can continue with `git rebase --continue`. If you decide that things are getting too hairy, you can always bail out with `git rebase
--abort`. Even after the rebase is complete, you can still recover the original branch by using the [reflog](#reflogs).

For a more detailed discussion of the procedure and additional tips, see the "INTERACTIVE MODE" section of linkgit:git-rebase\[1\].

## Other tools

There are numerous other tools, such as StGit, which exist for the purpose of maintaining a patch series. These are outside of the scope of this manual.

## Problems with rewriting history

The primary problem with rewriting the history of a branch has to do with merging. Suppose somebody fetches your branch and merges it into their branch, with a result something like this:

     o--o--O--o--o--o <-- origin
            \        \
             t--t--t--m <-- their branch:

Then suppose you modify the last three commits:

             o--o--o <-- new head of origin
            /
     o--o--O--o--o--o <-- old head of origin

If we examined all this history together in one repository, it will look like:

             o--o--o <-- new head of origin
            /
     o--o--O--o--o--o <-- old head of origin
            \        \
             t--t--t--m <-- their branch:

Git has no way of knowing that the new head is an updated version of the old head; it treats this situation exactly the same as it would if two developers had independently done the work on the old and new heads in parallel. At this point, if someone attempts to merge the new head in to their branch, Git will attempt to merge together the two (old and new) lines of development, instead of trying to replace the old by the new. The results are likely to be unexpected.

You may still choose to publish branches whose history is rewritten, and it may be useful for others to be able to fetch those branches in order to examine or test them, but they should not attempt to pull such branches into their own work.

For true distributed development that supports proper merging, published branches should never be rewritten.

## Why bisecting merge commits can be harder than bisecting linear history

The linkgit:git-bisect\[1\] command correctly handles history that includes merge commits. However, when the commit that it finds is a merge commit, the user may need to work harder than usual to figure out why that commit introduced a problem.

Imagine this history:

          ---Z---o---X---...---o---A---C---D
              \                       /
               o---o---Y---...---o---B

Suppose that on the upper line of development, the meaning of one of the functions that exists at Z is changed at commit X. The commits from Z leading to A change both the function’s implementation and all calling sites that exist at Z, as well as new calling sites they add, to be consistent. There is no bug at A.

Suppose that in the meantime on the lower line of development somebody adds a new calling site for that function at commit Y. The commits from Z leading to B all assume the old semantics of that function and the callers and the callee are consistent with each other. There is no bug at B, either.

Suppose further that the two development lines merge cleanly at C, so no conflict resolution is required.

Nevertheless, the code at C is broken, because the callers added on the lower line of development have not been converted to the new semantics introduced on the upper line of development. So if all you know is that D is bad, that Z is good, and that linkgit:git-bisect\[1\] identifies C as the culprit, how will you figure out that the problem is due to this change in semantics?

When the result of a `git bisect` is a non-merge commit, you should normally be able to discover the problem by examining just that commit. Developers can make this easy by breaking their changes into small self-contained commits. That won’t help in the case above, however, because the problem isn’t obvious from examination of any single commit; instead, a global view of the development is required. To make matters worse, the change in semantics in the problematic function may be just one small part of the changes in the upper line of development.

On the other hand, if instead of merging at C you had rebased the history between Z to B on top of A, you would have gotten this linear history:

        ---Z---o---X--...---o---A---o---o---Y*--...---o---B*--D*

Bisecting between Z and D\* would hit a single culprit commit Y\*, and understanding why Y\* was broken would probably be easier.

Partly for this reason, many experienced Git users, even when working on an otherwise merge-heavy project, keep the history linear by rebasing against the latest upstream version before publishing.
