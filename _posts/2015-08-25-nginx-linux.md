---
title: NGINX on Linux
excerpt: Setting up NGINX on Linux
categories: [Blog]
tags: [github pages, jekyll, ruby]
---

As of this post, [NGINX] is at version [1.9.5](https://www.nginx.com/blog/nginx-1-9-5/).
I used `pacman` to install NGINX. See [link here on how to use it](https://wiki.manjaro.org/index.php?title=Pacman_Tips).
Further info on NGINX on Linux is at [ArchLinux Wiki] (https://wiki.archlinux.org/index.php/Nginx)


#### NGINX command line

Here is a summary of commands you can use:

##### Start
Execute the command as _root_.

    nginx
    
##### Graceul Shutdown

    nginx -s quit
    
##### Fast Shutdown

    nginx -s stop
    
##### Reload or Restart the Engine

    nginx -s reload

##### Re-open Log Files

    nginx -s reopen
    
#### Configuration

Configuration file for NGINX can be found under `/etc/nginx` directory.

Under the server group I have the following entries which tells me that I could do `http://localhost:80` wherein the NGINX welcome page appears.

    listen       80;
    server_name  localhost;

[GitHub Pages]: https://pages.github.com/ "GitHub Pages"
[Manjaro]: https://manjaro.github.io/ "Manjaro Linux"
[NGINX]: https://www.nginx.com/ "NGINX official website"