---
title: "`markdownify` Workaround"
date: 2017-04-20T13:38:32UTC
excerpt: I recently used the Liquid templating language `markdownify` filter to convert a markdown-formatted text into HTML and was surprised at the seemingly weird output.
layout: post
categories: [post, jekyll]
tags: [markdownify]
published: true
permalink: /posts/JvqXLAk3xmBGn18
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

[Jekyll template filter] `markdownify` is used to convert a markdown-formatted text into HTML. The example used in the Jekyll website is:

    {% raw %}{{ page.excerpt | markdownify }}{% endraw %}

Simple, right? I thought so too. What it did not mention is that `markdownify` wraps the source text within a `<p>` element. So that the result of the above code where the `page.excerpt` text for example is `excerpt text`:

    <p>excerpt text</p>
    
I had created my template `.html` file usually wrapping YAML keys within HTML elements like the following code and was surprised at what I got.
The above code was converted to (Jekyll 3.4.3 and github-pages 134):

    <p class="excerpt"></p>
    <p>excerpt text</p>

I posted the issue I encountered in irc `#jekyll` but got no response maybe because of my timezone.
I needed a workaround to finish updating my GitHub Pages _site_.

The following code shows the simplest and fastest workaround I did.

~~~
{% raw %}{% assign excerpt = page.excerpt | markdownify | replace: '<p>', '' | replace: '</p>', '' %}
{{ excerpt | markdownify }}{% endraw %}
~~~

Which produced the following output:

    <p class="excerpt">excerpt text</p>

[Jekyll template filter]: https://jekyllrb.com/docs/templates/
