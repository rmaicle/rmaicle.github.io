---
layout: post
title: Starting with GitHub Pages
excerpt: References to getting started with GitHub Pages on Windows.
category: Blog
tags: blog, github pages
---

I recently started using [GitHub Pages].
GitHub Pages allows you to get your site up and running in no time.
If you're like me, you can fiddle with the site much more than than what other blogging platform allows you.
And, this is what I like --- create pages and posts using [Markdown].

<aside>
<a href="http://commonmark.org/" target="_blank">CommonMark</a> is a strongly specified,<br/>
highly compatible implementation of<br/>
Markdown. As of this post, it is in pre<br/>
version 1.0.<br/>
</aside>

GitHub Pages uses [Jekyll].
Jekyll is the tool that transforms plain text into static web pages.
Installing Jekyll on my machine allows testing of how posts or pages will look before uploading them --- nifty!

This post documents the installation of Jekyll on my Windows machine.
As a reference, here is a link on how to [Run Jekyll on Windows].
I downloaded [Ruby] 2.1.4 64-bit from the [Ruby Installer for Windows] site (17MB).
The installation takes 48MB of disk space.

<aside>
Make sure that the Ruby executable<br/>
path is set in the User Executable<br/>
PATH environment variable.
</aside>

Verify that the installation has actually set the User Executable PATH.
Open a command prompt and go to a directory other than the Ruby directory and execute the command `ruby --version`{:.highlight}.
You should see something like:

~~~
C:\><span class="highlight">ruby --version</span>
ruby 2.1.4p265 (2014-10-27 revision 48166) [x64-mingw32]
~~~
{: .output }

Download and _install_ the [Ruby Development Kit] which is a 43MB self-extracting archive file.
Installing the DevKit means extracting the contents into a directory like `C:\RubyDevKit` and will take about 411MB.
After extracting the DevKit, it must be initialized to bind it to the Ruby installation; `ruby dk.rb init`{:.highlight}.
And then installed; `ruby dk.rb install`{:.highlight}.
Here are the output of the commands:

~~~
C:\RubyDevKit><span class="highlight">ruby dk.rb init</span>
[INFO] found RubyInstaller v2.1.4 at C:/Ruby21-x64
~~~
{: .output }

Initialization complete! Please review and modify the auto-generated
'config.yml' file to ensure it contains the root directories to all
of the installed Rubies you want enhanced by the DevKit.

~~~
C:\RubyDevKit><span class="highlight">ruby dk.rb install</span>
[INFO] Updating convenience notice gem override for 'C:/Ruby21-x64'
[INFO] Installing 'C:/Ruby21-x64/lib/ruby/site_ruby/devkit.rb'
~~~
{: .output }

From the [GitHub Pages Basics] site, we need [Bundler]:

> Bundler is a package manager that makes versioning Ruby software like Jekyll
> a heck of a lot easier if you're going to be building GitHub Pages sites
> locally.

Download and install Bundler, currently version 1.7, by running the command `gem install bundler`{:.highlight}.
The following is the output of the command:

{::comment}
Where do we execute the command?
{:/comment}

~~~
C:\Ruby21-x64><span class="highlight">gem install bundler</span>
Fetching: bundler-1.7.4.gem (100%)
Successfully installed bundler-1.7.4
Parsing documentation for bundler-1.7.4
Installing ri documentation for bundler-1.7.4
Done installing documentation for bundler after 4 seconds
1 gem installed
~~~
{: .output }

In the site repository, create the file `Gemfile`{:.highlight} and add the following lines:

~~~
source 'https://rubygems.org'
gem 'github-pages'
~~~
{: .file }

Run the command `bundle install`{:.highlight} to install all needed files for the GitHub Pages.
Below is a fragment of the output:

~~~
d:\projects\github\testsite.github.io><span class="highlight">bundle install</span>
DL is deprecated, please use Fiddle
Fetching gem metadata from https://rubygems.org/.......
...
Installing github-pages 28
Using bundler 1.7.4
Your bundle is complete!
Use `bundle show [gemname]` to see where a bundled gem is installed.
...
~~~
{: .output }

