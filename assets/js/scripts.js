var scrollLock = false;
$('#invitation').carousel({
  interval  : false,
  keyboard  : false,
  ride      : false,
  wrap      : false
})
$('.question .nav-link').on('click', () => $('.question').css({'margin-left': '10%'}));
$(document).ready( function() {
  var bodyElement = document.getElementsByTagName('body')[0];
  if (bodyElement.addEventListener)
  {
    // IE9, Chrome, Safari, Opera
    bodyElement.addEventListener("mousewheel", MouseWheelHandler, false);
    // Firefox
    bodyElement.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
  }
  // IE 6/7/8
  else
  {
    bodyElement.attachEvent("onmousewheel", MouseWheelHandler);
  }

  function MouseWheelHandler(e)
  {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    changePage(delta);
    return false;
  }
});

function changePage(delta) {
  if (!scrollLock) {
    scrollLock = !scrollLock;
    if(delta < 0){
      $('#invitation').carousel('next');
    }else if (delta > 0) {
      $('#invitation').carousel('prev');
    }
    setTimeout(function () {
      scrollLock = !scrollLock;
    }, 500);
  }
}
// slide Move Completed
$('#invitation').on('slid.bs.carousel	', function (event) {
  // clear open tabs, we left them
  if (event.from == 0) {
    $('.question').removeAttr('style');
    $('.question .active').removeClass('active show');
    $('.answer .active').removeClass('active show');
  }
  // New Page? Animate new Toys
  setTimeout(function () {
    $('.theme .slideOutUp').removeClass('slideOutUp').addClass('slideInDown');
    $('.theme .slideOutDown').removeClass('slideOutDown').addClass('slideInUp');
  }, 100);
});

// Slide is going to move
$('#invitation').on('slide.bs.carousel', function (event) {

  // reflect in Navbar
  $('.nav-item.active').removeClass('active');
  $('.nav-item')[event.to].classList.add('active');

  // Remove Toys from desk
  $('.theme .slideInDown').removeClass('slideInDown').addClass('slideOutUp');
  $('.theme .slideInUp').removeClass('slideInUp').addClass('slideOutDown');
  // Add New Toys
});
