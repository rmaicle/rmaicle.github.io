---
layout: reference_dlang
title: D Programming Language
excerpt: Unofficial Reference to the D Programming Language
group: DLang
tags: [root]
---

I decided to (re)learn the __D programming language__.
What better way, I think, to do that than to start at the beginning.
So, this is a journey to learning the language from scratch.
This is an attempt on documenting the language as I learn it and will serve as a personal reference to the language.

I want this to be _small-device friendly_ as much as possible.

#### Unofficial Reference

A word of warning.
This is an __unofficial__ and __imperfect__ reference to the D programming language.
This will be a continuous effort to describe and learn the language.
The information here will contain errors and may sometimes conflict with the actual specification of the language.
Please read with caution.

<aside class="hide">
Read with Caution<br/>
This is an unofficial and imperfect reference to the D programming language.
The information here will contain errors and may sometimes conflict with the actual specification of the language.
</aside>

#### Official References

The following are links to the official D Programming Language:

* [Official Site (dlang.org)] (http://dlang.org/)
* [Official Specification] (http://dlang.org/dlangspec.pdf)

Information presented here are based on [__version 2.068.2__] (http://dlang.org/changelog/2.068.2.html) of the reference compiler __Digital Mars D__.

#### Organization

The following provides a list of the major topics along with brief descriptions.

<ol class="padding_left_25">
{% for p in site.dlang_list %}
    {% if p[1] == 'divider' %}
        <hr class="thin compact darker" />
    {% else %}
        <li class="padding_left_5"><a class="no_underline" href="{{ p[1]  }}">{{ p[0] }}</a></li>
    {% endif %}
{% endfor %}
</ol>

<div class="hide">
#### Conventions

The following are the coventions used throughout.
</div>