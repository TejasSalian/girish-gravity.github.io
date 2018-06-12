$(document).ready(function () {


    //$('.gry-box').hover(function () {
    //    $(this).animate({
    //        height: '160px',
            
            
    //    }, 300);
    //    $(".content1").show();
    //    $(".shw-cont1").show();
    //    $(".shw-cont2").show();
        
    //}, function () {
    //    $(this).animate({
    //        height: '60px'
    //    }, 300);
    //    $(".content1").hide();
    //    $(".shw-cont1").hide();
    //    $(".shw-cont2").hide();
       
    //});




    //});
    $('#example2').DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        "oLanguage": { "sSearch": "<i class='icon-cls glyphicon glyphicon-search'></i>" },
        "dom": ' <"search"f><"top"l>rt<"bottom"ip><"clear">',
        "aaSorting": []

    });


    $('.dataTables_filter input').attr('placeholder', 'Search...');
    $(".img-info-1").find(".trr").css("border-right-width", $(".img-info-1").css("width"));
    $(".img-info-1").find(".trr").css("border-bottom-width", $(".img-info-1").css("height"));

    $(".ig-im").find(".trr").css("border-right-width", $(".ig-im").css("width"));
    $(".ig-im").find(".trr").css("border-bottom-width", $(".ig-im").css("height"));

    $(".ig-im2").find(".trr").css("border-right-width", $(".ig-im2").css("width"));
    $(".ig-im2").find(".trr").css("border-bottom-width", $(".ig-im2").css("height"));

    $(".ig-im3").find(".trr").css("border-right-width", $(".ig-im3").css("width"));
    $(".ig-im3").find(".trr").css("border-bottom-width", $(".ig-im3").css("height"));
    //var height = window.innerHeight;
    //var div_height = height - 142;
    
    //    $(".our1").css("height", div_height);
   
    //    var d2_height = div_height - 68;
    //    var im_all_height = d2_height - 7;
    //    $("#d2-height").css("height", d2_height);
    //    $(".img-info-1").css("height", im_all_height);

    //adding the action to the button
    $(document).on('click', '.moveTo', function () {
        $.fn.fullpage.moveTo(2, 0);
    });
    $(document).on('click', '.moveuptop', function () {
        $.fn.fullpage.moveTo(1, 0);
    });

    $(document).on('click', '#moveRight', function () {
        $.fn.fullpage.moveSlideRight();
    });
    $(document).on('click', '#slide-info-content', function () {
        $.fn.fullpage.moveSlideRight();
    });
    $(document).on('click', '#slide-intro-content', function () {
        $.fn.fullpage.moveSlideRight();
    });
    $(document).on('click', '#slide-motion-content', function () {
        $.fn.fullpage.moveSlideRight();
    });
    $(document).on('click', '#closeourwork', function () {
        $.fn.fullpage.moveSlideLeft();
    });

    $(document).on('click', '#ch_carousel1', function () {
        $.fn.fullpage.moveSlideRight();
        $("#project_name_change1").show();
        $("#project_name_change2").hide();
        $("#project_name_change3").hide();
        $("#infobox").show();
        $("#introbox").hide();
        $("#motionbox").hide();
        $("#infographicsProjectDisp").show();
        $("#introProjectDisp").hide();
        $("#motionProjectDisp").hide();


    });
    $(document).on('click', '#ch_carousel2', function () {
        $.fn.fullpage.moveSlideRight();
        $("#project_name_change1").hide();
        $("#project_name_change2").show();
        $("#project_name_change3").hide();
        $("#infobox").hide();
        $("#introbox").show();
        $("#motionbox").hide();
        $("#infographicsProjectDisp").hide();
        $("#introProjectDisp").show();
        $("#motionProjectDisp").hide();
    });
    $(document).on('click', '#ch_carousel3', function () {
        $.fn.fullpage.moveSlideRight();
        $("#project_name_change1").hide();
        $("#project_name_change2").hide();
        $("#project_name_change3").show();
        $("#infobox").hide();
        $("#introbox").hide();
        $("#motionbox").show();
        $("#infographicsProjectDisp").hide();
        $("#introProjectDisp").hide();
        $("#motionProjectDisp").show();
    });


    $(document).on('click', '#infobox', function () {
        $.fn.fullpage.moveSlideLeft();
    });
    $(document).on('click', '#introbox', function () {
        $.fn.fullpage.moveSlideLeft();
    });
    $(document).on('click', '#motionbox', function () {
        $.fn.fullpage.moveSlideLeft();
    });

    $(document).on('click', '#loginmovedown', function () {
        $.fn.fullpage.moveTo(1, 0);
    });
    $(document).on('click', '#ourworkmovedown', function () {
        $.fn.fullpage.moveTo(1, 0);
    });

    $('.mycarousel').carousel({
        interval: false
    });


    $("#slide-info-content").mouseover(
      function () {
          $("#changetext1").css("font-family", "Lato_Bold");
      }
    );
    $("#slide-info-content").mouseout(
     function () {
         $("#changetext1").css("font-family", "Lato_Light");
     }
   );
    

    $("#slide-intro-content").mouseover(
      function () {
          $("#changetext2").css("font-family", "Lato_Bold");
      }
    );

    $("#slide-intro-content").mouseout(
     function () {
         $("#changetext2").css("font-family", "Lato_Light");
     }
   );

    $("#slide-motion-content").mouseover(
     function () {
         $("#changetext3").css("font-family", "Lato_Bold");
     }
   );

    $("#slide-motion-content").mouseout(
     function () {
         $("#changetext3").css("font-family", "Lato_Light");
     }
   );

    $('#ourWorkcarousel').on('slid.bs.carousel', function (e) {
        var text = $.trim($('#ourWorkcarousel').find('.carousel-inner').find('.active').html());
        if (text == 'Infographics') {
            $('#ch_carousel3').hide();
            $('#ch_carousel2').hide();
            $('#ch_carousel1').show();
            $("#change_div_color").css("background", "#66DBFF");
        } else if (text == 'Interactive<br>Infographics') {
            $('#ch_carousel3').hide();
            $('#ch_carousel2').show();
            $('#ch_carousel1').hide();

            $("#change_div_color").css("background", "#EE7171");
        } else if (text == 'Motion<br>Graphics') {
            $('#ch_carousel3').show();
            $('#ch_carousel2').hide();
            $('#ch_carousel1').hide();

            $("#change_div_color").css("background", "#FFE069");
        }

    });


    var myEl1 = document.getElementById('slide-info-content');

    if (myEl1 != null) {
        myEl1.addEventListener('click', function () {
            // $('#ourWorkcarousel').find('.active').removeClass();

            $('#ourWorkcarousel .carousel-inner .active').removeClass('active');
            $('#class_active1').addClass('active')
            $('#ch_carousel3').hide();
            $('#ch_carousel2').hide();
            $('#ch_carousel1').show();
            $("#change_div_color").css("background", "#66DBFF");

        }, false);
    }

    var myEl2 = document.getElementById('slide-intro-content');
    if (myEl2 != null) {
        myEl2.addEventListener('click', function () {
            // var text = $.trim($('#ourWorkcarousel').find('.carousel-inner').find('.active').html());

            $('#ourWorkcarousel .carousel-inner .active').removeClass('active');
            $('#class_active2').addClass('active')
            $('#ch_carousel3').hide();
            $('#ch_carousel2').show();
            $('#ch_carousel1').hide();
            $("#change_div_color").css("background", "#EE7171");

        }, false);
    }


    var myEl3 = document.getElementById('slide-motion-content');
    if (myEl3 != null) {
        myEl3.addEventListener('click', function () {
            // var text = $.trim($('#ourWorkcarousel').find('.carousel-inner').find('.active').html());

            $('#ourWorkcarousel .carousel-inner .active').removeClass('active');
            $('#class_active3').addClass('active')
            $('#ch_carousel3').show();
            $('#ch_carousel2').hide();
            $('#ch_carousel1').hide();
            $("#change_div_color").css("background", "#FFE069");

        }, false);
    }


});


