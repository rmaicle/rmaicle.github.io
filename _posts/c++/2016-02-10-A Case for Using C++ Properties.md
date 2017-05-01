---
title: A Case for Using C++ Properties
date: 2016-02-10T08:39:41UTC
excerpt: Possible use cases of a simple class template emulating class properties.
layout: post
categories: [post, c++]
tags: [C++, Properties, N1600, N1615]
published: true
permalink: /posts/8562B81q5w3G3WD
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
  - label: C++ Properties - a Library Solution (ACCU), 2005 Feb, Lois Goldthwaite
    link: http://accu.org/index.php/journals/255
  - label: C++/CLI Properties (C++ Proposal), N1600, 2004 Feb, Daveed Vandevoorde, Edison Design Group
    link: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1600.html
  - label: C++ Properties - a Library Solution (C++ Proposal), N1615, 2004 Apr, Lois Goldthwaite
    link: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1615.pdf
related:
---

Properties are class member variables with corresponding getter and setter functions using a simplified declaration.
Properties are available in other programming languages like C#.

A simple getter and setter function for a class member variable, without any other internal operations, can be omitted and declare the concerned member variable with `public` access.
But that is not a recommended practice.

During development, I tend to start keeping things simple to get more ideas done.
Properties can be simulated using `class templates` and can later be transformed as the code matures.
The thought is — the shorter the code, the easier to write and comprehend without too much "noise" in the background.
It may be considered that `properties` are _interim_ code.

The following is a simple implementation of a `Property` class.
It keeps the data in a private member and provides get/set functions for the data.

{% highlight cpp linenos %}
template <typename T>
class Property {
    T data;
public:
    Property() { }
    Property(T t) : data(t) { }
    T get() const { return data; }
    void set(T t) { data = t; }
};
{% endhighlight %}

Here is a class using the `Property` class template defined above and shows how a client code may use it.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <iostream>

struct A {
    A() : count(10) { }
    Property<int> count;
};

int main() {
    A a;
    std::cout << a.count.get() << std::endl;              // 10
    a.count.set(4);
    std::cout << a.count.get() << std::endl;              // 4
    return 0;
}
{% endhighlight %}

One may find it tempting to define `operator()` as the getter and `operator(T)` as the setter function.

##### Calling an External Function

As the code base matures, some get/set functions will require additional functionality.
To accommodate such scenario, the `Property` class template can be extended to call a member function of a class using `Property`.
The code shows how a setter function can call a class member function.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <iostream>

template <typename T,
          typename Class,
          void (Class::*set_function)(const T, const T)>
class Property {
    Class *instance;
    T data;
public:
    Property() : instance(nullptr) { }
    Property(Class *inst = nullptr) : instance(inst) { }
    Property(const T t) : data(t) { }
    Property(const T t, Class *inst = nullptr) : instance(inst), data(t) { }
    T get() const { return data; }
    void set(T t) {
        (instance->*set_function)(data, t);
        data = t; 
    }
};

class A {
    void set_count(int oldValue, int newValue) {
        std::cout << "Value set from " << oldValue << " to " << newValue << ".\n";
    }
public:
    A() : count(10, this) { }                       // initialize to 10
    Property<int, A, &A::set_count> count;          // Calls the private function
                                                    // set_count() of class A.
};

int main()
{
    A a;
    std::cout << a.count.get() << std::endl;          // 10
    a.count.set(5);                                   // Value set from 10 to 5.
    std::cout << a.count.get() << std::endl;          // 5
    a.count.set(20);                                  // Value set from 5 to 20.
    std::cout << a.count.get() << std::endl;          // 20
}
{% endhighlight %}

The `set_count` function need not accomodate the old and new values.
It was explicitly declared as such for demonstration.
The `set_count` function can be used in place to set the class `A` member variable.

##### Documenting External Functions Affecting a Member Variable

Although it would be bad practice, it is also possible to document which external functions can call our property functions.
Specifically, those external functions that affect our property values.
Knowing this information frees the reader from manually tracing the source code to determine which external functions affect certain information.
The following code shows how we can document which functions can call our setter property function.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <iostream>

template <typename T,
          typename Class,
          void (Class::*set_function)(const T, const T)>
class Property {
    Class *instance;
    T data;
protected:
    // The following constructor and set function is explicitly
    // declared as protected to show that access to these can
    // be controlled.
    Property(const T t, Class *inst = nullptr) :
        instance(inst),
        data(t)
    { }
    void set(T t) {
        (instance->*set_function)(data, t);
        data = t; 
    }
public:
    T get() const { return data; }
};

class A;

class B {
    int number;
public:
    B(A &, int);
};

class A {
    void set_count(int oldValue, int newValue) {
        std::cout << "Value set from " << oldValue << " to " << newValue << ".\n";
    }
public:
    class : public Property<int, A, &A::set_count> {
        // Using declaration is necessary because Property's
        // constructor is explicitly made protected. If it
        // is public then this would not be necessary.
        using Property::Property;
        // The following friend declarations allow access
        // to count's constructor and set() function.
        friend class A;
        friend B::B(A &, int);
        friend int main();
    } count;
    A() : count(10, this) { }
};

// Define B constructor here to avoid the error
// "invalid use of incomplete type 'Class A'".
B::B(A &a, int n) : number(n) {
    a.count.set(n);
}

int main()
{
    A a;
    std::cout << a.count.get() << std::endl;        // 10
    a.count.set(5);                                 // Value set from 10 to 5.
    std::cout << a.count.get() << std::endl;        // 5
    a.count.set(20);                                // Value set from 5 to 20.
    std::cout << a.count.get() << std::endl;        // 20
    B b(a, 50);                                     // Value set from 20 to 50.
    std::cout << a.count.get() << std::endl;        // 50
}
{% endhighlight %}

Because of the issue of dependency, this could be used in the `pimpl` idiom.



{% comment %}
// ----------------------------------------------------
{%raw%}#{%endraw%}include <iostream>

template <typename T>
class property {
    T data;
public:
    property() { }
    property(T t) : data(t) { }
    operator T() const { return data; }
    
    T operator()() const { return data; }
protected:
    void operator()(T t) { data = t; }
};

class A {
    int number;
public:
    A() : number(5) { }
    
    void set_inner(int n) { count(n); }
    
    class : public property<int> {
        friend void A::set_inner(int n);
        friend int main();
    } count;
    
    //Property<int> count;
};

int main()
{
  A a;
  a.count(4);
  std::cout << a.count() << std::endl;
  a.set_inner(10);
  std::cout << a.count() << std::endl;
}

##### References


http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1615.pdf
{% endcomment %}
