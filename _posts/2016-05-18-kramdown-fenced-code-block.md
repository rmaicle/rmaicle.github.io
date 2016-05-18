---
title: Kramdown Fenced Code Block
excerpt: Kramdown fenced code block syntax
date: May 18, 2016
group: Posts
categories: [Blog]
tags: [github pages, markdown, jekyll, kramdown]
---

Here is the [Kramdown] syntax for code blocks.

{% highlight cpp linenos %}
~~~
int main() {
    std::cout << "Hello world!" << std::endl;
    return 0;
}
~~~
{: .language-cpp}
{% endhighlight %}

The last line is called an Inline Attribute Lists (IAL).
These elements are used to attach attributes to another element.
A dot or period means a tag `class` and a hash is a tag `id`.

## Reference

[Kramdown Syntax Language of Code Blocks](http://kramdown.gettalong.org/syntax.html#language-of-code-blocks)



[Kramdown]: http://kramdown.gettalong.org/
