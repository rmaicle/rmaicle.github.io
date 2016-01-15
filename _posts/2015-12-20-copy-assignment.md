---
title: Copy Assignment and Move Constructor
excerpt: Implementing a safe copy assignment operator overload
categories: [Blog]
tags: [cplusplus, assignment, copy, programming]
---

How to write a C++ copy assignment that provides [strong exception guarantee](https://en.wikipedia.org/wiki/Exception_safety).

### Exception-Safe Coding, Jon Kalb

From the talk of Jon Kalb on C++Now! 2012 with the same title.
You can acquire the [slides here](http://exceptionsafecode.com/slides/esc.pdf).

{% highlight cpp linenos %}
T& T::operator= (T const &rhs) {
    if (this != &x) {
        this->~T();             // destroy in place
        new (this) T(rhs)       // construct in place using copy constructor
    }
    return *this;
}
{% endhighlight %}

### Copy and Swap Idiom

See the Copy and Swap Idiom discussed here in [More C++ Idioms](https://en.wikibooks.org/wiki/More_C%2B%2B_Idioms/Copy-and-swap).

{% highlight cpp linenos %}
T& T::operator= (T rhs) {       // assignment using copy construction
    rhs.swap(*this);            // non-throwing swap
    return *this;
}

void T::swap(T &o) {
    using std::swap;            // enable ADL (may not be necessary, but good practice)
                                // swap(a.member, b.member);
                                // ...
}

namespace std {
    template <>                 // Full specialization of std::swap() for type T
    void swap (T &a, T &b) {
        a.swap(b);              // Uses T::swap()
    }
}; //_ namespace std
{% endhighlight %}

###### What is the copy-and-swap idiom? from StackOverflow
Here is the [link to an answer](http://stackoverflow.com/questions/3279543#3279550) to the StackOverflow question.
The author suggests the following solution:

{% highlight cpp linenos %}
class T {
    T& T::operator= (T rhs)
    {
        swap(*this, rhs);
        return *this;
    }

    friend void swap(T &a, T &b) {
        using std::swap;                // enable ADL
        // swap the members
        swap(a.one, b.one);
        swap(a.two, b.two);
    }
};
{% endhighlight %}

As a consequence, a move constructor in C++11 can be easily written as:

{% highlight cpp linenos %}
T::T (T &&other) : T() {
    swap(*this, other);
}
{% endhighlight %}

## A Somewhat Related Article

Here is a short article by Scott Meyers related to move assignment using `swap` function.

> More and more, I bump into people who, by default, want to implement move assignment in terms of swap.
> This disturbs me,

[The Drawbacks of Implementing Move Assignment in Terms of Swap](http://scottmeyers.blogspot.com/2014/06/the-drawbacks-of-implementing-move.html)
