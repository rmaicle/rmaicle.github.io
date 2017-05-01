---
title: Liquid 'raw' Tag and Fenced Code Blocks
date: 2014-11-12T11:02:08UTC
excerpt: Displaying markdown code blocks and workarounds.
layout: post
categories: [post, jekyll]
tags: [github pages, markdown, liquid]
published: true
permalink: /posts/71xXldY8KeKXWgw
thumbnail:
image:
  layout: auto_width
  source: 
  attribution: 
video:
  source: 
  attribution: 
  layout: top
videos:
  - source: 
    attribution: 
    layout: 
sources:
  - label: article title (source)
    link:
related:
---

{% assign openTag = '{%' %}

[Liquid] is a [template engine used by Jekyll].
Jekyll supports all standard Liquid Tags and Filters and adds some filters and tags for common tasks.
Tags are used for template logic processing.
Filters are output filters that allows text to be transformed before sending it to the output.
For more information on Tags and Filters, go to [Liquid for Designers].

Liquid Output markup is surrounded by double curly braces.
Tag markup is surrounded by a curly brace and a percent sign.

{% highlight liquid %}
{% raw %}{{ output }}{% endraw %}
{% raw %}{% tag %}{% endraw %}
{% endhighlight %}

## Tag Markup raw and endraw

{% comment %}
Define raw and endraw tag markups.
{% endcomment %}

The purpose of the `raw` and `endraw` tag markup is to allow anything in between to be displayed as is.
Meaning anything in between those tags will be ignored by the templating system.
From the Liquid wiki it says:

> Raw temporarily disables tag processing. This is useful for generating content (eg, Mustache, Handlebars) which uses conflicting syntax.

One can use the {% raw %} `{% raw %}` {% endraw %} and `{{ openTag }} endraw %}` tag markups in code blocks.
[This Liquid templating engine issue is tricky](http://blog.slaks.net/2013-06-10/jekyll-endraw-in-code) on the `raw` and `endraw` tag markup.
If we want to display a `raw` tag markup like {% raw %} `{% raw %}`{% endraw %}, we cannot just type it as is.
The templating engine will interpret it as the beginning of the `raw` tag markup and will not be displayed.

### Using a Variable

We can display {% raw %} `{% raw %}` {% endraw %} by wrapping it between a `raw` and `endraw` tag markup like this:

{% highlight liquid %}
{% raw %}{% raw %}{% endraw %} {% raw %}{% raw %}{% endraw %} {{ openTag }} endraw %}
{% endhighlight %}

One way to do this is to use a `variable` whose value is the opening tag markup characters {% raw %}`{%`{% endraw %}.
(How we declare the variable is shown below)
The `variable` will be used instead of the characters {% raw %}`{%`{% endraw %} in `{{ openTag }} endraw %}`.
The code should look like:

{% highlight liquid %}
{% raw %}{% assign openTag = '{%' %}{% endraw %}
...
{% raw %}{% raw %}{% endraw %} {% raw %}{% raw %}{% endraw %} {% raw %}{{ openTag }}{% endraw %} endraw %}
{% endhighlight %}

The `openTag` output tag markup will be replaced by the characters {% raw %}`{%`{% endraw %}.
The code above will display {% raw %}`{% raw %}`{% endraw %}. It may be a bit confusing at first but works pretty well.

### Using an HTML Entity

Another way of doing it is to use part of the tag as an HTML entity.
Liquid will not recognize it as part of the tag and the browser will convert the HTML entity and display it.
We can convert the opening curly brace as an HTML entity <code>&amp;#123;</code> and the browser will display it as <code>&#123;</code>.

We can display <code>&#123;% raw %}</code> by replacing the opening curly brace with the HTML entity <code>&amp;#123;</code> and copy the rest.

{% highlight html %}
<code>&#123;% raw %}</code>
{% endhighlight %}

## Raw Fenced Code Block Syntax

