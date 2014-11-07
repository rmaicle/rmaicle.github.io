---
layout: post
title: Install Jekyll for GitHub Pages
excerpt: A very short how-to on installing Jekyll for GitHub Pages for Windows.
category: Blog
tags: blog, github pages
---

This is a very short description on how to install Jekyll on Windows. For more
detailed instructions see [Running Jekyll on Windows].

Download and install [Ruby]. Download and extract the [Development Kit],
preferrably in a sub-directory within the Ruby root directory. Initialize the
Development Kit to bind it to the Ruby installation. Then install the Development
Kit.

~~~
ruby dk.rb init
ruby dk.rb install
~~~

Install Bundler

~~~
gem install bundler
~~~

In your local repo, create file Gemfile with the following content:

~~~
source 'https://rubygems.org'
gem 'github-pages'
~~~

Install and execute Jekyll

~~~
bundle install
bundle exec jekyll serve
~~~

Open address `http://localhost:4000/` in your browser.


[Running Jekyll on Windows]: http://jekyll-windows.juthilo.com/ "Running Jekyll on Windows"
[Ruby]: http://rubyinstaller.org/downloads/ "Ruby Installer"
[Development Kit]: http://rubyinstaller.org/downloads/ "Ruby Development Kit"
