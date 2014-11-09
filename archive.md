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
        <span>{{ post.date | date: "%b %-d, %Y" }}</span>:
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        * {{post.excerpt}}
    </li>

    {% endfor %}
</ul>

