/*global $,jQuery,console*/

var url2017_1 = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectMetaData_12_2017.Json';
var url2017_2 = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectDetailedData_12_2017.Json';
var url2017_3 = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectYearlyDetailedData_12_2017.Json';

var url2018_1 = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectMetaData';
var url2018_2 = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectDetailedData';
var url2018_3 = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectYearlyDetailedData';

var url1_temp = url2018_1;
var url2_temp = url2018_2;
var url3_temp = url2018_3;

$('#yearSpan').on('change', function() {
  if (this.value === String('2017')) {
    url1_temp = url2017_1;
    url2_temp = url2017_2;
    url3_temp = url2017_3;
    $('.yearSpan').text('2017-2018');
    tableUpdater();
  }else if (this.value === String('2018')) {
    url1_temp = url2018_1;
    url2_temp = url2018_2;
    url3_temp = url2018_3;
    $('.yearSpan').text('2018-2019');
    tableUpdater();
  }
});

function tableUpdater() {
  var data, tableHtml = '';
  $('#dataTable tbody').html(tableHtml);
  $.when(
    $.ajaxSetup({
      crossDomain: true,
      beforeSend: function(xhr) {
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("application/json");
        }
      }
    }),
    $.getJSON(url1_temp, function(res) {
      data = res;
    })
  ).then(function () {
    $.each(data, function(key, item){
      tableHtml +='<tr data-value="' +item.ProjectId + ',' + item.Stage + '" role="row">'+
                    '<td class="folderClass sorting_1"></td>' +
                    '<td class=" projectlst">' + item.Project + '</td>'+
                    '<td class=" miniHeader">'+
                      '<span>' + valueTypeFn(item) + '</span>'+
                      '<span>STAGE</span>'+
                      '<span>ASSET CLASS</span>'+
                      '<span>REGION</span>'+
                    '</td>'+
                    '<td class=" valuelst">'+ valuelstFn(item) +'</td>'+
                    '<td class=" stagelst">'+ stagelstFn(item) +'</td>'+
                    '<td class=" assetclasslst">' + item.AssetClass + '</td>'+
                    '<td class=" regionlst">' + item.Region + '</td>'+
                    '<td class=" hr_line"><hr></td>'+
                   '</tr>';
    });
    $('#dataTable tbody').html(tableHtml);
  });
}

function valueTypeFn(data) {
  if (data.Stage.toUpperCase() == "PLANNING".toUpperCase()) {
    return String('TYPE');
  }else {
    return String('VALUE');
  }
}

function valuelstFn(data) {
  if(data.Stage.toUpperCase() == "PLANNING".toUpperCase())
  {
      if(data.OpportunityFlag == true)
      {
          return "Future opportunity";
      }
      else
      {
          return "Consultation";
      }
  }
  else
  {
      return formatValue(data.Value);
  }
}

function stagelstFn(data) {
  if(data.Stage.toUpperCase() == "PLANNING".toUpperCase()) {
      return data.SubStage;
  }
  else{
      return firstLetterCaps(data.Stage);
  }
}

var subHeaderClickedBool = false;

function goTo(hidePage, showPage, reset) {
    'use strict';
    $(showPage).show().animate({
        left: '0px'
    }, 'slow');
    $(hidePage).animate({
        left: '-100%'
    }, 'slow', function () {
        if (reset === true) {
            $(this).css({left: "100%"});
        }
    });
}

var filter_stage = [];
var filter_asset = [];
var filter_region = [];

function filterCounter() {
    'use strict';
    var f_counter = 0;
    filter_stage = [];
    filter_asset = [];
    filter_region = [];

    $(".mb_filterPage_slide1 .ul_1 li").each(function () {
        if ($(this).children('button').hasClass('selected')) {
            f_counter += 1;
            filter_stage.push($(this).children('button').val());
        }
    });
    $(".mb_filterPage_slide1 .ul_2 li").each(function () {
        if ($(this).children('button').hasClass('selected')) {
            f_counter += 1;
            filter_stage.push($(this).children('button').val());
        }
    });
    $(".mb_filterPage_slide2 ul li").each(function () {
        if ($(this).children('button').hasClass('selected')) {
            f_counter += 1;
            filter_asset.push($(this).children('button').val());
        }
    });
    $(".mb_filterPage_slide3 ul li").each(function () {
        if ($(this).children('button').hasClass('selected')) {
            f_counter += 1;
            filter_region.push($(this).children('button').val());
        }
    });

    $(".mb_filterPage_counter").text(f_counter);
    if (f_counter === 0) {
        $(".mb_projectPage_counter").hide();
    } else {
        $(".mb_projectPage_counter").show().text(f_counter);
    }

}

function fadeSubTitle(indexNum) {
    'use strict';
    var i, $temp, $temp2;
    for (i = 1; i < 5; i += 1) {
        $temp = $(".mb_helpPage_subTitle #img" + i);
        $temp2 = $(".mb_helpPage_subTitle_text #txt" + i);
        if (i === indexNum) {
            $temp.animate({
                opacity: '1'
            }, 'slow');
            $temp2.animate({
                opacity: '1'
            }, 'slow');
        } else {
            $temp.animate({
                opacity: '0'
            }, 'slow');
            $temp2.animate({
                opacity: '0'
            }, 'slow');
        }
    }
}

