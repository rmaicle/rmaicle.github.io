---
title: An IF Function
excerpt: Creating an IF function
categories: [Blog]
tags: [cplusplus, if, programming, thoughts]
---

Common usage of an `if` statement is to test a condition and assign a value to a variable.
It has the following pattern:

{% highlight cpp linenos %}
int a = 0;
if (some_condition) {
    a = 1;
} else {
    a = 2;
}
{% endhighlight %}

It would be nice to have language support for such a common pattern.

{% highlight cpp linenos %}
int a = if (some_condition) {
    a = 1;
} else {
    a = 2;
}
{% endhighlight %}

## Concept

This solution uses a lambda and maybe will never be as efficient as the old way of doing of it with an `if` statement.
The body of the `if/else` statements could have an arbitrary number of statements.

The following code demonstrates the use of an _if function_ returning the value 2 if `a` is 0 and 4 otherwise.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}include <iostream>

int main(void) {
    int a = 0;
    int x = 0;
    
    auto iff = [&](bool cond) {
        if (cond) {
            // ...
            return 2;
        } else {
            // ...
            return 4;
        }
    };

    x = iff(a == 0);
    std::cout << "X: " << x << std::endl;
    return 0;
}
{% endhighlight %}

## Helpers

First we need to define the incidental constructs needed to use our slightly _improved_ concept of an if function.

{% highlight cpp linenos %}
template<typename T>
struct iffstruct {
    bool condition;
    T rtrue;
    T rfalse;
    
    iffstruct(bool c) : condition(c) { }
    iffstruct(bool c, T r1, T r2) : condition(c), rtrue(r1), rfalse(r2) { }
    explicit operator bool() const { return condition; }
    T get() const { return condition ? rtrue : rfalse; }
    T get(T r1, T r2) const { return condition ? r1 : r2; }
    void set_value_for_true(T r)  { rtrue = r; }
    void set_value_for_false(T r) { rfalse = r; }
};

template <typename T>
iffstruct<T> create_ifs(bool cond) { return iffstruct<T>(cond); }

template <typename T>
iffstruct<T> create_ifs(bool cond, T r1, T r2) { return iffstruct<T>(cond, r1, r2); }

{% endhighlight %}

## Variations

Here are verbose variations of the concept of implementing an _if function_.

##### Variation One

As the example above, the code demonstrates the _if function_ returning the value 2 if `a` is 0 and 4 otherwise.
Values to be returned at the end of the lambda is pre-computed before the lambda is executed.
It is akin to the following code.

{% highlight cpp linenos %}
x = a == 0 ? 2 : 4;
if (a == 0) {
    ...
} else {
    ...
}
{% endhighlight %}

Here is the if function equivalent.

{% highlight cpp linenos %}
x = [&] { if (auto ifs = create_ifs(a == 0, 2, 4)) {
    // ...
    return ifs.get();
} else {
    // ...
    return ifs.get();
}}();
{% endhighlight %}

##### Variation Two

In this variation, the values to be returned are computed inside the if/else block.
The values may be a result of a computation and set as the return value of the lambda using `set_value_for_true` and `set_value_for_false` functions.

{% highlight cpp linenos %}
x = [&] { if (auto ifs = create_ifs<int>(a == 0)) {
    // ...
    ifs.set_value_for_true(2);
    // ...
    return ifs.get();
} else {
    // ...
    ifs.set_value_for_true(4);
    // ...
    return ifs.get();
}}();
{% endhighlight %}

##### Variation Three

Another variation is where values to be returned are computed outside the if/else block.
The `ifs` variable is declared outside the if/else block so it can be used outside that block.

{% highlight cpp linenos %}
x = [&] { auto ifs = create_ifs<int>(a == 0); if (ifs) {
    // ...
} else {
    // ...
} return ifs.get(2, 4); }();
{% endhighlight %}

##### Variation Four

Here is a slightly modified version of the above where there is a separate condition to be evaluated which determines the return a value.
An overload `get` function is defined to fulfill this scenario.

