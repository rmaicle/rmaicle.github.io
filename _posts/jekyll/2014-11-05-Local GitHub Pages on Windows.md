---
title: Local GitHub Pages on Windows
date: 2014-11-05T12:10:19UTC
excerpt: Setting up GitHub Pages locally using Jekyll on Windows.
layout: post
categories: [post, jekyll]
tags: [github pages, ruby]
published: true
permalink: /posts/mZAGzjP59dvGVPO
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

I recently started using [GitHub Pages].
GitHub Pages allows you to get your site up and running in no time.
If you're like me, you can fiddle with the site much more than what other blogging platform allows you.
And, this is what I like, create pages and posts using [Markdown].

<aside>
<a href="http://commonmark.org/" target="_blank">CommonMark</a> is a strongly defined,
highly compatible implementation of
Markdown. As of this post, it is in pre
version 1.0.
</aside>

GitHub Pages uses [Jekyll].
Jekyll is the tool that transforms plain text into static web pages.
Installing Jekyll on my machine allows testing of how posts or pages will look before uploading them - nifty!

This post documents the installation of Jekyll on my Windows machine.
Here is a reference on how to [Run Jekyll on Windows] which slightly differs from what I have done.

## Download and Install Ruby

I downloaded [Ruby] 2.1.4 64-bit from the [Ruby Installer for Windows] site (17MB).
The installation takes 48MB of disk space.

Verify that the installation has set the User Executable PATH to point to the Ruby directory.

* Open a command prompt
* Go to a directory other than the Ruby installation directory
* Execute the command `ruby --version`

{% highlight console %}
ruby 2.1.4p265 (2014-10-27 revision 48166) [x64-mingw32]
{% endhighlight %}

If, in any case, the command above failed that means the Ruby directory was not set in the User Executable PATH.
We will set it manually. Since the Ruby installer sets it in front of all the other User Executable PATHs then we will do the same.
We will be using the Ruby directory I used.
You need to replace it with the directory where you installed Ruby.

{% highlight console %}
set path=C:\Ruby21-x64\bin;%PATH%;
{% endhighlight %}

Note that executing this on the command line is temporary.
To make it permanent, you need to set it in the Computer Properties | Advance System Settings | Environment Variables.

## Download and Install the Ruby Development Kit

I downloaded the [Ruby Development Kit] (DevKit) which is a 43MB self-extracting archive file.
Installing the DevKit means _extracting_ the contents into a directory like `C:\RubyDevKit` and will take about 411MB.

* Extract the DevKit;
* Initialize to bind the DevKit to the Ruby installation; `ruby dk.rb init`;

    ~~~
    C:\RubyDevKit>ruby dk.rb init
    [INFO] found RubyInstaller v2.1.4 at C:/Ruby21-x64

    Initialization complete! Please review and modify the auto-generated
    'config.yml' file to ensure it contains the root directories to all
    of the installed Rubies you want enhanced by the DevKit.
    ~~~

* Install the DevKit; `ruby dk.rb install`.

    ~~~
    C:\RubyDevKit>ruby dk.rb install
    [INFO] Updating convenience notice gem override for 'C:/Ruby21-x64'
    [INFO] Installing 'C:/Ruby21-x64/lib/ruby/site_ruby/devkit.rb'
    ~~~

If you moved your Ruby directory, you need to edit `config.yml` in the Ruby Development Kit directory to point to the new Ruby root directory. Also, you need to 're-install' the Ruby Development Kit by executing the following command to override the previous settings.

{% highlight console %}
C:\RubyDevKit>ruby dk.rb install --force
{% endhighlight %}

## Download and Install Dependencies

From the [GitHub Pages Basics] site, we need to download and install the [Bundler].
It is a package manager that makes versioning the Ruby software like Jekyll easier when building GitHub Pages sites locally.

* Download and install Bundler; `gem install bundler`

    ~~~
    C:\Ruby21-x64>gem install bundler
    Fetching: bundler-1.7.4.gem (100%)
    Successfully installed bundler-1.7.4
    Parsing documentation for bundler-1.7.4
    Installing ri documentation for bundler-1.7.4
    Done installing documentation for bundler after 4 seconds
    1 gem installed
    ~~~

