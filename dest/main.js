(function ($) {
    'use strict';

    $.fn.loadMoreResults = function (options) {

        var defaults = {
            tag: {
                name: 'div',
                'class': 'item'
            },
            displayedItems: 6,
            showItems: 6,
            button: {
                'class': 'load__more',
            }
        };

        var opts = $.extend(true, {}, defaults, options);

        var alphaNumRE = /^[A-Za-z][-_A-Za-z0-9]+$/;
        var numRE = /^[0-9]+$/;

        $.each(opts, function validateOptions(key, val) {
            if (key === 'tag') {
                formatCheck(key, val, 'name', 'string');
                formatCheck(key, val, 'class', 'string');
            }
            if (key === 'displayedItems') {
                formatCheck(key, val, null, 'number');
            }
            if (key === 'showItems') {
                formatCheck(key, val, null, 'number');
            }
            if (key === 'button') {
                formatCheck(key, val, 'class', 'string');
            }
        });

        function formatCheck(key, val, prop, typ) {
            if (prop !== null && typeof prop !== 'object') {
                if (typeof val[prop] !== typ || String(val[prop]).match(typ == 'string' ? alphaNumRE : numRE) === null) {
                    opts[key][prop] = defaults[key][prop];
                }
            } else {
                if (typeof val !== typ || String(val).match(typ == 'string' ? alphaNumRE : numRE) === null) {
                    opts[key] = defaults[key];
                }
            }
        };

        return this.each(function (index, element) {
            var $list = $(element),
                lc = $list.find(' > ' + opts.tag.name + '.' + opts.tag.class).length,
                dc = parseInt(opts.displayedItems),
                sc = parseInt(opts.showItems);

            $list.find(' > ' + opts.tag.name + '.' + opts.tag.class + ':lt(' + dc + ')').css("display", "inline-block");
            $list.find(' > ' + opts.tag.name + '.' + opts.tag.class + ':gt(' + (dc - 1) + ')').css("display", "none");
            $list.on("click", "." + opts.button.class, function (e) {
                e.preventDefault();
                dc = (dc + sc <= lc) ? dc + sc : lc;

                $list.find(' > ' + opts.tag.name + '.' + opts.tag.class + ':lt(' + dc + ')').fadeIn();
                if (dc == lc) {
                    $(this).hide();
                }
            });
        });

    };
})(jQuery);


$(document).ready(function () {
    //show mobi menu
    $('#burger-btn').click(() => {
        $('#header-nav').toggleClass("active");
        $('#overlay').toggleClass('active');
        $('#burger-btn').toggleClass('active');
    });
    $('#overlay').click(() => {
        $('#header-nav').removeClass("active");
        $('#overlay').removeClass('active');
        $('#burger-btn').removeClass('active');
    })
    // show scroll menu
    $(window).scroll(() => {
        var header = $('#header');
        if (pageYOffset > 70) {
            header.addClass('--scroll')
            $('.overlay').removeClass('active')
        }
        else
            header.removeClass('scroll')

    })
    // run all works tabs function
    allworksTabs();
    // run load more in works tabs

    load_more_responsive($('.allworks__content-panel'), 'load__more')
    // scroll up
    $(window).scroll(() => {
        var scrollTop = $('#scroll-top')
        if (scrollTop)
            pageYOffset > window.innerHeight ? scrollTop.addClass('show') : scrollTop.removeClass('show')
    })
})

// all works Tabs function
function allworksTabs() {
    // Tabs functionality
    $('.allworks__tabs').each(function (e) {
        // Hide all tab panels except for the first
        $('.allworks__content-panel').not(':first').hide();

        // Add active statuses to first tab and show display
        $('.allworks__tabs-item', this).removeClass('active');
        $('.allworks__tabs-item:first-child', this).addClass('active');
        $('.allworks__content-panel:first-child').show();

        // Tab clicked
        $('.allworks__tabs-item', this).click(function (e) {
            // Prevent the anchor's default click action
            e.preventDefault();

            // Corresponding tabs panel
            var panel = $('a', this).attr('href');

            // Remove active statuses to other tabs
            $(this).siblings().removeClass('active');

            // Add active status to this tab
            $(this).addClass('active');

            // Hide other tab panels
            $(panel).siblings().hide();

            // Showing the clicked tabs' panel
            $(panel).fadeIn(400);
        });
    });
}
// load more works function
function load_more_responsive(element, btn_class) {
    if (matchMedia("(min-width: 48em)").matches) {
        element.loadMoreResults(
            {
                tag: {
                    name: 'div',
                    'class': 'item'
                },
                displayedItems: 6,
                showItems: 6,
                button: {
                    'class': btn_class,
                }
            }
        );
    }
    else {
        element.loadMoreResults(
            {
                tag: {
                    name: 'div',
                    'class': 'item'
                },
                displayedItems: 3,
                showItems: 3,
                button: {
                    'class': btn_class,
                }
            }
        );
    }
}
