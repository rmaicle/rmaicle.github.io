---
title: A Case for Using C++ Properties
excerpt: Possible use cases of a simple class template emulating class properties.
categories: [Blog]
tags: [cplusplus, class, properties, programming]
---

Properties are available in other programming languages.
Properties are simple class member variables with corresponding getter and setter functions in a simplified declaration.

Getter/setter class member functions that set/get internal values only without other internal operations being performed is accomplished simply by making the corresponding class member variable _public_.
This may a reason why `properties` are not that favorable with some C++ programmers.

Let me help you see my point in another light.
During development, some things just need to be simpler and compact.
But until that time, the use of a `property` allows someone to go ahead with a working concept.
The thought is, the shorter the code, the easier it is to write, read, modify and comprehend without cluttering the screen too much and avoiding moving here and there.
Properties could be considered to be an _interim_ code.

The following code is a simple implementation of a `Property` class.
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

Here is how it is used.

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
}
{% endhighlight %}

##### Calling an External Function

As the code base matures, time will come that the simple get/set functions will require some other functionality.
To accommodate a simple requirement, the `Property` class template can be extended to allow client code to specify user-defined functions to call when the get or set function is called.
For simplicity, a user-defined function will be called before the actual property value is modified.
Here is how we might define the `Property` class template.

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
    Property<int, A, &A::set_count> count;          // Calls A::set_count() even if
                                                    // it is a private function of
                                                    // class A.
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

##### Document External Functions Affecting a Member Variable

It is also possible to document which external functions can call our property functions.
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

http://accu.org/index.php/journals/255
http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1615.pdf
{% endcomment %}
