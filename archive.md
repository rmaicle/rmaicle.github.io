---
layout: page
title: Archive
excerpt: Links to all posts.
group: Posts
---

The list is sorted chronologically.

<ul class="list_style_none list_style_nopadding">
    {% for post in site.posts %}
    <li>
        <article>
        <span class="article_date">{{ post.date | date: "%b %-d, %Y" }}</span>:
        <span class="article_link"><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></span>
        <span class="article_excerpt">{{post.excerpt}}</span>
        </article>
    </li>

    {% endfor %}
</ul>

