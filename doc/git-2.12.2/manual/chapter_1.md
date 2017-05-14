---
title: Commands
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.12.2/manual/chapter_1
group: git-2.12.2
subgroup: manual
---

We divide Git into high level ("porcelain") commands and low level ("plumbing") commands.

{% include doc_group_index.html %}
Sections
{:.custom_heading_2}
<ol>
{% for item in site.data.index_docs.groups[group_index].subgroups[subgroup_index].chapters[0].sections %}
    <li><a href="{{ item.link }}" class="no_underline">{{ item.section }}</a></li>
{% endfor %}
</ol>