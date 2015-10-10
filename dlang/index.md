---
layout: reference_dlang
title: D Programming Language
excerpt: Unofficial Reference to the D Programming Language
group: DLang
tags: [root]
---

I have decided to relearn the D programming language.
There are lots of new features to the language since 2006.
What better way to do that than to start from scratch.
This is an attempt to document my understanding of the language and become a personal reference to the language.

I would like this reference to be in sync with the latest version of the D language specification.
Hopefully, this could evolve as a good alternative reference to those who wish to learn this great language.

This reference is _small-screen friendly_, viewable in a 4-inch phone.

#### Unofficial Reference

This is an __unofficial__ reference to the D programming language.
It is a _work in progress_.
Information presented here possibly _contain errors_ and _may not be up-to-date_.

For the official specification of the D programming language, follow the link below.

<aside class="hide">
Read with Caution<br/>
This is an unofficial and imperfect reference to the D programming language.
The information here will contain errors and may sometimes conflict with the actual specification of the language.
</aside>

#### Official References

The following are links to the official D Programming Language:

* [Official Site (dlang.org)] (http://dlang.org/)
* [Official Specification] (http://dlang.org/dlangspec.pdf)

Information presented here is initially based on [__version 2.068.2__] (http://dlang.org/changelog/2.068.2.html) of the reference compiler __Digital Mars D__.

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