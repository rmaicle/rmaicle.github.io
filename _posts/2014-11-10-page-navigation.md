---
title: Page Navigation
excerpt: Moving to next and previous pages
categories: [Blog]
tags: [github pages]
---

The following are [page variables] available in Jekyll.
I included only the variables used in the example.
These descriptions are taken directly from the site.

| Variable | Description |
|---------|-------------|
| page.title | The title of the page. |
| page.url | The URL of the post without the domain, but with a leading slash, e.g. `/2008/12/14/my-post.html` |
| page.date | The Date assigned to the Post. This can be overridden in a Post's front matter by specifying a new date/time in the format `YYYY-MM-DD HH:MM:SS` (assuming UTC), or `YYYY-MM-DD HH:MM:SS +/-TTTT` (to specify a time zone using an offset from UTC. e.g. `2008-12-14 10:30:00 +0900`). |
| page.excerpt | The un-rendered excerpt of the Page. |
| page.next | The next post relative to the position of the current post in `site.posts`. Returns `nil` for the last entry. |
| page.previous | The previous post relative to the position of the current post in `site.posts`. Returns `nil` for the first entry. |

Here is an example of the `next` and `previous` page variables as initially implemented on this site.

{% highlight html linenos %}
<div id="page_previous">
    {% raw %}{% if page.previous != nil %} {% endraw %}
        <a href="{% raw %}{{ page.previous.url }}{% endraw %}">Previous</a>
        <h1>{% raw %}{{ page.previous.title }}{% endraw %}</h1>
        <p>
            {% raw %}{{ page.previous.excerpt }}{% endraw %}<br/><br/>
            {% raw %}{{ page.previous.date | date_to_string}}{% endraw %}
        </p>
    {% raw %}{% endif %}{% endraw %}
</div>

<div id="page_next">
    {% raw %}{% if page.next != nil %}{% endraw %}
        <a href="{% raw %}{{ page.next.url }}{% endraw %}">Next</a>
        <h1>{% raw %}{{ page.next.title }}{% endraw %}</h1>
        <p>
            {% raw %}{{ page.next.excerpt }}{% endraw %}<br/><br/>
            {% raw %}{{ page.next.date | date_to_string}}{% endraw %}
        </p>
    {% raw %}{% endif %}{% endraw %}
</div>
{% endhighlight %}

[page variables]: http://jekyllrb.com/docs/variables/
