---
title: Submodules
date: 2017-04-29T06:53:23UTC
excerpt: 
layout: post
categories: [post, c++, d_language, database, linux, jekyll, git, other]
tags: []
published: false
permalink: /posts/xz0Xap8wA0e2kWr
thumbnail:
image:
  layout: auto_width
  source: 
  attribution: 
video:
  source: 
  attribution: 
  layout: top
videos:
  - source: 
    attribution: 
    layout: 
sources:
  - label: article title (source)
    link:
related:
---

## <root> .modules file

~~~
[submodule "docs"]
	path = docs
	url = https://github.com/rmaicle/ghp_docs.git
~~~

## Solution to detached head

http://stackoverflow.com/a/8644339/6091491

add submodule to track master branch

    git submodule add -b master [URL to Git repo];

update your submodule

    git submodule update --remote 

## Add Submodule

~~~
spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test  master ⚑ 
$ git submodule add https://github.com/rmaicle/ghp_docs.git docs
Cloning into '/mnt/work/projects/_github/rmaicle/test/docs'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
~~~

## docs .modules file

~~~
[submodule "git_manual"]
	path = git_manual
	url = https://github.com/rmaicle/ghp_docs_git_manual.git
~~~

## Add Submodule Inside a Submodule

~~~
 spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test/docs  master ⚑ 
$ git clone https://github.com/rmaicle/ghp_docs_git_manual.git git_manual
Cloning into 'git_manual'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
~~~

## Configuration for Submodule

In `<root>/.git/modules/docs/config`

~~~
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	worktree = ../../../docs
[remote "origin"]
	#url = https://github.com/rmaicle/ghp_docs.git
	url = git@github.com:rmaicle/ghp_docs.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
[submodule "git_manual"]
	#url = https://github.com/rmaicle/ghp_docs_git_manual.git
	url = git@github.com:rmaicle/ghp_docs_git_manual.git
~~~

## Configuration for Submodule Inside a Submodule

In `<root>/.git/modules/docs/modules/git_manual/config`

~~~
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	worktree = ../../../../../docs/git_manual
[remote "origin"]
	#url = https://github.com/rmaicle/ghp_docs_git_manual.git
    url = git@github.com:rmaicle/ghp_docs_git_manual.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
~~~

## Clone

~~~
$ git clone --recursive git@github.com:rmaicle/test.git test-2
Cloning into 'test-2'...
remote: Counting objects: 20, done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 20 (delta 1), reused 0 (delta 0), pack-reused 16
Receiving objects: 100% (20/20), done.
Resolving deltas: 100% (2/2), done.
Submodule 'docs' (https://github.com/rmaicle/ghp_docs.git) registered for path 'docs'
Cloning into '/mnt/work/projects/_github/rmaicle/test-2/docs'...
remote: Counting objects: 15, done.        
remote: Compressing objects: 100% (11/11), done.        
remote: Total 15 (delta 3), reused 11 (delta 2), pack-reused 0        
Submodule path 'docs': checked out '602418b4e8c2ef380be83f8185e269b64759d923'
Submodule 'git_manual' (https://github.com/rmaicle/ghp_docs_git_manual.git) registered for path 'docs/git_manual'
Cloning into '/mnt/work/projects/_github/rmaicle/test-2/docs/git_manual'...
remote: Counting objects: 3, done.        
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0        
Submodule path 'docs/git_manual': checked out 'def510e97da47db2853d870c75b9c7ab24bd688b'
~~~


git submodule update --remote --merge

~~~
spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test-2  master ⚑ 
$ git submodule update --remote --merge
remote: Counting objects: 2, done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 2 (delta 1), reused 2 (delta 1), pack-reused 0
Unpacking objects: 100% (2/2), done.
From https://github.com/rmaicle/ghp_docs
   602418b..7657424  master     -> origin/master
Fetching submodule git_manual
From https://github.com/rmaicle/ghp_docs_git_manual
   def510e..e9fc7c8  master     -> origin/master
Updating 602418b..7657424
Fast-forward
 git_manual | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
Submodule path 'docs': merged in '76574246c74631a9bfb67096e3177114d77796ef'
~~


## Removing a submodule

~~~
 spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test/docs  master ⚑ 
$ git submodule deinit git_manual/
Cleared directory 'git_manual'
Submodule 'git_manual' (git@github.com:rmaicle/ghp_docs_git_manual.git) unregistered for path 'git_manual'

 spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test/docs  master ⚑ 
$ git rm git_manual/
rm 'git_manual'

 spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test/docs  master + 
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   .gitmodules
	deleted:    git_manual

 spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test/docs  master + 
$ git commit -m "Remove git_manual submodule"
[master a54a4dd] Remove git_manual submodule
 2 files changed, 4 deletions(-)
 delete mode 160000 git_manual
 spherehead.sphere-0  ~/_work/projects/_github/rmaicle/test/docs  master P 
$ git push origin
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 280 bytes | 0 bytes/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To github.com:rmaicle/ghp_docs.git
   7657424..a54a4dd  master -> master
~~~

# New add submodule

~~~
$ git submodule add -b master https://github.com/rmaicle/ghp_docs_git_manual.git
Cloning into '/mnt/work/projects/_github/rmaicle/test/docs/ghp_docs_git_manual'...
remote: Counting objects: 6, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 6 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (6/6), done.
~~~

.gitmodules file

~~~
[submodule "docs"]
	path = docs
	url = https://github.com/rmaicle/ghp_docs.git
	branch = master
~~~

## No content in submodule

$ git submodule update --init