/*
This DuterteTimes-specific JQuery search facility was forked from Tipue Search 5.0.
Modified December 2016 rmaicle@gmail.com

# Search Tokens

Search tokens can be either single or multiple words and can be combined together.
Multiple word search tokens are searched exactly as is like in phrases, names, etc.
To differentiate betweeen the two, multiple word search tokens must be enclosed in double quotes ("").

If the search token contains or is enclosed in single (') or double (") quotation marks, use their equivalent Unicode characters.
       
U+2019 ’ - right single quote
U+201C “ - left double quote
U+201D ” - right double quote

Examples of search tokens, shown how they are actually typed or entered in the search input box.

There’s
"president’s speech" holiday
"“in double quotes”"

# Search Ranking

The search facility uses ranking based on the occurrence of the search tokens. Higher ranked found items are displayed on top.

*/

// Stop words
// Stop words list from http://www.ranks.nl/stopwords

var stop_words = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];

// Internal strings

var warning_too_short = '<div class="search_feedback"><p>Search input is too short. Must be at least nnn characters.</p></div>';
var found_nothing = '<div class="search_feedback"><p>Found nothing in nnn item(s).</p></div>';
var found_one = '<div class="search_feedback"><p>Found 1 result from nnn item(s).</p></div>';
var found_many = '<div class="search_feedback"><p>Found rrr results from nnn item(s).</p></div>';

var string_previous =  'Prev';
var string_next =  'Next';



