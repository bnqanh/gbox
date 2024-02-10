"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
        'class': 'load__more'
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
      if (prop !== null && _typeof(prop) !== 'object') {
        if (_typeof(val[prop]) !== typ || String(val[prop]).match(typ == 'string' ? alphaNumRE : numRE) === null) {
          opts[key][prop] = defaults[key][prop];
        }
      } else {
        if (_typeof(val) !== typ || String(val).match(typ == 'string' ? alphaNumRE : numRE) === null) {
          opts[key] = defaults[key];
        }
      }
    }

    ;
    return this.each(function (index, element) {
      var $list = $(element),
          lc = $list.find(' > ' + opts.tag.name + '.' + opts.tag["class"]).length,
          dc = parseInt(opts.displayedItems),
          sc = parseInt(opts.showItems);
      $list.find(' > ' + opts.tag.name + '.' + opts.tag["class"] + ':lt(' + dc + ')').css("display", "inline-block");
      $list.find(' > ' + opts.tag.name + '.' + opts.tag["class"] + ':gt(' + (dc - 1) + ')').css("display", "none");
      $list.on("click", "." + opts.button["class"], function (e) {
        e.preventDefault();
        dc = dc + sc <= lc ? dc + sc : lc;
        $list.find(' > ' + opts.tag.name + '.' + opts.tag["class"] + ':lt(' + dc + ')').fadeIn();

        if (dc == lc) {
          $(this).hide();
        }
      });
    });
  };
})(jQuery);

$(document).ready(function () {
  //show mobi menu
  $('#burger-btn').click(function () {
    $('#header-nav').toggleClass("active");
    $('#overlay').toggleClass('active');
    $('#burger-btn').toggleClass('active');
    $('.mainwrapper').toggleClass('--scaleX');
  });
  $('#overlay').click(function () {
    $('#header-nav').removeClass("active");
    $('#overlay').removeClass('active');
    $('#burger-btn').removeClass('active');
    $('.mainwrapper').removeClass('--scaleX');
  }); // show scroll menu

  $(window).scroll(function () {
    var header = $('#header');

    if (pageYOffset > 70) {
      header.addClass('--scroll'); //$('.overlay').removeClass('active')
    } else header.removeClass('--scroll');
  }); //run radio tabs

  radioTabs(); // run all works tabs function

  allworksTabs(); // run load more in works tabs
  //load_more_responsive($('.home .allworks__content-panel'), 'load__more', 6, 6, 3);

  load_more_responsive($('.work .allworks__content-panel'), 'load__more', 9, 6, 5); // scroll up

  $(window).scroll(function () {
    var scrollTop = $('#scroll-top');
    if (scrollTop) pageYOffset > window.innerHeight ? scrollTop.addClass('show') : scrollTop.removeClass('show');
  }); //fancybox
  //click fullscreen button

  $('.btn.--fullscreen').on('click', function () {
    if (matchMedia("(min-width: 62em)").matches) Fancybox.fromNodes($('[data-fancybox="details"]'), {
      placeFocusBack: false,
      idle: false,
      compact: false,
      dragToClose: false,
      showClass: 'f-fadeIn',
      hideClass: 'f-fadeOut',
      Thumbs: {
        type: 'classic'
      }
    });
  }); //click slide studio details, project details

  $('.item.f-carousel__slide').on('click', function () {
    if (matchMedia("(max-width: 61.999em)").matches) Fancybox.fromNodes($('[data-fancybox="details"]'), {
      placeFocusBack: false,
      idle: false,
      compact: false,
      dragToClose: false,
      showClass: 'f-fadeIn',
      hideClass: 'f-fadeOut',
      Thumbs: {
        type: 'classic'
      }
    });
  });
}); // all works Tabs function

function allworksTabs() {
  // Tabs functionality
  $('.allworks__tabs').each(function (e) {
    // Hide all tab panels except for the first
    $('.allworks__content-panel').not(':first').hide(); // Add active statuses to first tab and show display

    $('.allworks__tabs-item', this).removeClass('active');
    $('.allworks__tabs-item:first-child', this).addClass('active');
    $('.allworks__content-panel:first-child').show(); // Tab clicked

    $('.allworks__tabs-item', this).click(function (e) {
      // Prevent the anchor's default click action
      e.preventDefault(); // Corresponding tabs panel

      var panel = $('a', this).attr('href'); // Remove active statuses to other tabs

      $(this).siblings().removeClass('active'); // Add active status to this tab

      $(this).addClass('active'); // Hide other tab panels

      $(panel).siblings().hide(); // Showing the clicked tabs' panel

      $(panel).fadeIn(400);
    });
  });
} // load more works function


function load_more_responsive(element, btn_class, count1, count2, count3) {
  var md = parseInt(count1),
      sm = parseInt(count2),
      xs = parseInt(count3);

  if (matchMedia("(min-width: 75em)").matches) {
    element.loadMoreResults({
      tag: {
        name: 'div',
        'class': 'item'
      },
      displayedItems: md,
      showItems: md,
      button: {
        'class': btn_class
      }
    });
  } else if (matchMedia("(min-width: 48em)").matches) {
    element.loadMoreResults({
      tag: {
        name: 'div',
        'class': 'item'
      },
      displayedItems: sm,
      showItems: sm,
      button: {
        'class': btn_class
      }
    });
  } else {
    element.loadMoreResults({
      tag: {
        name: 'div',
        'class': 'item'
      },
      displayedItems: xs,
      showItems: xs,
      button: {
        'class': btn_class
      }
    });
  }
} // radio tabs function


function radioTabs() {
  // Tabs functionality
  $('.radio_tabs').each(function (e) {
    // Hide all tab panels except for the first
    $('.radio_tabs-panel').not(':first').hide(); // Add active statuses to first tab and show display

    $('.radio_tabs-item', this).removeClass('active');
    $('.radio_tabs-item:first-child', this).addClass('active');
    $('.radio_tabs-panel:first-child').show(); // Tab clicked

    $('.radio_tabs-item', this).click(function (e) {
      // Prevent the anchor's default click action
      e.preventDefault(); // Corresponding tabs panel

      var panel = $(this).attr('data-id'); // Remove active statuses to other tabs

      $(this).siblings().removeClass('active'); // Add active status to this tab

      $(this).addClass('active'); // Hide other tab panels

      $(panel).siblings().hide(); // Showing the clicked tabs' panel

      $(panel).fadeIn(400);
    });
  });
}
//# sourceMappingURL=main.dev.js.map
