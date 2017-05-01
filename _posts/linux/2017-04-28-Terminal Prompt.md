---
title: Terminal Prompt
date: 2017-04-28T18:52:40UTC
excerpt: A custom terminal prompt in Linux for more highlight and information specially when in a git repository.
layout: post
categories: [post, linux]
tags: [terminal, git]
published: true
permalink: /posts/aB5XPo3nevy2wjV
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
  - label: My Extravagant Zsh Prompt (Steve Losh)
    link:  http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/
  - label: article title (source)
    link:  https://github.com/jcgoble3/gitstuff/blob/master/gitprompt.sh
related:
---

I find myself using the **terminal** in _Linux_ more and more to come to the point that I'm almost always looking for the prompt when scrolling back and forth the terminal output.
As a recent full-time Linux user, there are still a lot of things to be explored and the terminal prompt is one of them.
I have put off using the terminal aside from teeny weeny tasks.
To attract me more to use the terminal, I decided to pimp my prompt.

I used the character `` (`\uE0B0`) to separate sections of the prompt.
The prompt is divided into sections as the user/system, current directory and the git repository info.

###### User/System

The Bash escape sequence `\u` is expanded into the currently logged user and `\h` into hostname. 
If a user `joe` is currently logged in the system at some host named `server` then `\u.\h` would be expanded as `joe.server`.
Make the foreground color black and the background green `\e[30;42m`.
We use the special character at the end but we have to invert the colors like `\e[32;49m\uE0B0`.

###### Current Directory

###### `git` Repository Info


a smart mark at the end of the prompt:
± for Git,
☿ for Mercurial,
‡ for Subversion,
‡± for Git-Subversion,
⌘ for Fossil,
$ or % for a simple user, in red if you have sudo rights,
a red # for the root user.

~~~
PS1='\e[30;42m \u.\h '$'\e[0;32m\uE0B0'$'\e[30;47m\uE0B0'$'\e[2;30;47m \w '$'\e[00;37m\uE0B0'$'$(git_prompt)'$'\n\e[00;32m\$\e[0m '
~~~

The following code has been scavenged from around the web and may or may not be the best of doing things but I find them to work well so far.

## Prompt Variables

## Colors

## Scripts

repo_type() {
    # http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/
    git branch >/dev/null 2>/dev/null && echo '±' && return
    hg root >/dev/null 2>/dev/null && echo '☿' && return
    #echo '○'
}

git_branch() {
    # Query the git branch
    # If NOT in a git repository, the output (STDERR) will be sent to /dev/null
    # otherwise, filter the git branch output with the asterisk (*) which marks
    # the active branch.
    git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'
}

git_status() {
    # https://github.com/jcgoble3/gitstuff/blob/master/gitprompt.sh
    # Outputs a series of indicators based on the status of the
    # working directory:
    # + changes are staged and ready to commit
    # ! unstaged changes are present
    # ? untracked files are present
    # S changes have been stashed
    # P local commits need to be pushed to the remote
    local status="$(git status --porcelain 2>/dev/null)"
    local output=''
    [[ -n $(egrep '^[MADRC]' <<<"$status") ]] && output="$output+"   # +
    [[ -n $(egrep '^.[MD]' <<<"$status") ]] && output="$output!"
    [[ -n $(egrep '^\?\?' <<<"$status") ]] && output="$output?"
    [[ -n $(git stash list) ]] && output="${output}S"
    [[ -n $(git log --branches --not --remotes) ]] && output="${output}P"
    #[[ -n $output ]] && output="|$output"  # separate from branch name
    echo $output
}

git_prompt() {
    local branch=$(git_branch)
    if [[ -n $branch ]]; then
        local state=$(git_status)
        if [[ -n $state ]]; then
            #echo -e "\e[30;104m\uE0B0\e[30;104m $branch $state \e[94;40m\uE0B0"
            echo -e "\e[1;33m $branch $state "
        else
            # clean repo
            local smiley="\u263b"
            local black_flag="\u2691"
            #echo -e "\e[30;104m\uE0B0\e[30;2;104m $branch $smiley \e[94;40m\uE0B0"
            echo -e "\e[1;32m $branch $black_flag "
        fi
    #else
        #echo -e '\n\e[00;32m'$'\e[30;42m \u@\h '$'\e[0;32m\uE0B0'$'\e[30;47m\uE0B0'$'\e[2;30;47m \w '$'\e[00;37m\uE0B0'$'\n\e[00;32m\$\e[0m '
    fi
}

PS1='\e[30;42m \u@\h '$'\e[0;32m\uE0B0'$'\e[30;47m\uE0B0'$'\e[2;30;47m \w '$'\e[00;37m\uE0B0'$'$(git_prompt)'$'\n\e[00;32m\$\e[0m '

&#x25cf;
