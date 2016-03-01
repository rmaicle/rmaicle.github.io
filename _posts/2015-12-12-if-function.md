---
title: An IF Function
excerpt: Creating an IF function
date: December 12, 2015
group: Posts
categories: [Blog]
tags: [cplusplus, if, programming, thoughts]
---

A common use case for an `if` statement is to assign a value to a variable depending on a condition.
The following is a simple example for the use case.

{% highlight cpp linenos %}
int a = 0;
if (some_condition) {
    a = 1;
} else {
    a = 2;
}
{% endhighlight %}

An `if` function will do the same thing but returning a value based on a condition.

{% highlight cpp linenos %}
int a = if (some_condition) {
    return 1;
} else {
    return 2;
}
{% endhighlight %}

Yes, a ternary operator can do this but the difference is that the body of the `if` function could have multiple statements.
With C++11, the same could be achieved using a `lambda`.

{% highlight cpp linenos %}
int a = [=] {
    if (some_condition) {
        return 1;
    } else {
        return 2;
    }
}();
{% endhighlight %}

One obvious difference is the syntax, of course.
To unclutter it would require the use of the preprocessor macros so we can hide some syntax and make it look simpler.
And everyone knows the problems associated with preprocessor macros.

## Using the Preprocessor

If we dare to, we can take the previous code and apply the use of preprocessor macro.

{% highlight cpp linenos %}
int a = [=] { if (some_condition) {         int a = IFF (some_condition) {
        return 1;                               return 1;
    } else {                                } else {
        return 2;                               return 2;
    }                                       }
}();                                        END_IFF
{% endhighlight %}

And here is the preprocessor macro definitions as shown above.
It is possible to include the curly brackets into the preprocessor macros but the code wouldn't look like normal C/C++ code.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}define IFF(C)      [=] { if (!!(C))
{%raw%}#{%endraw%}define END_IFF     }();
{% endhighlight %}

### Variation One

One possible variation is when the `else` block need not be specified.
There must be a way to specify that the function should return 2 if the condition is evaluated to `false`.
But it will be awkward to write and confusing to read because of familiarity with the `if` statement.
An `if` statement executes the following block if a condition is `true` and otherwise executes the `else` block if one is specified.
In the code below, it reads, if some condition is true then return 2 else return 1.
But the else block looks like it will be executed if the condition is true.

{% highlight cpp linenos %}
int a = IFF (some_condition, 2) {       // if some_condition is true then do
    return 1;                           // this block else return 2.
} END_IFF
{% endhighlight %}

The following code could be a solution:

{% highlight cpp linenos %}
{%raw%}#{%endraw%}define IFF(C)      [=] { if (!!(C))
{%raw%}#{%endraw%}define END_IFF(R)  else { return R; }}();

int a = IFF (some_condition) {          // if some_condition is true then do
    return 1;                           // this block else return 2.
} END_IFF (2)
{% endhighlight %}

### Variation Two

Another variation is when the return values as the above are already known beforehand.
It could be written as the following:

{% highlight cpp linenos %}
int a = IFF (some_condition, 1, 2) {    // specify return values
    // code when condition is true
    // return 1
} else {
    // code when condition is false
    // return 2
} END_IFF
{% endhighlight %}

Possible preprocessor macro definitions:

{% highlight cpp linenos %}
{%raw%}#{%endraw%}define IFF(C, RT, RF)                      \
[=] {                                       \
        bool b = !!(C);                     \
        decltype(RT) whenTrue = RT;         \
        decltype(RF) whenFalse = RF;        \
        if (!!(C))

{%raw%}#{%endraw%}define END_IFF                             \
        return b ? whenTrue : whenFalse;    \
}();
{% endhighlight %}

## Afterthoughts

* Someone might misinterpret the `return` statement inside the IFF macro which returns only from the enclosing block.
* If the lambda is not optimized then performance will suffer specially if it appears in performance critical sections.
