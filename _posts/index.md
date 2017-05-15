---
layout: hub
title: All Posts
excerpt:
permalink: /posts/index
---

{% assign posts = site.categories.post %}
{% include section_index_dated.html label="Posts" posts=posts %}
