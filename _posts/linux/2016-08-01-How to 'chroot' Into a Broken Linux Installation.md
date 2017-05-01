---
title: How to `chroot` Into a Broken Linux Installation
date: 2016-08-01T15:27:08UTC
excerpt: Fixing a Linux system using `chroot` to get into a broken system might help before considering a full re-installation of your Linux system.
layout: post
categories: [post, linux]
tags: [chroot]
published: true
permalink: /posts/71xXldOnEnKXWgw
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

Here are the summary of steps:

1. Boot into a Linux live installation media
2. List block devices
3. Mount target partition
4. Change root into the mounted target partition


## Boot Into a Linux Live Media

A live media is a bootable operating system usually using the most common removable media for computers like optical discs and USB flash drives.
It is a working operating system that does not require any other software to boot to a computer.
It allows one to run a operating system for any purpose but usually for testing new operating systems and for system maintenance.

##### Create a Bootable USB Drive

Download `.iso` file and create a bootable USB drive by executing the `dd` command.
The command will format the disk according to the specified or default option.

    # dd if=/home/user/manjaro-xfce-16.06-x86_64.iso of=/dev/sdb bs=4M oflag=nocache,sync
    
If you want to see progress indicator then add the option `status=progress`.

## List Block Devices

For simplicity, block devices refer to hard disks, usb or optical drives in a computer.
We need to know the available block devices so we can mount the target partition.
Once booted, we can now query for availabe block devices.
There are a few ways to determine block devices in a computer but here is a couple of them:

    fdisk -l
    lsblk
    
Here is a sample output of the `lsblk` command.

    $ lsblk
    NAME    MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
    sda       8:0    0 931.5G  0 disk 
    ├─sda1    8:1    0 500.7M  0 part /boot/efi
    ├─sda2    8:2    0  58.6G  0 part /
    ├─sda3    8:3    0  29.3G  0 part 
    ├─sda4    8:4    0  29.3G  0 part 
    ├─sda5    8:5    0  29.3G  0 part 
    ├─sda6    8:6    0  29.3G  0 part 
    ├─sda7    8:7    0  58.6G  0 part 
    ├─sda8    8:8    0  58.6G  0 part 
    ├─sda9    8:9    0  15.6G  0 part 
    ├─sda10   8:10   0 488.3G  0 part /mnt/stuff
    └─sda11   8:11   0 134.1G  0 part /mnt/work
    sdb       8:16   1   7.5G  0 disk 
    ├─sdb1    8:17   1   1.5G  0 part 
    └─sdb2    8:18   1    31M  0 part 
    sr0      11:0    1  1024M  0 rom 

## Mount Target Partition

Usually it is the root partition that is the target partition that needs to be mounted.
It is common to mount external or removable drives under the `/mnt` directory.

    sudo mount /dev/sda2 /mnt

## Change root

Change root is an operation that changes the apparent root directory for the current running process and their children.
This is achieved by running the `chroot` command.
To be able to execute commands as if one is inside the actual Manjaro installation it is necessary to use the `mhwd-chroot` command.
Install the `mhwd-chroot` package.

    sudo pacman -S mhwd-chroot

## Do Your Stuff

Once, I was unable to boot into my Manjaro system after an update.
The boot process hangs at "A start job is running for CLI Netfilter Manager".
This was related to the `ufw` service and therefore I needed to shut it down.
After executing `chroot` I disabled the service.

    sudo systemctl disable ufw
    
## Reference

* [How to save your Manjaro installation when it breaks](https://forum.manjaro.org/t/how-to-save-your-manjaro-installation-when-it-breaks/75)
* [Change root](https://wiki.archlinux.org/index.php/change_root)
