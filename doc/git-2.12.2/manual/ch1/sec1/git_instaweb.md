---
title: git-instaweb
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/ch1/sec1/git_instaweb
group: git-2.12.2
subgroup: manual
---

NAME
====

git-instaweb - Instantly browse your working repository in gitweb

SYNOPSIS
========

    git instaweb [--local] [--httpd=<httpd>] [--port=<port>]
                   [--browser=<browser>]
    git instaweb [--start] [--stop] [--restart]

DESCRIPTION
===========

A simple script to set up `gitweb` and a web server for browsing the local repository.

OPTIONS
=======

`-l`; `--local`

:   Only bind the web server to the local IP (127.0.0.1).

`-d`; `--httpd`

:   The HTTP daemon command-line that will be executed. Command-line options may be specified here, and the configuration file will be added at the end of the command-line. Currently apache2, lighttpd, mongoose, plackup and webrick are supported. (Default: lighttpd)

`-m`; `--module-path`

:   The module path (only needed if httpd is Apache). (Default: /usr/lib/apache2/modules)

`-p`; `--port`

:   The port number to bind the httpd to. (Default: 1234)

`-b`; `--browser`

:   The web browser that should be used to view the gitweb script along with the URL of the gitweb instance. See the script fails, the URL will be printed to stdout.

`start`; `--start`

:   Start the httpd instance and exit. Regenerate configuration files as necessary for spawning a new instance.

`stop`; `--stop`

:   Stop the httpd instance and exit. This does not generate any of the configuration files for spawning a new instance, nor does it close the browser.

`restart`; `--restart`

:   Restart the httpd instance and exit. Regenerate configuration files as necessary for spawning a new instance.

CONFIGURATION
=============

You may specify configuration in your .git/config

    [instaweb]
            local = true
            httpd = apache2 -f
            port = 4321
            browser = konqueror
            modulePath = /usr/lib/apache2/modules

If the configuration variable `instaweb.browser` is not set, `web.browser` will be used instead if it is defined. See

SEE ALSO
========

linkgit:gitweb\[1\]

GIT
===

Part of the linkgit:git\[1\] suite
