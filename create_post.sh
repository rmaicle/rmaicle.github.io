#!/bin/sh

# Create a post file at current directory
# File format: YYYY-MM-DD-title.md

current=`date -u`
current_date=`date -u --date="$current" +'%Y-%m-%d'`
current_iso8601=`date -u --date="$current" +'%Y-%m-%dT%H:%M:%S%Z'`
current_iso8601_short=`date -u --date="$current" +'%Y-%m-%dT%H%M%S%Z'`

# hashids.org
# hashids C implementation https://github.com/tzvetkoff/hashids.c

current_seconds=`date -u +%s`
hashid=`hashids --salt "rmaicle" --min-length 15 $current_seconds`
filename_prefix="$current_date"
filename=""


function show_usage {
    echo "create_post"
    echo "  Create a jekyll post file in current directory with the format 'YYYY-MM-DD-.md'."
    echo "Usage: create_post [option]"
    echo ""
    echo "Options:"
    echo "  -p, --post      Post file"
    echo "  -h, --help      Show usage"
}

function add_yaml_bar {
    echo "---" >> $filename
}

function add_yaml_categories {
    echo "categories: [post, c++, d_language, database, linux, jekyll, git, other]" >> $filename
}

function add_yaml_image {
    echo "image:" >> $filename
    echo "  layout: auto_width" >> $filename
    echo "  source: " >> $filename
    echo "  attribution: " >> $filename
}

function add_yaml_video {
    echo "video:" >> $filename
    echo "  source: " >> $filename
    echo "  attribution: " >> $filename
    echo "  layout: top" >> $filename
}

function add_yaml_videos {
    echo "videos:" >> $filename
    echo "  - source: " >> $filename
    echo "    attribution: " >> $filename
    echo "    layout: " >> $filename
}

function add_yaml_sources {
    echo "sources:" >> $filename
    echo "  - label: article title (source)" >> $filename
    echo "    link:" >> $filename
}

function add_yaml_related {
    echo "related:" >> $filename
}

function add_default {
    if [ $# -eq 0 ]; then
        echo "title: " >> $filename
    else
        echo "title: $1" >> $filename
    fi
    echo "date: $current_iso8601" >> $filename
}

function add_empty {
    echo >> $filename
    echo "Download: [](){:target='_blank'}" >> $filename
    echo "Ñ ñ" >> $filename
    echo "■ ▪ ▲ ▴ ◆ ▶ ▸ ► ● •" >> $filename
    echo "   dash-" >> $filename
    echo "en dash–" >> $filename
    echo "em dash—" >> $filename
    echo " open single quote ‘" >> $filename
    echo "close single quote ’" >> $filename
    echo " open double quote “" >> $filename
    echo "close double quote ”" >> $filename
    echo "ellipses …" >> $filename
    echo "Empty." >> $filename
    echo "&#x25cf;" >> $filename
}

function add_content {
    if [ $# -gt 0 ]; then
        echo >> $filename
        echo "$1" >> $filename
    fi
}

function create_post {
    filename="$filename_prefix-new_post.md"
    if [ -e $filename ]; then
        echo "File ($filename) already exists."
    else
        touch $filename

        add_yaml_bar
        add_default "Post Title"
        echo "excerpt: " >> $filename
        echo "layout: post" >> $filename
        add_yaml_categories
        echo "tags: []" >> $filename
        if [ $# -eq 0 ]; then
            echo "published: true" >> $filename
        else
            if [ "$1" = "draft" ]; then
                echo "published: false" >> $filename
            else
                echo "published: true" >> $filename
            fi
        fi
        echo "permalink: /posts/$hashid" >> $filename
        echo "thumbnail:" >> $filename
        add_yaml_image
        add_yaml_video
        add_yaml_videos
        add_yaml_sources
        add_yaml_related
        add_yaml_bar
        add_empty

        echo "New post file created on $current: $filename"
    fi
}

##########
if [ $# -eq 0 ]; then
    show_usage
    exit
fi

case $1 in
    -p | --post )       create_post draft
                        exit
                        ;;
    -h | --help )       show_usage
                        exit
                        ;;
    * )                 show_usage
                        exit
                        ;;
esac
