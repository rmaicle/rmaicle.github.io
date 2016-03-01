---
title: Creating Archive Page
excerpt: Creating a page listing all post pages
date: October 08, 2015
group: Posts
categories: [Blog]
published: false
tags: [github pages, jekyll, ruby]
---

Information presented here is taken from the Jekyll documentation specifically under the [Writing Posts] topic.

#### Configuration
My [`Jekyll configuration`] (http://jekyllrb.com/docs/configuration/) file `_config.yml` contains the following entry at the bottom:

~~~
pages_list: {
  'Archive':      '/archive.html',
}
~~~

#### The Archive Page
The file contains what is called [`YAML front matter block`] (http://jekyllrb.com/docs/frontmatter/).

~~~
---
layout: page
title: Archive
excerpt: All posts sorted chronologically.
group: Archive
---
~~~

The `group` variable corresponds to an item in the configuration file.

The entry name `Archive` is highlighted when the user clicked the navigation links and stays highlighted until the user moves to another navigation link.
The following code snippet shows how the navigation links are displayed.
Notice the link class `active` which causes the text to be 'highlighted'.

~~~
<nav class="left">
    <!-- Class 'active' highlights the entire box -->
    {% for p in site.pages_list %}
        {% if page.group == p[0] %}
        <li><a href="{{ site.baseurl }}{{ p[1]  }}" class="active">{{ p[0] }}</a></li>
        {% else %}
        <li><a href="{{ site.baseurl }}{{ p[1]  }}">{{ p[0] }}</a></li>
        {% endif %}
    {% endfor %}
</nav>
~~~

[Writing Posts]: http://jekyllrb.com/docs/posts/