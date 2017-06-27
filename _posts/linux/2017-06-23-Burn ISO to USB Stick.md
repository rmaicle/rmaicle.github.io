---
title: Burn ISO to USB Stick
excerpt: 
date: 2017-06-23T16:24:22UTC
updates:
  - date: run currdate.sh
    message: Edits and corrections
layout: post
categories: [post, linux]
tags: [iso]
draft: true
published: true
permalink: /posts/ogeGoq73q3g2WR7
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
  - label: How to format a usb stick so that it is usable on Manjaro, Windows and macOS (Manjaro Forum)
    link: https://forum.manjaro.org/t/how-to-format-a-usb-stick-so-that-it-is-usable-on-manjaro-windows-and-macos/3972
  - label: Burn an ISO File (Manjaro Wiki)
    link: https://wiki.manjaro.org/index.php?title=Burn_an_ISO_File
related:
---

## Format USB Stick

Use gParted to delete and create a new partition on the USB drive.

1. Delete the drive's partitions
2. Create a new partition table of the type msdos. (Device > Create Partition Table)
3. Create a partition of the ext4 filesystem type for now. This is necessary since gParted does not always write `exFAT` filesystems.
4. Make an `exFAT` file system using the command line. The USB device may be queried using `lsblk`.

    $ lsblk
    NAME    MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
    sda       8:0    0 931.5G  0 disk 
    ├─sda1    8:1    0 500.7M  0 part /boot/efi
    ├─sda2    8:2    0  58.6G  0 part /
    ├─sda3    8:3    0  29.3G  0 part 
    ├─sda4    8:4    0  29.3G  0 part 
    ├─sda5    8:5    0  29.3G  0 part /mnt/xtra4
    ├─sda6    8:6    0  29.3G  0 part /mnt/xtra3
    ├─sda7    8:7    0  58.6G  0 part /mnt/xtra2
    ├─sda8    8:8    0  58.6G  0 part /mnt/xtra1
    ├─sda9    8:9    0  15.6G  0 part [SWAP]
    ├─sda10   8:10   0 488.3G  0 part /mnt/stuff
    └─sda11   8:11   0 134.1G  0 part /mnt/work
    sdb       8:16   1   1.9G  0 disk 
    └─sdb1    8:17   1   1.9G  0 part /run/media/spherehead/bc1f65c0-9e53-4ee3-88c5-01d73a070672
    sr0      11:0    1  1024M  0 rom  
    
    $ sudo mkfs.exfat /dev/sdb1

5. Eject the USB drive using your file manager (Thunar), pull it out and reinsert it. If that doesn't allow you to write files to the usb stick yet, then reboot your computer, because the Linux kernel might need a reboot to recognize the changes to the partition table and filesystem on the flash drive.

## Check ISO File

It is strongly recommended that the ISO file is not corrupted.

    $ sha1sum manjaro-xfce-17.0.1-stable-x86_64.iso
    5d093986fa0abd54af48ce7912a9a5edfd37dc45  manjaro-xfce-17.0.1-stable-x86_64.iso

Compare the result with the corresponding `sha1` file of the ISO file.
Or much better to let `sha1sum` do the checking.

    $ sha1sum -c manjaro-xfce-17.0.1-stable-x86_64.iso.sha1
    manjaro-xfce-17.0.1-stable-x86_64.iso: OK

## Burn ISO File

To burn an ISO file onto an USB stick, use the following command in a terminal:

    $ sudo dd bs=4M if=<iso file> of=/dev/sd<drive letter> status=progress
    
Where `iso file` is the `.iso` file and may include the path.
The `drive letter` is the letter of your removable device.
Please note that it is the device (e.g. /dev/sdb), and not the partition number (e.g. /dev/sdb1).

    $ sudo dd bs=4M if=manjaro-xfce-17.0.1-stable-x86_64.iso of=/dev/sdb status=progress
    1237319680 bytes (1.2 GB, 1.2 GiB) copied, 64.1835 s, 19.3 MB/s
    389+1 records in
    389+1 records out
    1632399360 bytes (1.6 GB, 1.5 GiB) copied, 64.5223 s, 25.3 MB/s

## Check ISO file

To check an ISO file, use the following command:

    $ sudo fdisk -l manjaro-xfce-17.0.1-stable-x86_64.iso
    Disk manjaro-xfce-17.0.1-stable-x86_64.iso: 1.4 GiB, 1543415808 bytes, 3014484 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x00000000

    Device                                 Boot   Start     End Sectors  Size Id Type
    manjaro-xfce-17.0.1-stable-x86_64.iso1 *         64 3006291 3006228  1.4G cd unknown
    manjaro-xfce-17.0.1-stable-x86_64.iso2      3006292 3014483    8192    4M ef EFI (FAT-12/16/32)

&#x25cf;
