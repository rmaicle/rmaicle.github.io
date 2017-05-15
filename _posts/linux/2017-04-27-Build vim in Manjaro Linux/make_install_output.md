---
title: Build `vim` in Manjaro Linux
layout: post
categories: [supplement]
published: true
permalink: /posts/NgVX8g15ZMd29wZ/make_install_output
---

Output of the `make install` command for installing `vim`.

<pre>
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
</pre>

Back to [post](/posts/NgVX8g15ZMd29wZ/index)
