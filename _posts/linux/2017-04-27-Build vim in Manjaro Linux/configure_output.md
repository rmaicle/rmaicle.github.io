---
title: Build `vim` in Manjaro Linux
layout: post
categories: [supplement]
published: true
permalink: /posts/NgVX8g15ZMd29wZ/configure_output
---

Output of the `configure` command for building `vim`.

<pre>
$ ./configure --with-features=huge \
              --enable-multibyte \
              --enable-rubyinterp=yes \
              --enable-pythoninterp=yes \
              --enable-python3interp=yes \
              --with-python3-config-dir=/usr/lib/python3.5/config-3.6m-x86_64-linux-gnu \
              --enable-perlinterp=yes \
              --enable-luainterp=yes \
              --enable-gui=gtk2 --enable-cscope --prefix=/usr
configure: loading cache auto/config.cache
checking whether make sets $(MAKE)... (cached) yes
checking for gcc... (cached) gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables... 
checking whether we are cross compiling... no
checking for suffix of object files... (cached) o
checking whether we are using the GNU C compiler... (cached) yes
checking whether gcc accepts -g... (cached) yes
checking for gcc option to accept ISO C89... (cached) none needed
checking how to run the C preprocessor... (cached) gcc -E
checking for grep that handles long lines and -e... (cached) /usr/bin/grep
checking for egrep... (cached) /usr/bin/grep -E
checking for fgrep... (cached) /usr/bin/grep -F
checking for library containing strerror... (cached) none required
checking for gawk... (cached) gawk
checking for strip... (cached) strip
checking for ANSI C header files... (cached) yes
checking for sys/wait.h that is POSIX.1 compatible... (cached) yes
checking --enable-fail-if-missing argument... no
checking for clang version... N/A
configure: checking for buggy tools...
- sh is	'GNU bash, version 4.4.12(1)-release (x86_64-unknown-linux-gnu)
Copyright (C) 2016 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.' - probably OK.
checking for BeOS... no
checking for QNX... no
checking for Darwin (Mac OS X)... no
checking for AvailabilityMacros.h... (cached) no
checking --with-local-dir argument... Defaulting to /usr/local
checking --with-vim-name argument... Defaulting to vim
checking --with-ex-name argument... Defaulting to ex
checking --with-view-name argument... Defaulting to view
checking --with-global-runtime argument... no
checking --with-modified-by argument... no
checking if character set is EBCDIC... no
checking --disable-smack argument... no
checking for linux/xattr.h... (cached) yes
checking for attr/xattr.h... (cached) yes
checking for XATTR_NAME_SMACKEXEC in linux/xattr.h... no
checking --disable-selinux argument... no
checking for is_selinux_enabled in -lselinux... (cached) no
checking --with-features argument... huge
checking --with-compiledby argument... no
checking --disable-xsmp argument... no
checking --disable-xsmp-interact argument... no
checking --enable-luainterp argument... yes
checking --with-lua-prefix argument... no
checking LUA_PREFIX environment var... not set, default to /usr
checking --with-luajit... no
checking for lua... (cached) /usr/bin/lua
checking Lua version... (cached) 5.3
checking if lua.h can be found in /usr/include... yes
checking if link with -L/usr/lib -llua is sane... yes
checking --enable-mzschemeinterp argument... no
checking --enable-perlinterp argument... yes
checking for perl... (cached) /usr/bin/perl
checking Perl version... OK
checking if compile and link flags for Perl are sane... yes
checking --enable-pythoninterp argument... yes
checking for python2... (cached) /usr/bin/python2
checking Python version... (cached) 2.7
checking Python is 2.3 or better... yep
checking Python's install prefix... (cached) /usr
checking Python's execution prefix... (cached) /usr
(cached) checking Python's configuration directory... (cached) /usr/lib/python2.7/config
(cached) checking Python's dll name... (cached) libpython2.7.so.1.0
checking if -pthread should be used... yes
checking if compile and link flags for Python are sane... yes
checking --enable-python3interp argument... yes
checking for python3... (cached) /usr/bin/python3
checking Python version... (cached) 3.6
checking Python is 3.0 or better... yep
checking Python's abiflags... (cached) m
checking Python's install prefix... (cached) /usr
checking Python's execution prefix... (cached) /usr
(cached) checking Python's configuration directory... (cached)
         /usr/lib/python3.5/config-3.6m-x86_64-linux-gnu