function helpPage1() {
    'use strict';
    $(".carousel_btn_left").css({
        visibility: 'hidden'
    });
    $(".carousel_btn_right").css({
        visibility: 'visible'
    });

    $(".mb_helpPage_description").delay(300).animate({
        opacity: '1',
        top: '0'
    }, 'normal');
    $('.mb_helpPage_buttons').delay(300).animate({
        top: '0',
        left: '0'
    }, 'normal', 'linear');
    /// PAGE 2 ///
    $(".mb_helpPage_animButtons").delay(150).animate({
        opacity: '0',
        top: '400px',
        left: '0'
    }, 'normal', function () {
        $(this).hide();
    });
    $(".mb_helpPage_card2").animate({
        left: '100%'
    }, 'normal', function () {
        $(this).hide();
    });
    fadeSubTitle(1);

    /// PAGE 3 ///
    $(".mb_helpPage_3").animate({
        left: '100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });

     /// PAGE 4 ///
    $(".mb_helpPage_4").animate({
        left: '100%'
    }, 'normal', 'linear');

     $(".mb_helpPage_subTitle_line").animate({
        'opacity':1
    });
     $(".mb_helpPage_carouselButtonsParent").animate({
        'opacity':1
    });
    $(".mb_helpPage_btn").animate({
        'top': '0px',
        'position': 'relative'
    });

}
function helpPage2() {
    'use strict';
    $(".carousel_btn_left").css({
        visibility: 'visible'
    });
    $(".carousel_btn_right").css({
        visibility: 'visible'
    });

    /// PAGE 1 ///
    $(".mb_helpPage_description").animate({
        opacity: '0',
        top: '-150px'
    }, 'normal');
    /// PAGE 2///
    $('.mb_helpPage_buttons').animate({
        top: '-100px',
        left: '0'
    }, 'normal');
    $(".mb_helpPage_animButtons").show().delay(150).animate({
        opacity: '1',
        top: '200px',
        left: '0'
    }, 'normal');
    $(".mb_helpPage_card2").show().delay(300).animate({
        left: '53px'
    }, 'normal');
    fadeSubTitle(2);

    //PAGE 3
    $('.mb_helpPage_3').animate({
        left: '100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
     /// PAGE 4 ///
    $(".mb_helpPage_4").animate({
        left: '100%'
    }, 'normal', 'linear');

     $(".mb_helpPage_subTitle_line").animate({
        'opacity':1
    });
     $(".mb_helpPage_carouselButtonsParent").animate({
        'opacity':1
    });
    $(".mb_helpPage_btn").animate({
        'top': '0px',
        'position': 'relative'
    });

}
function helpPage3() {
    'use strict';
    $(".carousel_btn_left").css({
        visibility: 'visible'
    });
    $(".carousel_btn_right").css({
        visibility: 'visible'
    });

    /// PAGE 1//
    $(".mb_helpPage_description").animate({
        opacity: '0',
        top: '-150px'
    }, 'normal');
    /// PAGE 2/////
    $('.mb_helpPage_buttons').animate({
        left: '-100%'
    }, 'normal');
    $(".mb_helpPage_animButtons").animate({
        left: '-100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    $(".mb_helpPage_card2").animate({
        left: '-100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });

    //// PAGE 3 ///
    $(".mb_helpPage_3").show().animate({
        left: '-43px'
    }, 'normal', 'linear');

    fadeSubTitle(3);
        /// PAGE 4 ///
    $(".mb_helpPage_4").animate({
        left: '100%'
    }, 'normal', 'linear');

     $(".mb_helpPage_subTitle_line").animate({
        'opacity':1
    });
     $(".mb_helpPage_carouselButtonsParent").animate({
        'opacity':1
    });
    $(".mb_helpPage_btn").animate({
        'top': '0px',
        'position': 'relative'
    });

}

function helpPage4() {
    'use strict';
    $(".carousel_btn_left").css({
        visibility: 'visible'
    });
    $(".carousel_btn_right").css({
        visibility: 'visible'
    });

    /// PAGE 1//
    $(".mb_helpPage_description").animate({
        opacity: '0',
        top: '-150px'
    }, 'normal');
    /// PAGE 2/////
    $('.mb_helpPage_buttons').animate({
        left: '-100%'
    }, 'slow');
    $(".mb_helpPage_animButtons").animate({
        left: '-100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    $(".mb_helpPage_card2").animate({
        left: '-100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    /// PAGE 3 ///
    $(".mb_helpPage_3").animate({
        left: '-110%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    /// PAGE 4 ///
    $(".mb_helpPage_4").animate({
        left: '-100px'
    }, 'normal', 'linear');
    fadeSubTitle(4);
    $(".mb_helpPage_subTitle_line").animate({
        'opacity':1
    });
     $(".mb_helpPage_carouselButtonsParent").animate({
        'opacity':1
    });

    $(".mb_caoursel5_btn").animate({
        'opacity':'0'
    }).fadeOut();
     $(".swipeArea").slideDown();
        $(".mb_helpPage_arrowParent").animate({
           'left':'0%'
        },'normal','linear').show();
        $(".mb_helpPage_subTitle").animate({
           'left':'0%'
        },'normal','linear').show();
        $(".mb_helpPage_subTitle_line").animate({
           'left':'0%'
        },'normal','linear').show();
        $(".mb_helpPage_subTitle_text").animate({
           'left':'0%'
        },'normal','linear').show();
        $(".mb_helpPage_carouselButtonsParent").animate({
           'left':'00%'
        },'normal','linear').show();
        $(".mb_helpPage_btn").show();


}

function helpPage5() {
     'use strict';
    $(".carousel_btn_left").css({
        visibility: 'hidden'
    });
    $(".carousel_btn_right").css({
        visibility: 'hidden'
    });
     /// PAGE 1//
    $(".mb_helpPage_description").animate({
        opacity: '0',
        top: '-150px'
    }, 'normal');
    /// PAGE 2/////
    $('.mb_helpPage_buttons').animate({
        left: '-100%'
    }, 'slow');
    $(".mb_helpPage_animButtons").animate({
        left: '-100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    $(".mb_helpPage_card2").animate({
        left: '-100%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    /// PAGE 3 ///
    $(".mb_helpPage_3").animate({
        left: '-110%'
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    /// PAGE 4 ///
    $(".mb_helpPage_4").animate({
        left: '-480px'
    }, 'normal', 'linear');
    fadeSubTitle(5);
    $(".mb_helpPage_subTitle_line").animate({
        'opacity':0
    });
    $(".mb_helpPage_carouselButtonsParent").animate({
        'opacity':0
    });


    $(".mb_helpPage_arrowParent").animate({
       'left':'-100%'
    },'normal','linear').hide();
    $(".mb_helpPage_subTitle").animate({
       'left':'-100%'
    },'normal','linear').hide();
    $(".mb_helpPage_subTitle_line").animate({
       'left':'-100%'
    },'normal','linear').hide();
    $(".mb_helpPage_subTitle_text").animate({
       'left':'-100%'
    },'normal','linear').hide();
    $(".mb_helpPage_carouselButtonsParent").animate({
       'left':'-100%'
    },'normal','linear').hide();

    $(".mb_helpPage_btn").hide();
    $(".swipeArea").slideUp();

    $(".mb_caoursel5_btn").delay(200).queue(function () {
        $(this).show().dequeue().animate({
            'opacity':'1'
        });
    });

}

function sliderFinder(indexNum) {
    'use strict';
    // console.log(indexNum);
    switch (indexNum) {
    case 0:
        helpPage1();
        break;
    case 1:
        helpPage2();
        break;
    case 2:
        helpPage3();
        break;
    case 3:
        helpPage4();
        break;
    case 4:
        helpPage5();
        break;
    }
}

function classSwap(activeTag, num) {
    'use strict';
    activeTag.addClass("active");
    activeTag.siblings().removeClass("active");

    var $selected = $('.mb_filterPage_carouselButtons li').eq(num);
    $selected.addClass("selected");
    $selected.siblings().removeClass("selected");
}

function filterPhasePage() {
    'use strict';
    $(".mb_filterPage_hr").css({
            "width": "20%",
            "margin-left": "6%"
    });
    classSwap($('.mb_filterPage_phase_btn'), 0);
    $(".mb_filterPage_slide1").show().animate({
        left: "0"
    }, 'normal', 'linear');
    $(".mb_filterPage_slide2").animate({
        left: "100%"
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    $(".mb_filterPage_slide3").animate({
        left: "100%"
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
}
function filterAssetPage() {
    'use strict';
    $(".mb_filterPage_hr").css({
            "width": "36%",
            "margin-left": "32%"
    });
    classSwap($('.mb_filterPage_assetclasses_btn'), 1);
    $(".mb_filterPage_slide1").animate({
        left: "-100%"
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    $(".mb_filterPage_slide2").show().animate({
        left: "0%"
    }, 'normal', 'linear');
    $(".mb_filterPage_slide3").animate({
        left: "100%"
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
}
function filterRegionPage() {
    'use strict';
    $(".mb_filterPage_hr").css({
            "width": "21%",
            "margin-left": "72%"
    });
    classSwap($('.mb_filterPage_regions_btn'), 2);

    $(".mb_filterPage_slide1").animate({
        left: "-100%"
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    $(".mb_filterPage_slide2").animate({
        left: "-100%"
    }, 'normal', 'linear', function () {
        $(this).hide();
    });
    $(".mb_filterPage_slide3").show().animate({
        left: "0%"
    }, 'normal', 'linear');
}


//var filterSliderBool;

function filterSliderFinder(indexNum) {
    'use strict';
//    filterSliderBool = indexNum;
    switch (indexNum) {
    case 0:
        filterPhasePage();
        break;
    case 1:
        filterAssetPage();
        break;
    case 2:
        filterRegionPage();
        break;
    }
}


function sortListBy() {
    $('.mb_projectPage_sortList li').each(function (idx){
        if($(this).hasClass("activated"))
        {
            switch (idx) {
            case 0:
                $('.dataTable').DataTable().order([1, 'asc']).draw(); // PROJECT NAME
                break;
            case 1:
                $('.dataTable').DataTable().order([4, 'asc']).draw(); // STAGE low to high
                break;
            case 2:
                $('.dataTable').DataTable().order([4, 'desc']).draw(); // STAGE high to low
                break;
            case 3:
                $('.dataTable').DataTable().order([3, 'asc']).draw(); // VALUE
                break;
            case 4:
                $('.dataTable').DataTable().order([6, 'asc']).draw(); // REGION
                break;
            case 5:
                $('.dataTable').DataTable().order([5, 'asc']).draw(); // ASSETCLASS
                break;
            }
        }
    });
}


function sliderDots() {
    'use strict';
    $('.mb_helpPage_carouselButtons li').bind('click', function () {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        sliderFinder($(this).index());
    });
    $('.mb_filterPage_carouselButtons li').bind('click', function () {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        filterSliderFinder($(this).index());
    });
    $('.ul_1 li button').bind('click', function () {
        $(this).toggleClass("selected");
        filterCounter();
    });
    $('.ul_2 li button').bind('click', function () {
        $(this).toggleClass("selected");
        filterCounter();
    });
    $('.mb_filterPage_slide2 ul li button').bind('tapstart click', function () {
        $(this).toggleClass("selected");
        filterCounter();
    });
    $('.mb_filterPage_slide3 ul li button').bind('tapstart click', function () {
        $(this).toggleClass("selected");
        filterCounter();
    });
    $(".mb_projectPage_sortList li").bind('touch click', function () {
        $(this).siblings().removeClass("activated");
        $(this).siblings().children('.sortSelectorBorder').children('.sortSelector').hide();
        $(this).addClass("activated");
        $(this).children('.sortSelectorBorder').children('.sortSelector').show();
//        $(this).attr('value','6');
    });
}

function formatValue(value) {
    if(value == 0 || value == null){
        return 0;
    }
    else {
        // if(value > 999 && value <= 999999){
        //     return '$'+(value/1000).toFixed(2) + 'K';
        // }
        // else {
        //     if(value > 999999 && value <= 999999999) {
                return '$'+(value/1000000).toFixed(4) + 'M';
        //     }
        //     else {
        //         if(value > 999999999){
        //             return '$'+(value/1000000000000).toFixed(2) + 'B';
        //         }
        //         else{
        //             return '$'+value;
        //         }
        //     }
        // }
    }
}
function firstLetterCaps(string_data) {
    return string_data.charAt(0).toUpperCase() + string_data.substr(1).toLowerCase();
}


function jsonUrlFormatter(url) {
    var date = new Date();
    url = url + '_' + (date.getMonth()+1).toString() + '_' + date.getFullYear().toString() + '.Json';
    return url;
}
var table;
function tableInit() {
    'use strict';
    table = $('#dataTable').DataTable({
        "scrollCollapse": true,
        "scrollY":950,
        "scroller": true,
        "processing": true,
        "serverSide": false,
        "paging": true,
        "responsive": true,
        "info":true,
        "ajax": {
            // "url": jsonUrlFormatter(url1),
            "url": (url1_temp),
            "dataSrc": function(json) {
                var jsonModified = {};
                jsonModified.data = json;
                return jsonModified.data;
            }
        },
        "columns": [
            { className: "folderClass", "data": null, "defaultContent": "", "targets": -1},
            { className: "projectlst", "data": "Project" },
            // { className: "miniHeader", "data": null, "defaultContent": "<span>VALUE</span><span>STAGE</span><span>ASSET CLASS</span><span>REGION</span>", "targets": -1},
            { className: "miniHeader", "data": null, "render": function (data, type,row) {
                if(data.Stage.toUpperCase() == "PLANNING".toUpperCase())
                {
                    return "<span>TYPE</span><span>STAGE</span><span>ASSET CLASS</span><span>REGION</span>"
                }
                else {
                    return "<span>VALUE</span><span>STAGE</span><span>ASSET CLASS</span><span>REGION</span>"
                }
            } },
            { className: "valuelst", "data": null, "render": function(data, type, row) {
                if(data.Stage.toUpperCase() == "PLANNING".toUpperCase())
                {
                    if(data.OpportunityFlag == true)
                    {
                        return "Future opportunity";
                    }
                    else
                    {
                        return "Consultation";
                    }
                }
                else
                {
                    return formatValue(data.Value);
                }
            } },
            // { className: "stagelst", "data": "Stage" },
            { className: "stagelst", "data": null, "render": function(data, type, row) {
                if(data.Stage.toUpperCase() == "PLANNING".toUpperCase()) {
                    return data.SubStage;
                }
                else{
                    return firstLetterCaps(data.Stage);
                }
            }},
            { className: "assetclasslst", "data": "AssetClass" },
            { className: "regionlst", "data": "Region" },
            { className: "hr_line", "data": null, "targets": -1, "defaultContent":"<hr>"}
        ],
        "createdRow": function ( row, data, index ) {
            $.each($(row), function (colIndex) {
                $(this).attr('data-value', data["ProjectId"] + ',' + data["Stage"]);
            });
        },
        "deferRender": true,
        "deferLoading": 20,
        "language": {
            searchPlaceholder: "Search"
        }
    });
    $('.dataTables_filter input').addClass('searchIcon');
    $('.dataTables_filter input').attr('type', 'text');
    $('.dataTable').css({width:"95%"});
    $('.dataTable thead').hide();

//    table.ajax.reload( null, false );

}

function insertSortButton(){
    'use strict';
    $(".dataTables_filter label").append('<button class="mb_projectPage_sortBtn"></button>');
    $(".dataTables_filter label").append('<button class="close"></button>');

    $(".mb_projectPage_sortBtn").bind('click touchstart', function (e) {
        'use strict';
        $(".mb_projectPage_sortBg").fadeIn();
        e.preventDefault();
    });

    $(".dataTables_filter input").bind('click touchstart', function (e) {
        'use strict';
        e.preventDefault();

        $(".close").css({"z-index":"6"}).fadeIn(100);
        $(".mb_projectPage_sortBtn").animate({
            width: "0px"
        }, function(){
            $(this).hide();
        });
        $(this).animate({
            width: "70%",
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            "-webkit-border-top-right-radius": "50px",
            "-webkit-border-bottom-right-radius": "50px"
        }).focus();
    });

    $(".close").bind('click touchstart', function (e) {
        'use strict';
        e.preventDefault();


        setTimeout(function() {
            $(".dataTables_filter input").focus();
        },0);

        $(this).css({
            "z-index":"0",
            "display":"none"
        });

        $(".mb_projectPage_sortBtn").show().animate({
            width: "35%",
            display: "block"
        });
        $(".dataTables_filter input").animate({
            width: "35%",
            "borderTopRightRadius": "0px",
            "borderBottomRightRadius": "0px",
            "-webkit-border-top-right-radius": "0px",
            "-webkit-border-bottom-right-radius": "0px"
        }).blur();

        $('.dataTable').DataTable().search('').draw();
        dataRowCount();

    });


//    $(".dataTables_filter").

    var element = $('.dataTables_filter').detach();
    $('.mb_projectPage_searchSort').append(element);
//
//    dataTables_scroll
    $(".dataTables_scrollBody").bind('scroll', function () {
        'use strict';
        var scroll = $(".dataTables_scrollBody").scrollTop();

        if (scroll >= 100) {
            $(".mb_projectPage_hiliteParent").slideUp(function() {
                $(".dataTables_scrollBody").css({
                    "max-height":"1200px",
                    "position":"absolute",
                    "top":"0px"
                });
                $(".application").css({
                   "height":"90vh"
                });
            });
        }
        if (scroll < 100) {
             $(".dataTables_scrollBody").css({
                 "max-height":"950px",
                 "position":"relative",
                 "top":"0"
             });
            $(".application").css({
                "height":"100vh"
            });
            $(".mb_projectPage_hiliteParent").slideDown();

        }

    });

//


    $(".dataTable").on('click', "tbody tr", function () {
        'use strict';
        goTo($(".mb_projectPage"), $(".mb_projectInfoPage"), false);
        var arrayData = $(this).data('value');
        var arr = arrayData.split(',');

        loadProjectInfo(arr[0],arr[1]);
        // loadProjectInfo($(this).data('value'));
        // console.log($(this).data('value'));
        $(".application").css({
            "height": "110vh"
        });
    });

    $(".dataTables_filter").on('keypress keyup','input',function() {
        filterAndCount();
    });


}

function columnCount(colNum,arr) {
    var table = $('.dataTable').DataTable();
    return table.column(colNum).search(
          arr.join('|'),
          true,
          false,
          true
    ).draw().page.info().recordsDisplay;
}

function carouselDataLoad(){

    $("#img2 span").text('(' + columnCount(4,['Concept','Strategic assessement','Preliminary evaluation','Business Case']) + ')');
    $("#img3 span").text('(' + columnCount(4,['Investment Decision']) + ')');
    $("#img4 span").text('(' + columnCount(4,['Delivery']) + ')');
}

var hideKeyboard = function() {
 document.activeElement.blur();
 var inputs = document.querySelectorAll('input');
 for(var i=0; i < inputs.length; i++) {
  inputs[i].blur();
 }
};

window.onblur = function () {
    document.activeElement.blur();
};


$(document).ready(function () {
    'use strict';
    sliderDots();

    $(".mb_projectPage_sortBg").on('touchstart click', function () {
        $(this).fadeOut();
    });
    $(".mb_projectPage_sortPanel").on('touchstart click', function (e) {
        e.stopPropagation();
    });
    tableInit();
    loadAnnualInfo();

//
//    $('body').click(function () {
//    document.activeElement.blur();
//    });
//
//    $('input').click(function (event) {
//        event.stopPropagation();
//    });
//
});

$(document).on('touchstart click', '#mb_introPage_cubeBtn', function(){
    'use strict';
    goTo($(".mb_introPage"), $(".mb_helpPage"), false);
    carouselDataLoad();
});


$(".mb_helpPage_btn").click(function () {
    'use strict';
    goTo($(".mb_helpPage"), $(".mb_filterMainPage"), false);
    insertSortButton();
});

$(".mb_caoursel5_btn").click(function () {
    'use strict';
    goTo($(".mb_helpPage"), $(".mb_filterMainPage"), false);
    insertSortButton();
});

$(".mb_introPage_InitiativeBtn").click(function () {
    'use strict';
    goTo($(".mb_introPage"), $(".mb_filterMainPage"), false);
    insertSortButton();
});


function dataRowCount(){
    'use_strict';

//    console.log($('.dataTable').DataTable().page.info().page);
    $(".mb_projectPage_dataCount").text('(' + $('.dataTable').DataTable().page.info().recordsDisplay + ')');
}


function filterAndCount() {

    $('.dataTable').DataTable().column(4).search(
          filter_stage.join('|'),
          true,
          false,
          true
    ).draw();

    $('.dataTable').DataTable().column(5).search(
          filter_asset.join('|'),
          true,
          false,
          true
    ).draw();

    $('.dataTable').DataTable().column(6).search(
          filter_region.join('|'),
          true,
          false,
          true
    ).draw();

    dataRowCount();
}

$(".mb_filterPage_done_btn").click(function () {
    'use strict';
    $(".mb_projectPage").css({left: "0"}).show();
    $(".mb_filterPage").css({
        "z-index": "0",
        "clipPath": "circle(0px at 70px 60px)",
        "-webkit-clip-path":" circle(0px at 70px 60px)",
        "transition": "0.5s",
        "-webkit-transition": "0.5s"

    },function() {
        $(this).hide(100);
    });
    filterAndCount();
});


$(".mb_filterPage_top img").click(function () {
    'use strict';
    goTo($(".mb_filterMainPage"), $(".mb_projectPage"), false);
    filterAndCount();
});

$(".mb_projectPage_filter_btn").click(function () {
    'use strict';
    $(".mb_filterPage").show().delay(100).queue(function () {
        $(this).css({
        "clipPath": "circle(1900px at 70px 60px)",
        "-webkit-clip-path":" circle(1900px at 70px 60px)",
        "transition": "0.5s",
        "-webkit-transition": "0.5s",
        "zIndex": "20",
        "display": "block"
    }).dequeue();
    filterSliderFinder(0);
    });
});


$(".mb_projectPage_home_btn").click(function () {
    'use strict';
    location.reload();
});


var $first = $('li:first', 'ul'),
    $last = $('li:last', 'ul');

function nextSlider() {
    'use strict';
    var $next, $selected = $(".selected");

//    $next = $selected.next('li').length ? $selected.next('li') : $first; // GO TO FIRST
    $next = $selected.next('li').length ? $selected.next('li') : $last;
    $selected.removeClass("selected");
    $next.addClass('selected');
    sliderFinder($next.index());

}

function prevSlider() {
    'use strict';
    var $prev, $selected = $(".selected");

//    $prev = $selected.prev('li').length ? $selected.prev('li') : $last; // GO TO LAST
    $prev = $selected.prev('li').length ? $selected.prev('li'): $first;
    $selected.removeClass("selected");
    $prev.addClass('selected');
    sliderFinder($prev.index());
}

$(".carousel_btn_right button").on('touch click', function () {
    'use strict';
    nextSlider();
});

$(".carousel_btn_left button").on('touch click', function () {
    'use strict';
    prevSlider();
});



//
var $first2 = $('li:first', '.mb_filterPage_carouselButtons'),
    $last2 = $('li:last', '.mb_filterPage_carouselButtons');

function nextSlider2() {
    'use strict';
    var $next, $selected = $(".selected");
    $next = $selected.next('.mb_filterPage_carouselButtons li').length ? $selected.next('.mb_filterPage_carouselButtons li') : $last2;

//    $selected.removeClass("selected");
//    $next.addClass("selected");
    filterSliderFinder($next.index());
}

function prevSlider2() {
    'use strict';
    var $prev, $selected = $(".selected");
    $prev = $selected.prev('.mb_filterPage_carouselButtons li').length ? $selected.prev('.mb_filterPage_carouselButtons li'): $first2;
//    $selected.removeClass("selected");
//    $prev.addClass("selected");
    filterSliderFinder($prev.index());
}


$(function () {
    'use strict';
    //Enable swiping...
    $(".swipeArea").swipe({swipeLeft: nextSlider, swipeRight: prevSlider, allowPageScroll: "vertical"});
    $(".mb_filterPage").swipe({swipeLeft: nextSlider2, swipeRight: prevSlider2, allowPageScroll: "vertical"});
    $('.mb_caoursel5_btn').swipe({swipeRight: prevSlider, allowPageScroll: "vertical"});
    // $(".mb_projectInfoPage_data").swipe({allowPageScroll:"vertical"});
});


$("#fp_btn1").click(function () {
    'use strict';
    $(".mb_filterPage").show().delay(500).css({
        clipPath: "circle(0px at 50% 60%)",
        "transition": "0.5s",
        "-webkit-transition": "0.5s"
    }).queue(function () {
        $(this).css({
            "clipPath": "circle(1900px at 70px 60px)",
            "-webkit-clip-path": "circle(1900px at 70px 60px)",
            "transition": "0.5s",
            "-webkit-transition": "0.5s"
        }).dequeue();
        $(".mb_filterMainPage").fadeOut();
    });
    filterPhasePage();
});
$("#fp_btn2").click(function () {
    'use strict';
    $(".mb_filterPage").show().delay(500).css({
        clipPath: "circle(0px at 50% 65%)",
        "transition": "0.5s",
        "-webkit-transition": "0.5s"
    }).queue(function () {
        $(this).css({
            "clipPath": "circle(1900px at 70px 60px)",
            "-webkit-clip-path": "circle(1900px at 70px 60px)",
            "transition": "0.5s",
            "-webkit-transition": "0.5s"
        }).dequeue();
        $(".mb_filterMainPage").fadeOut();
    });
    filterAssetPage();
});
$("#fp_btn3").click(function () {
    'use strict';
    $(".mb_filterPage").show().delay(500).css({
        clipPath: "circle(0px at 50% 70%)",
        "transition": "0.5s",
        "-webkit-transition": "0.5s"
    }).queue(function () {
        $(this).css({
            "clipPath": "circle(1900px at 70px 60px)",
            "-webkit-clip-path": "circle(1900px at 70px 60px)",
            "transition": "0.5s",
            "-webkit-transition": "0.5s"
        }).dequeue();
        $(".mb_filterMainPage").fadeOut();
    });
    filterRegionPage();
});







$(".mb_filterPage_clear_btn").click(function () {
    'use strict';
//    if (filterSliderBool === 0) {
        $(".mb_filterPage_slide1 .ul_1 li").siblings().children('button').removeClass("selected");
        $(".mb_filterPage_slide1 .ul_2 li").siblings().children('button').removeClass("selected");
//    }
//    if (filterSliderBool === 1) {
        $(".mb_filterPage_slide2 ul li").siblings().children('button').removeClass("selected");
//    }
//    if (filterSliderBool === 2) {
        $(".mb_filterPage_slide3 ul li").siblings().children('button').removeClass("selected");
//    }
    filterCounter();
});


$(".mb_filterPage_phase_btn").click(function () {
    'use strict';
    filterSliderFinder(0);
});
$(".mb_filterPage_assetclasses_btn").click(function () {
    'use strict';
    filterSliderFinder(1);
});
$(".mb_filterPage_regions_btn").click(function () {
    'use strict';
    filterSliderFinder(2);
});


function loadProjectInfo(id, stageName) {

    'use strict';

    // console.log(id);
    // console.log(stageName);

    var jsonData;

    $.when(
        $.ajaxSetup({beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        }}),
        // $.getJSON(jsonUrlFormatter(url2), function (data) {
        $.getJSON(url2_temp, function (data) {
            jsonData = data;
        })
    ).then(function () {
        // MAIN STUFF
        $(".pI_subTestDiv").css({'height':'70px'});
        $(".mb_projectInfoPage_data").css({'top':'0px'});
//        $(".pI_header").text(jsonData[id].Header);
        $(".pI_proposalHeader").removeClass("hideShadow");
        if(stageName.toUpperCase() == 'Delivery'.toUpperCase())
        {
            $(".mb_projectInfoPage_data_top").show();
            $(".pI_bottom").show();
            $(".pI_webInfo").show();
            $(".pI_stateFund").show();
            $(".pI_sipStatus").hide();
            $(".pI_pipelineSource").hide();
            $(".pI_currentStage2").hide();
            $(".pI_valueRange").hide();
            $(".pI_proposalHeader").show();

            $(".pI_proposalHeader h3").text("Project information");
            $(".pI_subHeader").text(jsonData[id].SubHeader);
            $(".pI_tag").text(jsonData[id].TagHeader);
            $(".pI_capitalType span").text(jsonData[id].CapitalType);
            $(".pI_contractType span").text(jsonData[id].ContractType);
            $(".pI_estmDate span").text(jsonData[id].EstmDate);
            $(".pI_currentStatus span").text(jsonData[id].ReportStatusNameProject);
            $(".pI_currentStage span").text(firstLetterCaps(jsonData[id].CurrentStage));
            $(".pI_nextMilestone span").text(jsonData[id].NextMileStoneName);
            $(".pI_startDate span").text(jsonData[id].NextMileStoneStartDate);
            $(".pI_endDate span").text(jsonData[id].NextMileStoneEndDate);
            $(".pI_budget span").text(formatValue(jsonData[id].Budget));
            $(".pI_estmCost span").text(formatValue(jsonData[id].TotalCost));
            $(".pI_postFunding span").text(formatValue(jsonData[id].PostFunding));
            $(".pI_fundContributors span").text(jsonData[id].FundingContributors);


            // $("").text(jsonData[id].RegionImg);
            $(".pI_regionName span").text(jsonData[id].RegionName);
            // $(".pI_regionImg").attr('src', jsonData[id].RegionImg);
            // $(".pI_regionImg").attr('src',setImage(jsonData[id].RegionName));
            if(setImage(jsonData[id].RegionName) != '')
            {
                $(".pI_regionImg").show();
                $(".pI_regionImg").attr('src',setImage(jsonData[id].RegionName));
            }
            else
            {
                $(".pI_regionImg").hide();
            }

            $(".pI_assetImg").attr('src',setImageAsset(jsonData[id].AssetClass));
            // $(".pI_assetImg").attr('src', jsonData[id].AssetClassImg);
            $(".pI_assetName").text(jsonData[id].AssetClass);
            $(".pI_leadAgency span").text(jsonData[id].LeadAgency);
            $(".pI_leadAgency").css({'padding-bottom':'0px'});
            $(".pI_stateFund span").text(jsonData[id].StateFund);
            // $(".pI_website").html('<a target="_blank" href="' + jsonData[id].Website + '">' + jsonData[id].Website + '</a>');
            var websitesList = [];
            $.each(jsonData[id].Website, function(index,value) {
                websitesList.push('<a target="_blank" href="' +value+'">'+ value+'</a><br>');
            })
        }
        else {
            $(".mb_projectInfoPage_data_top").hide();
            $(".pI_bottom").hide();
            $(".pI_webInfo").hide();
            $(".pI_stateFund").hide();
            $(".pI_sipStatus").show();
            $(".pI_pipelineSource").show();
            $(".pI_currentStage2").show();
            $(".pI_valueRange").hide();
            $(".pI_proposalHeader").show();

            $(".pI_subHeader").text(jsonData[id].SubHeader);
            $(".pI_tag").text(jsonData[id].TagHeader);

            $(".pI_sipStatus div").text(jsonData[id].SIPStatus);

                // $("").text(jsonData[id].RegionImg);
            $(".pI_regionName span").text(jsonData[id].RegionName);
            // $(".pI_regionImg").attr('src', jsonData[id].RegionImg);
            // $(".pI_regionImg").attr('src',setImage(jsonData[id].RegionName));
            if(setImage(jsonData[id].RegionName) != '')
            {
                $(".pI_regionImg").show();
                $(".pI_regionImg").attr('src',setImage(jsonData[id].RegionName));
            }
            else
            {
                $(".pI_regionImg").hide();
            }
            $(".pI_assetImg").attr('src',setImageAsset(jsonData[id].AssetClass));
            // $(".pI_assetImg").attr('src', jsonData[id].AssetClassImg);
            $(".pI_assetName").text(jsonData[id].AssetClass);

            // $(".pI_pipelineSource span").text(jsonData[id].PipelineSource);
            // $(".pI_pipeLineSource span").text(pipelinesourceText);
            var pipelinesourceText = [];
            $.each(jsonData[id].PipelineSource, function(index, value) {
                pipelinesourceText.push('<a target="_blank" href="' +jsonData[id].PipelineSource[index].Value+'">'+ jsonData[id].PipelineSource[index].Key+'</a><br>');
            });

            if(jsonData[id].CurrentStage.toUpperCase() == "PLANNING".toUpperCase()){
                $(".pI_currentStage2 span").text(firstLetterCaps(jsonData[id].CurrentStage) +':'+jsonData[id].SubStage);
                if(jsonData[id].OpportunityFlag == true) {
                    $(".pI_proposalHeader h3").text("Future opportunity");
                }
                else {
                    $(".pI_proposalHeader h3").text("Proposal raised through consultation");
                }
            }
            else
            {
                $(".pI_currentStage2 span").text(firstLetterCaps(jsonData[id].CurrentStage));
            }
            // $(".pI_valueRange span").text(jsonData[id].ValueRange);
            $(".pI_leadAgency span").text(jsonData[id].LeadAgency);
            $(".pI_leadAgency").css({'padding-bottom':'200px'});


            // $(".pI_stateFund span").text(jsonData[id].StateFund);
        }

        subHeaderClickedBool = false;

    });

}

$(".pI_subTestDiv").on('click', function () {

    var sub_header_height = $(".pI_subHeader").outerHeight() + $(".pI_tag").outerHeight() + 30;
    if(sub_header_height > 70 && subHeaderClickedBool === false)
    {
        var height_difference = sub_header_height - 70;

        $(".pI_subTestDiv").animate({'height': sub_header_height + 'px'});
        $(".mb_projectInfoPage_data").animate({'top':height_difference + 'px'});
        subHeaderClickedBool = true;
    }
    else{
        $(".pI_subTestDiv").animate({'height':'70px'});
        $(".mb_projectInfoPage_data").animate({'top':'0px'});
        subHeaderClickedBool = false;
    }
});

function setImage(name) {
    switch(name) {
        case 'Cairns':
            return "images/Cairns_edit.svg";
            break;
        case 'Toowoomba':
            return "images/Toowoomba_edit.svg";
            break;
        case 'Mackay':
            return "images/Mackay_edit.svg";
            break;
        case 'Fitzroy':
            return "images/Fitzroy_edit.svg";
            break;
        case 'Wide Bay':
            return "images/Wide Bay_edit.svg";
            break;
        case 'Sunshine Coast':
            return "images/Sunshine Coast_edit.svg";
            break;
        case 'Greater Brisbane':
            return "images/Greater Brisbane_edit.svg";
            break;
        case 'Gold Coast':
            return "images/GoldCoast_edit.svg";
            break;
        case 'Darling Downs':
            return "images/DarlingDowns_edit.svg";
            break;
        case 'Townsville':
            return "images/TownsVille_edit.svg";
            break;
        case 'Remote Queensland':
            return "images/RemoteQueensland_edit.svg";
            break;
        case 'Multi-region':
            return "images/StateWide_edit.svg";
            break;
        case 'Statewide':
            return "images/StateWide_edit.svg";
            break;
    }
}
function setImageAsset(name) {
    switch(name) {
        case 'Water':
            return "images/water.svg";
            break;
        case 'Cross-Government':
            return "images/cross.svg";
            break;
        case 'Arts, Culture and Recreation':
            return "images/arts.svg";
            break;
        case 'Digital':
            return "images/digital.svg";
            break;
        case 'Education and training':
            return "images/education.svg";
            break;
        case 'Energy':
            return "images/energy.svg";
            break;
        case 'Health':
            return "images/health.svg";
            break;
        case 'Justice and public safety':
            return "images/justice.svg";
            break;
        case 'Social Housing':
            return "images/social.svg";
            break;
        case 'Transport':
            return "images/transport.svg";
            break;
    }
}

function loadAnnualInfo(){

    var jsonData;

    $.when(
    $.ajaxSetup({
        crossDomain: true,
        beforeSend: function(xhr){
        if (xhr.overrideMimeType){
            xhr.overrideMimeType("application/json");
        }
    }
    }),
    // $.getJSON(jsonUrlFormatter(url3), function(data) {
    $.getJSON(url3_temp, function(data) {
        jsonData = data;
    })
    ).then(function() {
        // MAIN STUFF
        // console.log(jsonData);
        $.each(jsonData, function(index, value) {
            switch(jsonData[index].Key){
                case "CurrentFY":
                    $(".hlPanelHeader span").text(jsonData[index].Value);
                    break;
                case "CapitalBudget":
                    $(".capitalbudget").text(jsonData[index].Value);
                    break;
                case "JobsSupported":
                    $(".jobssupported").text(jsonData[index].Value);
                    break;
                case "TotalProjects":
                    $(".totalprojects").text(jsonData[index].Value);
                    break;
                case "TotalProgram":
                    $(".programs").text(jsonData[index].Value);
                    break;
                case "TotalGrants":
                    $(".grantss").text(jsonData[index].Value);
                    break;
            }
        });
    });
}

$(".mb_projectInfoPage_close_btn").click(function () {
    'use strict';
    $(".mb_projectInfoPage").animate({
        left: "100%"
    });
    $(".mb_projectPage").animate({
        left: "0%"
    });
    $(".application").css({
        "height": "90vh"
    });
    $(".pI_proposalHeader").addClass("hideShadow");

});


$(".sortSelectorBtn").click(function () {
    'use strict';
    sortListBy();
    $(".mb_projectPage_sortBg").fadeOut();
});
