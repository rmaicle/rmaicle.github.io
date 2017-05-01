---
title: Enforcing Smart Pointer Use for Classes
date: 2015-12-09T09:07:55UTC
excerpt: Creating unique_ptr and shared_ptr of a class instance with private constructors.
layout: post
categories: [post, c++]
tags: [smart pointers, unique_ptr, shared_ptr]
published: true
permalink: /posts/LBgGZbyEeA1Gb8v
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

Enforcing the use of smart pointers when creating instances of a class requires that the class public interface be explicit with the intention.
Making constructors private does not work with `std::make_unique` and `std::make_shared`.

Here is a minimal example.
The error is at line 6; GCC 5.2 says the error is the private constructor.
The function `std::make_unique` must be able to _see_ the constructor to _call_ it.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <memory>

class A {
private:
    int number;
    A(int n) : number(n) { }            // error: 'A::A(int)' is private
public:
    int get() const { return number; }
};

int main()
{
    auto x = std::make_unique<A>(3);
    std::cout << x->get() << std::endl;
}
{% endhighlight %}

The solution that follows is an attempt to provide a mechanism to _enforce_ the use of smart pointers when creating instances of the class.

Here, the creation of a `std::unique_ptr<T>` is a simulated version of `std::make_unique`.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <memory>

class A {
private:
    int number;
    A(int n) : number(n) { }
public:
    template <typename... T>
    static std::unique_ptr<A> create(T&&... args) {
        return std::unique_ptr<A>(new A(std::forward<T>(args)...));
    }
    int get() const { return number; }
};

int main()
{
    auto x = A::create(3);
    std::cout << x->get() << std::endl;
}
{% endhighlight %}

The above solution is alright for some but it does not scale.
Changing how things are done inside that static function, which could be copy-pasted across multiple class definitions, requires editing all source files that uses such mechanism.

The following uses the approach introduced above and extends the original idea.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <memory>

template <typename T>
class make_unique_ptr_from_private_constructor
{
public:
    template <typename... A>
    static std::unique_ptr<T> create_unique(A&&... args) {
        return std::unique_ptr<T>(new T(std::forward<A>(args)...));
    }
};

template <typename T>
class make_shared_ptr_from_private_constructor
{
public:
    template <typename... A>
    static std::shared_ptr<T> create_shared(A&&... args) {
        std::shared_ptr<T> sp(new T(std::forward<A>(args)...));
        return std::move(sp);
    }
};
{% endhighlight %}

Now, this can be used across many classes and the mechanism is localized in one place.
The following example shows how to use the template classes above.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <iostream>
{%raw%}#{%endraw%}include <memory>

class A : 
    public make_unique_ptr_from_private_constructor<A>,
    public make_shared_ptr_from_private_constructor<A>
{
    friend class make_unique_ptr_from_private_constructor;
    friend class make_shared_ptr_from_private_constructor;
private:
    int number;
    A(int n) : number(n) { }
public:
    int get() const { return number; }
};

int main()
{
    auto x = A::create_unique(3);
    auto y = A::create_shared(4);
    std::cout << x->get() << std::endl;
    std::cout << y->get() << std::endl;
}
{% endhighlight %}

Here is an example showing how to create a `std::shared_ptr` from a `friend` class.

{% highlight cpp linenos %}
class B;

class A : protected make_shared_ptr_from_private_constructor<A>
{
    friend class make_shared_ptr_from_private_constructor;
    friend class B;
    // rest of code same as above
};

class B
{
private:
    std::shared_ptr<A> a;
public:
    B(int n) { a = A::create_shared(n); }
    int get() const { return a->get(); }
};

int main()
{
    B b(10);
    std::cout << b.get() << std::endl;
}
{% endhighlight %}

##### Source Code

The source code is in [GitHub](https://github.com/rmaicle/smart-ptr-interface).


{% comment %}
http://talesofcpp.fusionfenix.com/post-5/true-story-when-friendship-smothers
http://stackoverflow.com/questions/8147027/how-do-i-call-stdmake-shared-on-a-class-with-only-protected-or-private-const
http://stackoverflow.com/questions/3378520/how-to-make-boostmake-shared-a-friend-of-my-class
http://stackoverflow.com/questions/29896268/friend-function-is-unable-to-construct-a-unique-pointer-of-the-class
{% endcomment %}
