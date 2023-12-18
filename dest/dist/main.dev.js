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
  }); // scroll up

  $(window).scroll(function () {
    var scrollTop = $('#scroll-top');
    if (scrollTop) pageYOffset > window.innerHeight ? scrollTop.addClass('show') : scrollTop.removeClass('show');
  });
});
//# sourceMappingURL=main.dev.js.map
