---
title: Multiple GitHub Accounts Using Different SSH keys
excerpt: You can have multiple GitHub accounts that are using different SSH keys.
date: August 1, 2016
group: Posts
categories: [Blog]
tags: [linux, manjaro, chroot]
---

This assumes that you have already created different SSH keys to be used for your GitHub accounts.

Here is how to create an SSH key for a GitHub account.

    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    
There are a few things to do to be able to use different SSH keys for different GitHub accounts.

1. Create or edit the `config` file in `~/.ssh` directory.
2. Edit the `.git/config` files of each involved `git` repository.

## SSH Directory

Create or edit the `config` file in `~/.ssh` directory and the following to the file.

~~~
Host github.com-one
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_dutertetimes_protonmail_rsa

Host github.com-two
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_rmaicle_gmail_rsa
~~~

Unique `Host` entries will be used in the `<repository>.git/config` file for each corresponding repository.
`IdentityFile` of each entry corresponds to the SSH key you wanted to use for the corresponding `Host`.

## `git` Repository configuration file

Edit the `.git/config` files of each involved `git` repository.
Add the following lines or edit if it already exists.
You will be using the `host` entry label specified in the `~/.ssh/config` file.

    [remote "origin"]
        url = git@github.com-one:<account>/<repository>.git
        fetch = +refs/heads/*:refs/remotes/origin/*

        https://gist.github.com/jexchan/2351996
        
Of course, do not forget to add your public SSH keys to your GitHub accounts.

## Reference

* [Multiple SSH Keys settings for different github account](https://gist.github.com/jexchan/2351996)
* [Generating an SSH key](https://help.github.com/articles/generating-an-ssh-key/)
