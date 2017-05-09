---
title: Low-Level Commands (Plumbing)
layout: documentation
categories: [documentation]
tags: [git]
draft: true
published: true
permalink: /doc/git/manual/ch2/section_2
group: git
---

Although Git includes its own porcelain layer, its low-level commands are sufficient to support development of alternative porcelains. Developers of such porcelains might start by reading about git-update-index(1) and git-read-tree(1).

The interface (input, output, set of options and the semantics) to these low-level commands are meant to be a lot more stable than Porcelain level commands, because these commands are primarily for scripted use. The interface to Porcelain commands on the other hand are subject to change in order to improve the end user experience.

The following description divides the low-level commands into commands that manipulate objects (in the repository, index, and working tree), commands that interrogate and compare objects, and commands that move objects and references between repositories.

{% include group_index.html %}
Sub-Sections
{:.custom_heading_2}
<ol>
{% for item in site.data.documentation.groups[group_index].chapters[1].sections[1].subsections %}
    <li><a href="{{ item.link }}" class="no_underline">{{ item.subsection }}</a></li>
{% endfor %}
</ol>