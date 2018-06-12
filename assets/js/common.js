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
function add_new_collob() {
    $(".close-colb").show();
    $(".add-new-colb").hide();
    $(".add-coll-box").css("height", "100px");
}
function close_new_collob() {
    $(".add-new-colb").show();
    $(".close-colb").hide();
    $(".add-coll-box").css("height", "60px");
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



function onClickChangeProjectName1()
{
   // $('#projectname').css("top", "0px")
    $("#projectname").html("BRIDGING THE EXPECTATION GAP BETWEEN TECHNOLOGY AND BUSINESS STAKEHOLDERS");
    $("#slide3Img").attr("src", "assets/imgs/image1.png");
    $("#content-ourwork").html("<br>\nThe Identity Management team within a large government regulation agency, which was at the helm of a massive transformation program, engaged Gravity to provide support to bridge a gap between the business team’s expectations and the technology team’s delivery plans.<br>\n<br>\n Gravity built a polished visual representation of our client’s transformation journey map to clearly communicate the stages and steps involved in reaching the end goal. This greatly enhanced and accelerated interpretation and adoption for both business and technology teams. Related business areas were also able to benefit from this visualisation, using it as a reference for planning activities specific to the transformation program. ")
    $("#ch_caroshel1ImgMdl").attr("src", "assets/imgs/image1.png");
}

function onClickChangeProjectName2() {
  //  $('#projectname').css("top", "30px")
    $("#projectname").html("ICT REVIEW AND COST BENEFIT ANALYSIS");
    $("#slide3Img").attr("src", "assets/imgs/image2.png");
    $("#content-ourwork").html("<br>\nThe CIO of a large local government organisation was unable to get a consolidated view of the organisation’s technology landscape and the associated breakdown of ICT expenditure.<br\>\n<br>\nA visual representation of the ICT landscape was developed, leading to the following outcomes:<br\>\n<br>\n <ul style='list-style-type: initial;margin-left:30px;'><li>The CIO gained a clear understanding of the ICT landscape and associated cost breakdown.</li><li>System interdependencies were highlighted which in turn contributed to the development of a System Decommission Strategy.</li><li>The analysis provided vital cost benefit inputs towards initiating a System Replacement program with the potential to realise over $3 Million in annual savings.</li></ul>")
    $("#ch_caroshel1ImgMdl").attr("src", "assets/imgs/image2.png");
}

function onClickChangeProjectName3() {
   // $('#projectname').css("top", "30px")
    $("#projectname").html("BUSINESS CASE DEVELOPMENT");
    $("#slide3Img").attr("src", "assets/imgs/image3.png");
    $("#content-ourwork").html("<br>\nA local government agency required a Business Case for their multimillion dollar Business Transformation Program. The aim was to conduct a detailed cost benefit and risk analysis for the program and in turn enable the CEO to convince the Board and Council members of the programs value and seek budget approval.<br>\n<br>\nAn Infographic Business Case summary was developed that enabled:<br>\n<br>\n<ul style='list-style-type:initial;margin-left:30px;'><li>The CEO to effectiviely pitch his key transformational initiative to the Board.</li><li>The Board members to comprehend the breadth of information contained in a detailed business case, through a concise infographic.</li><li>The Business owners to easily communicate the proposed technology and business change to their respective departments and stakeholders and the program management team to effectively communicate the end objectives to their team members across the Program Lifecycle.</li></ul>")
    $("#ch_caroshel1ImgMdl").attr("src", "assets/imgs/image3.png");
}


function onClickChangeProjectName4() {
   // $('#projectname').css("top", "0px")
    $("#projectname").html("ENABLING A SYSTEMS APPROACH TO POLICY-FORMULATION IN THE HEALTH SECTOR");
    $("#slide3Img").attr("src", "assets/imgs/project-image-01.png");
    $("#content-ourwork").html("<br>\nA finance branch within one of the largest federal departments in the Australian government engaged Gravity to visualise the entire landscape of stakeholders and funding so that various policy areas within the department could highlight the impact of siloed-policy-making to demonstrate overlaps in the landscape for stakeholders, citizen demographics and funding.<br\>\n<br>\nThe outcome of the collaborative exercise was an interactive visual model that showed the overlap and interdependencies of various policies on the landscape.<br\>\n<br>\nThe project created a window to enable the organisation to break down the siloes, articulate connections and support a collaborative approach towards policy formulation across the Australian health landscape.")
    $("#ch_caroshel1ImgMdl").attr("src", "assets/imgs/project-image-01.png");
}