If an error is encountered, just correct it and rerun the `bundle install`{:.highlight} command.
Here is an example of an error I encountered when I was trying the steps above.

~~~
Gem::RemoteFetcher::FetchError: Errno::ECONNREFUSED: No connection could be
made because the target machine actively refused it. - connect(2) for "s3.a
mazonaws.com" port 443 (https://rubygems.org/gems/kramdown-1.3.1.gem)
An error occurred while installing kramdown (1.3.1), and Bundler cannot
continue.
Make sure that `gem install kramdown -v '1.3.1'` succeeds before bundling.

d:\projects\github\testsite.github.io>gem install kramdown -v '1.3.1'
Fetching: kramdown-1.3.1.gem (100%)
Successfully installed kramdown-1.3.1
Parsing documentation for kramdown-1.3.1
Installing ri documentation for kramdown-1.3.1
Done installing documentation for kramdown after 2 seconds
1 gem installed
~~~
{: .output }

After that, Jekyll can be started by running the command `bundle exec jekyll serve` in the site repository.
Open address `http://localhost:4000/` in your browser to see your page(s).

The following links are additional references about GitHub Pages:

* [Kramdown] is a fast, pure-Ruby Markdown-superset converter used.
* [GitHub Dark] to help you choose the color schemes for your theme.
* [Loyc] Blogging on GitHub --- More information on syntax highlighter and site setup.
* [Yi Zeng] Setup Jekyll on Windows
* How [Joshua Lande] created his blog site in GitHub Pages --- A good reference on what else you can do to configure your GitHub Pages. It has a short description on how to use Disqus, Google Analytics and a Twitter Plug with your GitHub Pages. A great addition indeed.

* How [erjjones] built his blog in one day --- Here is another great way to enhance your GitHub Pages; Twitter Bootstrap, Feedback Button, Dynamic GitHub Followers and Repository Buttons, Social Buzz Widgets and more.

Additional links:

* [Jekyll Documentation](http://jekyllrb.com/docs/home/)
* [GitHub Pages Features](https://help.github.com/categories/github-pages-features/)
* [Repository metadata on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages/)
* [GitHub Pages Troubleshooting](https://help.github.com/categories/github-pages-troubleshooting/)
* [Google+ Platform](https://developers.google.com/+/web/+1button/)



[GitHub Pages]: https://pages.github.com/ "GitHub Pages"
[GitHub Pages Basics]: https://help.github.com/categories/github-pages-basics/ "GitHub Pages Basic"
[Markdown]: http://daringfireball.net/projects/markdown/ "Markdown"
[CommonMark]: http://commonmark.org/
[HTML]: http://www.w3.org/html/ "HyperText Markup Language"
[Ruby]: http://www.ruby-lang.org "Ruby Programming Language"
[Ruby Installer for Windows]: http://rubyinstaller.org/ "Ruby Installer for Windows"
[Ruby Development Kit]: http://rubyinstaller.org/downloads/ "Ruby Development Kit"
[Jekyll]: http://jekyllrb.com "Jekyll"
[Run Jekyll on Windows]: http://jekyll-windows.juthilo.com/ "Run Jekyll on Windows"
[Bundler]: http://bundler.io/ "Bundler"
[Kramdown]: http://kramdown.gettalong.org/index.html "Kramdown Markdown"
[GitHub Dark]: https://userstyles.org/styles/37035/github-dark
[Loyc]: http://loyc.net/2014/blogging-on-github.html "Language of your choice"
[Yi Zeng]: http://yizeng.me/2013/05/10/setup-jekyll-on-windows/ "Yi Zeng's Blog"
[Joshua Lande]: http://joshualande.com/jekyll-github-pages-poole/ "How Joshua Lande Created His Blog Site in GitHub Pages"
[erjjones]: http://erjjones.github.io/blog/How-I-built-my-blog-in-one-day/ "How erjjones built his blog in one day"
