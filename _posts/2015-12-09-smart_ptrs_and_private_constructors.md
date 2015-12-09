---
title: Smart Pointers and Private Constructors
excerpt: Creating unique_ptr and shared_ptr of a class instance with private constructors.
categories: [Blog]
tags: [cplusplus, unique_ptr, shared_ptr, smart_pointer, programming]
---

## Problem

I encountered a problem in the API of a couple of my classes whose constructors I was trying to hide from client code.
Actually, I wish I could clean up the code and expose only the client-facing API of the class.

Here is a minimal example.
The interesting part is at line 6; GCC 5.2 says the error is the private constructor.
The function `std::make_unique` must be able to _see_ the constructor to _call_ it.

##### Code

{% highlight cpp linenos %}
#include <memory>

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
}
{% endhighlight %}

##### A Passing Thought

It was just a passing thought; didn't really spend a minute or two.
But the syntax in my head _recurringly_ bugged me.

{% highlight cpp linenos %}
make_unique_from_private_constructor<T>
make_shared_from_private_constructor<T>
{% endhighlight %}

Resistance is futile; just a quick and dirty try.

##### The Attempt

{% highlight cpp linenos %}
#include <iostream>
#include <memory>

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

###### TODO

Explain the code above for the unfamiliar.


{% comment %}
##### Output
{% highlight console linenos %}
/usr/include/c++/5/bits/unique_ptr.h: In instantiation of 'typename std::_MakeUniq<_Tp>::__single_object std::make_unique(_Args&& ...) [with _Tp = A; _Args = {int}; typename std::_MakeUniq<_Tp>::__single_object = std::unique_ptr<A, std::default_delete<A> >]':
prog.cpp:14:35:   required from here
prog.cpp:6:5: error: 'A::A(int)' is private
     A(int n) : number(n) { }
     ^
In file included from /usr/include/c++/5/memory:81:0,
                 from prog.cpp:2:
/usr/include/c++/5/bits/unique_ptr.h:765:69: error: within this context
     { return unique_ptr<_Tp>(new _Tp(std::forward<_Args>(__args)...)); }
{% endhighlight %}


http://talesofcpp.fusionfenix.com/post-5/true-story-when-friendship-smothers
http://stackoverflow.com/questions/8147027/how-do-i-call-stdmake-shared-on-a-class-with-only-protected-or-private-const
http://stackoverflow.com/questions/3378520/how-to-make-boostmake-shared-a-friend-of-my-class
http://stackoverflow.com/questions/29896268/friend-function-is-unable-to-construct-a-unique-pointer-of-the-class
{% endcomment %}