---
title: Hacking Git
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_10
group: git-2.13.0
subgroup: user_manual
---

## Object storage format

All objects have a statically determined "type" which identifies the format of the object (i.e. how it is used, and how it can refer to other objects). There are currently four different object types: "blob", "tree", "commit", and "tag".

Regardless of object type, all objects share the following characteristics: they are all deflated with zlib, and have a header that not only specifies their type, but also provides size information about the data in the object. It’s worth noting that the SHA-1 hash that is used to name the object is the hash of the original data plus this header, so `sha1sum` *file* does not match the object name for *file*.

As a result, the general consistency of an object can always be tested independently of the contents or the type of the object: all objects can be validated by verifying that (a) their hashes match the content of the file and (b) the object successfully inflates to a stream of bytes that forms a sequence of `<ascii type without space> + <space> + <ascii decimal size> +
<byte\0> + <binary object data>`.

The structured objects can further have their structure and connectivity to other objects verified. This is generally done with the `git fsck` program, which generates a full dependency graph of all objects, and verifies their internal consistency (in addition to just verifying their superficial consistency through the hash).

## A birds-eye view of Git’s source code

It is not always easy for new developers to find their way through Git’s source code. This section gives you a little guidance to show where to start.

A good place to start is with the contents of the initial commit, with:

    $ git checkout e83c5163

The initial revision lays the foundation for almost everything Git has today, but is small enough to read in one sitting.

