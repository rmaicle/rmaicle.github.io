---
title: Git Concepts
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_7
group: git-2.13.0
subgroup: user_manual
---

## The Object Database

We already saw in [section\_title](#understanding-commits) that all commits are stored under a 40-digit "object name". In fact, all the information needed to represent the history of a project is stored in objects with such names. In each case the name is calculated by taking the SHA-1 hash of the contents of the object. The SHA-1 hash is a cryptographic hash function. What that means to us is that it is impossible to find two different objects with the same name. This has a number of advantages; among others:

-   Git can quickly determine whether two objects are identical or not, just by comparing names.

-   Since object names are computed the same way in every repository, the same content stored in two repositories will always be stored under the same name.

-   Git can detect errors when it reads an object, by checking that the object’s name is still the SHA-1 hash of its contents.

(See [section\_title](#object-details) for the details of the object formatting and SHA-1 calculation.)

There are four different types of objects: "blob", "tree", "commit", and "tag".

-   A ["blob" object](#def_blob_object) is used to store file data.

-   A ["tree" object](#def_tree_object) ties one or more "blob" objects into a directory structure. In addition, a tree object can refer to other tree objects, thus creating a directory hierarchy.

-   A ["commit" object](#def_commit_object) ties such directory hierarchies together into a [directed acyclic graph](#def_DAG) of revisions—each commit contains the object name of exactly one tree designating the directory hierarchy at the time of the commit. In addition, a commit refers to "parent" commit objects that describe the history of how we arrived at that directory hierarchy.

-   A ["tag" object](#def_tag_object) symbolically identifies and can be used to sign other objects. It contains the object name and type of another object, a symbolic name (of course!) and, optionally, a signature.

The object types in some more detail:

### Commit Object

The "commit" object links a physical state of a tree with a description of how we got there and why. Use the `--pretty=raw` option to linkgit:git-show\[1\] or linkgit:git-log\[1\] to examine your favorite commit:

    $ git show -s --pretty=raw 2be7fcb476
    commit 2be7fcb4764f2dbcee52635b91fedb1b3dcf7ab4
    tree fb3a8bdd0ceddd019615af4d57a53f43d8cee2bf
    parent 257a84d9d02e90447b149af58b271c19405edb6a
    author Dave Watson <dwatson@mimvista.com> 1187576872 -0400
    committer Junio C Hamano <gitster@pobox.com> 1187591163 -0700

        Fix misspelling of 'suppress' in docs

        Signed-off-by: Junio C Hamano <gitster@pobox.com>

As you can see, a commit is defined by:

-   a tree: The SHA-1 name of a tree object (as defined below), representing the contents of a directory at a certain point in time.

-   parent(s): The SHA-1 name(s) of some number of commits which represent the immediately previous step(s) in the history of the project. The example above has one parent; merge commits may have more than one. A commit with no parents is called a "root" commit, and represents the initial revision of a project. Each project must have at least one root. A project can also have multiple roots, though that isn’t common (or necessarily a good idea).

-   an author: The name of the person responsible for this change, together with its date.

-   a committer: The name of the person who actually created the commit, with the date it was done. This may be different from the author, for example, if the author was someone who wrote a patch and emailed it to the person who used it to create the commit.

-   a comment describing this commit.

Note that a commit does not itself contain any information about what actually changed; all changes are calculated by comparing the contents of the tree referred to by this commit with the trees associated with its parents. In particular, Git does not attempt to record file renames explicitly, though it can identify cases where the existence of the same file data at changing paths suggests a rename. (See, for example, the `-M` option to linkgit:git-diff\[1\]).

A commit is usually created by linkgit:git-commit\[1\], which creates a commit whose parent is normally the current HEAD, and whose tree is taken from the content currently stored in the index.

### Tree Object

The ever-versatile linkgit:git-show\[1\] command can also be used to examine tree objects, but linkgit:git-ls-tree\[1\] will give you more details:

    $ git ls-tree fb3a8bdd0ce
    100644 blob 63c918c667fa005ff12ad89437f2fdc80926e21c    .gitignore
    100644 blob 5529b198e8d14decbe4ad99db3f7fb632de0439d    .mailmap
    100644 blob 6ff87c4664981e4397625791c8ea3bbb5f2279a3    COPYING
    040000 tree 2fb783e477100ce076f6bf57e4a6f026013dc745    Documentation
    100755 blob 3c0032cec592a765692234f1cba47dfdcc3a9200    GIT-VERSION-GEN
    100644 blob 289b046a443c0647624607d471289b2c7dcd470b    INSTALL
    100644 blob 4eb463797adc693dc168b926b6932ff53f17d0b1    Makefile
    100644 blob 548142c327a6790ff8821d67c2ee1eff7a656b52    README
    ...

As you can see, a tree object contains a list of entries, each with a mode, object type, SHA-1 name, and name, sorted by name. It represents the contents of a single directory tree.

The object type may be a blob, representing the contents of a file, or another tree, representing the contents of a subdirectory. Since trees and blobs, like all other objects, are named by the SHA-1 hash of their contents, two trees have the same SHA-1 name if and only if their contents (including, recursively, the contents of all subdirectories) are identical. This allows Git to quickly determine the differences between two related tree objects, since it can ignore any entries with identical object names.

(Note: in the presence of submodules, trees may also have commits as entries. See [???](#submodules) for documentation.)

Note that the files all have mode 644 or 755: Git actually only pays attention to the executable bit.

### Blob Object

You can use linkgit:git-show\[1\] to examine the contents of a blob; take, for example, the blob in the entry for `COPYING` from the tree above:

    $ git show 6ff87c4664

     Note that the only valid version of the GPL as far as this project
     is concerned is _this_ particular version of the license (ie v2, not
     v2.2 or v3.x or whatever), unless explicitly otherwise stated.
    ...

A "blob" object is nothing but a binary blob of data. It doesn’t refer to anything else or have attributes of any kind.

Since the blob is entirely defined by its data, if two files in a directory tree (or in multiple different versions of the repository) have the same contents, they will share the same blob object. The object is totally independent of its location in the directory tree, and renaming a file does not change the object that file is associated with.

Note that any tree or blob object can be examined using linkgit:git-show\[1\] with the &lt;revision&gt;:&lt;path&gt; syntax. This can sometimes be useful for browsing the contents of a tree that is not currently checked out.

### Trust

If you receive the SHA-1 name of a blob from one source, and its contents from another (possibly untrusted) source, you can still trust that those contents are correct as long as the SHA-1 name agrees. This is because the SHA-1 is designed so that it is infeasible to find different contents that produce the same hash.

Similarly, you need only trust the SHA-1 name of a top-level tree object to trust the contents of the entire directory that it refers to, and if you receive the SHA-1 name of a commit from a trusted source, then you can easily verify the entire history of commits reachable through parents of that commit, and all of those contents of the trees referred to by those commits.

So to introduce some real trust in the system, the only thing you need to do is to digitally sign just *one* special note, which includes the name of a top-level commit. Your digital signature shows others that you trust that commit, and the immutability of the history of commits tells others that they can trust the whole history.

In other words, you can easily validate a whole archive by just sending out a single email that tells the people the name (SHA-1 hash) of the top commit, and digitally sign that email using something like GPG/PGP.

To assist in this, Git also provides the tag object...

### Tag Object

A tag object contains an object, object type, tag name, the name of the person ("tagger") who created the tag, and a message, which may contain a signature, as can be seen using linkgit:git-cat-file\[1\]:

    $ git cat-file tag v1.5.0
    object 437b1b20df4b356c9342dac8d38849f24ef44f27
    type commit
    tag v1.5.0
    tagger Junio C Hamano <junkio@cox.net> 1171411200 +0000

    GIT 1.5.0
    -----BEGIN PGP SIGNATURE-----
    Version: GnuPG v1.4.6 (GNU/Linux)

    iD8DBQBF0lGqwMbZpPMRm5oRAuRiAJ9ohBLd7s2kqjkKlq1qqC57SbnmzQCdG4ui
    nLE/L9aUXdWeTFPron96DLA=
    =2E+0
    -----END PGP SIGNATURE-----

See the linkgit:git-tag\[1\] command to learn how to create and verify tag objects. (Note that linkgit:git-tag\[1\] can also be used to create "lightweight tags", which are not tag objects at all, but just simple references whose names begin with `refs/tags/`).

### How Git stores objects efficiently: pack files

Newly created objects are initially created in a file named after the object’s SHA-1 hash (stored in `.git/objects`).

Unfortunately this system becomes inefficient once a project has a lot of objects. Try this on an old project:

    $ git count-objects
    6930 objects, 47620 kilobytes

The first number is the number of objects which are kept in individual files. The second is the amount of space taken up by those "loose" objects.

You can save space and make Git faster by moving these loose objects in to a "pack file", which stores a group of objects in an efficient compressed format; the details of how pack files are formatted can be found in [pack format](technical/pack-format.html).

To put the loose objects into a pack, just run git repack:

    $ git repack
    Counting objects: 6020, done.
    Delta compression using up to 4 threads.
    Compressing objects: 100% (6020/6020), done.
    Writing objects: 100% (6020/6020), done.
    Total 6020 (delta 4070), reused 0 (delta 0)

This creates a single "pack file" in .git/objects/pack/ containing all currently unpacked objects. You can then run

    $ git prune

to remove any of the "loose" objects that are now contained in the pack. This will also remove any unreferenced objects (which may be created when, for example, you use `git reset` to remove a commit). You can verify that the loose objects are gone by looking at the `.git/objects` directory or by running

    $ git count-objects
    0 objects, 0 kilobytes

Although the object files are gone, any commands that refer to those objects will work exactly as they did before.

The linkgit:git-gc\[1\] command performs packing, pruning, and more for you, so is normally the only high-level command you need.

### Dangling objects

The linkgit:git-fsck\[1\] command will sometimes complain about dangling objects. They are not a problem.

The most common cause of dangling objects is that you’ve rebased a branch, or you have pulled from somebody else who rebased a branch—see [???](#cleaning-up-history). In that case, the old head of the original branch still exists, as does everything it pointed to. The branch pointer itself just doesn’t, since you replaced it with another one.

There are also other situations that cause dangling objects. For example, a "dangling blob" may arise because you did a `git add` of a file, but then, before you actually committed it and made it part of the bigger picture, you changed something else in that file and committed that **updated** thing—the old state that you added originally ends up not being pointed to by any commit or tree, so it’s now a dangling blob object.

Similarly, when the "recursive" merge strategy runs, and finds that there are criss-cross merges and thus more than one merge base (which is fairly unusual, but it does happen), it will generate one temporary midway tree (or possibly even more, if you had lots of criss-crossing merges and more than two merge bases) as a temporary internal merge base, and again, those are real objects, but the end result will not end up pointing to them, so they end up "dangling" in your repository.

Generally, dangling objects aren’t anything to worry about. They can even be very useful: if you screw something up, the dangling objects can be how you recover your old tree (say, you did a rebase, and realized that you really didn’t want to—you can look at what dangling objects you have, and decide to reset your head to some old dangling state).

For commits, you can just use:

    $ gitk <dangling-commit-sha-goes-here> --not --all

This asks for all the history reachable from the given commit but not from any branch, tag, or other reference. If you decide it’s something you want, you can always create a new reference to it, e.g.,

    $ git branch recovered-branch <dangling-commit-sha-goes-here>

For blobs and trees, you can’t do the same, but you can still examine them. You can just do

    $ git show <dangling-blob/tree-sha-goes-here>

to show what the contents of the blob were (or, for a tree, basically what the `ls` for that directory was), and that may give you some idea of what the operation was that left that dangling object.

Usually, dangling blobs and trees aren’t very interesting. They’re almost always the result of either being a half-way mergebase (the blob will often even have the conflict markers from a merge in it, if you have had conflicting merges that you fixed up by hand), or simply because you interrupted a `git fetch` with ^C or something like that, leaving *some* of the new objects in the object database, but just dangling and useless.

Anyway, once you are sure that you’re not interested in any dangling state, you can just prune all unreachable objects:

    $ git prune

and they’ll be gone. (You should only run `git prune` on a quiescent repository—it’s kind of like doing a filesystem fsck recovery: you don’t want to do that while the filesystem is mounted. `git prune` is designed not to cause any harm in such cases of concurrent accesses to a repository but you might receive confusing or scary messages.)

### Recovering from repository corruption

By design, Git treats data trusted to it with caution. However, even in the absence of bugs in Git itself, it is still possible that hardware or operating system errors could corrupt data.

The first defense against such problems is backups. You can back up a Git directory using clone, or just using cp, tar, or any other backup mechanism.

As a last resort, you can search for the corrupted objects and attempt to replace them by hand. Back up your repository before attempting this in case you corrupt things even more in the process.

We’ll assume that the problem is a single missing or corrupted blob, which is sometimes a solvable problem. (Recovering missing trees and especially commits is **much** harder).

Before starting, verify that there is corruption, and figure out where it is with linkgit:git-fsck\[1\]; this may be time-consuming.

Assume the output looks like this:

    $ git fsck --full --no-dangling
    broken link from    tree 2d9263c6d23595e7cb2a21e5ebbb53655278dff8
                  to    blob 4b9458b3786228369c63936db65827de3cc06200
    missing blob 4b9458b3786228369c63936db65827de3cc06200

Now you know that blob 4b9458b3 is missing, and that the tree 2d9263c6 points to it. If you could find just one copy of that missing blob object, possibly in some other repository, you could move it into `.git/objects/4b/9458b3...` and be done. Suppose you can’t. You can still examine the tree that pointed to it with linkgit:git-ls-tree\[1\], which might output something like:

    $ git ls-tree 2d9263c6d23595e7cb2a21e5ebbb53655278dff8
    100644 blob 8d14531846b95bfa3564b58ccfb7913a034323b8    .gitignore
    100644 blob ebf9bf84da0aab5ed944264a5db2a65fe3a3e883    .mailmap
    100644 blob ca442d313d86dc67e0a2e5d584b465bd382cbf5c    COPYING
    ...
    100644 blob 4b9458b3786228369c63936db65827de3cc06200    myfile
    ...

So now you know that the missing blob was the data for a file named `myfile`. And chances are you can also identify the directory—let’s say it’s in `somedirectory`. If you’re lucky the missing copy might be the same as the copy you have checked out in your working tree at `somedirectory/myfile`; you can test whether that’s right with linkgit:git-hash-object\[1\]:

    $ git hash-object -w somedirectory/myfile

which will create and store a blob object with the contents of somedirectory/myfile, and output the SHA-1 of that object. if you’re extremely lucky it might be 4b9458b3786228369c63936db65827de3cc06200, in which case you’ve guessed right, and the corruption is fixed!

Otherwise, you need more information. How do you tell which version of the file has been lost?

The easiest way to do this is with:

    $ git log --raw --all --full-history -- somedirectory/myfile

Because you’re asking for raw output, you’ll now get something like

    commit abc
    Author:
    Date:
    ...
    :100644 100644 4b9458b... newsha... M somedirectory/myfile


    commit xyz
    Author:
    Date:

    ...
    :100644 100644 oldsha... 4b9458b... M somedirectory/myfile

This tells you that the immediately following version of the file was "newsha", and that the immediately preceding version was "oldsha". You also know the commit messages that went with the change from oldsha to 4b9458b and with the change from 4b9458b to newsha.

If you’ve been committing small enough changes, you may now have a good shot at reconstructing the contents of the in-between state 4b9458b.

If you can do that, you can now recreate the missing object with

    $ git hash-object -w <recreated-file>

and your repository is good again!

(Btw, you could have ignored the `fsck`, and started with doing a

    $ git log --raw --all

and just looked for the sha of the missing object (4b9458b..) in that whole thing. It’s up to you—Git does **have** a lot of information, it is just missing one particular blob version.

## The index

The index is a binary file (generally kept in `.git/index`) containing a sorted list of path names, each with permissions and the SHA-1 of a blob object; linkgit:git-ls-files\[1\] can show you the contents of the index:

    $ git ls-files --stage
    100644 63c918c667fa005ff12ad89437f2fdc80926e21c 0       .gitignore
    100644 5529b198e8d14decbe4ad99db3f7fb632de0439d 0       .mailmap
    100644 6ff87c4664981e4397625791c8ea3bbb5f2279a3 0       COPYING
    100644 a37b2152bd26be2c2289e1f57a292534a51a93c7 0       Documentation/.gitignore
    100644 fbefe9a45b00a54b58d94d06eca48b03d40a50e0 0       Documentation/Makefile
    ...
    100644 2511aef8d89ab52be5ec6a5e46236b4b6bcd07ea 0       xdiff/xtypes.h
    100644 2ade97b2574a9f77e7ae4002a4e07a6a38e46d07 0       xdiff/xutils.c
    100644 d5de8292e05e7c36c4b68857c1cf9855e3d2f70a 0       xdiff/xutils.h

Note that in older documentation you may see the index called the "current directory cache" or just the "cache". It has three important properties:

1.  The index contains all the information necessary to generate a single (uniquely determined) tree object.

    For example, running linkgit:git-commit\[1\] generates this tree object from the index, stores it in the object database, and uses it as the tree object associated with the new commit.

2.  The index enables fast comparisons between the tree object it defines and the working tree.

    It does this by storing some additional data for each entry (such as the last modified time). This data is not displayed above, and is not stored in the created tree object, but it can be used to determine quickly which files in the working directory differ from what was stored in the index, and thus save Git from having to read all of the data from such files to look for changes.

3.  It can efficiently represent information about merge conflicts between different tree objects, allowing each pathname to be associated with sufficient information about the trees involved that you can create a three-way merge between them.

    We saw in [section\_title](#conflict-resolution) that during a merge the index can store multiple versions of a single file (called "stages"). The third column in the linkgit:git-ls-files\[1\] output above is the stage number, and will take on values other than 0 for files with merge conflicts.

The index is thus a sort of temporary staging area, which is filled with a tree which you are in the process of working on.

If you blow the index away entirely, you generally haven’t lost any information as long as you have the name of the tree that it described.

Large projects are often composed of smaller, self-contained modules. For example, an embedded Linux distribution’s source tree would include every piece of software in the distribution with some local modifications; a movie player might need to build against a specific, known-working version of a decompression library; several independent programs might all share the same build scripts.

With centralized revision control systems this is often accomplished by including every module in one single repository. Developers can check out all modules or only the modules they need to work with. They can even modify files across several modules in a single commit while moving things around or updating APIs and translations.

Git does not allow partial checkouts, so duplicating this approach in Git would force developers to keep a local copy of modules they are not interested in touching. Commits in an enormous checkout would be slower than you’d expect as Git would have to scan every directory for changes. If modules have a lot of local history, clones would take forever.

On the plus side, distributed revision control systems can much better integrate with external sources. In a centralized model, a single arbitrary snapshot of the external project is exported from its own revision control and then imported into the local revision control on a vendor branch. All the history is hidden. With distributed revision control you can clone the entire external history and much more easily follow development and re-merge local changes.

Git’s submodule support allows a repository to contain, as a subdirectory, a checkout of an external project. Submodules maintain their own identity; the submodule support just stores the submodule repository location and commit ID, so other developers who clone the containing project ("superproject") can easily clone all the submodules at the same revision. Partial checkouts of the superproject are possible: you can tell Git to clone none, some or all of the submodules.

The linkgit:git-submodule\[1\] command is available since Git 1.5.3. Users with Git 1.5.2 can look up the submodule commits in the repository and manually check them out; earlier versions won’t recognize the submodules at all.

To see how submodule support works, create four example repositories that can be used later as a submodule:

    $ mkdir ~/git
    $ cd ~/git
    $ for i in a b c d
    do
            mkdir $i
            cd $i
            git init
            echo "module $i" > $i.txt
            git add $i.txt
            git commit -m "Initial commit, submodule $i"
            cd ..
    done

Now create the superproject and add all the submodules:

    $ mkdir super
    $ cd super
    $ git init
    $ for i in a b c d
    do
            git submodule add ~/git/$i $i
    done

> **Note**
>
> Do not use local URLs here if you plan to publish your superproject!

See what files `git submodule` created:

    $ ls -a
    .  ..  .git  .gitmodules  a  b  c  d

The `git submodule add <repo> <path>` command does a couple of things:

-   It clones the submodule from `<repo>` to the given `<path>` under the current directory and by default checks out the master branch.

-   It adds the submodule’s clone path to the linkgit:gitmodules\[5\] file and adds this file to the index, ready to be committed.

-   It adds the submodule’s current commit ID to the index, ready to be committed.

Commit the superproject:

    $ git commit -m "Add submodules a, b, c and d."

Now clone the superproject:

    $ cd ..
    $ git clone super cloned
    $ cd cloned

The submodule directories are there, but they’re empty:

    $ ls -a a
    .  ..
    $ git submodule status
    -d266b9873ad50488163457f025db7cdd9683d88b a
    -e81d457da15309b4fef4249aba9b50187999670d b
    -c1536a972b9affea0f16e0680ba87332dc059146 c
    -d96249ff5d57de5de093e6baff9e0aafa5276a74 d

> **Note**
>
> The commit object names shown above would be different for you, but they should match the HEAD commit object names of your repositories. You can check it by running `git ls-remote ../a`.

Pulling down the submodules is a two-step process. First run `git submodule
init` to add the submodule repository URLs to `.git/config`:

    $ git submodule init

Now use `git submodule update` to clone the repositories and check out the commits specified in the superproject:

    $ git submodule update
    $ cd a
    $ ls -a
    .  ..  .git  a.txt

One major difference between `git submodule update` and `git submodule add` is that `git submodule update` checks out a specific commit, rather than the tip of a branch. It’s like checking out a tag: the head is detached, so you’re not working on a branch.

    $ git branch
    * (detached from d266b98)
      master

If you want to make a change within a submodule and you have a detached head, then you should create or checkout a branch, make your changes, publish the change within the submodule, and then update the superproject to reference the new commit:

    $ git checkout master

or

    $ git checkout -b fix-up

then

    $ echo "adding a line again" >> a.txt
    $ git commit -a -m "Updated the submodule from within the superproject."
    $ git push
    $ cd ..
    $ git diff
    diff --git a/a b/a
    index d266b98..261dfac 160000
    --- a/a
    +++ b/a
    @@ -1 +1 @@
    -Subproject commit d266b9873ad50488163457f025db7cdd9683d88b
    +Subproject commit 261dfac35cb99d380eb966e102c1197139f7fa24
    $ git add a
    $ git commit -m "Updated submodule a."
    $ git push

You have to run `git submodule update` after `git pull` if you want to update submodules, too.
