---
layout: page
title: Tidbit Index
excerpt: Links to all tidbit entries.
collection: Tidbits
---

The list is sorted chronologically.

<div id="archive">
<ol>
{% for post in site.tidbits %}
    {% if post.title != "Tidbit Index" %}
    <li>
        <article class="summary">
            <a href="{{ post.url }}"><h1>{{ post.title }}</h1></a>
        </article>
    </li>
    {% endif %}
{% endfor %}
</ol>
</div>