Note that terminology has changed since that revision. For example, the README in that revision uses the word "changeset" to describe what we now call a [commit](#def_commit_object).

Also, we do not call it "cache" any more, but rather "index"; however, the file is still called `cache.h`. Remark: Not much reason to change it now, especially since there is no good single name for it anyway, because it is basically *the* header file which is included by *all* of Git’s C sources.

If you grasp the ideas in that initial commit, you should check out a more recent version and skim `cache.h`, `object.h` and `commit.h`.

In the early days, Git (in the tradition of UNIX) was a bunch of programs which were extremely simple, and which you used in scripts, piping the output of one into another. This turned out to be good for initial development, since it was easier to test new things. However, recently many of these parts have become builtins, and some of the core has been "libified", i.e. put into libgit.a for performance, portability reasons, and to avoid code duplication.

By now, you know what the index is (and find the corresponding data structures in `cache.h`), and that there are just a couple of object types (blobs, trees, commits and tags) which inherit their common structure from `struct object`, which is their first member (and thus, you can cast e.g. `(struct object *)commit` to achieve the *same* as `&commit->object`, i.e. get at the object name and flags).

Now is a good point to take a break to let this information sink in.

Next step: get familiar with the object naming. Read [section\_title](#naming-commits). There are quite a few ways to name an object (and not only revisions!). All of these are handled in `sha1_name.c`. Just have a quick look at the function `get_sha1()`. A lot of the special handling is done by functions like `get_sha1_basic()` or the likes.

This is just to get you into the groove for the most libified part of Git: the revision walker.

Basically, the initial version of `git log` was a shell script:

    $ git-rev-list --pretty $(git-rev-parse --default HEAD "$@") | \
            LESS=-S ${PAGER:-less}

What does this mean?

`git rev-list` is the original version of the revision walker, which *always* printed a list of revisions to stdout. It is still functional, and needs to, since most new Git commands start out as scripts using `git rev-list`.

`git rev-parse` is not as important any more; it was only used to filter out options that were relevant for the different plumbing commands that were called by the script.

Most of what `git rev-list` did is contained in `revision.c` and `revision.h`. It wraps the options in a struct named `rev_info`, which controls how and what revisions are walked, and more.

The original job of `git rev-parse` is now taken by the function `setup_revisions()`, which parses the revisions and the common command-line options for the revision walker. This information is stored in the struct `rev_info` for later consumption. You can do your own command-line option parsing after calling `setup_revisions()`. After that, you have to call `prepare_revision_walk()` for initialization, and then you can get the commits one by one with the function `get_revision()`.

If you are interested in more details of the revision walking process, just have a look at the first implementation of `cmd_log()`; call `git show v1.3.0~155^2~4` and scroll down to that function (note that you no longer need to call `setup_pager()` directly).

Nowadays, `git log` is a builtin, which means that it is *contained* in the command `git`. The source side of a builtin is

-   a function called `cmd_<bla>`, typically defined in `builtin/<bla.c>` (note that older versions of Git used to have it in `builtin-<bla>.c` instead), and declared in `builtin.h`.

-   an entry in the `commands[]` array in `git.c`, and

-   an entry in `BUILTIN_OBJECTS` in the `Makefile`.

Sometimes, more than one builtin is contained in one source file. For example, `cmd_whatchanged()` and `cmd_log()` both reside in `builtin/log.c`, since they share quite a bit of code. In that case, the commands which are *not* named like the `.c` file in which they live have to be listed in `BUILT_INS` in the `Makefile`.

`git log` looks more complicated in C than it does in the original script, but that allows for a much greater flexibility and performance.

Here again it is a good point to take a pause.

Lesson three is: study the code. Really, it is the best way to learn about the organization of Git (after you know the basic concepts).

So, think about something which you are interested in, say, "how can I access a blob just knowing the object name of it?". The first step is to find a Git command with which you can do it. In this example, it is either `git show` or `git cat-file`.

For the sake of clarity, let’s stay with `git cat-file`, because it

-   is plumbing, and

-   was around even in the initial commit (it literally went only through some 20 revisions as `cat-file.c`, was renamed to `builtin/cat-file.c` when made a builtin, and then saw less than 10 versions).

So, look into `builtin/cat-file.c`, search for `cmd_cat_file()` and look what it does.

            git_config(git_default_config);
            if (argc != 3)
                    usage("git cat-file [-t|-s|-e|-p|<type>] <sha1>");
            if (get_sha1(argv[2], sha1))
                    die("Not a valid object name %s", argv[2]);

Let’s skip over the obvious details; the only really interesting part here is the call to `get_sha1()`. It tries to interpret `argv[2]` as an object name, and if it refers to an object which is present in the current repository, it writes the resulting SHA-1 into the variable `sha1`.

Two things are interesting here:

-   `get_sha1()` returns 0 on *success*. This might surprise some new Git hackers, but there is a long tradition in UNIX to return different negative numbers in case of different errors—and 0 on success.

-   the variable `sha1` in the function signature of `get_sha1()` is `unsigned
      char *`, but is actually expected to be a pointer to `unsigned
      char[20]`. This variable will contain the 160-bit SHA-1 of the given commit. Note that whenever a SHA-1 is passed as `unsigned char *`, it is the binary representation, as opposed to the ASCII representation in hex characters, which is passed as `char *`.

You will see both of these things throughout the code.

Now, for the meat:

            case 0:
                    buf = read_object_with_reference(sha1, argv[1], &size, NULL);

This is how you read a blob (actually, not only a blob, but any type of object). To know how the function `read_object_with_reference()` actually works, find the source code for it (something like `git grep
read_object_with | grep ":[a-z]"` in the Git repository), and read the source.

To find out how the result can be used, just read on in `cmd_cat_file()`:

            write_or_die(1, buf, size);

Sometimes, you do not know where to look for a feature. In many such cases, it helps to search through the output of `git log`, and then `git show` the corresponding commit.

Example: If you know that there was some test case for `git bundle`, but do not remember where it was (yes, you *could* `git grep bundle t/`, but that does not illustrate the point!):

    $ git log --no-merges t/

In the pager (`less`), just search for "bundle", go a few lines back, and see that it is in commit 18449ab0... Now just copy this object name, and paste it into the command line

    $ git show 18449ab0

Voila.

Another example: Find out what to do in order to make some script a builtin:

    $ git log --no-merges --diff-filter=A builtin/*.c

You see, Git is actually the best tool to find out about the source of Git itself!
