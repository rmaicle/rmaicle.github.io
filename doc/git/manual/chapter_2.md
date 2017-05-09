---
title: Commands
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/chapter_2
group: git
---

We divide Git into high level ("porcelain") commands and low level ("plumbing") commands.

{% include group_index.html %}
Sections
{:.custom_heading_2}
<ol>
{% for item in site.data.documentation.groups[group_index].chapters[1].sections %}
    <li><a href="{{ item.link }}" class="no_underline">{{ item.section }}</a></li>
{% endfor %}
</ol>