---
title: PostgreSQL in Manjaro Linux
excerpt: Setting up a development PostgreSQL database
date: November 03, 2015
group: Posts
categories: [Blog]
tags: [dlang, programming]
---

First, I'm using a Manjaro Linux, an Arch-based Linux distro, where I wanted to run a [PostgreSQL](http://www.postgresql.org/) 9.4.5 local database for development.

## Database Server Setup

##### User &nbsp;`postgres`

The trouble I got into is when logging in as user `postgres`.
I have read somewhere that this is related to my package manager and/or to keep PostgreSQL safe.
I forgot where I read those but for now I'll skip it and return later to add those information here.

The first I found was how to become the `postgres` user without being asked for the `postgres` user password (because I don't know the password).
First become the `root` before becoming `postgres` ([link here](https://bbs.archlinux.org/viewtopic.php?id=162075)).

{% highlight bash session linenos %}
$ su -
{%raw%}#{%endraw%} su - postgres
{% endhighlight %}

The last command brought me to `/var/lib/postgres`.

##### Database Initialization

I need now to initialize the database storage area on disk, also called _database cluster_ in PostgreSQL and _catalog cluster_ in the SQL standard ([PostgreSQL 9.4.5 Documentation §17.2](http://www.postgresql.org/docs/9.4/interactive/creating-cluster.html)).

{% highlight bash session linenos %}
$ initdb --locale en_PH.UTF-8 -E UTF8 -D '/var/lib/postgres/data'
{% endhighlight %}
    
The directory `/var/lib/postgres/data` is called _data directory_ or _data area_.
PostgreSQL documentation says that the command must be executed while logged as PostgrSQL user account which is the reason I needed to do the first step above.

##### Starting the Database Server

The database server application is `postgres`.
The user must supply the initialized _database cluser_ as a parameter.

{% highlight bash session linenos %}
$ postgres -D /var/lib/postgres/data
LOG:  database system was shut down at 2015-11-12 10:34:28 PHT
LOG:  MultiXact member wraparound protections are now enabled
LOG:  database system is ready to accept connections
LOG:  autovacuum launcher started
{% endhighlight %}

To terminate the above process, press `Ctrl+C`.

{% highlight bash session linenos %}
^C
LOG:  received fast shutdown request
LOG:  aborting any active transactions
LOG:  autovacuum launcher shutting down
LOG:  shutting down
LOG:  database system is shut down
{% endhighlight %}

I tried the following command to run the database server in the backround as suggested in the documentation but I encountered an error.
I will try to provide more information about this later on.

{% highlight bash session linenos %}
$ postgres -D /var/lib/postgres/data/ >logfile 2>&1 &
[1] 8041
$ -bash: logfile: Permission denied
{% endhighlight %}

I prefer starting and stopping the database server with the `systemctl` command.
The command to start the database server runs it in the background so I do not need to keep an open console as when using the `postgres` command.

{% highlight bash session linenos %}
sudo systemctl start postgresql
sudo systemctl stop postgresql
{% endhighlight %}

## Connecting to the Database

##### pgAdmin

pgAdmin 1.20..0.
Using pgAdmin3 to create a database requires that the database server is running.

Create a server from the menu `File | Add Server` and the New Server Registration window will prompt the user for information.

There are four (4) tab pages but focus will be in the Properties tab page.
The Properties tab page have these information among others that will be useful when connecting to a database:

* Name - name of the server
* Host
* Port
* Username
* Password

Creating a new server automatically creates a default database named `postgres`.

I can connect to the database server using the following command:

    psql -d postgres -U postgres -h localhost

##### Create New User

Create new user roles to connect to the database.
Must be superuser otherwise the following error will result:

{% highlight bash session linenos %}
$ psql -d sphere -U role_test -h localhost
psql: FATAL:  remaining connection slots are reserved for non-replication superuser connections
{% endhighlight %}
    
I also need to be able to connect to the database via ODBC.
I'm using unixODBC 2.3.4 which is available in Manjaro Linux.

{% highlight bash session linenos %}
$ cat /etc/odbcinst.ini 
[PostgreSQL]
Description = PostgreSQL ODBC Driver
Driver = /usr/lib/psqlodbcw.so
; Used in GUI ODBC administration applicationn
; Setup = /usr/lib/libodbcinst.so
FileUsage = 1
{% endhighlight %}

{% highlight bash session linenos %}
$ cat /etc/odbc.ini
[Test PostgreSQL]
Description         = Test Postgres ODBC
Driver              = PostgreSQL
Trace               = Yes
TraceFile           = sql.log
Database            = <dbname>
Servername          = localhost
UserName            = <username>
Password            = <password>
Port                = 5432
Protocol            = 9.4
ReadOnly            = No
RowVersioning       = No
ShowSystemTables    = No
ShowOidColumn       = No
FakeOidIndex        = No
ConnSettings        =
{% endhighlight %}
