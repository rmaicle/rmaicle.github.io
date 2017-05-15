---
title: Git Quick Reference
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/appendix_a
group: git-2.13.0
subgroup: user_manual
---

This is a quick summary of the major commands; the previous chapters explain how these work in more detail.

## Creating a new repository

From a tarball:

    $ tar xzf project.tar.gz
    $ cd project
    $ git init
    Initialized empty Git repository in .git/
    $ git add .
    $ git commit

From a remote repository:

    $ git clone git://example.com/pub/project.git
    $ cd project

## Managing branches

    $ git branch         # list all local branches in this repo
    $ git checkout test  # switch working directory to branch "test"
    $ git branch new     # create branch "new" starting at current HEAD
    $ git branch -d new  # delete branch "new"

Instead of basing a new branch on current HEAD (the default), use:

    $ git branch new test    # branch named "test"
    $ git branch new v2.6.15 # tag named v2.6.15
    $ git branch new HEAD^   # commit before the most recent
    $ git branch new HEAD^^  # commit before that
    $ git branch new test~10 # ten commits before tip of branch "test"

Create and switch to a new branch at the same time:

    $ git checkout -b new v2.6.15

Update and examine branches from the repository you cloned from:

    $ git fetch             # update
    $ git branch -r         # list
      origin/master
      origin/next
      ...
    $ git checkout -b masterwork origin/master

Fetch a branch from a different repository, and give it a new name in your repository:

    $ git fetch git://example.com/project.git theirbranch:mybranch
    $ git fetch git://example.com/project.git v2.6.15:mybranch

Keep a list of repositories you work with regularly:

    $ git remote add example git://example.com/project.git
    $ git remote                    # list remote repositories
    example
    origin
    $ git remote show example       # get details
    * remote example
      URL: git://example.com/project.git
      Tracked remote branches
        master
        next
        ...
    $ git fetch example             # update branches from example
    $ git branch -r                 # list all remote branches

## Exploring history

    $ gitk                      # visualize and browse history
    $ git log                   # list all commits
    $ git log src/              # ...modifying src/
    $ git log v2.6.15..v2.6.16  # ...in v2.6.16, not in v2.6.15
    $ git log master..test      # ...in branch test, not in branch master
    $ git log test..master      # ...in branch master, but not in test
    $ git log test...master     # ...in one branch, not in both
    $ git log -S'foo()'         # ...where difference contain "foo()"
    $ git log --since="2 weeks ago"
    $ git log -p                # show patches as well
    $ git show                  # most recent commit
    $ git diff v2.6.15..v2.6.16 # diff between two tagged versions
    $ git diff v2.6.15..HEAD    # diff with current head
    $ git grep "foo()"          # search working directory for "foo()"
    $ git grep v2.6.15 "foo()"  # search old tree for "foo()"
    $ git show v2.6.15:a.txt    # look at old version of a.txt

Search for regressions:

    $ git bisect start
    $ git bisect bad                # current version is bad
    $ git bisect good v2.6.13-rc2   # last known good revision
    Bisecting: 675 revisions left to test after this
                                    # test here, then:
    $ git bisect good               # if this revision is good, or
    $ git bisect bad                # if this revision is bad.
                                    # repeat until done.

## Making changes

Make sure Git knows who to blame:

    $ cat >>~/.gitconfig <<\EOF
    [user]
            name = Your Name Comes Here
            email = you@yourdomain.example.com
    EOF

Select file contents to include in the next commit, then make the commit:

    $ git add a.txt    # updated file
    $ git add b.txt    # new file
    $ git rm c.txt     # old file
    $ git commit

Or, prepare and create the commit in one step:

    $ git commit d.txt # use latest content only of d.txt
    $ git commit -a    # use latest content of all tracked files

## Merging

    $ git merge test   # merge branch "test" into the current branch
    $ git pull git://example.com/project.git master
                       # fetch and merge in remote branch
    $ git pull . test  # equivalent to git merge test

## Sharing your changes

Importing or exporting patches:

    $ git format-patch origin..HEAD # format a patch for each commit
                                    # in HEAD but not in origin
    $ git am mbox # import patches from the mailbox "mbox"

Fetch a branch in a different Git repository, then merge into the current branch:

    $ git pull git://example.com/project.git theirbranch

Store the fetched branch into a local branch before merging into the current branch:

    $ git pull git://example.com/project.git theirbranch:mybranch

After creating commits on a local branch, update the remote branch with your commits:

    $ git push ssh://example.com/project.git mybranch:theirbranch

When remote and local branch are both named "test":

    $ git push ssh://example.com/project.git test

Shortcut version for a frequently used remote repository:

    $ git remote add example ssh://example.com/project.git
    $ git push example test

## Repository maintenance

Check for corruption:

    $ git fsck

Recompress, remove unused cruft:

    $ git gc
