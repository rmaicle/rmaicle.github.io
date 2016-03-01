---
title: Updating Local GitHub Pages on Linux
excerpt: Update Local GitHub Pages
date: February 22, 2016
group: Posts
categories: [Blog]
tags: [github pages, jekyll, ruby]
---

I came across [Atom (RSS) feeds for GitHub Pages](https://help.github.com/articles/atom-rss-feeds-for-github-pages/) and tried it.
I tried it but it doesn't work because I don't have the `jekyll-feed` gem installed.
Looking at the latest [GitHub Pages Version and Dependencies](https://pages.github.com/versions/) it seems I need an upgrade.

##### Update

I ran `bundle update` and encountered an error: `Gem::RemoteFetcher::UnknownHostError: no such name (https://rubygems.org/gems/jekyll-feed-0.4.0.gem)` and politely told me:

{% highlight text session %}
An error occurred while installing jekyll-feed (0.4.0), and Bundler cannot continue.
Make sure that `gem install jekyll-feed -v '0.4.0'` succeeds before bundling.
{% endhighlight %}

I will not spare posting the output because it might just be useful as a reference since I am not doing this full time and I don't know a heck about `Jekyll` or `Ruby`.

{% highlight text session %}
$ bundle update
Fetching gem metadata from https://rubygems.org/............
Fetching version metadata from https://rubygems.org/...
Fetching dependency metadata from https://rubygems.org/..
Resolving dependencies....
Using RedCloth 4.2.9
Using i18n 0.7.0
Using json 1.8.3
Using minitest 5.8.4
Using thread_safe 0.3.5
Using addressable 2.3.8
Using coffee-script-source 1.10.0
Using execjs 2.6.0
Using colorator 0.1
Using ffi 1.9.10
Using multipart-post 2.0.0
Using gemoji 2.1.0
Using net-dns 0.8.0
Using public_suffix 1.5.3
Using sass 3.4.21
Using rb-fsevent 0.9.7
Using kramdown 1.9.0
Using liquid 3.0.6
Using mercenary 0.3.5
Using rouge 1.10.1
Using safe_yaml 1.0.4

Gem::RemoteFetcher::UnknownHostError: no such name (https://rubygems.org/gems/jekyll-feed-0.4.0.gem)
Using mini_portile2 2.0.0
Using jekyll-paginate 1.1.0
Using jekyll-sitemap 0.10.0
Using rdiscount 2.1.8
Using redcarpet 3.3.3
Using terminal-table 1.5.2
Using bundler 1.11.2
Using jekyll-textile-converter 0.1.0
Using tzinfo 1.2.2
Using coffee-script 2.4.1
Using ethon 0.8.1


Your user account isn't allowed to install to the system Rubygems.
  You can cancel this installation and run:

      bundle install --path vendor/bundle

  to install the gems into ./vendor/bundle/, or you can enter your password
  and install the bundled gems to Rubygems using sudo.

  Password: 
Installing rb-inotify 0.9.7 (was 0.9.5)
Using faraday 0.9.2
Using jekyll-sass-converter 1.3.0
An error occurred while installing jekyll-feed (0.4.0), and Bundler cannot continue.
Make sure that `gem install jekyll-feed -v '0.4.0'` succeeds before bundling.
{% endhighlight %}

##### Install Jekyll Feed and Update

I went ahead and install `jekyll-feed` as mentioned.

{% highlight console %}
$ gem install jekyll-feed -v '0.4.0'
Fetching: jekyll-feed-0.4.0.gem (100%)
Successfully installed jekyll-feed-0.4.0
Parsing documentation for jekyll-feed-0.4.0
Installing ri documentation for jekyll-feed-0.4.0
Done installing documentation for jekyll-feed after 0 seconds
1 gem installed
{% endhighlight %}

And run update again which updated the following:

* listen 3.0.6 (was 3.0.5)
* jekyll 3.0.3 (was 3.0.2)
* github-pages-health-check 1.0.1 (was 0.6.0)
* jekyll-mentions 1.0.1 (was 1.0.0)
* jekyll-seo-tag 1.0.0 (was 0.1.4)
* github-pages 50 (was 45)

{% highlight text session %}
$ bundle update
Fetching gem metadata from https://rubygems.org/............
Fetching version metadata from https://rubygems.org/...
Fetching dependency metadata from https://rubygems.org/..
Resolving dependencies....
Using RedCloth 4.2.9
Using i18n 0.7.0
Using json 1.8.3
Using minitest 5.8.4
Using thread_safe 0.3.5
Using addressable 2.3.8
Using coffee-script-source 1.10.0
Using execjs 2.6.0
Using colorator 0.1
Using ffi 1.9.10
Using multipart-post 2.0.0
Using gemoji 2.1.0
Using net-dns 0.8.0
Using public_suffix 1.5.3
Using sass 3.4.21
Using rb-fsevent 0.9.7
Using kramdown 1.9.0
Using liquid 3.0.6
Using mercenary 0.3.5
Using rouge 1.10.1
Using safe_yaml 1.0.4
Using jekyll-feed 0.4.0 (was 0.3.1)
Using mini_portile2 2.0.0
Using jekyll-paginate 1.1.0
Using jekyll-sitemap 0.10.0
Using rdiscount 2.1.8
Using redcarpet 3.3.3
Using terminal-table 1.5.2
Using bundler 1.11.2
Using jekyll-textile-converter 0.1.0
Using tzinfo 1.2.2
Using coffee-script 2.4.1
Using ethon 0.8.1
Using rb-inotify 0.9.7 (was 0.9.5)
Using faraday 0.9.2
Using jekyll-sass-converter 1.3.0
Using nokogiri 1.6.7.2
Using activesupport 4.2.5.1
Using jekyll-coffeescript 1.0.1
Using typhoeus 0.8.0


Your user account isn't allowed to install to the system Rubygems.
  You can cancel this installation and run:

      bundle install --path vendor/bundle

  to install the gems into ./vendor/bundle/, or you can enter your password
  and install the bundled gems to Rubygems using sudo.

  Password: 
Installing listen 3.0.6 (was 3.0.5)
Using sawyer 0.6.0
Using html-pipeline 2.3.0
Using jekyll-watch 1.3.1
Using octokit 4.2.0
Installing jekyll 3.0.3 (was 3.0.2)
Installing github-pages-health-check 1.0.1 (was 0.6.0)
Using jekyll-gist 1.4.0
Installing jekyll-mentions 1.0.1 (was 1.0.0)
Using jekyll-redirect-from 0.9.1
Installing jekyll-seo-tag 1.0.0 (was 0.1.4)
Using jemoji 0.5.1
Installing github-pages 50 (was 45)
Bundle updated!
{% endhighlight %}


##### Show

I executed `bundle show` under my project root directory:

{% highlight test %}
$ bundle show
Gems included by the bundle:
  * RedCloth (4.2.9)
  * activesupport (4.2.5.1)
  * addressable (2.3.8)
  * bundler (1.11.2)
  * coffee-script (2.4.1)
  * coffee-script-source (1.10.0)
  * colorator (0.1)
  * ethon (0.8.1)
  * execjs (2.6.0)
  * faraday (0.9.2)
  * ffi (1.9.10)
  * gemoji (2.1.0)
  * github-pages (45)
  * github-pages-health-check (0.6.0)
  * html-pipeline (2.3.0)
  * i18n (0.7.0)
  * jekyll (3.0.2)
  * jekyll-coffeescript (1.0.1)
  * jekyll-feed (0.3.1)
  * jekyll-gist (1.4.0)
  * jekyll-mentions (1.0.0)
  * jekyll-paginate (1.1.0)
  * jekyll-redirect-from (0.9.1)
  * jekyll-sass-converter (1.3.0)
  * jekyll-seo-tag (0.1.4)
  * jekyll-sitemap (0.10.0)
  * jekyll-textile-converter (0.1.0)
  * jekyll-watch (1.3.1)
  * jemoji (0.5.1)
  * json (1.8.3)
  * kramdown (1.9.0)
  * liquid (3.0.6)
  * listen (3.0.5)
  * mercenary (0.3.5)
  * mini_portile2 (2.0.0)
  * minitest (5.8.4)
  * multipart-post (2.0.0)
  * net-dns (0.8.0)
  * nokogiri (1.6.7.2)
  * octokit (4.2.0)
  * public_suffix (1.5.3)
  * rb-fsevent (0.9.7)
  * rb-inotify (0.9.5)
  * rdiscount (2.1.8)
  * redcarpet (3.3.3)
  * rouge (1.10.1)
  * safe_yaml (1.0.4)
  * sass (3.4.21)
  * sawyer (0.6.0)
  * terminal-table (1.5.2)
  * thread_safe (0.3.5)
  * typhoeus (0.8.0)
  * tzinfo (1.2.2)
{% endhighlight %}

##### Dependency Version

To list dependency versions, execute the following command:

{% highlight bash session %}
$ github-pages versions
+---------------------------+---------+
| Gem                       | Version |
+---------------------------+---------+
| jekyll                    | 3.0.3   |
| jekyll-sass-converter     | 1.3.0   |
| jekyll-textile-converter  | 0.1.0   |
| kramdown                  | 1.9.0   |
| rdiscount                 | 2.1.8   |
| redcarpet                 | 3.3.3   |
| RedCloth                  | 4.2.9   |
| liquid                    | 3.0.6   |
| rouge                     | 1.10.1  |
| jemoji                    | 0.5.1   |
| jekyll-mentions           | 1.0.1   |
| jekyll-redirect-from      | 0.9.1   |
| jekyll-sitemap            | 0.10.0  |
| jekyll-feed               | 0.4.0   |
| jekyll-gist               | 1.4.0   |
| jekyll-paginate           | 1.1.0   |
| github-pages-health-check | 1.0.1   |
| jekyll-coffeescript       | 1.0.1   |
| jekyll-seo-tag            | 1.0.0   |
+---------------------------+---------+
{% endhighlight %}



[GitHub Pages]: https://pages.github.com/ "GitHub Pages"