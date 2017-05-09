---
title: Configuration Mechanism
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/section_3
group: git
---

Git uses a simple text format to store customizations that are per repository and are per user. Such a configuration file may look like this:

    #
    # A '#' or ';' character indicates a comment.
    #

    ; core variables
    [core]
            ; Don't trust file modes
            filemode = false

    ; user identity
    [user]
            name = "Junio C Hamano"
            email = "gitster@pobox.com"

Various commands read from the configuration file and adjust their operation accordingly. See [git-config(1)](https://www.kernel.org/pub/software/scm/git/docs/git-config.html) for a list and more details about the configuration mechanism.
