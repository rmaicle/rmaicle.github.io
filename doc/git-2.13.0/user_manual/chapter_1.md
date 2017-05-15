---
title: Repositories and Branches
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_1
group: git-2.13.0
subgroup: user_manual
---

## How to get a Git repository

It will be useful to have a Git repository to experiment with as you read this manual.

The best way to get one is by using the linkgit:git-clone\[1\] command to download a copy of an existing repository. If you don’t already have a project in mind, here are some interesting examples:

            # Git itself (approx. 40MB download):
    $ git clone git://git.kernel.org/pub/scm/git/git.git
            # the Linux kernel (approx. 640MB download):
    $ git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git

The initial clone may be time-consuming for a large project, but you will only need to clone once.

The clone command creates a new directory named after the project (`git` or `linux` in the examples above). After you cd into this directory, you will see that it contains a copy of the project files, called the [working tree](#def_working_tree), together with a special top-level directory named `.git`, which contains all the information about the history of the project.

## How to check out a different version of a project

Git is best thought of as a tool for storing the history of a collection of files. It stores the history as a compressed collection of interrelated snapshots of the project’s contents. In Git each such version is called a [commit](#def_commit).

Those snapshots aren’t necessarily all arranged in a single line from oldest to newest; instead, work may simultaneously proceed along parallel lines of development, called [branches](#def_branch), which may merge and diverge.

A single Git repository can track development on multiple branches. It does this by keeping a list of [heads](#def_head) which reference the latest commit on each branch; the linkgit:git-branch\[1\] command shows you the list of branch heads:

    $ git branch
    * master

A freshly cloned repository contains a single branch head, by default named "master", with the working directory initialized to the state of the project referred to by that branch head.

Most projects also use [tags](#def_tag). Tags, like heads, are references into the project’s history, and can be listed using the linkgit:git-tag\[1\] command:

    $ git tag -l
    v2.6.11
    v2.6.11-tree
    v2.6.12
    v2.6.12-rc2
    v2.6.12-rc3
    v2.6.12-rc4
    v2.6.12-rc5
    v2.6.12-rc6
    v2.6.13
    ...

Tags are expected to always point at the same version of a project, while heads are expected to advance as development progresses.

Create a new branch head pointing to one of these versions and check it out using linkgit:git-checkout\[1\]:

    $ git checkout -b new v2.6.13

The working directory then reflects the contents that the project had when it was tagged v2.6.13, and linkgit:git-branch\[1\] shows two branches, with an asterisk marking the currently checked-out branch:

    $ git branch
      master
    * new

If you decide that you’d rather see version 2.6.17, you can modify the current branch to point at v2.6.17 instead, with

    $ git reset --hard v2.6.17

Note that if the current branch head was your only reference to a particular point in history, then resetting that branch may leave you with no way to find the history it used to point to; so use this command carefully.

## Understanding History: Commits

Every change in the history of a project is represented by a commit. The linkgit:git-show\[1\] command shows the most recent commit on the current branch:

    $ git show
    commit 17cf781661e6d38f737f15f53ab552f1e95960d7
    Author: Linus Torvalds <torvalds@ppc970.osdl.org.(none)>
    Date:   Tue Apr 19 14:11:06 2005 -0700

        Remove duplicate getenv(DB_ENVIRONMENT) call

        Noted by Tony Luck.

    diff --git a/init-db.c b/init-db.c
    index 65898fa..b002dc6 100644
    --- a/init-db.c
    +++ b/init-db.c
    @@ -7,7 +7,7 @@

     int main(int argc, char **argv)
     {
    -       char *sha1_dir = getenv(DB_ENVIRONMENT), *path;
    +       char *sha1_dir, *path;
            int len, i;

            if (mkdir(".git", 0755) < 0) {

As you can see, a commit shows who made the latest change, what they did, and why.

Every commit has a 40-hexdigit id, sometimes called the "object name" or the "SHA-1 id", shown on the first line of the `git show` output. You can usually refer to a commit by a shorter name, such as a tag or a branch name, but this longer name can also be useful. Most importantly, it is a globally unique name for this commit: so if you tell somebody else the object name (for example in email), then you are guaranteed that name will refer to the same commit in their repository that it does in yours (assuming their repository has that commit at all). Since the object name is computed as a hash over the contents of the commit, you are guaranteed that the commit can never change without its name also changing.

In fact, in [Chapter 7, Git Concepts] we shall see that everything stored in Git history, including file data and directory contents, is stored in an object with a name that is a hash of its contents.

### Understanding history: commits, parents, and reachability

Every commit (except the very first commit in a project) also has a parent commit which shows what happened before this commit. Following the chain of parents will eventually take you back to the beginning of the project.

However, the commits do not form a simple list; Git allows lines of development to diverge and then reconverge, and the point where two lines of development reconverge is called a "merge". The commit representing a merge can therefore have more than one parent, with each parent representing the most recent commit on one of the lines of development leading to that point.

The best way to see how this works is using the linkgit:gitk\[1\] command; running gitk now on a Git repository and looking for merge commits will help understand how Git organizes history.

In the following, we say that commit X is "reachable" from commit Y if commit X is an ancestor of commit Y. Equivalently, you could say that Y is a descendant of X, or that there is a chain of parents leading from commit Y to commit X.

### Understanding history: History diagrams

We will sometimes represent Git history using diagrams like the one below. Commits are shown as "o", and the links between them with lines drawn with - / and \\. Time goes left to right:

             o--o--o <-- Branch A
            /
     o--o--o <-- master
            \
             o--o--o <-- Branch B

If we need to talk about a particular commit, the character "o" may be replaced with another letter or number.

### Understanding history: What is a branch?

When we need to be precise, we will use the word "branch" to mean a line of development, and "branch head" (or just "head") to mean a reference to the most recent commit on a branch. In the example above, the branch head named "A" is a pointer to one particular commit, but we refer to the line of three commits leading up to that point as all being part of "branch A".

However, when no confusion will result, we often just use the term "branch" both for branches and for branch heads.

## Manipulating branches

Creating, deleting, and modifying branches is quick and easy; here’s a summary of the commands:

`git branch`

:   list all branches.

`git branch <branch>`

:   create a new branch named `<branch>`, referencing the same point in history as the current branch.

`git branch <branch> <start-point>`

:   create a new branch named `<branch>`, referencing `<start-point>`, which may be specified any way you like, including using a branch name or a tag name.

`git branch -d <branch>`

:   delete the branch `<branch>`; if the branch is not fully merged in its upstream branch or contained in the current branch, this command will fail with a warning.

`git branch -D <branch>`

:   delete the branch `<branch>` irrespective of its merged status.

`git checkout <branch>`

:   make the current branch `<branch>`, updating the working directory to reflect the version referenced by `<branch>`.

`git checkout -b <new> <start-point>`

:   create a new branch `<new>` referencing `<start-point>`, and check it out.

The special symbol "HEAD" can always be used to refer to the current branch. In fact, Git uses a file named `HEAD` in the `.git` directory to remember which branch is current:

    $ cat .git/HEAD
    ref: refs/heads/master

## Examining an old version without creating a new branch

The `git checkout` command normally expects a branch head, but will also accept an arbitrary commit; for example, you can check out the commit referenced by a tag:

    $ git checkout v2.6.17
    Note: checking out 'v2.6.17'.

    You are in 'detached HEAD' state. You can look around, make experimental
    changes and commit them, and you can discard any commits you make in this
    state without impacting any branches by performing another checkout.

    If you want to create a new branch to retain commits you create, you may
    do so (now or later) by using -b with the checkout command again. Example:

      git checkout -b new_branch_name

    HEAD is now at 427abfa... Linux v2.6.17

The HEAD then refers to the SHA-1 of the commit instead of to a branch, and git branch shows that you are no longer on a branch:

    $ cat .git/HEAD
    427abfa28afedffadfca9dd8b067eb6d36bac53f
    $ git branch
    * (detached from v2.6.17)
      master

In this case we say that the HEAD is "detached".

This is an easy way to check out a particular version without having to make up a name for the new branch. You can still create a new branch (or tag) for this version later if you decide to.

## Examining branches from a remote repository

The "master" branch that was created at the time you cloned is a copy of the HEAD in the repository that you cloned from. That repository may also have had other branches, though, and your local repository keeps branches which track each of those remote branches, called remote-tracking branches, which you can view using the `-r` option to linkgit:git-branch\[1\]:

    $ git branch -r
      origin/HEAD
      origin/html
      origin/maint
      origin/man
      origin/master
      origin/next
      origin/pu
      origin/todo

In this example, "origin" is called a remote repository, or "remote" for short. The branches of this repository are called "remote branches" from our point of view. The remote-tracking branches listed above were created based on the remote branches at clone time and will be updated by `git fetch` (hence `git pull`) and `git push`. See [section\_title](#Updating-a-repository-With-git-fetch) for details.

You might want to build on one of these remote-tracking branches on a branch of your own, just as you would for a tag:

    $ git checkout -b my-todo-copy origin/todo

You can also check out `origin/todo` directly to examine it or write a one-off patch. See [detached head](#detached-head).

Note that the name "origin" is just the name that Git uses by default to refer to the repository that you cloned from.

## Naming branches, tags, and other references

Branches, remote-tracking branches, and tags are all references to commits. All references are named with a slash-separated path name starting with `refs`; the names we’ve been using so far are actually shorthand:

-   The branch `test` is short for `refs/heads/test`.

-   The tag `v2.6.18` is short for `refs/tags/v2.6.18`.

-   `origin/master` is short for `refs/remotes/origin/master`.

The full name is occasionally useful if, for example, there ever exists a tag and a branch with the same name.

(Newly created refs are actually stored in the `.git/refs` directory, under the path given by their name. However, for efficiency reasons they may also be packed together in a single file; see linkgit:git-pack-refs\[1\]).

As another useful shortcut, the "HEAD" of a repository can be referred to just using the name of that repository. So, for example, "origin" is usually a shortcut for the HEAD branch in the repository "origin".

For the complete list of paths which Git checks for references, and the order it uses to decide which to choose when there are multiple references with the same shorthand name, see the "SPECIFYING REVISIONS" section of linkgit:gitrevisions\[7\].

## Updating a repository with git fetch

After you clone a repository and commit a few changes of your own, you may wish to check the original repository for updates.

The `git-fetch` command, with no arguments, will update all of the remote-tracking branches to the latest version found in the original repository. It will not touch any of your own branches—not even the "master" branch that was created for you on clone.

## Fetching branches from other repositories

You can also track branches from repositories other than the one you cloned from, using linkgit:git-remote\[1\]:

    $ git remote add staging git://git.kernel.org/.../gregkh/staging.git
    $ git fetch staging
    ...
    From git://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging
     * [new branch]      master     -> staging/master
     * [new branch]      staging-linus -> staging/staging-linus
     * [new branch]      staging-next -> staging/staging-next

New remote-tracking branches will be stored under the shorthand name that you gave `git remote add`, in this case `staging`:

    $ git branch -r
      origin/HEAD -> origin/master
      origin/master
      staging/master
      staging/staging-linus
      staging/staging-next

If you run `git fetch <remote>` later, the remote-tracking branches for the named `<remote>` will be updated.

If you examine the file `.git/config`, you will see that Git has added a new stanza:

    $ cat .git/config
    ...
    [remote "staging"]
            url = git://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git
            fetch = +refs/heads/*:refs/remotes/staging/*
    ...

This is what causes Git to track the remote’s branches; you may modify or delete these configuration options by editing `.git/config` with a text editor. (See the "CONFIGURATION FILE" section of linkgit:git-config\[1\] for details.)

Git is best thought of as a tool for storing the history of a collection of files. It does this by storing compressed snapshots of the contents of a file hierarchy, together with "commits" which show the relationships between these snapshots.

Git provides extremely flexible and fast tools for exploring the history of a project.

We start with one specialized tool that is useful for finding the commit that introduced a bug into a project.

[Chapter 7, Git Concepts]: /doc/git-2.13.0/user_manual/chapter_7