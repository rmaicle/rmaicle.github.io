---
title: Exploring Git History
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_2
group: git-2.13.0
subgroup: user_manual
---

## How to use bisect to find a regression

Suppose version 2.6.18 of your project worked, but the version at "master" crashes. Sometimes the best way to find the cause of such a regression is to perform a brute-force search through the project’s history to find the particular commit that caused the problem. The linkgit:git-bisect\[1\] command can help you do this:

    $ git bisect start
    $ git bisect good v2.6.18
    $ git bisect bad master
    Bisecting: 3537 revisions left to test after this
    [65934a9a028b88e83e2b0f8b36618fe503349f8e] BLOCK: Make USB storage depend on SCSI rather than selecting it [try #6]

If you run `git branch` at this point, you’ll see that Git has temporarily moved you in "(no branch)". HEAD is now detached from any branch and points directly to a commit (with commit id 65934...) that is reachable from "master" but not from v2.6.18. Compile and test it, and see whether it crashes. Assume it does crash. Then:

    $ git bisect bad
    Bisecting: 1769 revisions left to test after this
    [7eff82c8b1511017ae605f0c99ac275a7e21b867] i2c-core: Drop useless bitmaskings

checks out an older version. Continue like this, telling Git at each stage whether the version it gives you is good or bad, and notice that the number of revisions left to test is cut approximately in half each time.

After about 13 tests (in this case), it will output the commit id of the guilty commit. You can then examine the commit with linkgit:git-show\[1\], find out who wrote it, and mail them your bug report with the commit id. Finally, run

    $ git bisect reset

to return you to the branch you were on before.

Note that the version which `git bisect` checks out for you at each point is just a suggestion, and you’re free to try a different version if you think it would be a good idea. For example, occasionally you may land on a commit that broke something unrelated; run

    $ git bisect visualize

which will run gitk and label the commit it chose with a marker that says "bisect". Choose a safe-looking commit nearby, note its commit id, and check it out with:

    $ git reset --hard fb47ddb2db...

then test, run `bisect good` or `bisect bad` as appropriate, and continue.

Instead of `git bisect visualize` and then `git reset --hard
fb47ddb2db...`, you might just want to tell Git that you want to skip the current commit:

    $ git bisect skip

In this case, though, Git may not eventually be able to tell the first bad one between some first skipped commits and a later bad commit.

There are also ways to automate the bisecting process if you have a test script that can tell a good from a bad commit. See linkgit:git-bisect\[1\] for more information about this and other `git
bisect` features.

## Naming commits

We have seen several ways of naming commits already:

-   40-hexdigit object name

-   branch name: refers to the commit at the head of the given branch

-   tag name: refers to the commit pointed to by the given tag (we’ve seen branches and tags are special cases of [references](#how-git-stores-references)).

-   HEAD: refers to the head of the current branch

There are many more; see the "SPECIFYING REVISIONS" section of the linkgit:gitrevisions\[7\] man page for the complete list of ways to name revisions. Some examples:

    $ git show fb47ddb2 # the first few characters of the object name
                        # are usually enough to specify it uniquely
    $ git show HEAD^    # the parent of the HEAD commit
    $ git show HEAD^^   # the grandparent
    $ git show HEAD~4   # the great-great-grandparent

Recall that merge commits may have more than one parent; by default, `^` and `~` follow the first parent listed in the commit, but you can also choose:

    $ git show HEAD^1   # show the first parent of HEAD
    $ git show HEAD^2   # show the second parent of HEAD

In addition to HEAD, there are several other special names for commits:

Merges (to be discussed later), as well as operations such as `git reset`, which change the currently checked-out commit, generally set ORIG\_HEAD to the value HEAD had before the current operation.

The `git fetch` operation always stores the head of the last fetched branch in FETCH\_HEAD. For example, if you run `git fetch` without specifying a local branch as the target of the operation

    $ git fetch git://example.com/proj.git theirbranch

the fetched commits will still be available from FETCH\_HEAD.

When we discuss merges we’ll also see the special name MERGE\_HEAD, which refers to the other branch that we’re merging in to the current branch.

The linkgit:git-rev-parse\[1\] command is a low-level command that is occasionally useful for translating some name for a commit to the object name for that commit:

    $ git rev-parse origin
    e05db0fd4f31dde7005f075a84f96b360d05984b

## Creating tags

We can also create a tag to refer to a particular commit; after running

    $ git tag stable-1 1b2e1d63ff

You can use `stable-1` to refer to the commit 1b2e1d63ff.

This creates a "lightweight" tag. If you would also like to include a comment with the tag, and possibly sign it cryptographically, then you should create a tag object instead; see the linkgit:git-tag\[1\] man page for details.

## Browsing revisions

The linkgit:git-log\[1\] command can show lists of commits. On its own, it shows all commits reachable from the parent commit; but you can also make more specific requests:

    $ git log v2.5..        # commits since (not reachable from) v2.5
    $ git log test..master  # commits reachable from master but not test
    $ git log master..test  # ...reachable from test but not master
    $ git log master...test # ...reachable from either test or master,
                            #    but not both
    $ git log --since="2 weeks ago" # commits from the last 2 weeks
    $ git log Makefile      # commits which modify Makefile
    $ git log fs/           # ... which modify any file under fs/
    $ git log -S'foo()'     # commits which add or remove any file data
                            # matching the string 'foo()'

And of course you can combine all of these; the following finds commits since v2.5 which touch the `Makefile` or any file under `fs`:

    $ git log v2.5.. Makefile fs/

You can also ask git log to show patches:

    $ git log -p

See the `--pretty` option in the linkgit:git-log\[1\] man page for more display options.

Note that git log starts with the most recent commit and works backwards through the parents; however, since Git history can contain multiple independent lines of development, the particular order that commits are listed in may be somewhat arbitrary.

## Generating diffs

You can generate diffs between any two versions using linkgit:git-diff\[1\]:

    $ git diff master..test

That will produce the diff between the tips of the two branches. If you’d prefer to find the diff from their common ancestor to test, you can use three dots instead of two:

    $ git diff master...test

Sometimes what you want instead is a set of patches; for this you can use linkgit:git-format-patch\[1\]:

    $ git format-patch master..test

will generate a file with a patch for each commit reachable from test but not from master.

## Viewing old file versions

You can always view an old version of a file by just checking out the correct revision first. But sometimes it is more convenient to be able to view an old version of a single file without checking anything out; this command does that:

    $ git show v2.5:fs/locks.c

Before the colon may be anything that names a commit, and after it may be any path to a file tracked by Git.

## Examples

### Counting the number of commits on a branch

Suppose you want to know how many commits you’ve made on `mybranch` since it diverged from `origin`:

    $ git log --pretty=oneline origin..mybranch | wc -l

Alternatively, you may often see this sort of thing done with the lower-level command linkgit:git-rev-list\[1\], which just lists the SHA-1’s of all the given commits:

    $ git rev-list origin..mybranch | wc -l

### Check whether two branches point at the same history

Suppose you want to check whether two branches point at the same point in history.

    $ git diff origin..master

will tell you whether the contents of the project are the same at the two branches; in theory, however, it’s possible that the same project contents could have been arrived at by two different historical routes. You could compare the object names:

    $ git rev-list origin
    e05db0fd4f31dde7005f075a84f96b360d05984b
    $ git rev-list master
    e05db0fd4f31dde7005f075a84f96b360d05984b

Or you could recall that the `...` operator selects all commits reachable from either one reference or the other but not both; so

    $ git log origin...master

will return no commits when the two branches are equal.

### Find first tagged version including a given fix

Suppose you know that the commit e05db0fd fixed a certain problem. You’d like to find the earliest tagged release that contains that fix.

Of course, there may be more than one answer—if the history branched after commit e05db0fd, then there could be multiple "earliest" tagged releases.

You could just visually inspect the commits since e05db0fd:

    $ gitk e05db0fd..

or you can use linkgit:git-name-rev\[1\], which will give the commit a name based on any tag it finds pointing to one of the commit’s descendants:

    $ git name-rev --tags e05db0fd
    e05db0fd tags/v1.5.0-rc1^0~23

The linkgit:git-describe\[1\] command does the opposite, naming the revision using a tag on which the given commit is based:

    $ git describe e05db0fd
    v1.5.0-rc0-260-ge05db0f

but that may sometimes help you guess which tags might come after the given commit.

If you just want to verify whether a given tagged version contains a given commit, you could use linkgit:git-merge-base\[1\]:

    $ git merge-base e05db0fd v1.5.0-rc1
    e05db0fd4f31dde7005f075a84f96b360d05984b

The merge-base command finds a common ancestor of the given commits, and always returns one or the other in the case where one is a descendant of the other; so the above output shows that e05db0fd actually is an ancestor of v1.5.0-rc1.

Alternatively, note that

    $ git log v1.5.0-rc1..e05db0fd

will produce empty output if and only if v1.5.0-rc1 includes e05db0fd, because it outputs only commits that are not reachable from v1.5.0-rc1.

As yet another alternative, the linkgit:git-show-branch\[1\] command lists the commits reachable from its arguments with a display on the left-hand side that indicates which arguments that commit is reachable from. So, if you run something like

    $ git show-branch e05db0fd v1.5.0-rc0 v1.5.0-rc1 v1.5.0-rc2
    ! [e05db0fd] Fix warnings in sha1_file.c - use C99 printf format if
    available
     ! [v1.5.0-rc0] GIT v1.5.0 preview
      ! [v1.5.0-rc1] GIT v1.5.0-rc1
       ! [v1.5.0-rc2] GIT v1.5.0-rc2
    ...

then a line like

    + ++ [e05db0fd] Fix warnings in sha1_file.c - use C99 printf format if
    available

shows that e05db0fd is reachable from itself, from v1.5.0-rc1, and from v1.5.0-rc2, and not from v1.5.0-rc0.

### Showing commits unique to a given branch

Suppose you would like to see all the commits reachable from the branch head named `master` but not from any other head in your repository.

We can list all the heads in this repository with linkgit:git-show-ref\[1\]:

    $ git show-ref --heads
    bf62196b5e363d73353a9dcf094c59595f3153b7 refs/heads/core-tutorial
    db768d5504c1bb46f63ee9d6e1772bd047e05bf9 refs/heads/maint
    a07157ac624b2524a059a3414e99f6f44bebc1e7 refs/heads/master
    24dbc180ea14dc1aebe09f14c8ecf32010690627 refs/heads/tutorial-2
    1e87486ae06626c2f31eaa63d26fc0fd646c8af2 refs/heads/tutorial-fixes

We can get just the branch-head names, and remove `master`, with the help of the standard utilities cut and grep:

    $ git show-ref --heads | cut -d' ' -f2 | grep -v '^refs/heads/master'
    refs/heads/core-tutorial
    refs/heads/maint
    refs/heads/tutorial-2
    refs/heads/tutorial-fixes

And then we can ask to see all the commits reachable from master but not from these other heads:

    $ gitk master --not $( git show-ref --heads | cut -d' ' -f2 |
                                    grep -v '^refs/heads/master' )

Obviously, endless variations are possible; for example, to see all commits reachable from some head but not from any tag in the repository:

    $ gitk $( git show-ref --heads ) --not  $( git show-ref --tags )

(See linkgit:gitrevisions\[7\] for explanations of commit-selecting syntax such as `--not`.)

### Creating a changelog and tarball for a software release

The linkgit:git-archive\[1\] command can create a tar or zip archive from any version of a project; for example:

    $ git archive -o latest.tar.gz --prefix=project/ HEAD

will use HEAD to produce a gzipped tar archive in which each filename is preceded by `project/`. The output file format is inferred from the output file extension if possible, see linkgit:git-archive\[1\] for details.

Versions of Git older than 1.7.7 don’t know about the `tar.gz` format, you’ll need to use gzip explicitly:

    $ git archive --format=tar --prefix=project/ HEAD | gzip >latest.tar.gz

If you’re releasing a new version of a software project, you may want to simultaneously make a changelog to include in the release announcement.

Linus Torvalds, for example, makes new kernel releases by tagging them, then running:

    $ release-script 2.6.12 2.6.13-rc6 2.6.13-rc7

where release-script is a shell script that looks like:

    #!/bin/sh
    stable="$1"
    last="$2"
    new="$3"
    echo "# git tag v$new"
    echo "git archive --prefix=linux-$new/ v$new | gzip -9 > ../linux-$new.tar.gz"
    echo "git diff v$stable v$new | gzip -9 > ../patch-$new.gz"
    echo "git log --no-merges v$new ^v$last > ../ChangeLog-$new"
    echo "git shortlog --no-merges v$new ^v$last > ../ShortLog"
    echo "git diff --stat --summary -M v$last v$new > ../diffstat-$new"

and then he just cut-and-pastes the output commands after verifying that they look OK.

### Finding commits referencing a file with given content

Somebody hands you a copy of a file, and asks which commits modified a file such that it contained the given content either before or after the commit. You can find out with this:

    $ git log --raw --abbrev=40 --pretty=oneline |
            grep -B 1 `git hash-object filename`

Figuring out why this works is left as an exercise to the (advanced) student. The linkgit:git-log\[1\], linkgit:git-diff-tree\[1\], and linkgit:git-hash-object\[1\] man pages may prove helpful.
