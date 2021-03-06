---
title: PostgreSQL in Manjaro Linux
excerpt: Setting up a PostgreSQL in Manjaro Linux as development database.
date: 2015-11-03T07:43:53UTC
updates:
  - date: 2017-05-18T19:19:01UTC
    message: Edits and corrections
layout: post
categories: [post, database]
tags: [postgresql, manjaro, linux]
published: true
permalink: /posts/b1n4mAMm9P34wNR
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

First, I'm using a Manjaro Linux, an Arch-based Linux distro, where I wanted to run a [PostgreSQL](http://www.postgresql.org/) 9.4.5 local database for development.

1. Database Server Setup
2. PostgreSQL Version
3. Connecting to the Database

## Database Server Setup

##### User &nbsp;`postgres`

The trouble I got into is when logging in as user `postgres`.
I have read somewhere that this is related to my package manager and/or to keep PostgreSQL safe.
I do not have the link where I read it but for now I'll skip it and return later to add the information here.

The first I found was how to become the `postgres` user without being asked for the `postgres` user password (because I don't know the password).
First become the `root` before becoming `postgres` ([link here](https://bbs.archlinux.org/viewtopic.php?id=162075)).

{% highlight bash session linenos %}
$ su -
{%raw%}#{%endraw%} su - postgres
{% endhighlight %}

The last command brought me to `/var/lib/postgres`.

##### Database Initialization

The following command initializes the database storage area on disk; also called _database cluster_ in PostgreSQL and _catalog cluster_ in the SQL standard ([PostgreSQL 9.4.5 Documentation §17.2](http://www.postgresql.org/docs/9.4/interactive/creating-cluster.html)).

{% highlight bash session %}
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

The following command to run the database server in the background as suggested in the documentation produces an error.
(More information about this in an update).

{% highlight bash linenos %}
$ postgres -D /var/lib/postgres/data/ >logfile 2>&1 &
[1] 8041
$ -bash: logfile: Permission denied
{% endhighlight %}

The database server may be started using `systemctl`.
It runs the database server in the background so there is no need to keep an open console as when using the `postgres` command.

~~~
$ sudo systemctl start postgresql
~~~

##### Stopping the Database Server

The corresponding command to stop a running database server is

~~~
$ sudo systemctl stop postgresql
~~~

##### Check Status of PostgreSQL Server

PostgreSQL has a [utility](https://www.postgresql.org/docs/9.3/static/app-pg-isready.html) that checks the connection status of a PostgreSQL server.

When the server has not been started the utility will have the following output.

~~~
$ pg_isready 
/run/postgresql:5432 - no response
~~~

Otherwise,

~~~
$ pg_isready
/run/postgresql:5432 - accepting connections
~~~

## PostgreSQL Version

There are a number of ways to check the PostgreSQL version information; through the commandline and inside the PostgreSQL client application.

### Commandline Interface
One can check the PostgreSQL version from the operating system commandline interface.

###### Server version

{% highlight bash %}
$ pg_config --version
PostgreSQL 9.5.1
$ postgres -V
postgres (PostgreSQL) 9.5.1
{% endhighlight %}

###### Client version

{% highlight bash %}
$ psql --version
psql (PostgreSQL) 9.5.1
{% endhighlight %}

### `psql` Interface

One can also query the database version from the PostgreSQL commandline client application.
The database server must be running and one must be connected to it.

{% highlight bash %}
$ psql -d postgres -U postgres -h localhost
psql (9.5.1)
Type "help" for help.
{% endhighlight %}

###### SELECT version()

{% highlight bash session %}
postgres=# SELECT version();
                                   version                                    
------------------------------------------------------------------------------
 PostgreSQL 9.5.1 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 5.3.0, 64-bit
(1 row)
{% endhighlight %}

###### `server_version`

{% highlight bash session %}
postgres=# SHOW server_version;
 server_version 
----------------
 9.5.1
(1 row)
{% endhighlight %}

###### `server_version_num`

{% highlight bash session %}
postgres=# SHOW server_version_num;
 server_version_num 
--------------------
 90501
(1 row)
{% endhighlight %}

## Connecting to the Database

##### `pgAdmin` Application

pgAdmin 1.20..0.
Using pgAdmin3 to create a database requires that the database server is running.

Create a server from the menu `File | Add Server` and the New Server Registration window will prompt the user for information.

There are four (4) tab pages but focus will be in the Properties tab page.
The Properties tab page have these information among others that will be useful when connecting to a database:

* Name - name of the server
* Host - host to connect to (or localhost)
* Port - port to connect to (default is 5432)
* Username
* Password

Creating a new server automatically creates a default database named `postgres`.

I can connect to the database server from the commandline.

~~~
psql -d postgres -U postgres -h localhost
~~~

Check the current logged in user.

{% highlight bash session %}
postgres=# select current_user;
 current_user 
--------------
 postgres
(1 row)
{% endhighlight %}

Terminate the commandline session by typing `\quit`.
See [https://www.postgresql.org/docs/9.2/static/app-psql.html](https://www.postgresql.org/docs/9.2/static/app-psql.html) for other `psql` arguments.

##### Server Instrumentation

If prompted to install the server instrumentation, just use the `create extension` command:

~~~
postgres=# create extension adminpack;
CREATE EXTENSION
~~~

The command will install the `adminpack` extensionn that is found in `/usr/share/postgresql/extension`.

##### Create Group Role

Create group and user role.
Make the user able to connect to the database.

{% highlight bash session linenos %}
postgres=# create role sphere_users superuser;
CREATE ROLE
postgres=# create role user1 login;
CREATE ROLE
postgres=# grant sphere_users to user1;
GRANT ROLE
{% endhighlight %}

##### ODBC

One can also connect to the database via ODBC.
[UnixODBC](www.unixodbc.org) 2.3.4 was released on 31 August 2015 and is available in Manjaro Linux.
This [link](https://wiki.archlinux.org/index.php/Open_Database_Connectivity) talks about ODBC in Arch Linux.

{% highlight bash session linenos %}
$ cat /etc/odbcinst.ini 
[PostgreSQL]
Description = PostgreSQL ODBC Driver
Driver = /usr/lib/psqlodbcw.so
; Used in GUI ODBC administration applicationn
; Setup = /usr/lib/libodbcinst.so
FileUsage = 1
{% endhighlight %}

Display the contents of `odbc.ini` file.

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
