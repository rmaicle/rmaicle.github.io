---
title: Build `vim` in Manjaro Linux
layout: post
categories: [supplement]
published: true
permalink: /posts/NgVX8g15ZMd29wZ/vim_version_output
---

Output of the `vim --version` command that is packaged with Manjaro Linux.

<pre>
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
</pre>
