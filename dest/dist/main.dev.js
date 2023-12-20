"use strict";

$(document).ready(function () {
  //show mobi menu
  $('#burger-btn').click(function () {
    $('#header-nav').toggleClass("active");
    $('#overlay').toggleClass('active');
    $('#burger-btn').toggleClass('active');
  });
  $('#overlay').click(function () {
    $('#header-nav').removeClass("active");
    $('#overlay').removeClass('active');
    $('#burger-btn').removeClass('active');
  }); // show scroll menu

  $(window).scroll(function () {
    var header = $('#header');

    if (pageYOffset > 70) {
      header.addClass('--scroll');
      $('.overlay').removeClass('active');
    } else header.removeClass('scroll');
  }); // run all works tabs function

  allworksTabs(); // scroll up

  $(window).scroll(function () {
    var scrollTop = $('#scroll-top');
    if (scrollTop) pageYOffset > window.innerHeight ? scrollTop.addClass('show') : scrollTop.removeClass('show');
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
}
//# sourceMappingURL=main.dev.js.map
