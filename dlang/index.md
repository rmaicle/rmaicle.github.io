---
layout: reference_dlang
title: D Programming Language
excerpt:
group: DLang
tags: [dlang, dlangref]
---

This is my personal Guide to the [D Programming Language](http://dlang.org/).
This is a _work in progress_.
Information presented here possibly _contain errors_ and _may not be up-to-date_.
This guide is initially based on the specification as of version [_version 2.068.2_] (http://dlang.org/changelog/2.068.2.html) of the _Digital Mars D_ compiler.

## Official References

The following are links to the official D Programming Language:

* [Official Site (dlang.org)] (http://dlang.org/)
* [Official Specification] (http://dlang.org/dlangspec.pdf)

## Organization

The following is the list of major topics for this guide.

<ol>
{% for p in site.dlang_list %}
    {% if p[1] == 'divider' %}
        <hr class="thin compact darker" />
    {% else %}
        <li class="padding_left_5"><a class="no_underline" href="{{ p[1]  }}">{{ p[0] }}</a></li>
    {% endif %}
{% endfor %}
</ol>

{% comment %}
#### Conventions
The following are the coventions used throughout.
{% endcomment %}