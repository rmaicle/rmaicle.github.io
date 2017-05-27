---
title: Removing a Linux Kernel in Manjaro
excerpt: Steps to remove an end of life Linux kernel version from Manjaro Linux using the commandline.
date: 2017-05-27T09:04:41UTC
updates:
  - date: run currdate.sh
    message: Edits and corrections
layout: post
categories: [post, linux]
tags: [kernel]
draft: true
published: true
permalink: /posts/8562BqELy6e43WD
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
  - label: Manjaro Kernels (Manjaro Wiki)
    link: https://wiki.manjaro.org/index.php/Manjaro_Kernels
related:
---

## Identify Installed Kernels

If the existing Kernel being run in Manjaro is not immediately apparent (i.e. through the pre-installed Conky display on your desktop), then it can be shown by opening the terminal and then entering the following command:

~~~
$ mhwd-kernel -li
Currently running: 4.9.28-1-MANJARO (linux49)
The following kernels are installed in your system:
   * linux318
   * linux41
   * linux44
   * linux49
~~~

As seen in the above example, Manjaro is running kernel 4.9.28-1-MANJARO.
Each part of the kernel name identifies something:

~~~
                  4.9.28-1-MANJARO
                  | |  | |   |
version ----------+ |  | |   |
major reversion ----+  | |   |
minor revision --------+ |   |
bug fix -----------------+   |
distribution ----------------+
~~~

* The 4 indicates the version
* The 9 indicates the major revision
* The 28 indicates the minor revision
* The 1 indicates bug fixing
* \"MANJARO\" indicates the specific distribution

## Removing Installed Kernels

Where multiple kernels are present on your system, `pacman` can be used to remove them in the terminal.
It may be necessary to delete three elements of the kernel in total to completely remove it:

|-------------------------------|---------|
| Element                       | Command |
|-------------------------------|---------|
| 1. The kernel itself          | `sudo mhwd-kernel -r linux[version]` |
| 2. The kernel's headers       | `sudo pacman -R linux[version]-headers` |
| 3. The kernel's extra modules | `sudo pacman -R linux[version]-extramodules` |

Whether or not the headers and extra modules must be deleted depends on whether or not they have been installed.

__Warning: DO NOT attempt to delete an existing kernel while it is actually being used by Manjaro at the time.
You can first identify what kernel is running on your system by using the command mhwd-kernel -li in the terminal (see above).__

~~~
$ sudo mhwd-kernel -r linux318
[sudo] password for spherehead: 
checking dependencies...

Packages (4) linux318-3.18.53-1 \
             linux318-bbswitch-0.8-31 \
             linux318-ndiswrapper-1.61-7 \
             linux318-nvidia-1:375.66-2

Total Removed Size:  81.39 MiB

:: Do you want to remove these packages? [Y/n] y
:: Processing package changes...
(1/4) removing linux318-nvidia                                              [##########] 100%
(2/4) removing linux318-ndiswrapper                                         [##########] 100%
(3/4) removing linux318-bbswitch                                            [##########] 100%
(4/4) removing linux318                                                     [##########] 100%
:: Running post-transaction hooks...
(1/2) Updating Grub-Bootmenu
Generating grub configuration file ...
Found background: /usr/share/grub/background.png
Found Intel Microcode image
Found linux image: /boot/vmlinuz-4.9-x86_64
Found initrd image: /boot/initramfs-4.9-x86_64.img
Found initrd fallback image: /boot/initramfs-4.9-x86_64-fallback.img
Found linux image: /boot/vmlinuz-4.4-x86_64
Found initrd image: /boot/initramfs-4.4-x86_64.img
Found initrd fallback image: /boot/initramfs-4.4-x86_64-fallback.img
Found linux image: /boot/vmlinuz-4.1-x86_64
Found initrd image: /boot/initramfs-4.1-x86_64.img
Found initrd fallback image: /boot/initramfs-4.1-x86_64-fallback.img
Found Manjaro Linux (15.12) on /dev/sda3
Found memtest86+ image: /boot/memtest86+/memtest.bin
done
(2/2) Arming ConditionNeedsUpdate...
~~~

&#x25cf;