(cached) checking Python3's dll name... (cached) 
checking if -pthread should be used... yes
checking if compile and link flags for Python 3 are sane... yes
checking whether we can do without RTLD_GLOBAL for Python... yes
checking whether we can do without RTLD_GLOBAL for Python3... no
checking --enable-tclinterp argument... no
checking --enable-rubyinterp argument... yes
checking --with-ruby-command argument... defaulting to ruby
checking for ruby... (cached) /usr/bin/ruby
checking Ruby version... OK
checking Ruby rbconfig... RbConfig
checking Ruby header files... /usr/include/ruby-2.4.0
checking --enable-cscope argument... yes
checking --enable-workshop argument... no
checking --disable-netbeans argument... no
checking --disable-channel argument... no
checking for socket in -lsocket... (cached) no
checking for gethostbyname in -lnsl... (cached) yes
checking whether compiling with process communication is possible... yes
checking --enable-multibyte argument... yes
checking --enable-hangulinput argument... no
checking --enable-xim argument... defaulting to auto
checking --enable-fontset argument... no
checking for xmkmf... (cached) /usr/bin/xmkmf
checking for X... (cached) libraries , headers 
checking for gethostbyname... (cached) yes
checking for connect... (cached) yes
checking for remove... (cached) yes
checking for shmat... (cached) yes
checking for IceConnectionNumber in -lICE... (cached) yes
checking if X11 header files can be found... yes
checking for _XdmcpAuthDoIt in -lXdmcp... (cached) yes
checking for IceOpenConnection in -lICE... (cached) yes
checking for XpmCreatePixmapFromData in -lXpm... (cached) yes
checking if X11 header files implicitly declare return values... no
checking size of wchar_t is 2 bytes... (cached) no
checking --enable-gui argument... GTK+ 2.x GUI support
checking --disable-gtktest argument... gtk test enabled
checking for pkg-config... (cached) /usr/bin/pkg-config
checking for GTK - version >= 2.2.0... yes; found version 2.24.31
checking version of Gdk-Pixbuf... OK.
checking for glib-compile-resources... (cached) /usr/bin/glib-compile-resources
checking glib-compile-resources... usable.
checking --disable-icon-cache-update argument... not set
checking for gtk-update-icon-cache... (cached) /usr/bin/gtk-update-icon-cache
checking --disable-desktop-database-update argument... not set
checking for update-desktop-database... (cached) /usr/bin/update-desktop-database
checking for X11/SM/SMlib.h... (cached) yes
checking for X11/xpm.h... (cached) yes
checking for X11/Sunkeysym.h... (cached) yes
checking for XIMText in X11/Xlib.h... yes
X GUI selected; xim has been enabled
checking for /proc link to executable... /proc/self/exe
checking for CYGWIN or MSYS environment... no
checking whether toupper is broken... (cached) no
checking whether __DATE__ and __TIME__ work... yes
checking whether __attribute__((unused)) is allowed... yes
checking for elf.h... (cached) yes
checking for main in -lelf... (cached) yes
checking for dirent.h that defines DIR... (cached) yes
checking for library containing opendir... (cached) none required
checking for stdint.h... (cached) yes
checking for stdlib.h... (cached) yes
checking for string.h... (cached) yes
checking for sys/select.h... (cached) yes
checking for sys/utsname.h... (cached) yes
checking for termcap.h... (cached) yes
checking for fcntl.h... (cached) yes
checking for sgtty.h... (cached) yes
checking for sys/ioctl.h... (cached) yes
checking for sys/time.h... (cached) yes
checking for sys/types.h... (cached) yes
checking for termio.h... (cached) yes
checking for iconv.h... (cached) yes
checking for inttypes.h... (cached) yes
checking for langinfo.h... (cached) yes
checking for math.h... (cached) yes
checking for unistd.h... (cached) yes
checking for stropts.h... (cached) yes
checking for errno.h... (cached) yes
checking for sys/resource.h... (cached) yes
checking for sys/systeminfo.h... (cached) no
checking for locale.h... (cached) yes
checking for sys/stream.h... (cached) no
checking for termios.h... (cached) yes
checking for libc.h... (cached) no
checking for sys/statfs.h... (cached) yes
checking for poll.h... (cached) yes
checking for sys/poll.h... (cached) yes
checking for pwd.h... (cached) yes
checking for utime.h... (cached) yes
checking for sys/param.h... (cached) yes
checking for libintl.h... (cached) yes
checking for libgen.h... (cached) yes
checking for util/debug.h... (cached) no
checking for util/msg18n.h... (cached) no
checking for frame.h... (cached) no
checking for sys/acl.h... (cached) yes
checking for sys/access.h... (cached) no
checking for sys/sysinfo.h... (cached) yes
checking for wchar.h... (cached) yes
checking for wctype.h... (cached) yes
checking for sys/ptem.h... (cached) no
checking for sys/sysctl.h... (cached) yes
checking for pthread_np.h... no
checking for strings.h... (cached) yes
checking if strings.h can be included after string.h... yes
checking whether gcc needs -traditional... (cached) no
checking for an ANSI C-conforming const... (cached) yes
checking for working volatile... (cached) yes
checking for mode_t... (cached) yes
checking for off_t... (cached) yes
checking for pid_t... (cached) yes
checking for size_t... (cached) yes
checking for uid_t in sys/types.h... (cached) yes
checking for uint32_t... (cached) yes
checking whether time.h and sys/time.h may both be included... (cached) yes
checking for ino_t... (cached) yes
checking for dev_t... (cached) yes
checking whether byte ordering is bigendian... (cached) no
checking for inline... (cached) inline
checking for rlim_t... (cached) yes
checking for stack_t... (cached) yes
checking whether stack_t has an ss_base field... no
checking --with-tlib argument... empty: automatic terminal library selection
checking for tgetent in -ltinfo... (cached) no
checking for tgetent in -lncurses... (cached) yes
checking whether we talk terminfo... (cached) yes
checking what tgetent() returns for an unknown terminal... (cached) zero
checking whether termcap.h contains ospeed... yes
checking whether termcap.h contains UP, BC and PC... yes
checking whether tputs() uses outfuntype... no
checking whether sys/select.h and sys/time.h may both be included... yes
checking for /dev/ptc... no
checking for SVR4 ptys... yes
checking for ptyranges... don't know
checking default tty permissions/group... (cached) world
checking return type of signal handlers... (cached) void
checking for struct sigcontext... yes
checking getcwd implementation is broken... (cached) no
checking for fchdir... (cached) yes
checking for fchown... (cached) yes
checking for fsync... (cached) yes
checking for getcwd... (cached) yes
checking for getpseudotty... (cached) no
checking for getpwent... (cached) yes
checking for getpwnam... (cached) yes
checking for getpwuid... (cached) yes
checking for getrlimit... (cached) yes
checking for gettimeofday... (cached) yes
checking for getwd... (cached) yes
checking for lstat... (cached) yes
checking for memset... (cached) yes
checking for mkdtemp... (cached) yes
checking for nanosleep... (cached) yes
checking for opendir... (cached) yes
checking for putenv... (cached) yes
checking for qsort... (cached) yes
checking for readlink... (cached) yes
checking for select... (cached) yes
checking for setenv... (cached) yes
checking for getpgid... (cached) yes
checking for setpgid... (cached) yes
checking for setsid... (cached) yes
checking for sigaltstack... (cached) yes
checking for sigstack... (cached) yes
checking for sigset... (cached) yes
checking for sigsetjmp... (cached) no
checking for sigaction... (cached) yes
checking for sigprocmask... (cached) yes
checking for sigvec... (cached) no
checking for strcasecmp... (cached) yes
checking for strerror... (cached) yes
checking for strftime... (cached) yes
checking for stricmp... (cached) no
checking for strncasecmp... (cached) yes
checking for strnicmp... (cached) no
checking for strpbrk... (cached) yes
checking for strtol... (cached) yes
checking for tgetent... (cached) yes
checking for towlower... (cached) yes
checking for towupper... (cached) yes
checking for iswupper... (cached) yes
checking for usleep... (cached) yes
checking for utime... (cached) yes
checking for utimes... (cached) yes
checking for _LARGEFILE_SOURCE value needed for large files... (cached) no
checking for special C compiler options needed for large files... (cached) no
checking for _FILE_OFFSET_BITS value needed for large files... (cached) no
checking for st_blksize... yes
checking whether stat() ignores a trailing slash... (cached) no
checking for iconv_open()... yes
checking for nl_langinfo(CODESET)... yes
checking for strtod in -lm... (cached) yes
checking for strtod() and other floating point functions... yes
checking for isinf()... yes
checking for isnan()... yes
checking --disable-acl argument... no
checking for acl_get_file in -lposix1e... (cached) no
checking for acl_get_file in -lacl... (cached) yes
checking for fgetxattr in -lattr... (cached) yes
checking for POSIX ACL support... yes
checking for acl_get in -lsec... (cached) no
checking for Solaris ACL support... no
checking for AIX ACL support... no
checking for pango_shape_full... yes
checking --disable-gpm argument... no
checking for gpm... (cached) yes
checking --disable-sysmouse argument... no
checking for sysmouse... (cached) no
checking for FD_CLOEXEC... yes
checking for rename... yes
checking for sysctl... not usable
checking for sysinfo... yes
checking for sysinfo.mem_unit... yes
checking for sysconf... yes
checking size of int... (cached) 4
checking size of long... (cached) 8
checking size of time_t... (cached) 8
checking size of off_t... (cached) 8
checking uint32_t is 32 bits... ok
checking whether memmove handles overlaps... (cached) yes
checking whether X_LOCALE needed... no
checking whether Xutf8SetWMProperties() can be used... yes
checking for _xpg4_setrunelocale in -lxpg4... (cached) no
checking how to create tags... ctags
checking how to run man with a section nr... man -s
checking --disable-nls argument... no
checking for msgfmt... (cached) msgfmt
checking for NLS... gettext() works
checking for bind_textdomain_codeset... (cached) yes
checking for _nl_msg_cat_cntr... yes
checking for dlfcn.h... (cached) yes
checking for dlopen()... no
checking for dlopen() in -ldl... yes
checking for dlsym()... yes
checking for setjmp.h... (cached) yes
checking for GCC 3 or later... yes
checking whether we need -D_FORTIFY_SOURCE=1... yes
checking linker --as-needed support... yes
configure: updating cache auto/config.cache
configure: creating auto/config.status
config.status: creating auto/config.mk
config.status: creating auto/config.h
config.status: auto/config.h is unchanged
</pre>
