---
title: NGINX on Linux
excerpt: Setting up NGINX on Linux
group: Posts
published: false
tags: [github pages, jekyll, ruby]
---

As of this post, [NGINX] is at version [1.9.5](https://www.nginx.com/blog/nginx-1-9-5/).
I'm using [Manjaro Linux] (https://manjaro.github.io/) and [`pacman`] (https://wiki.manjaro.org/index.php?title=Pacman_Tips) to install NGINX.
NGINX version on my Linux distro is 1.8.0 as you can see below.
Further info on NGINX on Linux in [ArchLinux Wiki] (https://wiki.archlinux.org/index.php/Nginx).


## NGINX command line

    $ nginx -h
    nginx version: nginx/1.8.0
    Usage: nginx [-?hvVtq] [-s signal] [-c filename] [-p prefix] [-g directives]

    Options:
      -?,-h         : this help
      -v            : show version and exit
      -V            : show version and configure options then exit
      -t            : test configuration and exit
      -q            : suppress non-error messages during configuration testing
      -s signal     : send signal to a master process: stop, quit, reopen, reload
      -p prefix     : set prefix path (default: /etc/nginx/)
      -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
      -g directives : set global directives out of configuration file

For more command line information, go to the [NGINX Wiki] (https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/).

### Start
Execute the command as _root_.

    nginx
    
### Graceful Shutdown

    nginx -s quit
    
### Fast Shutdown

    nginx -s stop
    
### Reload or Restart the Engine

    nginx -s reload

### Re-open Log Files

    nginx -s reopen
    
## Configuration

Configuration file for NGINX can be found under `/etc/nginx` directory.

Under the server group I have the following entries telling me that `http://localhost:80` should show the NGINX welcome page if it is running.

    listen       80;
    server_name  localhost;

[GitHub Pages]: https://pages.github.com/ "GitHub Pages"
[Manjaro]: https://manjaro.github.io/ "Manjaro Linux"
[NGINX]: https://www.nginx.com/ "NGINX official website"