---
title: Build `vim` in Manjaro Linux
date: 2017-04-27T15:31:32UTC
excerpt: The default `vim` build packaged with Manjaro Linux did not include the clientserver feature which was necessary to make `vim` work with `ranger` inside `tilix` which was both recently explored.
layout: post
categories: [post, linux]
tags: [vim, manjaro, tilix, ranger]
published: true
permalink: /posts/NgVX8g15ZMd29wZ
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
  - label: Building Vim from source (Valloric)
    link: https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source
related:
---

The default `vim` build packaged with [Manjaro Linux](https://manjaro.org) did not include the clientserver feature which was necessary to make `vim` work with `ranger` inside `tilix` which was both recently explored. This post shows how I built `vim` fresh from its repository.

Tilix (1.5.6)
: [Tilix](https://gnunn1.github.io/tilix-web/) is an advanced GTK+3 tiling terminal emulator using the VTE (Virtual Terminal Emulator) GTK widget. The application was designed in conformance to the  Gnome Human Interface Guidelines. Tilix is programmed using the D Programming Language using the D Language port of GTK+3.

Ranger (1.8.1)
: [Ranger](http://ranger.nongnu.org) is a minimalistic console file manager in Linux with VI key bindings.

The `vim` packaged with Manjaro Linux XFCE 17.0.1 (Gellivara) [update 2017-04-23](manjaro.org/2017/04/23/stable-update-2017-04-23-kernels-kde-framework-mesa-budgie/) is at version 8.0. I followed the steps detailed in this [post](https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source) by Val Markovic.

Here are the steps in building `vim`:

1. Install required libraries.
2. Remove `vim` if installed.
3. Get the `vim` sources.
4. Build and install.

## Install Required Libraries for Building `vim`

The currently installed versions of the libraries on my system.

| Libraries   | Version | Description |
|-------------|---------|-------------|
| ncurses     | 6.0     | Programming library providing an application programming interface (API) that allows the programmer to write text-based user interfaces in a terminal-independent manner. [link](https://www.gnu.org/software/ncurses/ncurses.html)
| libgnome    | 2.32.1  | Gnome Library [[link](developer.gnome.org/libgnome/stable/)]
| gtk2        | 2.24.31 | Cross-platform GUI toolkit [[link](https://www.gtk.org)]
| atk         | 2.24.0  | Accessibility Toolkit (ATK) refers in particular to the GNOME ATK, an application programming interface (API) for developing free/open source accessible applications for platforms such as Linux or OpenBSD. [[link](https://wiki.gnome.org/Accessibility)]
| libbonoboui | 2.24.5  | Programming library that provides a number of user interface controls using the Bonobo component framework. [[link](https://developer.gnome.org/libbonobo/stable/index.html)] [[link](http://www.djcbsoftware.nl/projecten/nluug-bonobo/)]
| cairo       | 1.14.8  | Programming library that provides a vector graphics-based, device-independent API for software developers. [[link](https://www.cairographics.org)]
| libx11      | 1.6.5   | An X Window System protocol client library containing functions for interacting with an X server. These functions allow programmers to write programs without knowing the details of the protocol. [[link](https://www.x.org/archive/X11R7.5/doc/libX11/libX11.html)]
| libxpm      | 3.5.12  | X11 pixmap library [[link](https://xorg.freedesktop.org/wiki/)]
| libxt       | 1.1.5   | X11 toolkit intrinsics library [[link](https://xorg.freedesktop.org/wiki/)]
| python      | 3.6.0   | A high-level programming language for general-purpose programming, created by Guido van Rossum and first released in 1991. [[link](https://www.python.org)]
| ruby        | 2.4.0   | Is a dynamic, reflective, object-oriented, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan. [[link](https://www.ruby-lang.org/)]
| lua51       | 5.1.5   | A powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, functional programming, data-driven programming, and data description. [[link](https://www.lua.org)]
| perl        | 5.24.1  | Is a high-level, general-purpose, interpreted, dynamic programming language which had its roots and was optimized for scanning arbitrary text files, extracting information from those text files, and printing reports based on that information. [[link](https://www.perl.org)]
| git         | 2.12.2  | Is a distributed version control system created by Linus Torvalds in 2005 for the development of the Linux kernel aimed for speed, data integrity and non-linear workflow [[link](https://git-scm.com)]

Execute the following commands or put in a script:

~~~
$ sudo pacman -S ncurses
$ sudo pacman -S libgnome
$ sudo pacman -S libgnomeui
$ sudo pacman -S gtk2
$ sudo pacman -S atk
$ sudo pacman -S libbonoboui
$ sudo pacman -S cairo
$ sudo pacman -S libx11
$ sudo pacman -S libxpm
$ sudo pacman -S libxt
$ sudo pacman -S python
$ sudo pacman -S ruby
$ sudo pacman -S lua51
$ sudo pacman -S perl
$ sudo pacman -S git
~~~

## Remove `vim`

If it is possible, remove `vim` from the system.
Currently, `cppman` is installed which is dependent on `vim` which I did not uninstall and gambled that things would turn out well.

~~~
$ sudo pacman -R vim
~~~

## Get the `vim` sources

The `vim` sources is in [https://github.com/vim/vim.git](https://github.com/vim/vim.git).
This is the only reason it was necessary to install `git`.

~~~
$ git clone https://github.com/vim/vim.git
~~~
    
Since `vim` only needed to be built, the following command uses the "shallow clone".
By providing the argument `--depth 1`, git is instructed to get the latest revision or the current HEAD of everything in the repository.

## Build and Install

Before building, the `configure` script needs to know the _python configuration directory_.
On Manjaro XFCE, python 3.5 configuration directory is `/usr/lib/python3.5/config-3.6m-x86_64-linux-gnu`.
The argument `--with-features=huge` includes the `clientserver` feature along with others I have not bothered to exclude.
So, the build may be a little bloated.
Excluding features that will not be used is a good idea and necessary if one wants to minimize resource use.

~~~
$ cd vim
$ ./configure --with-features=huge \
              --enable-multibyte \
              --enable-rubyinterp=yes \
              --enable-pythoninterp=yes \
              --enable-python3interp=yes \
              --with-python3-config-dir=/usr/lib/python3.5/config-3.6m-x86_64-linux-gnu \
              --enable-perlinterp=yes \
              --enable-luainterp=yes \
              --enable-gui=gtk2 --enable-cscope --prefix=/usr
~~~

To build, run the command:

~~~
$ make VIMRUNTIMEDIR=/usr/share/vim/vim80
~~~

Then to install:

~~~
$ sudo make install
~~~

Here is the output of of the `--version` argument of the newly built `vim`.
I noticed that I have built it with `GTK2 GUI` application which the packaged build did not have.
Maybe, I need to reconfigure and rebuild.

~~~
$ vim --version
VIM - Vi IMproved 8.0 (2016 Sep 12, compiled Apr 28 2017 00:39:16)
Included patches: 1-586
Compiled by spherehead@sphere-0
Huge version with GTK2 GUI.  Features included (+) or not (-):
+acl             +file_in_path    +mouse_sgr       +tag_old_static
+arabic          +find_in_path    -mouse_sysmouse  -tag_any_white
+autocmd         +float           +mouse_urxvt     -tcl
+balloon_eval    +folding         +mouse_xterm     +termguicolors
+browse          -footer          +multi_byte      +terminfo
++builtin_terms  +fork()          +multi_lang      +termresponse
+byte_offset     +gettext         -mzscheme        +textobjects
+channel         -hangul_input    +netbeans_intg   +timers
+cindent         +iconv           +num64           +title
+clientserver    +insert_expand   +packages        +toolbar
+clipboard       +job             +path_extra      +user_commands
+cmdline_compl   +jumplist        +perl            +vertsplit
+cmdline_hist    +keymap          +persistent_undo +virtualedit
+cmdline_info    +lambda          +postscript      +visual
+comments        +langmap         +printer         +visualextra
+conceal         +libcall         +profile         +viminfo
+cryptv          +linebreak       +python/dyn      +vreplace
+cscope          +lispindent      +python3/dyn     +wildignore
+cursorbind      +listcmds        +quickfix        +wildmenu
+cursorshape     +localmap        +reltime         +windows
+dialog_con_gui  +lua             +rightleft       +writebackup
+diff            +menu            +ruby            +X11
+digraphs        +mksession       +scrollbind      -xfontset
+dnd             +modify_fname    +signs           +xim
-ebcdic          +mouse           +smartindent     +xpm
+emacs_tags      +mouseshape      +startuptime     +xsmp_interact
+eval            +mouse_dec       +statusline      +xterm_clipboard
+ex_extra        +mouse_gpm       -sun_workshop    -xterm_save
+extra_search    -mouse_jsbterm   +syntax          
+farsi           +mouse_netterm   +tag_binary      
   system vimrc file: "$VIM/vimrc"
     user vimrc file: "$HOME/.vimrc"
 2nd user vimrc file: "~/.vim/vimrc"
      user exrc file: "$HOME/.exrc"
  system gvimrc file: "$VIM/gvimrc"
    user gvimrc file: "$HOME/.gvimrc"
2nd user gvimrc file: "~/.vim/gvimrc"
       defaults file: "$VIMRUNTIME/defaults.vim"
    system menu file: "$VIMRUNTIME/menu.vim"
  fall-back for $VIM: "/usr/share/vim"
 f-b for $VIMRUNTIME: "/usr/share/vim/vim80"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H -DFEAT_GUI_GTK  -pthread
-I/usr/include/gtk-2.0 -I/usr/lib/gtk-2.0/include -I/usr/include/pango-1.0
-I/usr/include/atk-1.0 -I/usr/include/cairo -I/usr/include/pixman-1
-I/usr/include/libdrm -I/usr/include/gdk-pixbuf-2.0 -I/usr/include/libpng16
-I/usr/include/pango-1.0 -I/usr/include/freetype2 -I/usr/include/libpng16
-I/usr/include/harfbuzz -I/usr/include/glib-2.0 -I/usr/lib/glib-2.0/include
-I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/harfbuzz
-I/usr/include/glib-2.0 -I/usr/lib/glib-2.0/include
-g -O2 -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1
Linking: gcc -L. -Wl,-O1,--sort-common,--as-needed,-z,relro -fstack-protector
-rdynamic -Wl,-export-dynamic -Wl,-E -Wl,-rpath,/usr/lib/perl5/core_perl/CORE
-L/usr/local/lib -Wl,--as-needed -o vim -lgtk-x11-2.0 -lgdk-x11-2.0
-lpangocairo-1.0 -latk-1.0 -lcairo -lgdk_pixbuf-2.0 -lgio-2.0 -lpangoft2-1.0
-lpango-1.0 -lgobject-2.0 -lglib-2.0 -lfontconfig -lfreetype
-lSM -lICE -lXpm -lXt -lX11 -lXdmcp -lSM -lICE  -lm -lncurses -lelf -lnsl -lacl
-lattr -lgpm -ldl -L/usr/lib -llua -Wl,-E -Wl,-rpath,/usr/lib/perl5/core_perl/CORE
-Wl,-O1,--sort-common,--as-needed,-z,relro -fstack-protector-strong -L/usr/local/lib
-L/usr/lib/perl5/core_perl/CORE -lperl -lpthread -lnsl -ldl -lm -lcrypt -lutil -lc
-lruby -lpthread -lgmp -ldl -lcrypt -lm
~~~

## Other Command Outputs (Extra)

The following commmand outputs are for references only.
They are included only for details.

##### Packaged `vim` build

~~~
$ vim --version
VIM - Vi IMproved 8.0 (2016 Sep 12, compiled Mar  6 2017 14:13:23)
Included patches: 1-427
Compiled by Arch Linux
Huge version without GUI.  Features included (+) or not (-):
+acl             +file_in_path    +mouse_sgr       +tag_old_static
+arabic          +find_in_path    -mouse_sysmouse  -tag_any_white
+autocmd         +float           +mouse_urxvt     +tcl/dyn
-balloon_eval    +folding         +mouse_xterm     +termguicolors
-browse          -footer          +multi_byte      +terminfo
++builtin_terms  +fork()          +multi_lang      +termresponse
+byte_offset     +gettext         -mzscheme        +textobjects
+channel         -hangul_input    +netbeans_intg   +timers
+cindent         +iconv           +num64           +title
-clientserver    +insert_expand   +packages        -toolbar
-clipboard       +job             +path_extra      +user_commands
+cmdline_compl   +jumplist        +perl/dyn        +vertsplit
+cmdline_hist    +keymap          +persistent_undo +virtualedit
+cmdline_info    +lambda          +postscript      +visual
+comments        +langmap         +printer         +visualextra
+conceal         +libcall         +profile         +viminfo
+cryptv          +linebreak       +python/dyn      +vreplace
+cscope          +lispindent      +python3/dyn     +wildignore
+cursorbind      +listcmds        +quickfix        +wildmenu
+cursorshape     +localmap        +reltime         +windows
+dialog_con      +lua/dyn         +rightleft       +writebackup
+diff            +menu            +ruby/dyn        -X11
+digraphs        +mksession       +scrollbind      -xfontset
-dnd             +modify_fname    +signs           -xim
-ebcdic          +mouse           +smartindent     -xpm
+emacs_tags      -mouseshape      +startuptime     -xsmp
+eval            +mouse_dec       +statusline      -xterm_clipboard
+ex_extra        +mouse_gpm       -sun_workshop    -xterm_save
+extra_search    -mouse_jsbterm   +syntax          
+farsi           +mouse_netterm   +tag_binary      
   system vimrc file: "/etc/vimrc"
     user vimrc file: "$HOME/.vimrc"
 2nd user vimrc file: "~/.vim/vimrc"
      user exrc file: "$HOME/.exrc"
       defaults file: "$VIMRUNTIME/defaults.vim"
  fall-back for $VIM: "/usr/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H -D_FORTIFY_SOURCE=2  -march=x86-64
-mtune=generic -O2 -pipe -fstack-protector-strong -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1
Linking: gcc -L. -Wl,-O1,--sort-common,--as-needed,-z,relro -fstack-protector -rdynamic
-Wl,-export-dynamic -Wl,-E -Wl,-rpath,/usr/lib/perl5/core_perl/CORE
-Wl,-O1,--sort-common,--as-needed,-z,relro -L/usr/local/lib -Wl,--as-needed
-o vim -lm -lncurses -lelf -lnsl -lacl -lattr -lgpm -ldl
-Wl,-E -Wl,-rpath,/usr/lib/perl5/core_perl/CORE
-Wl,-O1,--sort-common,--as-needed,-z,relro -fstack-protector-strong
-L/usr/local/lib -L/usr/lib/perl5/core_perl/CORE -lperl -lpthread -lnsl -ldl -lm -lcrypt
-lutil -lc -L/usr/lib -ltclstub8.6 -ldl -lz -lpthread -lieee -lm
~~~

##### `configure` command output

~~~
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
~~~

##### `make` command output

~~~
$ sudo make install
[sudo] password for spherehead: 
Starting make in the src directory.
If there are problems, cd to the src directory and run make there
cd src && make install
make[1]: Entering directory '/mnt/work/projects/_github/vim-compile/src'
if test -f /usr/bin/vim; then \
  mv -f /usr/bin/vim /usr/bin/vim.rm; \
  rm -f /usr/bin/vim.rm; \
fi
cp vim /usr/bin
strip /usr/bin/vim
chmod 755 /usr/bin/vim
cp vimtutor /usr/bin/vimtutor
chmod 755 /usr/bin/vimtutor
/bin/sh ./installman.sh install /usr/share/man/man1 ""
         /usr/share/vim /usr/share/vim/vim80 /usr/share/vim ../runtime/doc
         644 vim vimdiff evim
installing /usr/share/man/man1/vim.1
installing /usr/share/man/man1/vimtutor.1
installing /usr/share/man/man1/vimdiff.1
installing /usr/share/man/man1/evim.1
cd ../runtime/doc; if test -z "" -a -f tags; then \
	mv -f tags tags.dist; fi
generating help tags
make[2]: Entering directory '/mnt/work/projects/_github/vim-compile/runtime/doc'
/usr/bin/vim -u NONE -esX -c "helptags ++t ." -c quit
make[2]: Leaving directory '/mnt/work/projects/_github/vim-compile/runtime/doc'
cd ../runtime/doc; \
	files=`ls *.txt tags`; \
	files="$files `ls *.??x tags-?? 2>/dev/null || true`"; \
	cp $files  /usr/share/vim/vim80/doc; \
	cd /usr/share/vim/vim80/doc; \
	chmod 644 $files
cp  ../runtime/doc/*.pl /usr/share/vim/vim80/doc
chmod 755 /usr/share/vim/vim80/doc/*.pl
cd ../runtime/doc; if test -f tags.dist; then mv -f tags.dist tags; fi
cp ../runtime/menu.vim /usr/share/vim/vim80/menu.vim
chmod 644 /usr/share/vim/vim80/menu.vim
cp ../runtime/synmenu.vim /usr/share/vim/vim80/synmenu.vim
chmod 644 /usr/share/vim/vim80/synmenu.vim
cp ../runtime/delmenu.vim /usr/share/vim/vim80/delmenu.vim
chmod 644 /usr/share/vim/vim80/delmenu.vim
cp ../runtime/defaults.vim /usr/share/vim/vim80/defaults.vim
chmod 644 /usr/share/vim/vim80/defaults.vim
cp ../runtime/evim.vim /usr/share/vim/vim80/evim.vim
chmod 644 /usr/share/vim/vim80/evim.vim
cp ../runtime/mswin.vim /usr/share/vim/vim80/mswin.vim
chmod 644 /usr/share/vim/vim80/mswin.vim
cp ../runtime/rgb.txt /usr/share/vim/vim80/rgb.txt
chmod 644 /usr/share/vim/vim80/rgb.txt
cp ../runtime/bugreport.vim /usr/share/vim/vim80/bugreport.vim
chmod 644 /usr/share/vim/vim80/bugreport.vim
cp ../runtime/vimrc_example.vim /usr/share/vim/vim80
chmod 644 /usr/share/vim/vim80/vimrc_example.vim
cp ../runtime/gvimrc_example.vim /usr/share/vim/vim80
chmod 644 /usr/share/vim/vim80/gvimrc_example.vim
cp ../runtime/filetype.vim /usr/share/vim/vim80/filetype.vim
chmod 644 /usr/share/vim/vim80/filetype.vim
cp ../runtime/ftoff.vim /usr/share/vim/vim80/ftoff.vim
chmod 644 /usr/share/vim/vim80/ftoff.vim
cp ../runtime/scripts.vim /usr/share/vim/vim80/scripts.vim
chmod 644 /usr/share/vim/vim80/scripts.vim
cp ../runtime/ftplugin.vim /usr/share/vim/vim80/ftplugin.vim
chmod 644 /usr/share/vim/vim80/ftplugin.vim
cp ../runtime/ftplugof.vim /usr/share/vim/vim80/ftplugof.vim
chmod 644 /usr/share/vim/vim80/ftplugof.vim
cp ../runtime/indent.vim /usr/share/vim/vim80/indent.vim
chmod 644 /usr/share/vim/vim80/indent.vim
cp ../runtime/indoff.vim /usr/share/vim/vim80/indoff.vim
chmod 644 /usr/share/vim/vim80/indoff.vim
cp ../runtime/optwin.vim /usr/share/vim/vim80/optwin.vim
chmod 644 /usr/share/vim/vim80/optwin.vim
cd ../runtime/print; cp *.ps /usr/share/vim/vim80/print
cd /usr/share/vim/vim80/print; chmod 644 *.ps
cd ../runtime/colors; cp *.vim README.txt /usr/share/vim/vim80/colors
cd /usr/share/vim/vim80/colors; chmod 644 *.vim README.txt
cd ../runtime/syntax; cp *.vim README.txt /usr/share/vim/vim80/syntax
cd /usr/share/vim/vim80/syntax; chmod 644 *.vim README.txt
cd ../runtime/indent; cp *.vim README.txt /usr/share/vim/vim80/indent
cd /usr/share/vim/vim80/indent; chmod 644 *.vim README.txt
cd ../runtime/autoload; cp *.vim README.txt /usr/share/vim/vim80/autoload
cd /usr/share/vim/vim80/autoload; chmod 644 *.vim README.txt
cd ../runtime/autoload/xml; cp *.vim /usr/share/vim/vim80/autoload/xml
cd /usr/share/vim/vim80/autoload/xml; chmod 644 *.vim
cd ../runtime/plugin; cp *.vim README.txt /usr/share/vim/vim80/plugin
cd /usr/share/vim/vim80/plugin; chmod 644 *.vim README.txt
cd ../runtime/ftplugin; cp *.vim README.txt logtalk.dict /usr/share/vim/vim80/ftplugin
cd /usr/share/vim/vim80/ftplugin; chmod 644 *.vim README.txt
cd ../runtime/compiler; cp *.vim README.txt /usr/share/vim/vim80/compiler
cd /usr/share/vim/vim80/compiler; chmod 644 *.vim README.txt
cp -r ../runtime/macros/* /usr/share/vim/vim80/macros
chmod 755 `find /usr/share/vim/vim80/macros -type d -print`
chmod 644 `find /usr/share/vim/vim80/macros -type f -print`
chmod 755 /usr/share/vim/vim80/macros/less.sh
cvs=`find /usr/share/vim/vim80/macros \( -name CVS -o -name AAPDIR -o -name "*.info" \)
    -print`; \
      if test -n "$cvs"; then \
	 rm -rf $cvs; \
      fi
cp -r ../runtime/pack/* /usr/share/vim/vim80/pack
chmod 755 `find /usr/share/vim/vim80/pack -type d -print`
chmod 644 `find /usr/share/vim/vim80/pack -type f -print`
cp ../runtime/tutor/README* ../runtime/tutor/tutor* /usr/share/vim/vim80/tutor
rm -f /usr/share/vim/vim80/tutor/*.info
chmod 644 /usr/share/vim/vim80/tutor/*
if test -f ../runtime/spell/en.latin1.spl; then \
  cp ../runtime/spell/*.spl ../runtime/spell/*.sug ../runtime/spell/*.vim
     /usr/share/vim/vim80/spell; \
  chmod 644 /usr/share/vim/vim80/spell/*.spl /usr/share/vim/vim80/spell/*.sug
     /usr/share/vim/vim80/spell/*.vim; \
fi
cd /usr/bin; ln -s vim gvim
cd /usr/bin; ln -s vim gview
cd /usr/bin; ln -s vim rgvim
cd /usr/bin; ln -s vim rgview
cd /usr/bin; ln -s vim evim
cd /usr/bin; ln -s vim eview
cd /usr/bin; ln -s vim gvimdiff
cd /usr/bin; ln -s vim ex
cd /usr/bin; ln -s vim view
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/man1 vim vimdiff evim ex view rvim rview gvim gview rgvim rgview
    gvimdiff eview
creating link /usr/share/man/man1/ex.1
creating link /usr/share/man/man1/view.1
creating link /usr/share/man/man1/rvim.1
creating link /usr/share/man/man1/rview.1
creating link /usr/share/man/man1/gvim.1
creating link /usr/share/man/man1/gview.1
creating link /usr/share/man/man1/rgvim.1
creating link /usr/share/man/man1/rgview.1
creating link /usr/share/man/man1/gvimdiff.1
creating link /usr/share/man/man1/eview.1
/bin/sh ./installman.sh xxd /usr/share/man/fr/man1 "-fr" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/fr/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/fr.ISO8859-1/man1 "-fr" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/fr.ISO8859-1/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/fr.UTF-8/man1 "-fr.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/fr.UTF-8/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/it/man1 "-it" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/it/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/it.ISO8859-1/man1 "-it" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/it.ISO8859-1/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/it.UTF-8/man1 "-it.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/it.UTF-8/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/ja/man1 "-ja.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/ja/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/pl/man1 "-pl" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/pl/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/pl.ISO8859-2/man1 "-pl" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/pl.ISO8859-2/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/pl.UTF-8/man1 "-pl.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/pl.UTF-8/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/ru.KOI8-R/man1 "-ru" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/ru.KOI8-R/man1/xxd.1
/bin/sh ./installman.sh xxd /usr/share/man/ru.UTF-8/man1 "-ru.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/ru.UTF-8/man1/xxd.1
if test -f /usr/bin/xxd; then \
  mv -f /usr/bin/xxd /usr/bin/xxd.rm; \
  rm -f /usr/bin/xxd.rm; \
fi
cp xxd/xxd /usr/bin
strip /usr/bin/xxd
chmod 755 /usr/bin/xxd
/bin/sh ./installman.sh xxd /usr/share/man/man1 "" /usr/share/vim /usr/share/vim/vim80
         /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/man1/xxd.1
cp -r ../runtime/tools/* /usr/share/vim/vim80/tools
cvs=`find /usr/share/vim/vim80/tools \( -name CVS -o -name AAPDIR \) -print`; \
      if test -n "$cvs"; then \
	 rm -rf $cvs; \
      fi
chmod 644 /usr/share/vim/vim80/tools/*
perlpath=`./which.sh perl` && sed -e "s+/usr/bin/perl+$perlpath+"
         ../runtime/tools/efm_perl.pl >/usr/share/vim/vim80/tools/efm_perl.pl
awkpath=`./which.sh nawk` && sed -e "s+/usr/bin/nawk+$awkpath+" ../runtime/tools/mve.awk
        >/usr/share/vim/vim80/tools/mve.awk; if test -z "$awkpath"; then \
	awkpath=`./which.sh gawk` && sed -e "s+/usr/bin/nawk+$awkpath+"
            ../runtime/tools/mve.awk >/usr/share/vim/vim80/tools/mve.awk;
            if test -z "$awkpath"; then \
	awkpath=`./which.sh awk` && sed -e "s+/usr/bin/nawk+$awkpath+"
            ../runtime/tools/mve.awk >/usr/share/vim/vim80/tools/mve.awk; fi; fi
chmod 755 `grep -l "^#!" /usr/share/vim/vim80/tools/*`
make[2]: Entering directory '/mnt/work/projects/_github/vim-compile/src/po'
make[2]: Nothing to be done for 'first'.
make[2]: Leaving directory '/mnt/work/projects/_github/vim-compile/src/po'
make[2]: Entering directory '/mnt/work/projects/_github/vim-compile/src/po'
make[2]: Nothing to be done for 'converted'.
make[2]: Leaving directory '/mnt/work/projects/_github/vim-compile/src/po'
/bin/sh ./installman.sh install /usr/share/man/fr/man1 "-fr" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/fr/man1/vim.1
installing /usr/share/man/fr/man1/vimtutor.1
installing /usr/share/man/fr/man1/vimdiff.1
installing /usr/share/man/fr/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/fr.ISO8859-1/man1 "-fr" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/fr.ISO8859-1/man1/vim.1
installing /usr/share/man/fr.ISO8859-1/man1/vimtutor.1
installing /usr/share/man/fr.ISO8859-1/man1/vimdiff.1
installing /usr/share/man/fr.ISO8859-1/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/fr.UTF-8/man1 "-fr.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/fr.UTF-8/man1/vim.1
installing /usr/share/man/fr.UTF-8/man1/vimtutor.1
installing /usr/share/man/fr.UTF-8/man1/vimdiff.1
installing /usr/share/man/fr.UTF-8/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/it/man1 "-it" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/it/man1/vim.1
installing /usr/share/man/it/man1/vimtutor.1
installing /usr/share/man/it/man1/vimdiff.1
installing /usr/share/man/it/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/it.ISO8859-1/man1 "-it" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/it.ISO8859-1/man1/vim.1
installing /usr/share/man/it.ISO8859-1/man1/vimtutor.1
installing /usr/share/man/it.ISO8859-1/man1/vimdiff.1
installing /usr/share/man/it.ISO8859-1/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/it.UTF-8/man1 "-it.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/it.UTF-8/man1/vim.1
installing /usr/share/man/it.UTF-8/man1/vimtutor.1
installing /usr/share/man/it.UTF-8/man1/vimdiff.1
installing /usr/share/man/it.UTF-8/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/ja/man1 "-ja.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/ja/man1/vim.1
installing /usr/share/man/ja/man1/vimtutor.1
installing /usr/share/man/ja/man1/vimdiff.1
installing /usr/share/man/ja/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/pl/man1 "-pl" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/pl/man1/vim.1
installing /usr/share/man/pl/man1/vimtutor.1
installing /usr/share/man/pl/man1/vimdiff.1
installing /usr/share/man/pl/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/pl.ISO8859-2/man1 "-pl" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/pl.ISO8859-2/man1/vim.1
installing /usr/share/man/pl.ISO8859-2/man1/vimtutor.1
installing /usr/share/man/pl.ISO8859-2/man1/vimdiff.1
installing /usr/share/man/pl.ISO8859-2/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/pl.UTF-8/man1 "-pl.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/pl.UTF-8/man1/vim.1
installing /usr/share/man/pl.UTF-8/man1/vimtutor.1
installing /usr/share/man/pl.UTF-8/man1/vimdiff.1
installing /usr/share/man/pl.UTF-8/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/ru.KOI8-R/man1 "-ru" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/ru.KOI8-R/man1/vim.1
installing /usr/share/man/ru.KOI8-R/man1/vimtutor.1
installing /usr/share/man/ru.KOI8-R/man1/vimdiff.1
installing /usr/share/man/ru.KOI8-R/man1/evim.1
/bin/sh ./installman.sh install /usr/share/man/ru.UTF-8/man1 "-ru.UTF-8" /usr/share/vim
         /usr/share/vim/vim80 /usr/share/vim ../runtime/doc 644 vim vimdiff evim
installing /usr/share/man/ru.UTF-8/man1/vim.1
installing /usr/share/man/ru.UTF-8/man1/vimtutor.1
installing /usr/share/man/ru.UTF-8/man1/vimdiff.1
installing /usr/share/man/ru.UTF-8/man1/evim.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/fr/man1 vim vimdiff evim ex view rvim rview gvim gview rgvim rgview
    gvimdiff eview
creating link /usr/share/man/fr/man1/ex.1
creating link /usr/share/man/fr/man1/view.1
creating link /usr/share/man/fr/man1/rvim.1
creating link /usr/share/man/fr/man1/rview.1
creating link /usr/share/man/fr/man1/gvim.1
creating link /usr/share/man/fr/man1/gview.1
creating link /usr/share/man/fr/man1/rgvim.1
creating link /usr/share/man/fr/man1/rgview.1
creating link /usr/share/man/fr/man1/gvimdiff.1
creating link /usr/share/man/fr/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/fr.ISO8859-1/man1 vim vimdiff evim ex view rvim rview gvim gview
    rgvim rgview gvimdiff eview
creating link /usr/share/man/fr.ISO8859-1/man1/ex.1
creating link /usr/share/man/fr.ISO8859-1/man1/view.1
creating link /usr/share/man/fr.ISO8859-1/man1/rvim.1
creating link /usr/share/man/fr.ISO8859-1/man1/rview.1
creating link /usr/share/man/fr.ISO8859-1/man1/gvim.1
creating link /usr/share/man/fr.ISO8859-1/man1/gview.1
creating link /usr/share/man/fr.ISO8859-1/man1/rgvim.1
creating link /usr/share/man/fr.ISO8859-1/man1/rgview.1
creating link /usr/share/man/fr.ISO8859-1/man1/gvimdiff.1
creating link /usr/share/man/fr.ISO8859-1/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/fr.UTF-8/man1 vim vimdiff evim ex view rvim rview gvim gview rgvim
    rgview gvimdiff eview
creating link /usr/share/man/fr.UTF-8/man1/ex.1
creating link /usr/share/man/fr.UTF-8/man1/view.1
creating link /usr/share/man/fr.UTF-8/man1/rvim.1
creating link /usr/share/man/fr.UTF-8/man1/rview.1
creating link /usr/share/man/fr.UTF-8/man1/gvim.1
creating link /usr/share/man/fr.UTF-8/man1/gview.1
creating link /usr/share/man/fr.UTF-8/man1/rgvim.1
creating link /usr/share/man/fr.UTF-8/man1/rgview.1
creating link /usr/share/man/fr.UTF-8/man1/gvimdiff.1
creating link /usr/share/man/fr.UTF-8/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/it/man1 vim vimdiff evim ex view rvim rview gvim gview rgvim
    rgview gvimdiff eview
creating link /usr/share/man/it/man1/ex.1
creating link /usr/share/man/it/man1/view.1
creating link /usr/share/man/it/man1/rvim.1
creating link /usr/share/man/it/man1/rview.1
creating link /usr/share/man/it/man1/gvim.1
creating link /usr/share/man/it/man1/gview.1
creating link /usr/share/man/it/man1/rgvim.1
creating link /usr/share/man/it/man1/rgview.1
creating link /usr/share/man/it/man1/gvimdiff.1
creating link /usr/share/man/it/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/it.ISO8859-1/man1 vim vimdiff evim ex view rvim rview gvim
    gview rgvim rgview gvimdiff eview
creating link /usr/share/man/it.ISO8859-1/man1/ex.1
creating link /usr/share/man/it.ISO8859-1/man1/view.1
creating link /usr/share/man/it.ISO8859-1/man1/rvim.1
creating link /usr/share/man/it.ISO8859-1/man1/rview.1
creating link /usr/share/man/it.ISO8859-1/man1/gvim.1
creating link /usr/share/man/it.ISO8859-1/man1/gview.1
creating link /usr/share/man/it.ISO8859-1/man1/rgvim.1
creating link /usr/share/man/it.ISO8859-1/man1/rgview.1
creating link /usr/share/man/it.ISO8859-1/man1/gvimdiff.1
creating link /usr/share/man/it.ISO8859-1/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/it.UTF-8/man1 vim vimdiff evim ex view rvim rview gvim gview
    rgvim rgview gvimdiff eview
creating link /usr/share/man/it.UTF-8/man1/ex.1
creating link /usr/share/man/it.UTF-8/man1/view.1
creating link /usr/share/man/it.UTF-8/man1/rvim.1
creating link /usr/share/man/it.UTF-8/man1/rview.1
creating link /usr/share/man/it.UTF-8/man1/gvim.1
creating link /usr/share/man/it.UTF-8/man1/gview.1
creating link /usr/share/man/it.UTF-8/man1/rgvim.1
creating link /usr/share/man/it.UTF-8/man1/rgview.1
creating link /usr/share/man/it.UTF-8/man1/gvimdiff.1
creating link /usr/share/man/it.UTF-8/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/ja/man1 vim vimdiff evim ex view rvim rview gvim gview rgvim
    rgview gvimdiff eview
creating link /usr/share/man/ja/man1/ex.1
creating link /usr/share/man/ja/man1/view.1
creating link /usr/share/man/ja/man1/rvim.1
creating link /usr/share/man/ja/man1/rview.1
creating link /usr/share/man/ja/man1/gvim.1
creating link /usr/share/man/ja/man1/gview.1
creating link /usr/share/man/ja/man1/rgvim.1
creating link /usr/share/man/ja/man1/rgview.1
creating link /usr/share/man/ja/man1/gvimdiff.1
creating link /usr/share/man/ja/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/pl/man1 vim vimdiff evim ex view rvim rview gvim gview rgvim
    rgview gvimdiff eview
creating link /usr/share/man/pl/man1/ex.1
creating link /usr/share/man/pl/man1/view.1
creating link /usr/share/man/pl/man1/rvim.1
creating link /usr/share/man/pl/man1/rview.1
creating link /usr/share/man/pl/man1/gvim.1
creating link /usr/share/man/pl/man1/gview.1
creating link /usr/share/man/pl/man1/rgvim.1
creating link /usr/share/man/pl/man1/rgview.1
creating link /usr/share/man/pl/man1/gvimdiff.1
creating link /usr/share/man/pl/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/pl.ISO8859-2/man1 vim vimdiff evim ex view rvim rview gvim
    gview rgvim rgview gvimdiff eview
creating link /usr/share/man/pl.ISO8859-2/man1/ex.1
creating link /usr/share/man/pl.ISO8859-2/man1/view.1
creating link /usr/share/man/pl.ISO8859-2/man1/rvim.1
creating link /usr/share/man/pl.ISO8859-2/man1/rview.1
creating link /usr/share/man/pl.ISO8859-2/man1/gvim.1
creating link /usr/share/man/pl.ISO8859-2/man1/gview.1
creating link /usr/share/man/pl.ISO8859-2/man1/rgvim.1
creating link /usr/share/man/pl.ISO8859-2/man1/rgview.1
creating link /usr/share/man/pl.ISO8859-2/man1/gvimdiff.1
creating link /usr/share/man/pl.ISO8859-2/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/pl.UTF-8/man1 vim vimdiff evim ex view rvim rview gvim gview
    rgvim rgview gvimdiff eview
creating link /usr/share/man/pl.UTF-8/man1/ex.1
creating link /usr/share/man/pl.UTF-8/man1/view.1
creating link /usr/share/man/pl.UTF-8/man1/rvim.1
creating link /usr/share/man/pl.UTF-8/man1/rview.1
creating link /usr/share/man/pl.UTF-8/man1/gvim.1
creating link /usr/share/man/pl.UTF-8/man1/gview.1
creating link /usr/share/man/pl.UTF-8/man1/rgvim.1
creating link /usr/share/man/pl.UTF-8/man1/rgview.1
creating link /usr/share/man/pl.UTF-8/man1/gvimdiff.1
creating link /usr/share/man/pl.UTF-8/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/ru.KOI8-R/man1 vim vimdiff evim ex view rvim rview gvim gview
    rgvim rgview gvimdiff eview
creating link /usr/share/man/ru.KOI8-R/man1/ex.1
creating link /usr/share/man/ru.KOI8-R/man1/view.1
creating link /usr/share/man/ru.KOI8-R/man1/rvim.1
creating link /usr/share/man/ru.KOI8-R/man1/rview.1
creating link /usr/share/man/ru.KOI8-R/man1/gvim.1
creating link /usr/share/man/ru.KOI8-R/man1/gview.1
creating link /usr/share/man/ru.KOI8-R/man1/rgvim.1
creating link /usr/share/man/ru.KOI8-R/man1/rgview.1
creating link /usr/share/man/ru.KOI8-R/man1/gvimdiff.1
creating link /usr/share/man/ru.KOI8-R/man1/eview.1
/bin/sh ./installml.sh install "yes" \
	/usr/share/man/ru.UTF-8/man1 vim vimdiff evim ex view rvim rview gvim gview
    rgvim rgview gvimdiff eview
creating link /usr/share/man/ru.UTF-8/man1/ex.1
creating link /usr/share/man/ru.UTF-8/man1/view.1
creating link /usr/share/man/ru.UTF-8/man1/rvim.1
creating link /usr/share/man/ru.UTF-8/man1/rview.1
creating link /usr/share/man/ru.UTF-8/man1/gvim.1
creating link /usr/share/man/ru.UTF-8/man1/gview.1
creating link /usr/share/man/ru.UTF-8/man1/rgvim.1
creating link /usr/share/man/ru.UTF-8/man1/rgview.1
creating link /usr/share/man/ru.UTF-8/man1/gvimdiff.1
creating link /usr/share/man/ru.UTF-8/man1/eview.1
if test -n "yes" -a -f po/Makefile; then \
   cd po; make prefix=/usr LOCALEDIR=/usr/share/vim/vim80/lang \
   INSTALL_DATA=cp FILEMOD=644 install; \
fi
make[2]: Entering directory '/mnt/work/projects/_github/vim-compile/src/po'
make[3]: Entering directory '/mnt/work/projects/_github/vim-compile/src/po'
make[3]: Leaving directory '/mnt/work/projects/_github/vim-compile/src/po'
for lang in af ca cs de en_GB eo es fi fr ga it ja ko ko.UTF-8 nb nl no pl
  pt_BR ru sk sv uk vi zh_CN zh_CN.UTF-8 zh_TW zh_TW.UTF-8 cs.cp1250 ja.sjis
  ja.euc-jp pl.cp1250 pl.UTF-8 ru.cp1251 sk.cp1250 uk.cp1251 zh_CN.cp936; do \
  dir=/usr/share/vim/vim80/lang/$lang/; \
  if test ! -x "$dir"; then \
    mkdir $dir; chmod 755 $dir; \
  fi; \
  dir=/usr/share/vim/vim80/lang/$lang/LC_MESSAGES; \
  if test ! -x "$dir"; then \
    mkdir $dir; chmod 755 $dir; \
  fi; \
  if test -r $lang.mo; then \
    cp $lang.mo $dir/vim.mo; \
    chmod 644 $dir/vim.mo; \
  fi; \
done
make[2]: Leaving directory '/mnt/work/projects/_github/vim-compile/src/po'
if test -d ../runtime/lang; then \
   cp ../runtime/lang/README.txt ../runtime/lang/*.vim /usr/share/vim/vim80/lang; \
   chmod 644 /usr/share/vim/vim80/lang/README.txt /usr/share/vim/vim80/lang/*.vim; \
fi
if test -d ../runtime/keymap; then \
   cp ../runtime/keymap/README.txt ../runtime/keymap/*.vim /usr/share/vim/vim80/keymap; \
   chmod 644 /usr/share/vim/vim80/keymap/README.txt /usr/share/vim/vim80/keymap/*.vim; \
fi
if test -n ""; then \
	/bin/sh install-sh -c -d /usr/share/icons/hicolor/48x48/apps \
    /usr/share/icons/locolor/32x32/apps \
	/usr/share/icons/locolor/16x16/apps /usr/share/applications; \
fi
if test -d /usr/share/icons/hicolor/48x48/apps -a -w /usr/share/icons/hicolor/48x48/apps \
	-a ! -f /usr/share/icons/hicolor/48x48/apps/gvim.png; then \
   cp ../runtime/vim48x48.png /usr/share/icons/hicolor/48x48/apps/gvim.png; \
   if test -z "" -a -x "/usr/bin/gtk-update-icon-cache" \
	   -a -w /usr/share/icons/hicolor \
	   -a -f /usr/share/icons/hicolor/index.theme; then \
	/usr/bin/gtk-update-icon-cache -q /usr/share/icons/hicolor; \
   fi \
fi
if test -d /usr/share/icons/locolor/32x32/apps -a -w /usr/share/icons/locolor/32x32/apps \
	-a ! -f /usr/share/icons/locolor/32x32/apps/gvim.png; then \
   cp ../runtime/vim32x32.png /usr/share/icons/locolor/32x32/apps/gvim.png; \
fi
if test -d /usr/share/icons/locolor/16x16/apps -a -w /usr/share/icons/locolor/16x16/apps \
	-a ! -f /usr/share/icons/locolor/16x16/apps/gvim.png; then \
   cp ../runtime/vim16x16.png /usr/share/icons/locolor/16x16/apps/gvim.png; \
fi
if test -d /usr/share/applications -a -w /usr/share/applications; then \
   cp ../runtime/vim.desktop \
	../runtime/gvim.desktop \
	/usr/share/applications; \
   if test -z "" -a -x "/usr/bin/update-desktop-database"; then \
      /usr/bin/update-desktop-database -q /usr/share/applications; \
   fi \
fi
cp gvimtutor /usr/bin/gvimtutor
chmod 755 /usr/bin/gvimtutor
make[1]: Leaving directory '/mnt/work/projects/_github/vim-compile/src'
~~~