* Create an empty file named `Gemfile` in the local site repository and add the following two lines:

    ~~~
    source 'https://rubygems.org'
    gem 'github-pages'
    ~~~

    We can just use the `echo` command and send it to the file through piping:

    ~~~
    d:\test.github.io>echo source 'https://rubygems.org' > Gemfile
    d:\test.github.io>echo gem 'github-pages' >> Gemfile
    ~~~

* Install required files for GitHub Pages; `bundle install`

    ~~~
    d:\test.github.io>bundle install
    DL is deprecated, please use Fiddle
    Fetching gem metadata from https://rubygems.org/.......
    ...
    Your bundle is complete!
    Use `bundle show [gemname]` to see where a bundled gem is installed.
    ...
    ~~~

As mentioned, you can use `bundle show [gemname]` to see where a bundled gem is installed.
If an error occurs, correct it and rerun `bundle install`.

## Now, Try It!

Start Jekyll in your local site repository; `bundle exec jekyll serve`.
Open the URL `http://localhost:4000/` in your browser.

## Links

* [GitHub Pages Features](https://help.github.com/categories/github-pages-features/)
* [GitHub Pages Troubleshooting](https://help.github.com/categories/github-pages-troubleshooting/)
* [GitHub Pages Ruby Gem](https://github.com/github/pages-gem)
* [Repository metadata on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages/)
* [Jekyll Documentation](http://jekyllrb.com/docs/home/)
* [Sass](http://sass-lang.com/)
* [Kramdown](http://kramdown.gettalong.org/index.html) is a fast, pure-Ruby Markdown-superset converter
* [RedCarpet Fenced Code Block Languages](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml)
* [Google+ Platform](https://developers.google.com/+/web/+1button/)

## References

The following links are additional references about GitHub Pages:

* [GitHub Dark] to help you choose the color schemes for your theme.
* [Loyc] Blogging on GitHub --- More information on syntax highlighter and site setup.
* [Yi Zeng] Setup Jekyll on Windows
* How [Joshua Lande] created his blog site in GitHub Pages --- A good reference on what else you can do to configure your GitHub Pages. It has a short description on how to use Disqus, Google Analytics and a Twitter Plug with your GitHub Pages. A great addition indeed.
* How [erjjones] built his blog in one day --- Here is another great way to enhance your GitHub Pages; Twitter Bootstrap, Feedback Button, Dynamic GitHub Followers and Repository Buttons, Social Buzz Widgets and more.



[GitHub Pages]: https://pages.github.com/ "GitHub Pages"
[GitHub Pages Basics]: https://help.github.com/categories/github-pages-basics/ "GitHub Pages Basic"
[Markdown]: http://daringfireball.net/projects/markdown/ "Markdown"
[CommonMark]: http://commonmark.org/
[HTML]: http://www.w3.org/html/ "HyperText Markup Language"
[Ruby]: http://www.ruby-lang.org/ "Ruby Programming Language"
[Ruby Installer for Windows]: http://rubyinstaller.org/ "Ruby Installer for Windows"
[Ruby Development Kit]: http://rubyinstaller.org/downloads/ "Ruby Development Kit"
[Jekyll]: http://jekyllrb.com "Jekyll"
[Run Jekyll on Windows]: http://jekyll-windows.juthilo.com/ "Run Jekyll on Windows"
[Bundler]: http://bundler.io/ "Bundler"

[GitHub Dark]: https://userstyles.org/styles/37035/github-dark
[Loyc]: http://loyc.net/2014/blogging-on-github.html "Language of your choice"
[Yi Zeng]: http://yizeng.me/2013/05/10/setup-jekyll-on-windows/ "Yi Zeng's Blog"
[Joshua Lande]: http://joshualande.com/jekyll-github-pages-poole/ "How Joshua Lande Created His Blog Site in GitHub Pages"
[erjjones]: http://erjjones.github.io/blog/How-I-built-my-blog-in-one-day/ "How erjjones built his blog in one day"
