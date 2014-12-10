---
title: Thoughts on a Variant Class for Basic Types
excerpt: Exploring how to implement a variant class
categories: [Blog]
tags: [c++, variant, tagged union, type erasure]
---

Researching this got me into language trouble. I encounter words like generic, polymorphic, variant, dynamic and some others. There are three implementations I am quite familiar with; `boost::any`, `boost::variant` and `Poco::Dynamic::Var`. Also I would like to mention `soci::row`.

According to *Wikipedia*, a [tagged union] is a data structure used to hold a value that could take on several different, but fixed types. Only one of the types can be in use at any one time, and a tag field explicitly indicates which one is in use. It is also called variant, variant record, discriminated union, disjoint union, or sum type.

* [Boost Variant](http://www.boost.org/doc/libs/1_57_0/doc/html/variant.html)
* [High Performance Dynamic Typing in C++ using a Replacement for boost::any](http://www.codeproject.com/Articles/11250/High-Performance-Dynamic-Typing-in-C-using-a-Repla)
* [Polymorphic Types in C++](http://www.bearcave.com/software/c++types.html)

This is different from __type erasure__.

* [Andrzej's C++ blog - Type Erasure](https://akrzemi1.wordpress.com/2013/11/18/type-erasure-part-i/)
* [Boost TypeErasure](http://www.boost.org/doc/libs/1_57_0/doc/html/boost_typeerasure.html)
* [Erasing the Concrete](http://talesofcpp.fusionfenix.com/post-16/episode-nine-erasing-the-concrete)

{% comment %}
Describe them briefly and provide links
{% endcomment %}

By basic types, I mean the __fundamental types__ like boolean, character, integer, float. I also mean __string__ type which is a sequence of the fundamental type character. It also mean a __date__ type which, for now, I'll settle with `std::tm` struct. And I am also considering a __money type__ which is a floating point type with fixed decimal values of up to four digits. That may be another topic but I would like that with my basic types.

Implementation of type erasure usually stores data on the heap while tagged unions uses the stack. There are implementations that use the __Small Buffer Optimization__ (SBO) like `adobe.poly` and `folly::dynamic`. The following code snippet shows a very simple example of that.

{% comment %}
<script src="https://gist.github.com/rmaicle/ff36e876b11d79934ceb.js"></script>
{% endcomment %}

~~~ cpp
class var {
private:
    size_t index;
    static vector<double>  v_dec;
    static vector<string>  v_str;
public:
    var(bool v) :          index(v) { }
    var(size_t v) :        index(v) { }
    var(double v) :        index(v_dec.size()) { v_dec.push_back(v); }
    var(const string &v) : index(v_str.size()) { v_str.push_back(v); }
};
~~~

If the data to be stored can fit in the member variable `index` then the value is stored there; `bool` and `size_t`. Otherwise, the data is stored in a standard container; `double` and `string`. If the SBO is not implemented then there will be containers for `bool` and `size_t`. The implementation of SBO saved memory space for *small* &nbsp;data types and provided performance enhancement by not using a *container* &nbsp; to store the value.

{% comment %}
 [Gist](https://gist.github.com/rmaicle/ff36e876b11d79934ceb).
{% endcomment %}

Of course there must be a way to retrieve the stored value. Here are some `get` functions that return the stored value. Notice that the client must know the type to get it. There is no conversion function, yet.

~~~ cpp
bool    get_bool() const   { return index > 0 ? true : false; }
size_t  get_int() const    { return index; }
double  get_double() const { return v_dec[index]; }
string  get_string() const { return v_str[index]; }
~~~

Or `get` functions accepting an out parameter.

~~~ cpp
void get_bool(bool &v) const     { v = index > 0 ? true : false; }
void get_int(size_t &v) const    { v = index; }
void get_double(double &v) const { v = v_dec[index]; }
void get_string(string &v) const { v = v_str[index]; }
~~~

#### Storage

#### Retrieval

#### Performance

#### References

* [ACCU Journal #115 Dynamic C++](http://accu.org/index.php/journals/1855)
* [The Four Polymorphisms in C++](http://www.catonmat.net/blog/cpp-polymorphism/)
* [On the Tension Between Object-Oriented and Generic Programming in C++](http://www.artima.com/cppsource/type_erasure.html)
* [Duck Typing vs. Type Erasure](http://nullprogram.com/blog/2014/04/01/)

{% comment %}
http://www.ojdip.net/2013/10/implementing-a-variant-type-in-cpp/
http://www.atwillys.de/content/cc/cpp-variant-type-class-template/
https://www.preney.ca/paul/archives/tag/cpp

http://c2.com/cgi/wiki?TypeErasure
http://john-ahlgren.blogspot.com/2012/03/small-string-optimization-and-move.html
{% endcomment %}

{% comment %}
* [folly::dynamic](https://github.com/facebook/folly/blob/master/folly/docs/Dynamic.md)
* [Type Conversions](http://www.cplusplus.com/doc/tutorial/typecasting/)
* [INT36-C](https://www.securecoding.cert.org/confluence/display/seccode/INT36-C.+Converting+a+pointer+to+integer+or+integer+to+pointer)
* [Construction Unions](http://www.informit.com/articles/article.aspx?p=360435)
{% endcomment %}




[tagged union]: http://en.wikipedia.org/wiki/Tagged_union