function CloseourWork() {
    $('.our1').show();
    $('.ourworkInfo').hide();
    $('.ourworkInteractive').hide();
    $('.ourworkMotion').hide();
}
function infograficData() {
    $('.our1').hide();
    $('.ourworkInfo').show();
    $('.ourworkInteractive').hide();
    $('.ourworkMotion').hide();
}
function InteractiveData() {
    $('.our1').hide();
    $('.ourworkInfo').hide();
    $('.ourworkInteractive').show();
    $('.ourworkMotion').hide();
}
function MotiongraphicData() {
    $('.our1').hide();
    $('.ourworkInfo').hide();
    $('.ourworkInteractive').hide();
    $('.ourworkMotion').show();
}
function cl_right() {
    var itemvalue = $(".item .active").html();
    var test = itemvalue;
}
function showProjectWorkInfo() {
    $("#slide2our_work").hide();
    $("#project_name").show();
    $("#project_name_change").html('Infographic');
    $("#infobox").show();
    $("#introbox").hide();
    $("#motionbox").hide();
}
function showProjectWorkIntro() {
    $("#slide2our_work").hide();
    $("#project_name").show();
    $("#project_name_change").html('Interactive' + '<br/>' + 'Infographic');
    $("#introbox").show();
    $("#motionbox").hide();
    $("#infobox").hide();
}
function showProjectWorkMotion() {
    $("#slide2our_work").hide();
    $("#project_name").show();
    $("#project_name_change").html('Motion' + '<br/>' + 'Graphic');
    $("#motionbox").show();
    $("#infobox").hide();
    $("#introbox").hide();
}
function backtoInfo() {
    $("#project_name").hide();
    $("#slide2our_work").show();
}
function backtoIntro() {
    $("#project_name").hide();
    $("#slide2our_work").show();
}
function backtoMotion() {
    $("#project_name").hide();
    $("#slide2our_work").show();
}
function add_new_collob(ele) {
    var mainDiv = $(ele).parents(".cbr-box");
    $(mainDiv).find(".close-colb").show();
    $(mainDiv).find(".add-new-colb").hide();
    $(mainDiv).find(".add-coll-box").css("height", "145px");
}
function close_new_collob(ele) {
    var mainDiv = $(ele).parents(".cbr-box");
    $(mainDiv).find(".add-new-colb").show();
    $(mainDiv).find(".close-colb").hide();
    $(mainDiv).find(".add-coll-box").css("height", "60px");
}
function all1() {
    $(".all1").css("background", "#CFD1D2");
    $(".approved").css("background", "white");
    $(".pending").css("background", "white");
    $(".alldisplay").show();
    $(".approveddisplay").hide();
    $(".pendingdisplay").hide();
}
function approved() {
    $(".all1").css("background", "white");
    $(".approved").css("background", "#CFD1D2");
    $(".pending").css("background", "white");
    $(".alldisplay").hide();
    $(".approveddisplay").show();
    $(".pendingdisplay").hide();
}
function pending() {
    $(".all1").css("background", "white");
    $(".approved").css("background", "white");
    $(".pending").css("background", "#CFD1D2");
    $(".alldisplay").hide();
    $(".approveddisplay").hide();
    $(".pendingdisplay").show();
}
function open_gry_bx() {
    $(".gry-box1").css("height", "160px");
    $(".close-colb-dv").show();
    $(".gry-box1").css("background", "white");
    $(".gry-box1").css("border", "2px solid #CFD1D2");
    var checkpending = $(".pending").html();
    if (checkpending == "Pending") {
        $(".approve-colb-dv").show();
    }
}
function close_colb_div() {
    $(".close-colb-dv").hide();
    $(".gry-box1").css("height", "60px");
    $(".gry-box1").css("background", "#CFD1D2");
    $(".approve-colb-dv").hide();
}
function approve_div() {
    $(".close-colb-dv").hide();
    $(".gry-box1").css("height", "60px");
    $(".gry-box1").css("background", "#CFD1D2");
    $(".approve-colb-dv").hide();
}