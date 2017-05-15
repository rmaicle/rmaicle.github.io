---
title: An `if` Expression
excerpt: A fancy musing on a famous conditional statement present in almost every programming language and feeding my curiosity with a simple implementation of an `if` expression in C++.
date: 2015-12-12T13:45:13UTC
updates:
  - date: 2017-05-15T13:45:13UTC
    message: Edits and corrections
layout: post
categories: [post, c++]
tags: [thoughts]
published: true
permalink: /posts/jgV4NmZxKnjGDxJ
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

A common use case for an `if` statement is to assign a value to a variable depending on a condition.

{% highlight cpp %}
int a = 0;
if (some_condition) {
    a = 1;
} else {
    a = 2;
}
{% endhighlight %}

The following `if` expression will perform the same operation by returning a value based on a condition.

{% highlight cpp %}
int a = if (some_condition) {
    return 1;
} else {
    return 2;
}
{% endhighlight %}

The code above is a perfect scenario for the use of the `ternary operator`.

{% highlight cpp %}
int a = ? (some_condition) : 1 : 2;
{% endhighlight %}

Using the `ternary operator` with multiple statements could make the syntax a bit messy.
With C++11, the goal could be achieved using a `lambda` but with a bit of clutter too.

{% highlight cpp %}
int a = [=] {
    if (some_condition) {
        return 1;
    } else {
        return 2;
    }
}();
{% endhighlight %}

## Using the Preprocessor

If we dare to, we can take the previous code and apply the use of preprocessor macro.

{% highlight cpp %}
int a = [=] { if (some_condition) {         int a = IFF (some_condition) {
        return 1;                               return 1;
    } else {                                } else {
        return 2;                               return 2;
    }                                       }
}();                                        END_IFF
{% endhighlight %}

Here is the preprocessor macro definitions used above.

{% highlight cpp %}
#define IFF(C)      [=] { if (!!(C))
#efine END_IFF      }();
{% endhighlight %}

### Variation One

When the return values are already known beforehand but some code needs to be executed depending on the condition.
The following C++ code shows the scenario.

{% highlight cpp %}
int a = 0;
if (some_condition) {
    a = 1;
    // ... other code whe condition is true
} else {
    a = 2;
    // ... other code whe condition is false
}
{% endhighlight %}

The C++ code above may be written as a variation of the `IFF` preprocessor macro.

{% highlight cpp %}
int a = IFF (some_condition, 1, 2) {
    // code when condition is true
} else {
    // code when condition is false
} END_IFF
{% endhighlight %}

Line 1 tells us that when *some_condition* evaluates to `true`, it will return the first argument.
Otherwise, the second argument is returned.

An implementation of the preprocessor macros.

{% highlight cpp %}
#define IFF(C, RT, RF)                      \
[=] {                                       \
        bool b = !!(C);                     \
        decltype(RT) whenTrue = RT;         \
        decltype(RF) whenFalse = RF;        \
        if (b)

#define END_IFF                             \
        return b ? whenTrue : whenFalse;    \
}();
{% endhighlight %}

## Afterthoughts

* Someone might misinterpret the `return` statement inside the IFF macro which returns only from the enclosing block.
* Yes, the `END_IFF` is noise and would most probably at times be left out possibly because, intuitively, the closing curly bracket marks the end of the block.
* If the lambda is not optimized then performance will suffer specially if it appears in performance critical sections.
