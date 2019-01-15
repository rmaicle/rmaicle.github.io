---
title: Build `vim` in Manjaro Linux
date: 2017-04-27T15:31:32UTC
excerpt: The default `vim` build packaged with Manjaro Linux did not include the clientserver feature which was necessary to make `vim` work with `ranger` inside `tilix` which was both recently explored.
layout: post
categories: [post, linux]
tags: [vim, manjaro, tilix, ranger]
published: true
permalink: /posts/NgVX8g15ZMd29wZ/index
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

The default `vim` build packaged with [Manjaro Linux](https://manjaro.org) do not include the _clientserver_ feature.
To make `vim` work with `ranger` inside `tilix`, it needed to be rebuilt with the necessary feature included.
This post shows how to build `vim` fresh from its repository at [https://github.com/vim/vim.git](https://github.com/vim/vim.git).

`tilix` and `ranger` packages are available in the Manjaro Linux repositories and can be installed using `pacman`.

~~~
$ sudo pacman -S tilix
$ sudo pacman -S ranger
~~~

Manjaro Linux 17.0.1 (Gellivara) have the following versions of the packages.

| Application | Version | Description |
|-------------|:-------:|-------------|
| ranger      | 1.8.1   | Minimalistic `console` file manager in Linux with `VI` key bindings. [[http://ranger.nongnu.org](http://ranger.nongnu.org)]
| tilix       | 1.5.6   | GTK+3 tiling terminal emulator using the VTE (Virtual Terminal Emulator) GTK widget. [[https://gnunn1.github.io/tilix-web/](https://gnunn1.github.io/tilix-web/)]
| vim         | 8.0     | As packaged with Manjaro Linux XFCE 17.0.1 [[update 2017-04-23](manjaro.org/2017/04/23/stable-update-2017-04-23-kernels-kde-framework-mesa-budgie/)].

Steps for building `vim` was taken from an [article by Val Markovic](https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source).

1. Install required libraries.
2. Remove `vim` if installed.
3. Get the `vim` sources.
4. Build and install.

## Install Required Libraries for Building `vim`

The following table shows the version numbers of libraries available in Manjaro Linux.

| Libraries   | Version | Description |
|-------------|:-------:|-------------|
| ncurses     | 6.0     | Programming library providing an application programming interface (API) that allows the programmer to write text-based user interfaces in a terminal-independent manner. [[https://www.gnu.org/software/ncurses/ncurses.html](https://www.gnu.org/software/ncurses/ncurses.html)]
| libgnome    | 2.32.1  | Gnome Library [[developer.gnome.org/libgnome/stable/](developer.gnome.org/libgnome/stable/)]
| gtk2        | 2.24.31 | Cross-platform GUI toolkit [[https://www.gtk.org](https://www.gtk.org)]
| atk         | 2.24.0  | Accessibility Toolkit (ATK) refers in particular to the GNOME ATK, an application programming interface (API) for developing free/open source accessible applications for platforms such as Linux or OpenBSD. [[https://wiki.gnome.org/Accessibility](https://wiki.gnome.org/Accessibility)]
| libbonoboui | 2.24.5  | Programming library that provides a number of user interface controls using the Bonobo component framework. [[https://developer.gnome.org/libbonobo/stable/index.html](https://developer.gnome.org/libbonobo/stable/index.html)] [[http://www.djcbsoftware.nl/projecten/nluug-bonobo/](http://www.djcbsoftware.nl/projecten/nluug-bonobo/)]
| cairo       | 1.14.8  | Programming library that provides a vector graphics-based, device-independent API for software developers. [[https://www.cairographics.org](https://www.cairographics.org)]
| libx11      | 1.6.5   | An X Window System protocol client library containing functions for interacting with an X server. These functions allow programmers to write programs without knowing the details of the protocol. [[https://www.x.org/archive/X11R7.5/doc/libX11/libX11.html](https://www.x.org/archive/X11R7.5/doc/libX11/libX11.html)]
| libxpm      | 3.5.12  | X11 pixmap library [[https://xorg.freedesktop.org/wiki/](https://xorg.freedesktop.org/wiki/)]
| libxt       | 1.1.5   | X11 toolkit intrinsics library [[https://xorg.freedesktop.org/wiki/](https://xorg.freedesktop.org/wiki/)]
| python      | 3.6.0   | A high-level programming language for general-purpose programming, created by Guido van Rossum and first released in 1991. [[https://www.python.org](https://www.python.org)]
| ruby        | 2.4.0   | Is a dynamic, reflective, object-oriented, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan. [[https://www.ruby-lang.org/](https://www.ruby-lang.org/)]
| lua51       | 5.1.5   | A powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, functional programming, data-driven programming, and data description. [[https://www.lua.org](https://www.lua.org)]
| perl        | 5.24.1  | Is a high-level, general-purpose, interpreted, dynamic programming language which had its roots and was optimized for scanning arbitrary text files, extracting information from those text files, and printing reports based on that information. [[https://www.perl.org](https://www.perl.org)]
| git         | 2.12.2  | Is a distributed version control system created by Linus Torvalds in 2005 for the development of the Linux kernel aimed for speed, data integrity and non-linear workflow [[https://git-scm.com](https://git-scm.com)]

Install the libraries with the following commands:

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

The parameter `--depth 1` instructs `git` to download _only_ the latest revisions.
A shallow clone only contains history truncated to the specified number of commits on the specified branch.
Specifying `1` means history with only the latest commits.
In the following command, the branch is implicitly the master branch.

~~~
$ git clone --depth 1 https://github.com/vim/vim.git
~~~

If a specific `git` tag is preferred to be cloned, use[^update20190116]:

~~~
$ git clone --depth 1 --branch v8.1.0754 https://github.com/vim/vim.git
~~~

[^update20190116]: The command was added to this post after encountering the errors mentioned below.

## Build and Install

Before building, the `configure` script needs to know the _python configuration directory_.
On Manjaro XFCE, the python 3.5 configuration directory is in `/usr/lib/python3.5/config-3.6m-x86_64-linux-gnu`.
The argument `--with-features=huge` includes the _clientserver_ feature along with others which may later be found unnecessary in my daily use.
The build might be a little bloated although it can be trimmed down but that wil be for another post.

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

The following is the verbosely informative output of the `--version` argument of the newly built `vim`.
The build included the `GTK2 GUI` application that is not in the packaged build.

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

Command outputs for reference.

* [Packaged vim --version Output](/posts/NgVX8g15ZMd29wZ/vim_version_output)
* [configure Output](/posts/NgVX8g15ZMd29wZ/configure_output)
* [make Output](/posts/NgVX8g15ZMd29wZ/make_output)
* [make install Output](/posts/NgVX8g15ZMd29wZ/make_install_output)

## Missing Library Files

I have encounterd the following errors once I tried running `vim` again after some time of not using it.

### Missing `libperl.so`

After some time, I encountered the following error when executing `vim`:

~~~
vim: error while loading shared libraries: libperl.so:
     cannot open shared object file: No such file or directory
~~~

A solution to the same question I had was answered in askubuntu site[^askubuntu].
My system current have perl version 5.28 installed, `/usr/lib/perl5/5.28` and the library `libperl.so` could be found in `/usr/lib/perl5/5.28/core_perl/CORE`.

Create a soft link to the library file and put the link in `/usr/lib` directory where `vim` could see it.

~~~
sudo ln -s "/usr/lib/perl5/5.28/core_perl/CORE/libperl.so" "/usr/lib/libperl.so"
~~~

### Missing `libruby.so.2.4`

I encountered the next error:

~~~
vim: error while loading shared libraries: libruby.so.2.4:
     cannot open shared object file: No such file or directory
~~~

[mshiltonj](https://github.com/mshiltonj) provided a solution[^githubrvm] and the following was his post:

> I had this problem. But I got it to work.
>
> After cloning the vim repo, I followed the instructions here:
>
>     https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source
>
> After installing, I got the libruby.so.2.2 problem.
>
> I try to correct the problem by making sure the rvm ruby was not in my path.
>
>     sudo make uninstall
>     rvm use system
>     make clean
>     ./configure [params from url above]
>     sudo make install
>
> And it still had the libruby.so.2.2 problem.
>
> So I uninstalled and then recloned the repo and tried again, clean:
>
>     sudo make uninstall
>     cd ..
>     rm -rf vim
>     git clone https://github.com/vim/vim.git
>     cd vim
>
> And ran the above url's instructions again.
>
> It worked!
>
> I suspect make clean is not cleaning something it should be cleaning, or running configure while having an rvm ruby on your path will write some configuration information that doesn't get updated when you run it again when the rvm ruby has been removed from the path.
>
> Whichever, doing sudo make uninstall and the doing it again from a clean clone to the repo with the rvm ruby pre-emptively removed from the path worked for me. Good luck!

I cloned a later version of `vim`, and proceeded with the installation procedureand it now works again.

[^askubuntu]: Just create a shortcut. [https://askubuntu.com/a/749122](https://askubuntu.com/a/749122)
[^githubrvm]: [https://github.com/rvm/rvm/issues/3339#issuecomment-168434888](https://github.com/rvm/rvm/issues/3339#issuecomment-168434888)
