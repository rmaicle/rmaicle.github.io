---
title: Git
author: Linus Torvalds
version: 2.12.2
date: 2016-08-12
license: GNU General Public License
layout: doc
categories: [documentation]
tags: [git]
draft: true
published: false
permalink: /doc/git/index
group: git
---

Git<br>
Version: {{ page.version }}<br>
Date: {{ page.date }}<br>
Author: {{ page.author }}<br>
License: [{{ page.license }}](http://www.gnu.org/copyleft/gpl.html)<br>
[www.kernel.org/pub/software/scm/git/docs/](www.kernel.org/pub/software/scm/git/docs/)<br>
Last updated 2016-08-12 20:00:10 UTC<br>

{% for item in site.data.index_docs.groups %}
    {% if item.group | slice: 0, 3 == "git" %}
    <li><a href="{{ item.link }}" class="no_underline">{{ item.title }}</a></li>
    {% endif %}
{% endfor %}
