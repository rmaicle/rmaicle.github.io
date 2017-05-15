---
title: Low-Level Git Operations
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_9
group: git-2.13.0
subgroup: user_manual
---

## Object access and manipulation

The linkgit:git-cat-file\[1\] command can show the contents of any object, though the higher-level linkgit:git-show\[1\] is usually more useful.

The linkgit:git-commit-tree\[1\] command allows constructing commits with arbitrary parents and trees.

A tree can be created with linkgit:git-write-tree\[1\] and its data can be accessed by linkgit:git-ls-tree\[1\]. Two trees can be compared with linkgit:git-diff-tree\[1\].

A tag is created with linkgit:git-mktag\[1\], and the signature can be verified by linkgit:git-verify-tag\[1\], though it is normally simpler to use linkgit:git-tag\[1\] for both.

## The Workflow

High-level operations such as linkgit:git-commit\[1\], linkgit:git-checkout\[1\] and linkgit:git-reset\[1\] work by moving data between the working tree, the index, and the object database. Git provides low-level operations which perform each of these steps individually.

Generally, all Git operations work on the index file. Some operations work **purely** on the index file (showing the current state of the index), but most operations move data between the index file and either the database or the working directory. Thus there are four main combinations:

## working directory → index

The linkgit:git-update-index\[1\] command updates the index with information from the working directory. You generally update the index information by just specifying the filename you want to update, like so:

    $ git update-index filename

but to avoid common mistakes with filename globbing etc., the command will not normally add totally new entries or remove old entries, i.e. it will normally just update existing cache entries.

To tell Git that yes, you really do realize that certain files no longer exist, or that new files should be added, you should use the `--remove` and `--add` flags respectively.

NOTE! A `--remove` flag does *not* mean that subsequent filenames will necessarily be removed: if the files still exist in your directory structure, the index will be updated with their new status, not removed. The only thing `--remove` means is that update-index will be considering a removed file to be a valid thing, and if the file really does not exist any more, it will update the index accordingly.

As a special case, you can also do `git update-index --refresh`, which will refresh the "stat" information of each index to match the current stat information. It will *not* update the object status itself, and it will only update the fields that are used to quickly test whether an object still matches its old backing store object.

The previously introduced linkgit:git-add\[1\] is just a wrapper for linkgit:git-update-index\[1\].

### index → object database

You write your current index file to a "tree" object with the program

    $ git write-tree

that doesn’t come with any options—it will just write out the current index into the set of tree objects that describe that state, and it will return the name of the resulting top-level tree. You can use that tree to re-generate the index at any time by going in the other direction:

### object database → index

You read a "tree" file from the object database, and use that to populate (and overwrite—don’t do this if your index contains any unsaved state that you might want to restore later!) your current index. Normal operation is just

    $ git read-tree <SHA-1 of tree>

and your index file will now be equivalent to the tree that you saved earlier. However, that is only your *index* file: your working directory contents have not been modified.

### index → working directory

You update your working directory from the index by "checking out" files. This is not a very common operation, since normally you’d just keep your files updated, and rather than write to your working directory, you’d tell the index files about the changes in your working directory (i.e. `git update-index`).

However, if you decide to jump to a new version, or check out somebody else’s version, or just restore a previous tree, you’d populate your index file with read-tree, and then you need to check out the result with

    $ git checkout-index filename

or, if you want to check out all of the index, use `-a`.

NOTE! `git checkout-index` normally refuses to overwrite old files, so if you have an old version of the tree already checked out, you will need to use the `-f` flag (*before* the `-a` flag or the filename) to *force* the checkout.

Finally, there are a few odds and ends which are not purely moving from one representation to the other:

### Tying it all together

To commit a tree you have instantiated with `git write-tree`, you’d create a "commit" object that refers to that tree and the history behind it—most notably the "parent" commits that preceded it in history.

Normally a "commit" has one parent: the previous state of the tree before a certain change was made. However, sometimes it can have two or more parent commits, in which case we call it a "merge", due to the fact that such a commit brings together ("merges") two or more previous states represented by other commits.

In other words, while a "tree" represents a particular directory state of a working directory, a "commit" represents that state in time, and explains how we got there.

You create a commit object by giving it the tree that describes the state at the time of the commit, and a list of parents:

    $ git commit-tree <tree> -p <parent> [(-p <parent2>)...]

and then giving the reason for the commit on stdin (either through redirection from a pipe or file, or by just typing it at the tty).

`git commit-tree` will return the name of the object that represents that commit, and you should save it away for later use. Normally, you’d commit a new `HEAD` state, and while Git doesn’t care where you save the note about that state, in practice we tend to just write the result to the file pointed at by `.git/HEAD`, so that we can always see what the last committed state was.

