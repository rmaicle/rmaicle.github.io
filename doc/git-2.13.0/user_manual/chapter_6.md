---
title: Advanced Branch Management
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_6
group: git-2.13.0
subgroup: user_manual
---

## Fetching individual branches

Instead of using linkgit:git-remote\[1\], you can also choose just to update one branch at a time, and to store it locally under an arbitrary name:

    $ git fetch origin todo:my-todo-work

The first argument, `origin`, just tells Git to fetch from the repository you originally cloned from. The second argument tells Git to fetch the branch named `todo` from the remote repository, and to store it locally under the name `refs/heads/my-todo-work`.

You can also fetch branches from other repositories; so

    $ git fetch git://example.com/proj.git master:example-master

will create a new branch named `example-master` and store in it the branch named `master` from the repository at the given URL. If you already have a branch named example-master, it will attempt to [fast-forward](#fast-forwards) to the commit given by example.com’s master branch. In more detail:

## `git fetch` and fast-forwards

In the previous example, when updating an existing branch, `git fetch` checks to make sure that the most recent commit on the remote branch is a descendant of the most recent commit on your copy of the branch before updating your copy of the branch to point at the new commit. Git calls this process a [fast-forward](#fast-forwards).

A fast-forward looks something like this:

     o--o--o--o <-- old head of the branch
               \
                o--o--o <-- new head of the branch

In some cases it is possible that the new head will **not** actually be a descendant of the old head. For example, the developer may have realized she made a serious mistake, and decided to backtrack, resulting in a situation like:

     o--o--o--o--a--b <-- old head of the branch
               \
                o--o--o <-- new head of the branch

In this case, `git fetch` will fail, and print out a warning.

In that case, you can still force Git to update to the new head, as described in the following section. However, note that in the situation above this may mean losing the commits labeled `a` and `b`, unless you’ve already created a reference of your own pointing to them.

## Forcing `git fetch` to do non-fast-forward updates

If git fetch fails because the new head of a branch is not a descendant of the old head, you may force the update with:

    $ git fetch git://example.com/proj.git +master:refs/remotes/example/master

Note the addition of the `+` sign. Alternatively, you can use the `-f` flag to force updates of all the fetched branches, as in:

    $ git fetch -f origin

Be aware that commits that the old version of example/master pointed at may be lost, as we saw in the previous section.

## Configuring remote-tracking branches

We saw above that `origin` is just a shortcut to refer to the repository that you originally cloned from. This information is stored in Git configuration variables, which you can see using linkgit:git-config\[1\]:

    $ git config -l
    core.repositoryformatversion=0
    core.filemode=true
    core.logallrefupdates=true
    remote.origin.url=git://git.kernel.org/pub/scm/git/git.git
    remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
    branch.master.remote=origin
    branch.master.merge=refs/heads/master

If there are other repositories that you also use frequently, you can create similar configuration options to save typing; for example,

    $ git remote add example git://example.com/proj.git

adds the following to `.git/config`:

    [remote "example"]
            url = git://example.com/proj.git
            fetch = +refs/heads/*:refs/remotes/example/*

Also note that the above configuration can be performed by directly editing the file `.git/config` instead of using linkgit:git-remote\[1\].

After configuring the remote, the following three commands will do the same thing:

    $ git fetch git://example.com/proj.git +refs/heads/*:refs/remotes/example/*
    $ git fetch example +refs/heads/*:refs/remotes/example/*
    $ git fetch example

See linkgit:git-config\[1\] for more details on the configuration options mentioned above and linkgit:git-fetch\[1\] for more details on the refspec syntax.

Git is built on a small number of simple but powerful ideas. While it is possible to get things done without understanding them, you will find Git much more intuitive if you do.

We start with the most important, the [object database](#def_object_database) and the [index](#def_index).
