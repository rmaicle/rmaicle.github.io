---
layout: page
title: Post Archive
excerpt: All posts sorted chronologically.
group: Posts
tags: [root]
---

<div id="archive">
{% for post in site.posts %}
    <article class="summary">
        <a href="{{ post.url }}"><h2>{{ post.title }}</h2></a>
        <a href="{{ post.url }}">
        <p class='excerpt'>
            {{ post.excerpt }}<br/>
            {{ post.date | date: "%Y %b %-d" }}
        </p>
        </a>
    </article>
{% endfor %}
</div>
