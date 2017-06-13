---
title: "`return_if` Construct"
excerpt: Declarative return statement that probably isn't worth using.
date: 2015-12-16T11:41:22UTC
updates:
  - date: 2017-06-03T08:22:38UTC
    message: Edits and corrections
layout: post
categories: [post, c++]
tags: [thoughts]
published: true
permalink: /posts/Vnv2QkeE56eG67g
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

The idea is to tell the reader up front that the code will exit the function if some condition evaluates to true.
This does not intend to replace the `if-return` statement.
I admit, this is merely aesthetics or syntatic sugar.
There is no other benefit from using the built-in `if` statement.
But somehow I find _return_if_ clearer and kind of support the flow of thought.

##### A Simple Use Case

The following psuedocode, demonstrates a use case for _return_if_ construct.
If a certain condition evaluates to true, it returns the _return_value_.

{% highlight cpp linenos %}
int compute() {                         int compute() {
    if (condition) {                        return_if (condition, <return_value>);
        return <return_value>;
    }
    ...                                     ...
    return 0;                               return 0;
}                                       }
{% endhighlight %}

An implementation would be the following.
Yes, it uses the preprocessor again as with my other devious schemes.

{% highlight cpp linenos %}
#define RETURN_IF(C, R)             \
    do {                            \
        if (!!(C)) {                \
            return R;               \
        }                           \
    } while ((void)0, 0)
{% endhighlight %}

Here is a simple actual code using the simple construct.

{% highlight cpp linenos %}
bool is_odd(int n) {
    RETURN_IF (n % 2, true);
    return false;
}
{% endhighlight %}

##### Executing a Block of Code

Now, what if the condition needs to execute a block of code before returning.

{% highlight cpp linenos %}
int compute() {                         int compute() {
    if (condition) {                        return_if (condition, <return_value>) {
        ...                                     ...
        return <return_value>;              }
    }
    ...                                     ...
    return 0;                               return 0;
}                                       }
{% endhighlight %}

A simple implementation would be the following code.
Note that there is an extra `end_ri` macro wherein the actual `return` statement is executed.

{% highlight cpp linenos %}
template <typename T>
struct ReturnValue {
    ReturnValue(T t) : value(t) { }
    T value;
};

#define return_if(C, R)                                 \
    if (!!(C)) {                                        \
        namespace nuri = ::negerns::util::returnif;     \
        auto rv = nuri::ReturnValue<decltype(R)>(R);    \
        [=]

#define end_ri                                          \
        ();                                             \
        return rv.value;                                \
    }
{% endhighlight %}

Using the psuedocode above, here is a simple use case in actual C++ code.
The left hand code using the `if` statement.
The right hand code using the `return_if` construct.

{% highlight cpp linenos %}
int is_odd(int n) {                         int is_odd(int n) {
    if (n % 2) {                                RETURN_IF (n % 2, true) {
        std::cout << n << "is odd.\n";              std::cout << n << "is odd.\n";
        return true;                            }
    }
    std::cout << n << "is even.\n";             std::cout << n << "is even.\n";
    return false;                               return false;
}                                           }
{% endhighlight %}

##### Afterthoughts

After looking at the code, there doesn't seem to be much to gain from a `return_if` construct.
Except maybe from it's kind of easier to grasp the intent of the code.

It is interesting to see that other language statements are declarative.
They declare their intention; like `for` which tells the reader that it is going to iterate.
The `if` statement, or it's cousin the `switch` statement, isn't declarative.
I find it like a _pause_ when reading code.

When reading an `if` statement, it doesn't say whether the `if` statement will return from a function or not until you come reading to the line with a `return` statement.
This `if` statement use case forces me to read ahead and move back from where I left off.
When I see a `return_if` construct, I know right away without scrolling my eyes down the code that it will return from the function.

##### Function Return Type Deduction using `decltype(auto)`

There is also something to consider when using a `return_if` construct in a function whose return type is declared `decltype(auto)`.
Here is [Scott Meyers' blog about C++14 `decltype(auto)`](http://scottmeyers.blogspot.com/2013/07/when-decltype-meets-auto.html).
This is a topic on its own but I would like to mention it here since the construct above deals with return statements.
A function return type declared as `decltype(auto)` will return a reference when the return value is wrapped within parenthesis.