How do I show the reader the code on how to display a fenced code block with syntax highlighting using {% raw %} `{% raw %}` {% endraw %} and `{{ openTag }} endraw %}`?
That means how it would appear on screen before any rendering or transformation of the code occurs.
This is akin to the 'view as `Raw`' feature in GitHub source code display.

I will repeat it here, the purpose of the `raw` and `endraw` tag markup is to allow anything in between to be displayed as is.
Meaning anything in between those tags will be ignored by the templating system.

Here is a __hack__ version of what I want to show. This is how it should look if you typed it.

<div class="highlight"><pre>
~~~ cpp
{% raw %}{% raw %}{% endraw %}~~~ cpp{{ openTag }} endraw %}
int main() {
    std::cout << "Hello world!" << std::endl;
    return 0;
}
{% raw %}{% raw %}{% endraw %}~~~{{ openTag }} endraw %}
~~~
</pre></div>

The above code should be displayed like the following in the browser after it has passed through Jekyll.
I have recreated the actual output since I can't get it to work and the next paragraph is wrongly rendered because the code above doesn't work as it should.
You will notice that the closing `~~~` is missing at the bottom. That was how it was rendered.

<div class="highlight"><pre><code class="language-cpp" data-lang="cpp"><span class="o">~~~</span> <span class="n">cpp</span>
<span class="kt">int</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
    <span class="n">std</span><span class="o">::</span><span class="n">cout</span> <span class="o">&lt;&lt;</span> <span class="s">&quot;Hello world!&quot;</span> <span class="o">&lt;&lt;</span> <span class="n">std</span><span class="o">::</span><span class="n">endl</span><span class="p">;</span>
    <span class="k">return</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>
</code></pre></div>

This is the actual HTML code produced by the code above.
On the last line, after the `div`, `pre`, `code` tags have been closed, the closing `~~~` is rendered as a beginning fenced code block.
And you will see why the next paragraph after the fenced code block is ruined.
I am not sure if this is a bug or if anyone has filed a bug report on it as of this writing.
But that just shows that as of this writing we cannot use {% raw %} `{% raw %}` {% endraw %} and `{{ openTag }} endraw %}` to display raw fenced code blocks syntax.

~~~
<div class="highlight"><pre><code class="language-cpp" data-lang="cpp"><span class="o">~~~</span> <span class="n">cpp</span>
<span class="kt">int</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
    <span class="n">std</span><span class="o">::</span><span class="n">cout</span> <span class="o">&lt;&lt;</span> <span class="s">&quot;Hello world!&quot;</span> <span class="o">&lt;&lt;</span> <span class="n">std</span><span class="o">::</span><span class="n">endl</span><span class="p">;</span>
    <span class="k">return</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>
</code></pre></div><div class="highlight"><pre><code class="language-text" data-lang="text">
~~~

## Alternative to Showing Fenced Code Block Syntax

An alternative is to wrap the fenced code block within the {% raw %}`{% highlight %}`{% endraw %} and {% raw %}`{% endhighlight %}`{% endraw %} tag markup.
For this purpose only will I use such to minimize the use of non-standard Markdown syntax.

{% highlight cpp %}
{{ openTag }} highlight cpp %}
~~~ cpp
int main() {
    std::cout << "Hello world!" << std::endl;
    return 0;
}
~~~
{{ openTag }} endhighlight %}
{% endhighlight %}

You will see the following fenced code block syntax output in the browser:

{% highlight cpp linenos %}
~~~ cpp
int main() {
    std::cout << "Hello world!" << std::endl;
    return 0;
}
~~~
{% endhighlight %}

## Reference

[Writing the endraw tag in Jekyll code blocks](http://blog.slaks.net/2013-06-10/jekyll-endraw-in-code/)

[Liquid]: https://github.com/Shopify/liquid/wiki "Liquid"
[template engine used by Jekyll]: http://jekyllrb.com/docs/templates/
[Liquid for Designers]: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
