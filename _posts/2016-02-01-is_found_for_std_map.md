---
title: is_found() for std::map
excerpt: A simple function for checking if a std::map search has found something or not.
date: February 01, 2016
group: Posts
categories: [Blog]
tags: [cplusplus, containers, map, programming]
---

I often find myself doing the following psuedocode when searching in a `std::map`.

{% highlight cpp linenos %}
auto item = mapContainer.find(something);
if (item != mapContainer.end()) {
}
{% endhighlight %}

I wanted something a little bit simpler other than comparing with `<container>.end()`.

##### First

A function accepting a `std::map` container and a _key_ to search for.
It returns `true` if the specified _key_ is found.

{% highlight cpp linenos %}
template <typename M>
bool is_found(const M &m, typename M::key_type key) {
    return m.count(key) != 0;
}

int main() {
    std::map<std::string, int> names;
    names["one"] = 1;
    names["two"] = 2;
    names["three"] = 3;
    bool flag = is_found(names, "one");
}
{% endhighlight %}

##### Second

Here is a function accepting a `std::map` container and `std::map` iterator.
It returns `true` if the specified iterator points to a valid item in the container.

{% highlight cpp linenos %}
template <typename M>
bool is_found(const M &m, typename M::iterator iter) {
    return iter != m.end();
}

int main() {
    std::map<std::string, int> names;
    names["one"] = 1;
    names["two"] = 2;
    names["three"] = 3;
    auto item = names.find("one");
    flag = is_found(names, item);
}
{% endhighlight %}

Although I haven't looked into it yet, maybe I could expand this for other containers as well.
