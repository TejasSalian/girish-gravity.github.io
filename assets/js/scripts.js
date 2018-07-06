$('#invitation').carousel({
  interval  : false,
  keyboard  : false,
  ride      : false,
  wrap      : false
})
$(document).ready( function() {
  $('.nav-link').on('click', () => $('.question').css({'margin-left': '10%'}));
});
