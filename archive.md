---
layout: page
title: Archive
excerpt: Links to all posts sorted chronologically.
group: Posts
---

<div id="archive">
{% for post in site.posts limit %}
    <article class="summary">
        <a href="{{ post.url }}"><h1>{{ post.title }}</h1></a>
        <a href="{{ post.url }}">
        {{ post.excerpt }}<br/>
        {{ post.date | | date: "%Y %b %-d" }}
        </a>
    </article>
{% endfor %}
</div>
