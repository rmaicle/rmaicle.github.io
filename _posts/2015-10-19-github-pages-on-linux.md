---
title: From Windows Local GitHub Pages to Linux
excerpt: How I initially configured Jekyll to run GitHub Pages on my local Windows machine
group: Posts
tags: [github pages, jekyll, ruby]
---

This post was originally added to the Local [GitHub Pages] on Windows but I decided to put it on a separate post.
This is not a how-to on setting up GitHub Pages on Linux.
I moved my project to a Linux development machine and I wanted to check if my local github-pages is working and up-to-date.

##### Show

I executed `bundle show` under my project root directory after almost a year and the following is a copy of the what happened:

{% highlight bash session %}
$ bundle show
Bundler could not find compatible versions for gem "nokogiri":
  In snapshot (Gemfile.lock):
    nokogiri (= 1.6.3.1)

  In Gemfile:
    github-pages (>= 0) ruby depends on
      jekyll-mentions (= 0.1.3) ruby depends on
        html-pipeline (~> 1.9.0) ruby depends on
          nokogiri (~> 1.4) ruby

Running `bundle update` will rebuild your snapshot from scratch, using only
the gems in your Gemfile, which may resolve the conflict.
{% endhighlight %}

##### Update

I ran `bundle update` to update everything.

{% highlight text session %}
$ bundle update
Fetching gem metadata from https://rubygems.org/............
Fetching version metadata from https://rubygems.org/...
Fetching dependency metadata from https://rubygems.org/..
Resolving dependencies....


Your user account isn't allowed to install to the system Rubygems.
You can cancel this installation and run:

    bundle install --path vendor/bundle

to install the gems into ./vendor/bundle/, or you can enter your password
and install the bundled gems to Rubygems using sudo.

Password: 
Installing RedCloth 4.2.9 with native extensions
Installing i18n 0.7.0 (was 0.6.11)
Installing json 1.8.3 (was 1.8.1) with native extensions
Installing minitest 5.8.1 (was 5.4.2)
Installing thread_safe 0.3.5 (was 0.3.4)
Installing tzinfo 1.2.2
Installing activesupport 4.2.4 (was 4.1.7)
Installing addressable 2.3.8
Installing blankslate 2.1.2.4
Installing fast-stemmer 1.0.2 with native extensions
Installing classifier-reborn 2.0.3 (was 2.0.1)
Installing coffee-script-source 1.9.1.1 (was 1.8.0)
Installing execjs 2.6.0 (was 2.2.2)
Installing coffee-script 2.4.1 (was 2.3.0)
Installing colorator 0.1
Installing ffi 1.9.10 (was 1.9.6) with native extensions
Installing ethon 0.8.0
Installing gemoji 2.1.0
Installing net-dns 0.8.0
Installing public_suffix 1.5.1
Installing typhoeus 0.8.0
Installing github-pages-health-check 0.5.3
Installing jekyll-coffeescript 1.0.1 (was 1.0.0)
Installing jekyll-gist 1.3.4 (was 1.1.0)
Installing jekyll-paginate 1.1.0
Installing sass 3.4.18 (was 3.4.7)
Installing jekyll-sass-converter 1.3.0 (was 1.2.0)
Installing rb-fsevent 0.9.6 (was 0.9.4)
Installing rb-inotify 0.9.5
Installing listen 3.0.3 (was 2.7.11)
Installing jekyll-watch 1.3.0 (was 1.1.1)
Installing kramdown 1.5.0 (was 1.3.1)
Installing liquid 2.6.2 (was 2.6.1)
Installing mercenary 0.3.5 (was 0.3.4)
Installing posix-spawn 0.3.11 (was 0.3.9) with native extensions
Installing yajl-ruby 1.2.1 (was 1.1.0) with native extensions
Installing pygments.rb 0.6.3 (was 0.6.0)
Installing redcarpet 3.3.2 (was 3.1.2) with native extensions
Installing safe_yaml 1.0.4
Installing parslet 1.5.0
Installing toml 0.1.2
Installing jekyll 2.4.0
Installing jekyll-feed 0.3.1
Installing mini_portile 0.6.2 (was 0.6.0)
Installing nokogiri 1.6.6.2 (was 1.6.3.1) with native extensions
Installing html-pipeline 1.9.0
Installing jekyll-mentions 0.2.1 (was 0.1.3)
Installing jekyll-redirect-from 0.8.0 (was 0.6.2)
Installing jekyll-sitemap 0.8.1 (was 0.6.0)
Installing jemoji 0.5.0 (was 0.3.0)
Installing maruku 0.7.0
Installing rdiscount 2.1.7 with native extensions
Installing terminal-table 1.5.2
Installing github-pages 39 (was 28)
Using bundler 1.10.6
Bundle updated!
{% endhighlight %}

##### Dependency Version

To list dependency versions, execute the following command:

{% highlight bash session %}
$ github-pages versions
+-----------------------+---------+
| Gem                   | Version |
+-----------------------+---------+
| jekyll                | 2.4.0   |
| jekyll-coffeescript   | 1.0.1   |
| jekyll-sass-converter | 1.3.0   |
| kramdown              | 1.5.0   |
| maruku                | 0.7.0   |
| rdiscount             | 2.1.7   |
| redcarpet             | 3.3.2   |
| RedCloth              | 4.2.9   |
| liquid                | 2.6.2   |
| pygments.rb           | 0.6.3   |
| jemoji                | 0.5.0   |
| jekyll-mentions       | 0.2.1   |
| jekyll-redirect-from  | 0.8.0   |
| jekyll-sitemap        | 0.8.1   |
| jekyll-feed           | 0.3.1   |
+-----------------------+---------+
{% endhighlight %}



[GitHub Pages]: https://pages.github.com/ "GitHub Pages"