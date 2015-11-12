---
title: PostgreSQL in Manjaro Linux
excerpt: How I created and run my development PostgreSQL database
categories: [Blog]
tags: [dlang, programming]
---

First, I'm using a Manjaro Linux distribution which is an Arch-based Linux distro where I wanted to run my [PostgreSQL](http://www.postgresql.org/) 9.4.5 database locally for development.
The trouble I got into is when logging in as user `postgres`.
I have read somewhere that this is related to my package manager and/or to keep PostgreSQL safe.
I forgot where I read those but for now I'll skip it and return later to add those information here.

##### User &nbsp;`postgres`
The first I found was how to become the `postgres` user without being asked for the `postgres` user password (because I don't know the password).
First become the `root` before becoming `postgres` ([link here](https://bbs.archlinux.org/viewtopic.php?id=162075)).

	$ su -
	# su - postgres

The last command brought me to `/var/lib/postgres`.

##### Database Initialization

I need now to initialize the database storage area on disk, also called _database cluster_ in PostgreSQL and _catalog cluster_ by SQL ($PostgreSQL 17.2).

    $ initdb --locale en_PH.UTF-8 -E UTF8 -D '/var/lib/postgres/data'
    
The directory `/var/lib/postgres/data` is called _data directory_ or _data area_.
PostgreSQL documentation says that the command must be executed while logged as PostgrSQL user account which is the reason I needed to do the first step above.

##### Starting the Database Server

THe database server application is `postgres`.
The user must supply the initialized _database cluser_ as a parameter.

    $ postgres -D /var/lib/postgres/data
    LOG:  database system was shut down at 2015-11-12 10:34:28 PHT
    LOG:  MultiXact member wraparound protections are now enabled
    LOG:  database system is ready to accept connections
    LOG:  autovacuum launcher started

To terminate the above process, press Ctrl+C.

    ^CLOG:  received fast shutdown request
    LOG:  aborting any active transactions
    LOG:  autovacuum launcher shutting down
    LOG:  shutting down
    LOG:  database system is shut down

I tried the following command to run the database server in the backround as suggested in the documentation but I encountered an error.
I will try to provide more information about this later on.

    $ postgres -D /var/lib/postgres/data/ >logfile 2>&1 &
    [1] 8041
    $ -bash: logfile: Permission denied

I prefer starting and stopping the database server with the `systemctl` command.

    sudo systemctl start postgresql
    sudo systemctl stop postgresql
