---
title: Redcarpet
excerpt: Ruby library for Markdown processing
categories: [Blog]
tags: [github pages, markdown, redcarpet]
---

{% assign openTag = '{%' %}

[Redcarpet] is a [Ruby] library for processing [Markdown].
It requires the Ruby binaries.
If you are on a Windows machine like me you will need a [Windows binaries] installer.
To see the steps on setting it up, take a look at [Local GitHub Pages on Windows](/blog/2014/11/05/github-pages.html).

After installing the required software and if Redcarpet is not yet installed then execute the following commands.
(Redcarpet 3.1.2 is the current version of this writing).

~~~
gem install redcarpet
redcarpet --version
~~~

One thing I like about _Redcarpet_ is that it allows me to use the original Markdown syntax for embedding code blocks using the _tilde_ or _backtick_ character.

<div class="highlight"><pre>
{% raw %}~~~ cpp{% endraw %}
int main() {
    std::cout << "Hello world!" << std::endl;
    return 0;
}
{% raw %}~~~{% endraw %}
</pre></div>

The code above is displayed with syntax highlighting using [pygments].

~~~ cpp
int main() {
    std::cout << "Hello world!" << std::endl;
    return 0;
}
~~~

I want to be able to show the reader the code on how to display a fenced code block with syntax highlighting.
I will discuss it in [Liquid](/blog/2014/11/12/liquid.html).



[Ruby]: http://www.ruby-lang.org "Ruby Programming Language"
[Windows binaries]: http://rubyinstaller.org/ "Ruby Installer for Windows"
[Redcarpet]: https://github.com/vmg/redcarpet
[Markdown]: http://daringfireball.net/projects/markdown/ "Markdown"
[pygments]: http://pygments.org/