{% highlight cpp linenos %}
T get(bool cond, T r1, T r2) const { return cond ? r1 : r2; }
...
x = [&] { auto ifs = create_ifs<int>(a == 0); if (ifs) {
    // ...
} else {
    // ...
} return ifs.get(a == 1, 2, 4); }();
{% endhighlight %}

##### Variation Five

Another slight variation of the above is where the return values are those set using the `set_value_for_true` and `set_value_for_false` functions.

{% highlight cpp linenos %}
T get(bool cond) const { return cond ? rtrue : rfalse; }
...
x = [&] { auto ifs = create_ifs<int>(a == 0); if (ifs) {
    // ...
    ifs.set_value_for_true(2);
    // ...
} else {
    // ...
    ifs.set_value_for_true(4);
    // ...
} return ifs.get(a == 1); }();
{% endhighlight %}

## Using the Preprocessor

The quick and dirty solutions presented are a little verbose than necessary and does not even consider copy/move semantics, safety, etc.
Also, the variations above can be accomplished more cleanly by the first version above.
Here the preprocessor is employed to help simplify things a bit and make them easy on the eyes.

The following is a scenario of a function implementation.
The function calls the process() function if test_connection() function returns true.

{% highlight cpp linenos %}
bool add() {
    if (!test_connection()) {
        return false;
    }
    process();
    return status;
}
{% endhighlight %}

The function above can be rewritten using an if function.
But, first, let's simplify the use of the if function by using the preprocessor.

{% highlight cpp %}
{%raw%}#{%endraw%}define IFF(C, R1, R2)   [&] { auto ifs = create_ifs(!!(C), R1, R2); if (ifs.condition)
{%raw%}#{%endraw%}define ELSE             else
{%raw%}#{%endraw%}define ENDIFF           return ifs.get(); }();
{% endhighlight %}

Now, the `add` function can be rewritten as follows:

{% highlight cpp linenos %}
bool Pool::add(const Parameters &params) {
    return IFF (test_connection(), true, false) {
        process();
    } ENDIFF
}
{% endhighlight %}

##### Variation

Here is a variation of the above.
Let's define another set of preprocessor macro to be used in this kind of use case.

{% highlight cpp linenos %}
// Specify the condition to be evaluated and the type of the returned value.
{%raw%}#{%endraw%}define IFF_T(C, T)      [&] { auto ifs = create_ifs<T>(!!(C)); if (ifs.condition)
// Returns the value according to the evaluated condition above specified in the IFF_T().
{%raw%}#{%endraw%}define ENDIFF_T(R1, R2) return ifs.get(R1, R2); }();

bool Pool::add(const Parameters &params) {
    return IFF_T (test_connection(), bool) {
        process();
    } ENDIFF_T (true, false)
}
{% endhighlight %}

##### Some More

Here is a simplified function from my WIP database access library.
It _prepares_ a statement before being executed.

{% highlight cpp linenos %}
bool Sql::prepare(const std::string &sql, bool flag) {
    if (!is_valid()) {
        return false;
    }
    std::string sqlString(transform(sql));
    SQLHSTMT stmt = get_statement_handle();
    if (is_error(SQLPrepare(...)) {
        return false;
    }
    if (flag) {
        return describe(sqlString);
    }
    return true;
}
{% endhighlight %}

Here is a transformed code using if functions and preprocessor macros.

{% highlight cpp linenos %}
{%raw%}#{%endraw%}define IFF_SET_TRUE(R)  ifs.set_value_for_true(R)
{%raw%}#{%endraw%}define IFF_SET_FALSE(R) ifs.set_value_for_false(R)

bool Sql::prepare(const std::string &sql, bool flag) {
    if (!is_valid()) {
        return false;
    }
    std::string sqlString(transform(sql));
    SQLHSTMT stmt = get_statement_handle();
    return IFF (SQLPrepare(...), true, false) {
        if (flag) {
            IFF_SET_TRUE(describe(sqlString));
        }
    } ENDIFF
}
{% endhighlight %}

## Afterthoughts

* A `return` statement inside the IFF macro returns only from the enclosing block.
* Slower performance due to the use of an extra `lambda` function and some internal constructs.