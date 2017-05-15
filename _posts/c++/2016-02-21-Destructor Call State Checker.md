---
title: Call State Checker
date: 2016-02-21T21:02:13UTC
excerpt: A state observer for querying simple function call execution state to help in debugging.
layout: post
categories: [post, c++]
tags: [class, destructor]
published: true
permalink: /posts/b1n4mA5QR8Z4wNR
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

I came across a situation where I needed to test whether a member function was called.

I used a _flag_ which is initially unset which a concerned function sets.
The test program must then have access to that flag to verify the state.

{% highlight cpp linenos %}
class Flag {
private:
    bool state { false };
public:
    void set() { state = true; }
    bool is_set() const { return state; }
};

class CallFlag {
private:
    Flag *flag { nullptr };
public:
    void set_ref(Flag *f) { flag = f; }
    void set() {
        if (flag) {
            flag->set();
        }
    }
};
{% endhighlight %}

The `Flag` class holds the actual state, initially set to `false`, meaning our destructor is not yet called.
The `CallFlag` class is a convenience class.

The following code shows how it was used.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <iostream>

struct A {
    CallFlag dtorFlag;
    ~A() { dtorFlag.set(); }
};

int main()
{
    Flag flag;
    {
        A a;
        a.dtorFlag.set_ref(&flag);
        std::cout << std::boolalpha << flag.is_set() << std::endl;        // false
    }
    std::cout << std::boolalpha << flag.is_set() << std::endl;            // true
}
{% endhighlight %}

##### Using Boost

The above solution can be simplified using `boost::logic::tribool`.
Which means the `Flag` class is no longer necessary.
