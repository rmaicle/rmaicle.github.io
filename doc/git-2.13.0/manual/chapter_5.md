---
title: File/Directory Structure
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git-2.13.0/manual/chapter_5
group: git-2.13.0
subgroup: manual
---

{% include doc_group_index.html %}
Sections
{:.custom_heading_2}
<ol>
{% for item in site.data.index_docs.groups[group_index].subgroups[subgroup_index].chapters[4].sections %}
    <li><a href="{{ item.link }}" class="no_underline">{{ item.section }}</a></li>
{% endfor %}
</ol>

Higher level SCMs may provide and manage additional information in the $GIT_DIR.