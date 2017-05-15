---
title: Sharing Development with Others
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/user_manual/chapter_4
group: git-2.13.0
subgroup: user_manual
---

## Getting updates with `git pull`

After you clone a repository and commit a few changes of your own, you may wish to check the original repository for updates and merge them into your own work.

We have already seen [how to keep remote-tracking branches up to date](#Updating-a-repository-With-git-fetch) with linkgit:git-fetch\[1\], and how to merge two branches. So you can merge in changes from the original repository’s master branch with:

    $ git fetch
    $ git merge origin/master

However, the linkgit:git-pull\[1\] command provides a way to do this in one step:

    $ git pull origin master

In fact, if you have `master` checked out, then this branch has been configured by `git clone` to get changes from the HEAD branch of the origin repository. So often you can accomplish the above with just a simple

    $ git pull

This command will fetch changes from the remote branches to your remote-tracking branches `origin/*`, and merge the default branch into the current branch.

More generally, a branch that is created from a remote-tracking branch will pull by default from that branch. See the descriptions of the `branch.<name>.remote` and `branch.<name>.merge` options in linkgit:git-config\[1\], and the discussion of the `--track` option in linkgit:git-checkout\[1\], to learn how to control these defaults.

In addition to saving you keystrokes, `git pull` also helps you by producing a default commit message documenting the branch and repository that you pulled from.

(But note that no such commit will be created in the case of a [fast-forward](#fast-forwards); instead, your branch will just be updated to point to the latest commit from the upstream branch.)

The `git pull` command can also be given `.` as the "remote" repository, in which case it just merges in a branch from the current repository; so the commands

    $ git pull . branch
    $ git merge branch

are roughly equivalent.

## Submitting patches to a project

If you just have a few changes, the simplest way to submit them may just be to send them as patches in email:

First, use linkgit:git-format-patch\[1\]; for example:

    $ git format-patch origin

will produce a numbered series of files in the current directory, one for each patch in the current branch but not in `origin/HEAD`.

`git format-patch` can include an initial "cover letter". You can insert commentary on individual patches after the three dash line which `format-patch` places after the commit message but before the patch itself. If you use `git notes` to track your cover letter material, `git format-patch --notes` will include the commit’s notes in a similar manner.

You can then import these into your mail client and send them by hand. However, if you have a lot to send at once, you may prefer to use the linkgit:git-send-email\[1\] script to automate the process. Consult the mailing list for your project first to determine their requirements for submitting patches.

## Importing patches to a project

Git also provides a tool called linkgit:git-am\[1\] (am stands for "apply mailbox"), for importing such an emailed series of patches. Just save all of the patch-containing messages, in order, into a single mailbox file, say `patches.mbox`, then run

    $ git am -3 patches.mbox

Git will apply each patch in order; if any conflicts are found, it will stop, and you can fix the conflicts as described in "[Resolving a merge](#resolving-a-merge)". (The `-3` option tells Git to perform a merge; if you would prefer it just to abort and leave your tree and index untouched, you may omit that option.)

Once the index is updated with the results of the conflict resolution, instead of creating a new commit, just run

    $ git am --continue

and Git will create the commit for you and continue applying the remaining patches from the mailbox.

The final result will be a series of commits, one for each patch in the original mailbox, with authorship and commit log message each taken from the message containing each patch.

## Public Git repositories

Another way to submit changes to a project is to tell the maintainer of that project to pull the changes from your repository using linkgit:git-pull\[1\]. In the section "[Getting updates with `git pull`](#getting-updates-With-git-pull)" we described this as a way to get updates from the "main" repository, but it works just as well in the other direction.

If you and the maintainer both have accounts on the same machine, then you can just pull changes from each other’s repositories directly; commands that accept repository URLs as arguments will also accept a local directory name:

    $ git clone /path/to/repository
    $ git pull /path/to/other/repository

or an ssh URL:

    $ git clone ssh://yourhost/~you/repository

For projects with few developers, or for synchronizing a few private repositories, this may be all you need.

However, the more common way to do this is to maintain a separate public repository (usually on a different host) for others to pull changes from. This is usually more convenient, and allows you to cleanly separate private work in progress from publicly visible work.

You will continue to do your day-to-day work in your personal repository, but periodically "push" changes from your personal repository into your public repository, allowing other developers to pull from that repository. So the flow of changes, in a situation where there is one other developer with a public repository, looks like this:

                          you push
    your personal repo ------------------> your public repo
          ^                                     |
          |                                     |
          | you pull                            | they pull
          |                                     |
          |                                     |
          |               they push             V
    their public repo <------------------- their repo

We explain how to do this in the following sections.

### Setting up a public repository

Assume your personal repository is in the directory `~/proj`. We first create a new clone of the repository and tell `git daemon` that it is meant to be public:

    $ git clone --bare ~/proj proj.git
    $ touch proj.git/git-daemon-export-ok

The resulting directory proj.git contains a "bare" git repository—it is just the contents of the `.git` directory, without any files checked out around it.

Next, copy `proj.git` to the server where you plan to host the public repository. You can use scp, rsync, or whatever is most convenient.

### Exporting a Git repository via the Git protocol

This is the preferred method.

If someone else administers the server, they should tell you what directory to put the repository in, and what `git://` URL it will appear at. You can then skip to the section "[Pushing changes to a public repository](#pushing-changes-to-a-public-repository)", below.

Otherwise, all you need to do is start linkgit:git-daemon\[1\]; it will listen on port 9418. By default, it will allow access to any directory that looks like a Git directory and contains the magic file git-daemon-export-ok. Passing some directory paths as `git daemon` arguments will further restrict the exports to those paths.

You can also run `git daemon` as an inetd service; see the linkgit:git-daemon\[1\] man page for details. (See especially the examples section.)

### Exporting a git repository via HTTP

The Git protocol gives better performance and reliability, but on a host with a web server set up, HTTP exports may be simpler to set up.

All you need to do is place the newly created bare Git repository in a directory that is exported by the web server, and make some adjustments to give web clients some extra information they need:

    $ mv proj.git /home/you/public_html/proj.git
    $ cd proj.git
    $ git --bare update-server-info
    $ mv hooks/post-update.sample hooks/post-update

(For an explanation of the last two lines, see linkgit:git-update-server-info\[1\] and linkgit:githooks\[5\].)

Advertise the URL of `proj.git`. Anybody else should then be able to clone or pull from that URL, for example with a command line like:

    $ git clone http://yourserver.com/~you/proj.git

(See also [setup-git-server-over-http](howto/setup-git-server-over-http.html) for a slightly more sophisticated setup using WebDAV which also allows pushing over HTTP.)

### Pushing changes to a public repository

Note that the two techniques outlined above (exporting via [http](#exporting-via-http) or [git](#exporting-via-git)) allow other maintainers to fetch your latest changes, but they do not allow write access, which you will need to update the public repository with the latest changes created in your private repository.

The simplest way to do this is using linkgit:git-push\[1\] and ssh; to update the remote branch named `master` with the latest state of your branch named `master`, run

    $ git push ssh://yourserver.com/~you/proj.git master:master

or just

    $ git push ssh://yourserver.com/~you/proj.git master

As with `git fetch`, `git push` will complain if this does not result in a [fast-forward](#fast-forwards); see the following section for details on handling this case.

Note that the target of a `push` is normally a [bare](#def_bare_repository) repository. You can also push to a repository that has a checked-out working tree, but a push to update the currently checked-out branch is denied by default to prevent confusion. See the description of the receive.denyCurrentBranch option in linkgit:git-config\[1\] for details.

As with `git fetch`, you may also set up configuration options to save typing; so, for example:

    $ git remote add public-repo ssh://yourserver.com/~you/proj.git

adds the following to `.git/config`:

    [remote "public-repo"]
            url = yourserver.com:proj.git
            fetch = +refs/heads/*:refs/remotes/example/*

which lets you do the same push with just

    $ git push public-repo master

See the explanations of the `remote.<name>.url`, `branch.<name>.remote`, and `remote.<name>.push` options in linkgit:git-config\[1\] for details.

### What to do when a push fails

If a push would not result in a [fast-forward](#fast-forwards) of the remote branch, then it will fail with an error like:

    error: remote 'refs/heads/master' is not an ancestor of
     local  'refs/heads/master'.
     Maybe you are not up-to-date and need to pull first?
    error: failed to push to 'ssh://yourserver.com/~you/proj.git'

This can happen, for example, if you:

-   use `git reset --hard` to remove already-published commits, or

-   use `git commit --amend` to replace already-published commits (as in [section\_title](#fixing-a-mistake-by-rewriting-history)), or

-   use `git rebase` to rebase any already-published commits (as in [section\_title](#using-git-rebase)).

You may force `git push` to perform the update anyway by preceding the branch name with a plus sign:

    $ git push ssh://yourserver.com/~you/proj.git +master

Note the addition of the `+` sign. Alternatively, you can use the `-f` flag to force the remote update, as in:

    $ git push -f ssh://yourserver.com/~you/proj.git master

Normally whenever a branch head in a public repository is modified, it is modified to point to a descendant of the commit that it pointed to before. By forcing a push in this situation, you break that convention. (See [section\_title](#problems-With-rewriting-history).)

Nevertheless, this is a common practice for people that need a simple way to publish a work-in-progress patch series, and it is an acceptable compromise as long as you warn other developers that this is how you intend to manage the branch.

It’s also possible for a push to fail in this way when other people have the right to push to the same repository. In that case, the correct solution is to retry the push after first updating your work: either by a pull, or by a fetch followed by a rebase; see the [next section](#setting-up-a-shared-repository) and linkgit:gitcvs-migration\[7\] for more.

### Setting up a shared repository

Another way to collaborate is by using a model similar to that commonly used in CVS, where several developers with special rights all push to and pull from a single shared repository. See linkgit:gitcvs-migration\[7\] for instructions on how to set this up.

However, while there is nothing wrong with Git’s support for shared repositories, this mode of operation is not generally recommended, simply because the mode of collaboration that Git supports—by exchanging patches and pulling from public repositories—has so many advantages over the central shared repository:

-   Git’s ability to quickly import and merge patches allows a single maintainer to process incoming changes even at very high rates. And when that becomes too much, `git pull` provides an easy way for that maintainer to delegate this job to other maintainers while still allowing optional review of incoming changes.

-   Since every developer’s repository has the same complete copy of the project history, no repository is special, and it is trivial for another developer to take over maintenance of a project, either by mutual agreement, or because a maintainer becomes unresponsive or difficult to work with.

-   The lack of a central group of "committers" means there is less need for formal decisions about who is "in" and who is "out".

### Allowing web browsing of a repository

The gitweb cgi script provides users an easy way to browse your project’s revisions, file contents and logs without having to install Git. Features like RSS/Atom feeds and blame/annotation details may optionally be enabled.

The linkgit:git-instaweb\[1\] command provides a simple way to start browsing the repository using gitweb. The default server when using instaweb is lighttpd.

See the file gitweb/INSTALL in the Git source tree and linkgit:gitweb\[1\] for instructions on details setting up a permanent installation with a CGI or Perl capable server.

## How to get a Git repository with minimal history

A [shallow clone](#def_shallow_clone), with its truncated history, is useful when one is interested only in recent history of a project and getting full history from the upstream is expensive.

A [shallow clone](#def_shallow_clone) is created by specifying the linkgit:git-clone\[1\] `--depth` switch. The depth can later be changed with the linkgit:git-fetch\[1\] `--depth` switch, or full history restored with `--unshallow`.

Merging inside a [shallow clone](#def_shallow_clone) will work as long as a merge base is in the recent history. Otherwise, it will be like merging unrelated histories and may have to result in huge conflicts. This limitation may make such a repository unsuitable to be used in merge based workflows.

## Examples

### Maintaining topic branches for a Linux subsystem maintainer

This describes how Tony Luck uses Git in his role as maintainer of the IA64 architecture for the Linux kernel.

He uses two public branches:

-   A "test" tree into which patches are initially placed so that they can get some exposure when integrated with other ongoing development. This tree is available to Andrew for pulling into -mm whenever he wants.

-   A "release" tree into which tested patches are moved for final sanity checking, and as a vehicle to send them upstream to Linus (by sending him a "please pull" request.)

He also uses a set of temporary branches ("topic branches"), each containing a logical grouping of patches.

To set this up, first create your work tree by cloning Linus’s public tree:

    $ git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git work
    $ cd work

Linus’s tree will be stored in the remote-tracking branch named origin/master, and can be updated using linkgit:git-fetch\[1\]; you can track other public trees using linkgit:git-remote\[1\] to set up a "remote" and linkgit:git-fetch\[1\] to keep them up-to-date; see [???](#repositories-and-branches).

Now create the branches in which you are going to work; these start out at the current tip of origin/master branch, and should be set up (using the `--track` option to linkgit:git-branch\[1\]) to merge changes in from Linus by default.

    $ git branch --track test origin/master
    $ git branch --track release origin/master

These can be easily kept up to date using linkgit:git-pull\[1\].

    $ git checkout test && git pull
    $ git checkout release && git pull

Important note! If you have any local changes in these branches, then this merge will create a commit object in the history (with no local changes Git will simply do a "fast-forward" merge). Many people dislike the "noise" that this creates in the Linux history, so you should avoid doing this capriciously in the `release` branch, as these noisy commits will become part of the permanent history when you ask Linus to pull from the release branch.

A few configuration variables (see linkgit:git-config\[1\]) can make it easy to push both branches to your public tree. (See [section\_title](#setting-up-a-public-repository).)

    $ cat >> .git/config <<EOF
    [remote "mytree"]
            url =  master.kernel.org:/pub/scm/linux/kernel/git/aegl/linux.git
            push = release
            push = test
    EOF

Then you can push both the test and release trees using linkgit:git-push\[1\]:

    $ git push mytree

or push just one of the test and release branches using:

    $ git push mytree test

or

    $ git push mytree release

Now to apply some patches from the community. Think of a short snappy name for a branch to hold this patch (or related group of patches), and create a new branch from a recent stable tag of Linus’s branch. Picking a stable base for your branch will: 1) help you: by avoiding inclusion of unrelated and perhaps lightly tested changes 2) help future bug hunters that use `git bisect` to find problems

    $ git checkout -b speed-up-spinlocks v2.6.35

Now you apply the patch(es), run some tests, and commit the change(s). If the patch is a multi-part series, then you should apply each as a separate commit to this branch.

    $ ... patch ... test  ... commit [ ... patch ... test ... commit ]*

When you are happy with the state of this change, you can merge it into the "test" branch in preparation to make it public:

    $ git checkout test && git merge speed-up-spinlocks

It is unlikely that you would have any conflicts here ... but you might if you spent a while on this step and had also pulled new versions from upstream.

Sometime later when enough time has passed and testing done, you can pull the same branch into the `release` tree ready to go upstream. This is where you see the value of keeping each patch (or patch series) in its own branch. It means that the patches can be moved into the `release` tree in any order.

    $ git checkout release && git merge speed-up-spinlocks

After a while, you will have a number of branches, and despite the well chosen names you picked for each of them, you may forget what they are for, or what status they are in. To get a reminder of what changes are in a specific branch, use:

    $ git log linux..branchname | git shortlog

To see whether it has already been merged into the test or release branches, use:

    $ git log test..branchname

or

    $ git log release..branchname

(If this branch has not yet been merged, you will see some log entries. If it has been merged, then there will be no output.)

Once a patch completes the great cycle (moving from test to release, then pulled by Linus, and finally coming back into your local `origin/master` branch), the branch for this change is no longer needed. You detect this when the output from:

    $ git log origin..branchname

is empty. At this point the branch can be deleted:

    $ git branch -d branchname

Some changes are so trivial that it is not necessary to create a separate branch and then merge into each of the test and release branches. For these changes, just apply directly to the `release` branch, and then merge that into the `test` branch.

After pushing your work to `mytree`, you can use linkgit:git-request-pull\[1\] to prepare a "please pull" request message to send to Linus:

    $ git push mytree
    $ git request-pull origin mytree release

Here are some of the scripts that simplify all this even further.

    ==== update script ====
    # Update a branch in my Git tree.  If the branch to be updated
    # is origin, then pull from kernel.org.  Otherwise merge
    # origin/master branch into test|release branch

    case "$1" in
    test|release)
            git checkout $1 && git pull . origin
            ;;
    origin)
            before=$(git rev-parse refs/remotes/origin/master)
            git fetch origin
            after=$(git rev-parse refs/remotes/origin/master)
            if [ $before != $after ]
            then
                    git log $before..$after | git shortlog
            fi
            ;;
    *)
            echo "usage: $0 origin|test|release" 1>&2
            exit 1
            ;;
    esac

    ==== merge script ====
    # Merge a branch into either the test or release branch

    pname=$0

    usage()
    {
            echo "usage: $pname branch test|release" 1>&2
            exit 1
    }

    git show-ref -q --verify -- refs/heads/"$1" || {
            echo "Can't see branch <$1>" 1>&2
            usage
    }

    case "$2" in
    test|release)
            if [ $(git log $2..$1 | wc -c) -eq 0 ]
            then
                    echo $1 already merged into $2 1>&2
                    exit 1
            fi
            git checkout $2 && git pull . $1
            ;;
    *)
            usage
            ;;
    esac

    ==== status script ====
    # report on status of my ia64 Git tree

    gb=$(tput setab 2)
    rb=$(tput setab 1)
    restore=$(tput setab 9)

    if [ `git rev-list test..release | wc -c` -gt 0 ]
    then
            echo $rb Warning: commits in release that are not in test $restore
            git log test..release
    fi

    for branch in `git show-ref --heads | sed 's|^.*/||'`
    do
            if [ $branch = test -o $branch = release ]
            then
                    continue
            fi

            echo -n $gb ======= $branch ====== $restore " "
            status=
            for ref in test release origin/master
            do
                    if [ `git rev-list $ref..$branch | wc -c` -gt 0 ]
                    then
                            status=$status${ref:0:1}
                    fi
            done
            case $status in
            trl)
                    echo $rb Need to pull into test $restore
                    ;;
            rl)
                    echo "In test"
                    ;;
            l)
                    echo "Waiting for linus"
                    ;;
            "")
                    echo $rb All done $restore
                    ;;
            *)
                    echo $rb "<$status>" $restore
                    ;;
            esac
            git log origin/master..$branch | git shortlog
    done

Normally commits are only added to a project, never taken away or replaced. Git is designed with this assumption, and violating it will cause Git’s merge machinery (for example) to do the wrong thing.

However, there is a situation in which it can be useful to violate this assumption.
