---
layout: page
title: Home
excerpt:
group: Home
---

This is my scratchpad of ideas and anything that comes to mind.
I wanted a reference of things I have read, tried or have thought that maybe someday will be of help for me or someone else.
I hope I can brew some good things out of them.

A lot of things get outdated so fast and I try to keep up.

<div class="vspace">&nbsp;</div>

{% for post in site.posts limit:6 %}
<article class="summary">
    <a href="{{ post.url }}"><h1>{{ post.title }}</h1></a>
    <p>
    {{ post.excerpt }}<br/>
    {{ post.date | | date: "%b %-d, %Y" }}
    </p>
    <a href="{{ post.url }}">Read more...</a>
</article>
{% endfor %}