Here is a picture that illustrates how various pieces fit together:

                         commit-tree
                          commit obj
                           +----+
                           |    |
                           |    |
                           V    V
                        +-----------+
                        | Object DB |
                        |  Backing  |
                        |   Store   |
                        +-----------+
                           ^
               write-tree  |     |
                 tree obj  |     |
                           |     |  read-tree
                           |     |  tree obj
                                 V
                        +-----------+
                        |   Index   |
                        |  "cache"  |
                        +-----------+
             update-index  ^
                 blob obj  |     |
                           |     |
        checkout-index -u  |     |  checkout-index
                 stat      |     |  blob obj
                                 V
                        +-----------+
                        |  Working  |
                        | Directory |
                        +-----------+

## Examining the data

You can examine the data represented in the object database and the index with various helper tools. For every object, you can use linkgit:git-cat-file\[1\] to examine details about the object:

    $ git cat-file -t <objectname>

shows the type of the object, and once you have the type (which is usually implicit in where you find the object), you can use

    $ git cat-file blob|tree|commit|tag <objectname>

to show its contents. NOTE! Trees have binary content, and as a result there is a special helper for showing that content, called `git ls-tree`, which turns the binary content into a more easily readable form.

It’s especially instructive to look at "commit" objects, since those tend to be small and fairly self-explanatory. In particular, if you follow the convention of having the top commit name in `.git/HEAD`, you can do

    $ git cat-file commit HEAD

to see what the top commit was.

## Merging multiple trees

Git can help you perform a three-way merge, which can in turn be used for a many-way merge by repeating the merge procedure several times. The usual situation is that you only do one three-way merge (reconciling two lines of history) and commit the result, but if you like to, you can merge several branches in one go.

To perform a three-way merge, you start with the two commits you want to merge, find their closest common parent (a third commit), and compare the trees corresponding to these three commits.

To get the "base" for the merge, look up the common parent of two commits:

    $ git merge-base <commit1> <commit2>

This prints the name of a commit they are both based on. You should now look up the tree objects of those commits, which you can easily do with

    $ git cat-file commit <commitname> | head -1

since the tree object information is always the first line in a commit object.

Once you know the three trees you are going to merge (the one "original" tree, aka the common tree, and the two "result" trees, aka the branches you want to merge), you do a "merge" read into the index. This will complain if it has to throw away your old index contents, so you should make sure that you’ve committed those—in fact you would normally always do a merge against your last commit (which should thus match what you have in your current index anyway).

To do the merge, do

    $ git read-tree -m -u <origtree> <yourtree> <targettree>

which will do all trivial merge operations for you directly in the index file, and you can just write the result out with `git write-tree`.

## Merging multiple trees, continued

Sadly, many merges aren’t trivial. If there are files that have been added, moved or removed, or if both branches have modified the same file, you will be left with an index tree that contains "merge entries" in it. Such an index tree can *NOT* be written out to a tree object, and you will have to resolve any such merge clashes using other tools before you can write out the result.

You can examine such index state with `git ls-files --unmerged` command. An example:

    $ git read-tree -m $orig HEAD $target
    $ git ls-files --unmerged
    100644 263414f423d0e4d70dae8fe53fa34614ff3e2860 1       hello.c
    100644 06fa6a24256dc7e560efa5687fa84b51f0263c3a 2       hello.c
    100644 cc44c73eb783565da5831b4d820c962954019b69 3       hello.c

Each line of the `git ls-files --unmerged` output begins with the blob mode bits, blob SHA-1, *stage number*, and the filename. The *stage number* is Git’s way to say which tree it came from: stage 1 corresponds to the `$orig` tree, stage 2 to the `HEAD` tree, and stage 3 to the `$target` tree.

Earlier we said that trivial merges are done inside `git read-tree -m`. For example, if the file did not change from `$orig` to `HEAD` or `$target`, or if the file changed from `$orig` to `HEAD` and `$orig` to `$target` the same way, obviously the final outcome is what is in `HEAD`. What the above example shows is that file `hello.c` was changed from `$orig` to `HEAD` and `$orig` to `$target` in a different way. You could resolve this by running your favorite 3-way merge program, e.g. `diff3`, `merge`, or Git’s own merge-file, on the blob objects from these three stages yourself, like this:

    $ git cat-file blob 263414f... >hello.c~1
    $ git cat-file blob 06fa6a2... >hello.c~2
    $ git cat-file blob cc44c73... >hello.c~3
    $ git merge-file hello.c~2 hello.c~1 hello.c~3

This would leave the merge result in `hello.c~2` file, along with conflict markers if there are conflicts. After verifying the merge result makes sense, you can tell Git what the final merge result for this file is by:

    $ mv -f hello.c~2 hello.c
    $ git update-index hello.c

When a path is in the "unmerged" state, running `git update-index` for that path tells Git to mark the path resolved.

The above is the description of a Git merge at the lowest level, to help you understand what conceptually happens under the hood. In practice, nobody, not even Git itself, runs `git cat-file` three times for this. There is a `git merge-index` program that extracts the stages to temporary files and calls a "merge" script on it:

    $ git merge-index git-merge-one-file hello.c

and that is what higher level `git merge -s resolve` is implemented with.

This chapter covers internal details of the Git implementation which probably only Git developers need to understand.
