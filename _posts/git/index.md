---
layout: hub
title: Git Posts
excerpt:
permalink: /posts/git/
---

{% assign posts = site.categories[git].post %}
{% include section_index_dated.html label="Posts" posts=posts %}
