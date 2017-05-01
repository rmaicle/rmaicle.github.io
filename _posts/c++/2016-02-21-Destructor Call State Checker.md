---
title: Destructor Call State Checker
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

I just came across a situation that I needed to test whether a class destructor was called or not.
I came up with the following solution.
Others may find the solution unnecessary because C++, since the 2011 standard, already have smart pointers.
But in my scenario, the class is not instantiated in the heap.

The idea is to use a _flag_.
The flag is initially unset and the class destructor sets it.
The test program must then have access to that flag to verify its state.

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

The following code shows how it is used.

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
      	std::cout << std::boolalpha;
        std::cout << flag.is_set() << std::endl;        // false
    }
    std::cout << flag.is_set() << std::endl;            // true
}
{% endhighlight %}

##### Using Boost

The above solution can be simplified using `boost::logic::tribool`.
Which means the `Flag` class is no longer necessary.

##### Afterthought


Aside from destructors, this could also be used to with other functions as necessary.