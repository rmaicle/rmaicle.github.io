---
layout: hub
title: Home
excerpt:
permalink: /
---

<div class="section_container_wrapper section_container_wrapper_border">
    <h1>References</h1>
    <div class="section_container top_margin_10">
        {% for groupno in (1..3) %}
        <div class="container list_container">
            <div class="block block_default_fonts">
                <div class="entries compact">
                <div class="index_entry">
                    {% assign groups = (site.data.index_docs.groups | where: 'group_no', groupno) %}
                    {% for doc in groups %}
                        {% if doc.group == "---" %}
                        <hr class="thin_line compact">
                        {% else %}
                        <a href="{{ doc.link }}" class="no_underline">{{ doc.title }}</a><br>
                        {% endif %}
                    {% endfor %}
                </div>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>

{% assign posts = site.categories.post %}
{% include section_index.html label="Latest" posts=posts limit=10 %}

{% assign posts = site.categories.post %}
<div class="section_container_wrapper section_container_wrapper_border">
    <h1>Post Sections</h1>
    <div class="section_container top_margin_10">
        {% for section_category in site.data.index_posts %}
        <div class="container top_border_thin">
            {% assign section_posts = "" | split: '' %}
            {% assign count = 0 %}
            {% for post in posts %}
                {% if post.categories[1] == section_category %}
                    {% assign section_posts = section_posts | push: post %}
                    {% assign count = count | plus: 1 %}
                    {% if count == 6 %}
                        {% break %}
                    {% endif %}
                {% endif %}
            {% endfor %}
            {% include block_slideshow.html category=section_category posts=section_posts max_post_count=6 %}
        </div>
        {% endfor %}
    </div>
</div>



<script>
    $(document).ready(function() {

        {% for category in site.data.index_posts %}
            {% capture empty %}
            {% assign words = category | replace: '+', 'p' | replace: '_', ' ' | split: ' ' %}
            {% capture titlecase_category %}{% for word in words %}{{ word | capitalize }} {% endfor %}{% endcapture %}
            {% assign js_category = titlecase_category | remove: ' ' | replace: '+', 'p' %}
            {% endcapture %}{% assign empty = nil %}
        current{{ js_category }}Slide(0);
        {% endfor %}
    });

    popupModal('modal_top_1', 'source_top_1', 'destination_top_1', 'caption_top_1');
    popupModal('modal_top_2', 'source_top_2', 'destination_top_2', 'caption_top_2');
    
    {% for category in site.data.index_posts %}
        {% capture empty %}
        {% assign words = category | replace: '+', 'p' | replace: '_', ' ' | split: ' ' %}
        {% capture titlecase_category %}{% for word in words %}{{ word | capitalize }} {% endfor %}{% endcapture %}
        {% assign js_category = titlecase_category | remove: ' ' | replace: '+', 'p' %}
        {% endcapture %}{% assign empty = nil %}
    function current{{ js_category }}Slide(n) {
        showSlides("{{ js_category | downcase }}_dot", "{{ js_category | downcase }}_news_entry", n);
    }
    {% endfor %}



    function showSlides(links, entries, index) {
        let i;
        let dots = document.getElementsByClassName(links);
        let slides = document.getElementsByClassName(entries);
        
        if (dots.length == 0) {
            return;
        }

        for (i = 0; i < slides.length; i++) {
           slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" slideshow_active", "");
        }
        slides[index].style.display = "block";
        dots[index].className += " slideshow_active";
    }


    function popupModal(modal, imageSource, imageDestination, caption) {
        // Get the modal
        var modal = document.getElementById(modal);

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var imgSource = document.getElementById(imageSource);
        var imgDest = document.getElementById(imageDestination);
        var imgCaption = document.getElementById(caption);
        imgSource.onclick = function() {
            modal.style.display = "block";
            imgDest.src = imgSource.src;
            imgCaption.innerHTML = this.alt;
        }

        imgDest.onclick = function() {
            modal.style.display = "none";
        }
        modal.onclick = function() {
            modal.style.display = "none";
        }
    }
</script>
