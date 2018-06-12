$(document).ready(function(){
  // Activate Carousel registration form
  $('#register-carousel').carousel({
    interval: false,
    wrap: false
  });

  function validateEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if (reg.test(email.val()) == false)
    {
        email.parent().find(".alert.alert-danger.mt-1").remove();
        email.addClass('wrong');
        email.parent().append('<div class="alert alert-danger mt-1" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Email that you entered is not valid!</div>');
        return false;
    }
    email.removeClass('wrong');
    email.parent().find(".alert.alert-danger.mt-1").remove();
    return true;
  }

  function isAllFilled() {
    // Assuming Everything is perfect
    var truth = true;
    // Check whether all required fileds are filled
    $(".active .form-control[required=true]").each(function () {
      var state = (this.value != '')? true : false;
      // var state = true;
      if (state) {
        $(this).removeClass('wrong');
      }else {
        $(this).addClass('wrong');
      }
      truth = truth & state;
    });
    // if all filled lets Validate
    if (truth) {
      switch (slideNumber) {
        case 1:
          truth = validateEmail($("#emailid"));
          break;
        case 2:

          break;
        case 3:

          break;
        default:

      }
    }
    return truth
  }

  // Counting Form slides
  var slideNumber = 1;

  // Click on the button to show rest of the forms
  $("#register-next-stage").click(function(){
      if (isAllFilled()) {
        slideNumber++;
        $('#register-carousel').carousel("next");
      }
  });
  $("#register-prev-stage").click(function(){
      slideNumber--;
      $('#register-carousel').carousel("prev");
  });

  // Events on from slide change
  $('#register-carousel').on('slide.bs.carousel', function() {
    // On Slide Next actions
    if (slideNumber == 1) {
      $("#register-prev-stage").addClass('hidden');
      $('.modal-title').removeClass('invisible');
    }
    // no title on rest of the form slides so
    if (slideNumber > 1) {
      $('.modal-title').addClass('invisible');
      $("#register-prev-stage").removeClass('hidden');
    }
    // Form slide ended show the submit button and hide next slide
    if (slideNumber == 3) {
      $('#register-next-stage').addClass('hidden');
      $('#registration-submit').removeClass('hidden');
    }
    else {
      $('#register-next-stage').removeClass('hidden');
      $('#registration-submit').addClass('hidden');
    }
    // Showing slide count
    $('#formSlideInfo').html(slideNumber + '/3');

  });

  // registration result need to be reflected
  function registrationReflect(registration) {
    if(registration === true){
      $('.modal-footer').addClass('invisible');
      // show the next page which having the result of registering
      $('#register-carousel').carousel('next');
    }else {
      // do something like retry or anything...
    }
  }

  $('#register-carousel .item.clickable .form-control').on('focusin', function() {
    $(this).parent().find('label').css('opacity', '0');
  });
  $('#register-carousel .item.clickable label').on('click', function() {
     $('#' + $(this).attr('for') ).trigger('click');
  });
  $('#register-carousel .item.clickable .form-control').on('focusout', function() {
    if ($(this)[0].value) {
      $(this).parent().find('label').css('opacity', '0');
    }else {
      $(this).parent().find('label').css('opacity', '1');
    }
  });

  $('#register-modal button.close').on('click', function () {
    $('#registration-form')[0].reset();
    $('#register-carousel').carousel(0);
    $("#register-prev-stage").addClass('hidden');
    $('.modal-title').removeClass('invisible');
    $('#register-next-stage').removeClass('hidden');
    $('#registration-submit').addClass('hidden');
    slideNumber = 1;
    $('#formSlideInfo').html(slideNumber + '/3');
    $('#registration-form').find('label').each(function() {
      $(this).css('opacity', '1');
    });
  });

  // $('#register-modal').on('shown.bs.carousel', function(event) {
  //   $.fn.fullpage.destroy('all');
  // });

  $('#register-modal').on('shown.bs.modal', function (e) {
    $.fn.fullpage.destroy('all');
  });
  $('#register-modal').on('hidden.bs.modal', function () {
    $('#fullpage').fullpage({
      css3: true,
      scrollingSpeed: 1000,
      scrollOverflow: true
    });
    if ($(window).width() > 991) {
      $.fn.fullpage.moveSectionDown();
    }
  })

  $('#registration-submit').on('click', function(event) {
    event.preventDefault();
    var data = $('#registration-form').serialize();
    $.ajax({
      url: "",
      type: "POST",
      dataType: "json",
      data: data,
      success: function(data){
        // we have data
        var json = $.parseJSON(data);
        // registration result Reflecting
        registrationReflect(true);
      },
      error: function(xhr, resp, text) {
        // console.log(xhr, resp, text);
        // registration result Reflecting
        // registrationReflect(false);
        registrationReflect(true);
      }
  });
  });
});