(function($) {

    $.fn.dt_search = function(options) {

        var set = $.extend({
            'showItems'              : 7,
            'newWindow'              : false,
            'showURL'                : true,
            'showTitleCount'         : true,
            'minimumLength'          : 3,
            'descriptiveWords'       : 50,
            'highlightTerms'         : true,
            'highlightEveryTerm'     : false,
            'mode'                   : 'json',
            'liveDescription'        : '*',
            'liveContent'            : '*',
            'contentLocation'        : '/search.json',
            'results'                : 'div#dt_search_results',
            'debug'                  : false
        }, options);

        return this.each(function() {

            var source = {
                pages: []
            };
            
            var found_count = 0;
            found = [];

            $.ajaxSetup({ async: false });

            //if (set.mode == 'json') {
                $.getJSON(set.contentLocation)
                    .done(function(json) {
                        source = $.extend({}, json);
                    });
            //}

            var link_target = '';
            if (set.newWindow) {
                link_target = ' target="_blank"';
            }

            function getURLP(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
            }

            if (getURLP('q')) {
                $('#search_input').val(getURLP('q'));
                search(0, true);
            }

            $(this).keyup(function(event) {
                if(event.keyCode == '13') {
                    search(0, true);
                }
            });

            function split(input_text, delimeter) {
                return input_text.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
            }
            
            // smartquotes.js
            // Copyright © 2013 Kelly Martin
            // https://github.com/kellym/smartquotesjs
            // Commit db3ef0adcb873b4111f015e0971a7d03d0342800
            // Downloaded 12 Feb 2017
            function smartquotesString(str) {
                return str
                    .replace(/'''/g, '\u2034')                                                   // triple prime
                    .replace(/(\W|^)"(\S)/g, '$1\u201c$2')                                       // beginning "
                    .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')          // ending "
                    .replace(/([^0-9])"/g,'$1\u201d')                                            // remaining " at end of word
                    .replace(/''/g, '\u2033')                                                    // double prime
                    .replace(/(\W|^)'(\S)/g, '$1\u2018$2')                                       // beginning '
                    .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')                                  // conjunction's possession
                    .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')                 // ending '
                    .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')     // abbrev. years like '93
                    .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
                    .replace(/'/g, '\u2032');
            };

            function search(start, replace) {

                var out = '';

                var search_input = $('#search_input').val().toLowerCase();
                search_input = $.trim(search_input);
                
                out += '<p>Search parameters:</p>';
                out += '<p><ul>';
                if (set.debug) {
                    if (source.pages.length == 0) {
                        out += "<li>No items to search from</li>";
                    }
                    if (source.pages.length == 1) {
                        out += "<li>Search from 1 item</li>";
                    }
                    if (source.pages.length > 1) {
                        out += "<li>Search from " + source.pages.length.toString() + " items</li>";
                    }
                    out += '<li>Content location: ' + set.contentLocation + '</li>';
                    out += '<li>Show items: ' + set.showItems + '</li>';
                }
                out += '<li>Input: ' + search_input + '</li>';
                
                if (search_input.length < set.minimumLength) {
                    out += '<div><p>' + warning_too_short.replace('nnn', set.minimumLength.toString()) + '</p></div>';
                } else {

                    // Process the input string

                    // Split string: 'the quick "brown fox" jumped' -> ["the", "quick", "brown fox", "jumped"]
                    // http://stackoverflow.com/questions/18703669/split-string-but-not-words-inside-quotation-marks
                    var temp = [].concat.apply([], search_input.split('"').map(function(v,i){
                        return i%2 ? v : v.split(' ')
                    })).filter(Boolean);

                    var search_tokens = [];
                    search_input = '';

                    // Exclude search tokens that are 'stop words'
                    for (var i = 0; i < temp.length; i++) {
                        var valid_word = true;
                        for (var n = 0; n < stop_words.length; n++) {
                            if (temp[i] == stop_words[n]) {
                                valid_word = false;
                                show_stop = true;
                                break;
                            }
                        }
                        if (valid_word) {
                            search_tokens.push(smartquotesString(temp[i]));
                            //search_tokens.push(temp[i]);
                            // Concat to a new string only so we can test whether
                            // we have a valid search_input length after processing
                            search_input = search_input + ' ' + search_tokens[i];
                        }
                    }
                    search_input = $.trim(search_input);
                    
                    if (set.debug) {
                        if (search_input.length == 0) {
                            out += '<li>Processed Input: <em>empty</em></li>';
                        } else {
                            out += '<li>Processed Input: ' + search_input + '</li>';
                        }
                    }
                    
                    // Send search tokens to output
                    out += '<li>Tokens: ';
                    out += '<ol>';
                    for (var i = 0; i < search_tokens.length; i++) {
                        out += '<li>' + search_tokens[i] + '</li>';
                    }
                    out += '</ol>';
                    out += '</li>';
                    out += '</ul>';
                    out += '</ul></p>';
                    
                    if (search_input.length < set.minimumLength) {
                        out += warning_too_short.replace('nnn', set.minimumLength.toString());
                    } else {
                    
                        // Search and determine ranking
                        
                        for (var i = 0; i < source.pages.length; i++) {
                            var score_title = 0;
                            var score_content = 0;
                            var score_tags = 0;
                            var score = 0;

                            for (var f = 0; f < search_tokens.length; f++) {
                                var pat = new RegExp(search_tokens[f], 'gi');

                                if (source.pages[i].title.search(pat) != -1) {
                                    var m_c = source.pages[i].title.match(pat).length;
                                    score_title += (20 * m_c);
                                }
                                if (source.pages[i].content.search(pat) != -1) {
                                    var m_c = source.pages[i].content.match(pat).length;
                                    score_content += (20 * m_c);
                                }
                                if (source.pages[i].tags.search(pat) != -1) {
                                    var m_c = source.pages[i].tags.match(pat).length;
                                    score_tags += (20 * m_c);
                                }
                            }

                            score = score_title + score_content + score_tags;

                            if (score > 0) {
                                found.push({
                                    "score":         score,
                                    "score_title":   score_title,
                                    "score_content": score_content,
                                    "score_tags":    score_tags,
                                    "title":         source.pages[i].title,
                                    "date":          source.pages[i].date,
                                    "excerpt":       source.pages[i].excerpt,
                                    "tags":          source.pages[i].tags,
                                    "url":           source.pages[i].url
                                });
                                found_count++;
                            }

                        } // loop through all sources
                        
                        // Display summary

                        if (found_count == 0) {
                            
                            out += found_nothing.replace('nnn', source.pages.length.toString());
                        }
                        if (found_count == 1) {
                        
                            out += found_one.replace('nnn', source.pages.length.toString());
                        }
                        if (found_count > 1) {
                            out += found_many.replace('rrr', found_count.toString()).replace('nnn', source.pages.length.toString());
                        }
                        
                        // Display results sorted by score

                        if (found_count > 0) {

                            found.sort(function(a, b) { return b.score - a.score } );

                            out += '<div class="search_results"><ol start="' + (start + 1).toString() + '">';

                            var counter_current = 0;
                            for (var i = 0; i < found_count; i++) {
                                if (counter_current >= start && counter_current < set.showItems + start) {
                                    out += '<li>';
                                    out += '<div class="title"><a href="' + found[i].url + '\">' + found[i].title + '</a>'
                                           + (set.debug ? ' - score: ' + found[i].score_title.toString() : '') + '</div>';
                                    out += '<div class="date"><p>' + found[i].date + '</p></div>';
                                    out += '<div class="excerpt"><p>' + found[i].excerpt + '</p></div>';
                                    out += '<div class="tags"><p>Tags: ' + found[i].tags
                                           + (set.debug ? ' - score: ' + found[i].score_tags.toString() : '') +'</p></div>';
                                    if (set.debug) {
                                        out += '<div class="score"><p>Score: ' + found[i].score.toString() + '</p></div>';
                                    }
                                    out += '</li>';
                                }
                                counter_current++;
                            }

                            out += '</ol></div>';
                        } // found_count > 0

                        if (found_count > set.showItems) {
                            var pages = Math.ceil(found_count / set.showItems);
                            var page = (start / set.showItems);
                           
                            out += '<div id="search_footer"><ul id="search_footer_boxes">';
                            if (start > 0) {
                                out += '<li><a class="search_footer_box" id="' + (start - set.showItems) + '_' + replace + '">' + string_previous + '</a></li>'; 
                            }
                            
                            if (page <= 2) {
                                var p_b = pages;
                                if (pages > 3) {
                                    p_b = 3;
                                }
                                for (var f = 0; f < p_b; f++) {
                                    if (f == page) {
                                        out += '<li class="current">' + (f + 1) + '</li>';
                                    } else {
                                        out += '<li><a class="search_footer_box" id="' + (f * set.showItems) + '_' + replace + '">' + (f + 1) + '</a></li>';
                                    }
                                }
                            } else {
                                var p_b = page + 2;
                                if (p_b > pages) {
                                    p_b = pages; 
                                }
                                for (var f = page - 1; f < p_b; f++) {
                                    if (f == page) {
                                        out += '<li class="current">' + (f + 1) + '</li>';
                                    } else {
                                        out += '<li><a class="search_footer_box" id="' + (f * set.showItems) + '_' + replace + '">' + (f + 1) + '</a></li>';
                                    }
                                }
                            }

                            if (page + 1 != pages) {
                                out += '<li><a class="search_footer_box" id="' + (start + set.showItems) + '_' + replace + '">' + string_next + '</a></li>'; 
                            }
                            out += '</ul></div>';
                            
                        } // found_count > set.showItems
                        
                    } // search string > minimum length (inner - after processing)
                    
                } // search string > minimum length (outer - raw)

                out += '</div>';

                $(set.results).hide();
                $(set.results).html(out);
                $(set.results).slideDown(100);
                
                $('#search_replaced').click(function() {
                    search(0, false);
                });                

                $('.search_footer_box').click(function() {
                    var id_v = $(this).attr('id');
                    var id_a = id_v.split('_');

                    search(parseInt(id_a[0]), id_a[1]);
                });

            } // Search(...)

        });
    };

})(jQuery);
