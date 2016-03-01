---
title: Conditional Assert
excerpt: What is conditional assertion?
date: February 19, 2016
group: Posts
categories: [Blog]
tags: [cplusplus, assertion, debug, programming]
---

The scenario that lead to this idea does not occur much but I thought it would be good to take a note of it.
Here is a made-up function that slightly captures the use case.

{% highlight cpp linenos %}
void check(std::vector<int> lines) {
    auto size = lines.size();
    ASSERT(size > 0);
    if (size <= 2) {
        ASSERT(lines[0] == 1);
    } elseif (size > 2) {
        ASSERT(lines[lines.size() - 1] == 1);
    }
    ...
}
{% endhighlight %}

Using something like a conditional assert macro would unclutter it a bit.

{% highlight cpp linenos %}
void check(std::vector<int> lines) {
    auto size = lines.size();
    ASSERT(size > 0);
    IF_ASSERT(size <= 2, lines[0] == 1);
    IF_ASSERT(size > 2, lines[size - 1] == 1);
    ...
}
{% endhighlight %}

The idea is that if a certain pre-condition is true then the assert condition is evaluated and that if the assert condition evaluates to false then an assertion is triggered.

{% highlight text linenos %}
{%raw%}#{%endraw%}define IF_ASSERT(precond, cond, ...)       \
    do {                                    \
        if (!!(precond)) {                  \
            ASSERT(cond, {%raw%}#{%endraw%}{%raw%}#{%endraw%}__VA_ARGS__);    \
        }                                   \
    } while ((void)0, 0)
{% endhighlight %}
