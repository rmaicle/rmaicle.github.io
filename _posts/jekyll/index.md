---
layout: hub
title: Jekyll Posts
excerpt:
permalink: /posts/jekyll/
---

{% assign posts = site.categories[jekyll].post %}
{% include section_index_dated.html label="Posts" posts=posts %}
