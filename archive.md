---
layout: page
title: Archive
excerpt: Links to all posts sorted chronologically.
group: Posts
---

<div id="archive">
{% for post in site.posts limit %}
    <article class="summary">
        <a href="{{ post.url }}"><h4>{{ post.title }}</h4></a>
        <a href="{{ post.url }}">
        <p class='excerpt'>
            {{ post.excerpt }}<br/>
            {{ post.date | | date: "%Y %b %-d" }}
        </p>
        </a>
    </article>
{% endfor %}
</div>
