---
title: File/Directory Structure
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/section_6
group: git
---

Git Repository Layout

~~~
$GIT_DIR/*
~~~

A Git repository comes in two different flavours:

* a `.git` directory at the root of the working tree;
* a `<project>.git` directory that is a bare repository (i.e. without its own working tree), that is typically used for exchanging histories with others by pushing into it and fetching from it.

Note: Also you can have a plain text file `.git` at the root of your working tree, containing `gitdir: <path>` to point at the real directory that has the repository. This mechanism is often used for a working tree of a submodule checkout, to allow you in the containing superproject to `git checkout` a branch that does not have the submodule. The `checkout` has to remove the entire submodule working tree, without losing the submodule repository.

These things may exist in a Git repository.

__objects__
: Object store associated with this repository. Usually an object store is self sufficient (i.e. all the objects that are referred to by an object found in it are also found in it), but there are a few ways to violate it.

    1. You could have an incomplete but locally usable repository by creating a shallow clone. See git-clone(1).

    2. You could be using the objects/info/alternates or $GIT_ALTERNATE_OBJECT_DIRECTORIES mechanisms to borrow objects from other object stores. A repository with this kind of incomplete object store is not suitable to be published for use with dumb transports but otherwise is OK as long as objects/info/alternates points at the object stores it borrows from.

        This directory is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/objects" will be used instead.

__objects/[0-9a-f][0-9a-f]__
: A newly created object is stored in its own file. The objects are splayed over 256 subdirectories using the first two characters of the sha1 object name to keep the number of directory entries in objects itself to a manageable number. Objects found here are often called unpacked (or loose) objects.

__objects/pack__
: Packs (files that store many object in compressed form, along with index files to allow them to be randomly accessed) are found in this directory.

__objects/info__
: Additional information about the object store is recorded in this directory.

__objects/info/packs__
: This file is to help dumb transports discover what packs are available in this object store. Whenever a pack is added or removed, git update-server-info should be run to keep this file up-to-date if the repository is published for dumb transports. git repack does this by default.

__objects/info/alternates__
: This file records paths to alternate object stores that this object store borrows objects from, one pathname per line. Note that not only native Git tools use it locally, but the HTTP fetcher also tries to use it remotely; this will usually work if you have relative paths (relative to the object database, not to the repository!) in your alternates file, but it will not work if you use absolute paths unless the absolute path in filesystem and web URL is the same. See also objects/info/http-alternates.

__objects/info/http-alternates__
: This file records URLs to alternate object stores that this object store borrows objects from, to be used when the repository is fetched over HTTP.

__refs__
: References are stored in subdirectories of this directory. The git prune command knows to preserve objects reachable from refs found in this directory and its subdirectories. This directory is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/refs" will be used instead.

__refs/heads/name__
: Records tip-of-the-tree commit objects of branch name

__refs/tags/name__
: Records any object name (not necessarily a commit object, or a tag object that points at a commit object).

__refs/remotes/name__
: Records tip-of-the-tree commit objects of branches copied from a remote repository.

__refs/replace/\<obj-sha1\>__
: Records the SHA-1 of the object that replaces <obj-sha1>. This is similar to info/grafts and is internally used and maintained by git-replace(1). Such refs can be exchanged between repositories while grafts are not.

__packed-refs__
: Records the same information as refs/heads/, refs/tags/, and friends record in a more efficient way. See git-pack-refs(1). This file is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/packed-refs" will be used instead.

__HEAD__
: A symref (see glossary) to the refs/heads/ namespace describing the currently active branch. It does not mean much if the repository is not associated with any working tree (i.e. a bare repository), but a valid Git repository must have the HEAD file; some porcelains may use it to guess the designated "default" branch of the repository (usually master). It is legal if the named branch name does not (yet) exist. In some legacy setups, it is a symbolic link instead of a symref that points at the current branch.

: HEAD can also record a specific commit directly, instead of being a symref to point at the current branch. Such a state is often called detached HEAD. See git-checkout(1) for details.

__config__
: Repository specific configuration file. This file is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/config" will be used instead.

__branches__
: A slightly deprecated way to store shorthands to be used to specify a URL to git fetch, git pull and git push. A file can be stored as branches/<name> and then name can be given to these commands in place of repository argument. See the REMOTES section in git-fetch(1) for details. This mechanism is legacy and not likely to be found in modern repositories. This directory is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/branches" will be used instead.

__hooks__
: Hooks are customization scripts used by various Git commands. A handful of sample hooks are installed when git init is run, but all of them are disabled by default. To enable, the .sample suffix has to be removed from the filename by renaming. Read githooks(5) for more details about each hook. This directory is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/hooks" will be used instead.

__index__
: The current index file for the repository. It is usually not found in a bare repository.

__sharedindex.\<SHA-1\>__
: The shared index part, to be referenced by $GIT_DIR/index and other temporary index files. Only valid in split index mode.

__info__
: Additional information about the repository is recorded in this directory. This directory is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/index" will be used instead.

__info/refs__
: This file helps dumb transports discover what refs are available in this repository. If the repository is published for dumb transports, this file should be regenerated by git update-server-info every time a tag or branch is created or modified. This is normally done from the hooks/update hook, which is run by the git-receive-pack command when you git push into the repository.

__info/grafts__
: This file records fake commit ancestry information, to pretend the set of parents a commit has is different from how the commit was actually created. One record per line describes a commit and its fake parents by listing their 40-byte hexadecimal object names separated by a space and terminated by a newline.

: Note that the grafts mechanism is outdated and can lead to problems transferring objects between repositories; see git-replace(1) for a more flexible and robust system to do the same thing.

__info/exclude__
: This file, by convention among Porcelains, stores the exclude pattern list. .gitignore is the per-directory ignore file. git status, git add, git rm and git clean look at it but the core Git commands do not look at it. See also: gitignore(5).

__info/sparse-checkout__
: This file stores sparse checkout patterns. See also: git-read-tree(1).

__remotes__
: Stores shorthands for URL and default refnames for use when interacting with remote repositories via git fetch, git pull and git push commands. See the REMOTES section in git-fetch(1) for details. This mechanism is legacy and not likely to be found in modern repositories. This directory is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/remotes" will be used instead.

__logs__
: Records of changes made to refs are stored in this directory. See git-update-ref(1) for more information. This directory is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/logs" will be used instead.

__logs/refs/heads/name__
: Records all changes made to the branch tip named name.

__logs/refs/tags/name__
: Records all changes made to the tag named name.

__shallow__
: This is similar to info/grafts but is internally used and maintained by shallow clone mechanism. See --depth option to git-clone(1) and git-fetch(1). This file is ignored if $GIT_COMMON_DIR is set and "$GIT_COMMON_DIR/shallow" will be used instead.

__commondir__
: If this file exists, $GIT_COMMON_DIR (see git(1)) will be set to the path specified in this file if it is not explicitly set. If the specified path is relative, it is relative to $GIT_DIR. The repository with commondir is incomplete without the repository pointed by "commondir".

__modules__
: Contains the git-repositories of the submodules.

__worktrees__
: Contains administrative data for linked working trees. Each subdirectory contains the working tree-related part of a linked working tree. This directory is ignored if $GIT_COMMON_DIR is set, in which case "$GIT_COMMON_DIR/worktrees" will be used instead.

__worktrees/\<id\>/gitdir__
: A text file containing the absolute path back to the .git file that points to here. This is used to check if the linked repository has been manually removed and there is no need to keep this directory any more. The mtime of this file should be updated every time the linked repository is accessed.

__worktrees/\<id\>/locked__
: If this file exists, the linked working tree may be on a portable device and not available. The presence of this file prevents worktrees/<id> from being pruned either automatically or manually by git worktree prune. The file may contain a string explaining why the repository is locked.

__worktrees/\<id\>/link__
: If this file exists, it is a hard link to the linked .git file. It is used to detect if the linked repository is manually removed.
