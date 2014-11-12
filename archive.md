---
layout: page
title: Archive
excerpt: Links to all posts.
group: Posts
---

The list is sorted chronologically.

<div id="archive">
<ol>
{% for post in site.posts limit %}
    <li>
    <article class="summary">
    <a href="{{ post.url }}"><h1>{{ post.title }}</h1></a>
    <p>
    {{ post.excerpt }}<br/>
    {{ post.date | | date: "%b %-d, %Y" }}
    </p>
    <a href="{{ post.url }}">Read more...</a>
    </article>
    </li>
{% endfor %}
</ol>
</div>
