/*global $,jQuery*/

var url1 = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectMetaData';
var url2 = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectDetailedData';
var url3 = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectYearlyDetailedData';

var url1_temp = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectMetaData_1_2018.Json';
var url2_temp = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectDetailedData_1_2018.Json';
var url3_temp = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectYearlyDetailedData_1_2018.Json';

var yearglobal = 0;
$(document).ready(function() {

  // MOBILE DETECTION
  if (detectmob()) {
    top.location.href = "mobile/index.html";
  }

  UncheckAll();
  // console.log("loader");
  jsonLoader();
  isVisible();

  $(".dataoption").val("stagelst");
});

function detectmob() {
  return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
  // if(window.innerWidth <= 800 || window.innerHeight <= 600) {
  //   return true;
  // } else {
  //   return false;
  // }
}




$("#Assets_class").click(function() {
  // console.log("AAARGH!!");
})

function initSort() {
  // console.log("HEELLOOO");
  var currentRow = $(".column1");

  $("#dataTable").tablesorter({
      // widgets: ["zebra", "filter", "print", "columnSelector"],
      headers: {
        // disable sorting of the first & second column - before we would have to had made two entries
        // note that "first-name" is a class on the span INSIDE the first column th cell
        '.overviewlst, .linelst': {
          // disable it by setting the property sorter to false
          sorter: false
        }
      }
    })
    .bind("sortEnd", function() {
      // console.log(currentRow);
      currentRow.siblings().children().children().removeAttr('class');
      currentRow.siblings().children().children().addClass('sortbtn');

      if (currentRow.hasClass('tablesorter-headerAsc')) {
        currentRow.children().children().removeAttr('class');
        currentRow.children().children().addClass('sortbtnAsc');
      }
      if (currentRow.hasClass('tablesorter-headerDesc')) {
        currentRow.children().children().removeAttr('class');
        currentRow.children().children().addClass('sortbtnDesc');
      }
    });
}

/////////////////// ASSET BUTTONS TOGGLE  OPTION//////////////////////
var assetArray = [];
var regionArray = [];
var stageArray = [];
var stageValue = '';
var slideIndex = 1;
var headerType = 0;


$('.btn').click(function() {
  $(this).toggleClass('active');
  $(this).next('label').toggleClass('active');
  // $('#hidden1', this).toggle(); // p00f
  // $('#hidden2', this).toggle(); // p00f
  if ($(this).hasClass('active')) {
    var idVal = $(this).val();
    // console.log(idVal);
    $('tbody tr').each(function() {
      if ($(this).text().toLowerCase().indexOf(idVal.toLowerCase()) > -1) {
        $(this).addClass('active');
      }
    });
  } else {
    var idVal = $(this).val();
    $('tbody tr').each(function() {
      if ($(this).text().toLowerCase().indexOf(idVal.toLowerCase()) > -1) {
        $(this).removeClass('active');
      }
    });
  }

  updateAssetArray();
  filterFunction(true);
});

function updateAssetArray() {
  assetArray = [];
  $(".dropdown-asset ul").empty();
  $(".btnColumn > li").each(function() {
    if ($(this).children("button").hasClass('active')) {
      var idVal = $(this).children("button").prop("value");
      if ($.inArray(idVal, assetArray) == -1) {
        assetArray.push(idVal);
      }
    }
  });
}


////////////// REGION CHECKBOX STYLING ////////////////////////

$('.regionCheckBox').change(function() {
  if ($(this).is(':checked')) {
    $(this).parent().addClass('highlight');

    var idVal = $(this).parent().children("label").text();
    if (idVal === 'Greater Brisbane') {
      idVal = 'Brisbane';
    }
    if (idVal === 'Remote Queensland') {
      idVal = 'Queensland';
    }
    $('tbody tr').each(function() {
      if ($(this).children('td')[6].innerHTML.toUpperCase().indexOf(idVal.toUpperCase()) > -1) {
        // if ($(this).text().toUpperCase().indexOf(idVal.toUpperCase()) > -1) {
        $(this).addClass('activeRegion');
      }
    });

  } else {
    $(this).parent().removeClass('highlight');
    var idVal = $(this).parent().children("label").text();
    if (idVal === 'Greater Brisbane') {
      idVal = 'Brisbane';
    }
    if (idVal === 'Remote Queensland') {
      idVal = 'Queensland';
    }
    $('tbody tr').each(function() {
      // if ($(this).text().toUpperCase().indexOf(idVal.toUpperCase()) > -1) {
      if ($(this).children('td')[6].innerHTML.toUpperCase().indexOf(idVal.toUpperCase()) > -1) {
        $(this).removeClass('activeRegion');
      }
    });
  }
  updateRegionArray();
  filterFunction(true);
});

function updateRegionArray() {
  regionArray = [];
  $(".dropdown-region ul").empty();
  $(".regionList > li").each(function() {
    // console.log($(this).);
    //.children("label")
    if ($(this).children("input:checkbox:checked").length > 0) {
      var idVal = $(this).children("label").text();
      if ($.inArray(idVal, regionArray) == -1) {
        regionArray.push(idVal);
      }
    }
    // else{
    //     if($(this).children("input:checkbox:checked").length == 0) {
    //         $()
    //     }
    // }
  });
  // console.log(regionArray);
}

var activeFilters = [];
////////////////////// STAGE BUTTON/////////////////////////////

function updateStage() {
  stageArray = [];
  var idVal = stageValue.toUpperCase();
  // console.log(idVal);
  $('tbody tr').each(function() {
    // GET STAGE COLUMN AND CHECK IF ITS PARENT WILL BE ACTIVE OR NOT
    if ((stageValue != '') && ($(this).children('td')[4].innerHTML.toUpperCase().indexOf(idVal.toUpperCase()) > -1)) {
      // if ((stageValue != '') && ($(this).text().toUpperCase().indexOf(idVal.toUpperCase()) > -1)) {
      $(this).addClass('activeStage');
      stageArray.push($(this));
    } else {
      // console.log("INHERE");
      $(this).removeClass('activeStage');
      // $(this).addClass('displayNone');
    }
  });
  filterFunction(false);
}


///////////////// PROJECT PANEL OPEN ///////////////////////

// $(function () {
//  openProjectPanel();
//  });

var click = false;

function openProjectPanel(bubble) {
  stageValue = bubble.name;
  slideIndex = 2;
  click = true;
  if (click) {
    $(".innerProjectPanel").show();
    $(".projectListDiv").show();

    // $("#projectPanel").toggle('right');
    $("#projectPanel").toggle();
    $("#projectPanel").css('width', function() {
      return $(this).offset().width;
    }).animate({
      "width": "1050px",
      "left": "206px",
      "z-index": "22"
    }, "slow");

    // $("#projectHeader").css('width', function(){
    //  return $(this).offset().width;
    // }).animate({"width":"1050px","left":"206px"}, "slow");
    $(".h_projectlst div").html("<div class='sortbtn'></div>PROJECTS");
    // $(".h_valuelst").text('VALUE');
    $(".h_valuelst div").html("<div class='sortbtn'></div>VALUE");
    $("#canvasContainer").css('overflow-y', 'hidden');

    click = false;
    $(".closeProject").show();
    // $("#dummyDiv").show();
    $(".heading h5").fadeOut();
    $("#projectHeader").fadeIn();
    $("#projectHeader span").show();
    headerType = 1;

    updateStage();
  }
}

function openProposalPanel(bubble) {
  stageValue = bubble.name;
  slideIndex = 2;
  // console.log(stageValue);
  click = true;
  if (click) {
    $(".innerProjectPanel").show();
    $(".projectListDiv").show();

    $("#projectPanel").toggle();
    $("#projectPanel").css('width', function() {
      return $(this).offset().width;
    }).animate({
      "width": "1050px",
      "left": "206px"
    }, "slow");


    // console.log($(".h_valuelst").text());
    // $(".h_projectlst div span").text('PROPOSALS');
    $(".h_projectlst div").html("<div class='sortbtn'></div>PROPOSALS");
    // $(".h_valuelst").text('TYPE');
    $(".h_valuelst div").html("<div class='sortbtn'></div>TYPE");
    $("#canvasContainer").css('overflow-y', 'hidden');

    click = false;
    $(".closeProject").show();
    // $("#dummyDiv").show();
    $(".heading h5").fadeOut();
    $("#proposalHeader").fadeIn();
    headerType = 2;
    updateStage();
  }
}


$(function() {
  click = true;
  $(".projects").click(function() {
    // debugger
    if (click) {

      $(".innerProjectPanel").show();
      $(".projectListDiv").show();

      $("#projectPanel").toggle();
      $("#projectPanel").css('width', function() {
        return $(this).offset().width;
      }).animate({
        "width": "1050px",
        "left": "206px"
      }, "slow");
      // debugger

      // $(".h_projectlst div span").text('PROJECTS');
      $(".h_projectlst div").html("<div class='sortbtn'></div>PROJECTS / PROPOSALS");
      // $(".h_valuelst").text('VALUE');
      $(".h_valuelst div").html("<div class='sortbtn'></div>VALUE / TYPE");

      $("#canvasContainer").css('overflow-y', 'hidden');

      click = false;
      $(".closeProject").show();
      // $("#dummyDiv").show();
      $(".heading h5").fadeOut();
      $("#projectHeader").fadeIn();
      $("#projectHeader span").hide();
      headerType = 1;
    }
  });
  $(".closeProject").click(function() {
    slideIndex = 1;
    if (!click) {

      $("#projectPanel").css('width', function() {
        return $(this).offset().width;
      }).animate({
        "width": "0px",
        "left": "1256px"
      }, "slow", function() {
        $(this).toggle();
        $("#canvasContainer").css('overflow-y', 'scroll');
        click = true;
        $(".closeProject").hide();
        // $("#dummyDiv").hide  ();
        $(".innerProjectPanel").hide();
        $(".projectListDiv").hide();
        $(".heading h5").fadeIn();
        $("#projectHeader").fadeOut();
        $("#proposalHeader").fadeOut();

        $(".overviewlst").show();
        $(".valuelst").show();
        $(".stagelst").show();
        $(".assetclasslst").show();
        $(".regionlst").show();

        $(".h_overviewlst").show();
        $(".h_valuelst").show();
        $(".h_stagelst").show();
        $(".h_assetclasslst").show();
        $(".h_regionlst").show();

        $("#search").css({
          'width': '500px'
        });
        $("#search").removeClass("green");

        $(".innerProjectPanel").css({
          'width': '50%',
          'margin': 'auto'
        });
        $(".dataTable").css({
          'width': '1050px',
          'color': '#000',
          'left': '0'
        });
        $(".mainPanel").css({
          'width': '1050px'
        });
        $(".linelst").css({
          'border-left': 'solid 1px #797979'
        });
        $(".circle").css({
          'background': '#797979'
        });

        $(".backBtn").hide();
        $(".projectTableBackground").fadeOut();
        $(".projectInfo").fadeOut();
        // $("#projectHeader").fadeIn();

        $('.dataTable tbody tr').each(function() {
          $(this).siblings().removeClass('selected');
          $(this).removeClass('pI_unselected');
        });

        $("#search").val('');

      });

      stageValue = '';
      stageArray = [];
      headerType = 0;
      updateStage();
    }
  });
});



/////////////////////////////////// GET COUNT////////////////////////

function getStageCount(currentTag) {
  // console.log(currentTag.children(".stagelst").text());
  var stageString = currentTag.children(".stagelst").text().toUpperCase();
  if (stageString.indexOf('Concept'.toUpperCase()) >= 0) {
    conceptCount += 1;
  } else {
    if (stageString.indexOf('Strategic Assessment'.toUpperCase()) >= 0) {
      strategicCount += 1;
    } else {
      if (stageString.indexOf('Preliminary Evaluation'.toUpperCase()) >= 0) {
        preliminaryCount += 1;
      } else {
        if (stageString.indexOf('Business Case'.toUpperCase()) >= 0) {
          businessCount += 1;
        } else {
          if (stageString.indexOf('Investment Decision'.toUpperCase()) >= 0) {
            investmentCount += 1;
          } else {
            if (stageString.indexOf('Delivery'.toUpperCase()) >= 0) {
              deliveryCount += 1;
            }
          }
        }
      }
    }
  }
  // switch(currentTag.children(".stagelst").text().toUpperCase()){
  //     case 'Concept'.toUpperCase():
  //         conceptCount +=1;
  //         break;
  //     case 'Strategic Assessment'.toUpperCase():
  //         strategicCount +=1;
  //         break;
  //     case 'Preliminary Evaluation'.toUpperCase():
  //         preliminaryCount +=1;
  //         break;
  //     case 'Business Case'.toUpperCase():
  //         businessCount +=1;
  //         break;
  //     case 'Investment Decision'.toUpperCase():
  //         investmentCount +=1;
  //         break;
  //     case 'Delivery'.toUpperCase():
  //         deliveryCount +=1;
  //         break;
  // }// switch
  // }
}

//////////////////////////// FILTER TEXT ///////////////////////////////
$('#search').on('keypress keyup', function() {
  var value = $(this).val().toLowerCase();
  // console.log(value);
  filterActive();
  $('tbody tr').each(function() {

    // if($(this).text().toLowerCase().indexOf(value) > -1)
    // {

    if ((activeFilters.length == 0) && ($(this).text().toLowerCase().indexOf(value) > -1)) {
      $(this).removeClass('displayNone');
    } else {
      if (activeFilters.length == 1) {
        if ($(this).hasClass(activeFilters[0]) && ($(this).text().toLowerCase().indexOf(value) > -1)) {
          $(this).removeClass('displayNone');
        } else {
          $(this).addClass('displayNone');
        }
      } else {
        if (activeFilters.length == 2) {
          if (($(this).hasClass(activeFilters[0])) && ($(this).hasClass(activeFilters[1])) && ($(this).text().toLowerCase().indexOf(value) > -1)) {
            $(this).removeClass('displayNone');
          } else {
            $(this).addClass('displayNone');
          }
        } else {
          if (activeFilters.length == 3) {
            if (($(this).hasClass(activeFilters[0])) && ($(this).hasClass(activeFilters[1])) && ($(this).hasClass(activeFilters[2])) && ($(this).text().toLowerCase().indexOf(value) > -1)) {
              $(this).removeClass('displayNone');
            } else {
              $(this).addClass('displayNone');
            }
          } else {
            $(this).addClass('displayNone');
          }
        }
      }
    }
    // }
  });
});





function filterActive() {
  activeFilters = [];

  $('tbody tr').each(function() {
    if ($(this).hasClass('active')) {
      // console.log("ACTIVE");
      if (activeFilters.indexOf("active") == -1) {
        activeFilters.push('active');
      }
    }
    if ($(this).hasClass('activeRegion')) {
      // console.log("ACTIVE1")
      if (activeFilters.indexOf("activeRegion") == -1) {
        activeFilters.push('activeRegion');
      }
    }
    if ($(this).hasClass('activeStage') || stageValue != '') {
      // console.log("ACTIVE2")
      if (activeFilters.indexOf("activeStage") == -1) {
        activeFilters.push('activeStage');
      }
    }

  });

  // console.log(activeFilters.length);
}


function filterFunction(stageUpdate) {
  filterActive();
  // console.log(activeFilters.length);

  conceptCount = 0;
  strategicCount = 0;
  preliminaryCount = 0;
  businessCount = 0;
  investmentCount = 0;
  deliveryCount = 0;

  $('tbody tr').each(function() {

    if (activeFilters.length == 0 && (regionArray.length != 0 || assetArray.length != 0)) {
      $(this).addClass('displayNone');
    } else {
      if (activeFilters.length == 0) {
        $(this).removeClass('displayNone');
        getStageCount($(this));
      }
    }
    if (activeFilters.length == 1) {
      if ($(this).hasClass(activeFilters[0])) {
        $(this).removeClass('displayNone');
        getStageCount($(this));
      } else {
        $(this).addClass('displayNone');
      }
    }
    if (activeFilters.length == 2) {
      if (($(this).hasClass(activeFilters[0])) && ($(this).hasClass(activeFilters[1]))) {
        $(this).removeClass('displayNone');
        getStageCount($(this));
      } else {
        $(this).addClass('displayNone');
      }
    }
    if (activeFilters.length == 3) {
      if (($(this).hasClass(activeFilters[0])) && ($(this).hasClass(activeFilters[1])) && ($(this).hasClass(activeFilters[2]))) {
        $(this).removeClass('displayNone');
        getStageCount($(this));
      } else {
        $(this).addClass('displayNone');
      }
    }

  });
  if (stageUpdate == true) {
    updateText();
  }
}
///////////// HEADER HOVER DROPDOWN ///////////////////////
$('.assetDropdown').hover(function() {
  // $(".dropdown-asset").toggle();
  $(".dropdown-asset").slideToggle("slow", function() {});
});

$('.regionDropdown').hover(function() {
  // $(".dropdown-region").toggle();
  $(".dropdown-region").slideToggle("slow", function() {});
});

//////////////////////// UNCHECH CHECK BOX /////////////////////////
function UncheckAll() {
  $(".regionList > li").each(function() {
    $(this).children("input").prop('checked', false);
  });
}
//////////////////////////// JSON DATA ////////////////////////////////////

var conceptCount = 0,
  strategicCount = 0,
  preliminaryCount = 0,
  businessCount = 0,
  investmentCount = 0,
  deliveryCount = 0;
var regionCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var assetCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function getRegionCount(region_name) {
  switch (region_name) {
    case 'Cairns':
      regionCount[0] += 1;
      break;
    case 'Toowoomba':
      regionCount[1] += 1;
      break;
    case 'Mackay':
      regionCount[2] += 1;
      break;
    case 'Fitzroy':
      regionCount[3] += 1;
      break;
    case 'Wide Bay':
      regionCount[4] += 1;
      break;
    case 'Sunshine Coast':
      regionCount[5] += 1;
      break;
    case 'Greater Brisbane':
      regionCount[6] += 1;
      break;
    case 'Gold Coast':
      regionCount[7] += 1;
      break;
    case 'Townsville':
      regionCount[8] += 1;
      break;
    case 'Darling Downs':
      regionCount[9] += 1;
      break;
    case 'Remote Queensland':
      regionCount[10] += 1;
      break;
    case 'Multi-region':
      regionCount[11] += 1;
      break;
    case 'Statewide':
      regionCount[12] += 1;
      break;
  }
}

function getAssetCount(asset_name) {
  switch (asset_name) {
    case 'Cross-Government':
      assetCount[0] += 1;
      break;
    case 'Transport':
      assetCount[1] += 1;
      break;
    case 'Energy':
      assetCount[2] += 1;
      break;
    case 'Water':
      assetCount[3] += 1;
      break;
    case 'Health':
      assetCount[4] += 1;
      break;
    case 'Education and Training':
      assetCount[5] += 1;
      break;
    case 'Digital':
      assetCount[6] += 1;
      break;
    case 'Justice and public safety':
      assetCount[7] += 1;
      break;
    case 'Arts, culture and recreation':
      assetCount[8] += 1;
      break;
    case 'Social Housing':
      assetCount[9] += 1;
      break;
  }
}


function getCount(stage) {
  // console.log(conceptCount);
  switch (stage) {
    case 'Concept'.toUpperCase():
      conceptCount += 1;
      break;
    case 'Strategic Assessment'.toUpperCase():
      strategicCount += 1;
      break;
    case 'Preliminary Evaluation'.toUpperCase():
      preliminaryCount += 1;
      break;
    case 'Business Case'.toUpperCase():
      businessCount += 1;
      break;
    case 'Investment Decision'.toUpperCase():
      investmentCount += 1;
      break;
    case 'Delivery'.toUpperCase():
      deliveryCount += 1;
      break;
  } // switch
}

function formatValue(value) {
  if (value == 0 || value == null) {
    return '$' + 0;
  } else {
    //   if(value > 999 && value <= 999999){
    //       return '$'+(value/1000).toFixed(2) + 'K';
    //   }
    //   else {
    // if(value > 999999 && value <= 999999999) {
    return '$' + (value / 1000000).toFixed(2) + 'M';
    // }
    //    		else {
    //                if(value > 999999999){
    //                    return '$'+(value/1000000000000).toFixed(2) + 'B';
    //                }
    //                else{
    //                    return '$'+value;
    //                }
    //    		}
    //        }
  }
}

function jsonUrlFormatter(url) {
  var date = new Date();
  url = url + '_' + (date.getMonth() + 1).toString() + '_' + date.getFullYear().toString() + '.Json';
  return url;
}

function firstLetterCaps(string_data) {
  return string_data.charAt(0).toUpperCase() + string_data.substr(1).toLowerCase();
}

var g_data;

function jsonLoader() {
  regionCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  assetCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var jsonData;

  // console.log();
  $.when(
    $.ajaxSetup({
      crossDomain: true,
      beforeSend: function(xhr) {
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("application/json");
        }
      }
    }),
    // $.getJSON(jsonUrlFormatter(url1), function(data) {
    $.getJSON(url1_temp, function(data) {
      jsonData = data;
      g_data = data;
    })
  ).then(function() {
    // MAIN STUFF
    // console.log(jsonData);
    var items = [];
    $.each(jsonData, function(key, val) {
      // console.log("KEY:"+key+" VALUE:"+val["Next Milestone"]);
      var dataValue = val.ProjectId + ',' + val.Stage;
      if (val.Stage == "Strategic Assessment") {
        dataValue = val.ProjectId + ',StrategicAssessment';
      }
      items.push("<tr class='pp_unselected' data-value=" + dataValue + ">");
      items.push("<td class='overviewlst'></td>");
      items.push("<td class='linelst'>" + "<div class='circle'></div>" + "</td>");
      items.push("<td class='projectlst'>" + val.Project + "</td>");
      // items.push("<td class='valuelst'>"+formatValue(val.Value)+"</td>");
      if (val.Stage.toUpperCase() == 'Planning'.toUpperCase()) {
        // if(val.OpportunityFlag == true) {
        items.push("<td class='valuelst'>" + val.OpportunityFlag + "</td>");
        // }
        // else
        // {
        //     items.push("<td class='valuelst'>"+"Consultation"+"</td>");
        // }
        items.push("<td class='stagelst'>" + firstLetterCaps(val.Stage) + " - " + firstLetterCaps(val.SubStage) + "</td>");
        getCount(val.SubStage);
      } else {
        items.push("<td class='valuelst'>" + formatValue(val.Value) + "</td>");
        if (val.Stage.toUpperCase() == 'Delivery'.toUpperCase()) {
          items.push("<td class='stagelst'>" + firstLetterCaps(val.Stage) + " - " + firstLetterCaps(val.SubStage) + "</td>");
        } else {
          items.push("<td class='stagelst'>" + firstLetterCaps(val.Stage) + "</td>");
        }
        getCount(val.Stage);
      }
      // console.log(val.Stage);
      items.push("<td class='assetclasslst'>" + val.AssetClass + "</td>");
      items.push("<td class='regionlst'>" + val.Region + "</td>");
      items.push("<td>NA</td>");
      items.push("<td>NA</td>");
      items.push("</tr>");

      getRegionCount(val.Region);
      getAssetCount(val.AssetClass);


    });

    $('<tbody/>', {
      html: items.join("")
    }).appendTo($(".dataTable"));
    $('.stagelst').show();
    $('.valuelst').show();
    $('.regionlst').show();
    $('.assetclasslst').show();

    $("#dataTable").trigger("update");
    initSort();
  });


}
/////////////////////////////////////////////////////////////////////////
$(".dataoption").on('change', function() {
  $('.stagelst').hide();
  $('.valuelst').hide();
  $('.capitallst').hide();
  $('.completionlst').hide();
  $('.contractlst').hide();
  $('.regionlst').hide();
  $('.milestonelst').hide();
  $('.agencylst').hide();
  $('.assetclasslst').hide();
  // console.log(this.value);
  switch (this.value) {
    case 'stagelst':
      $('.stagelst').show();
      break;
    case 'valuelst':
      $('.valuelst').show();
      break;
    case 'capitallst':
      $('.capitallst').show();
      break;
    case 'completionlst':
      $('.completionlst').show();
      break;
    case 'contractlst':
      $('.contractlst').show();
      break;
    case 'regionlst':
      $('.regionlst').show();
      break;
    case 'milestonelst':
      $('.milestonelst').show();
      break;
    case 'agencylst':
      $('.agencylst').show();
      break;
    case 'assetclasslst':
      $('.assetclasslst').show();
      break;
    default:
      $('.stagelst').show();
  }
});
/////////////////////////////// CLEAR REGION BUTTON /////////////////////
$(".regionClearBtn").click(function() {
  UncheckAll();
  $('.regionCheckBox').each(function() {
    $(this).parent().removeClass('highlight');
    $(".regionClearBtn").css("color", "#fff");

    var idVal = $(this).parent().children("label").text();
    if (idVal === 'Greater Brisbane') {
      idVal = 'Brisbane';
    }
    if (idVal === 'Remote Queensland') {
      idVal = 'Queensland';
    }
    $('tbody tr').each(function() {
      // if ($(this).text().toUpperCase().indexOf(idVal.toUpperCase()) > -1) {
      if ($(this).children('td')[6].innerHTML.toUpperCase().indexOf(idVal.toUpperCase()) > -1) {
        $(this).removeClass('activeRegion');
      }
    });
  });
  updateRegionArray();
  filterFunction(true);
});
/////////////////////////////// CLEAR REGION BUTTON /////////////////////
$(".assetClearBtn").click(function() {
  $('.btnColumn li').each(function() {
    $(this).children('button').removeClass('active');
    $(this).children('label').removeClass('active');
    // $('#hidden1',this).show();
    // $('#hidden2',this).hide();

    $(".assetClearBtn").css("color", "#fff");
    // console.log($(this).children('button').val());
    var idVal = $(this).children('button').val();
    $('tbody tr').each(function() {
      if ($(this).text().toLowerCase().indexOf(idVal.toLowerCase()) > -1) {
        $(this).removeClass('active');
      }
    });
  });
  updateAssetArray();
  filterFunction(true);
});
////////////////////////////HELP BACKGROUND////////////////////////////

$(".helpbtn").click(function() {
  $(".helpInfoBG").css('display', 'block');
  $(".helpPanel").css('display', 'block');
  showDivs(slideIndex);

});
////////////////////////////HELP BACKGROUND////////////////////////////
$(".helpInfoBG").click(function() {
  $(this).css('display', 'none');
  $(".helpPanel").css('display', 'none');
});
$(".helpPanelClose").click(function() {
  $(".helpInfoBG").css('display', 'none');
  $(".helpPanel").css('display', 'none');
});
////////////////////////HELP SLIDER///////////////////////////////////

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slides");
  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
//////////////////////////SORT TOGGLE/////////////////////////////

$('.overviewlst').unbind('click');
$('.linelst').unbind('click');

$(".column1").click(function() {
  // $(function(){

  var currentRow = $(this);

  $("#dataTable").tablesorter({
      // widgets: ["zebra", "filter", "print", "columnSelector"],
      headers: {
        // disable sorting of the first & second column - before we would have to had made two entries
        // note that "first-name" is a class on the span INSIDE the first column th cell
        '.overviewlst, .linelst': {
          // disable it by setting the property sorter to false
          sorter: false
        }
      }
    })
    .bind("sortEnd", function() {
      // console.log(currentRow);
      currentRow.siblings().children().children().removeAttr('class');
      currentRow.siblings().children().children().addClass('sortbtn');

      if (currentRow.hasClass('tablesorter-headerAsc')) {
        currentRow.children().children().removeAttr('class');
        currentRow.children().children().addClass('sortbtnAsc');
      }
      if (currentRow.hasClass('tablesorter-headerDesc')) {
        currentRow.children().children().removeAttr('class');
        currentRow.children().children().addClass('sortbtnDesc');
      }
    });



  // $(this).addClass("selected").siblings().removeClass("selected");
});

function loadProjectInfo(id, projectStage) {
  // console.log(id);
  var jsonData;


  $.when(
    $.ajaxSetup({
      crossDomain: true,
      beforeSend: function(xhr) {
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("application/json");
        }
      }
    }),
    // $.getJSON(jsonUrlFormatter(url2), function(data) {
    $.getJSON(url2_temp, function(data) {
      jsonData = data;
      // console.log(data);
      // console.log("AAAAA");
    })
  ).then(function() {
    // MAIN STUFF

    $(".pI_subHeader").text(jsonData[id].SubHeader);
    showMoreTag(".pI_subHeader", 100);
    if (projectStage.toUpperCase() == 'Delivery'.toUpperCase()) {
      $(".pI_sipPanel").hide();
      $(".pI_proposalDetails").hide();
      $(".pI_leftPanel").show();
      $(".pI_rightPanel").show();
      $(".pI_leadAgency").show();
      // $(".pI_stateFund").show();
      $(".pI_webInfo").show();
      $(".pI_bottom").show();


      $(".pI_header").text('Project Information'); //jsonData[id].Header
      $(".pI_tag").text(jsonData[id].TagHeader);
      showMoreTag(".pI_tag", 150);
      $(".pI_capitalType span").text(jsonData[id].CapitalType);
      $(".pI_contractType span").text(jsonData[id].ContractType);
      $(".pI_estmDate span").text(jsonData[id].EstmDate);
      $(".pI_currentStatus span").text(jsonData[id].ReportStatusNameProject);
      // $(".pI_currentStage span").text(jsonData[id].CurrentStage);
      $(".pI_currentStage span").text(firstLetterCaps(projectStage) + " - " + firstLetterCaps(jsonData[id].SubStage));
      $(".pI_nextMilestone span").text(jsonData[id].NextMileStoneName);
      $(".pI_startDate span").text(jsonData[id].NextMileStoneStartDate);
      // $(".pI_endDate span").text(jsonData[id].NextMileStoneEndDate);
      $(".pI_budget span").text(formatValue(jsonData[id].Budget));
      $(".pI_estmCost span").text(formatValue(jsonData[id].TotalCost));
      $(".pI_postFunding span").text(formatValue(jsonData[id].PostFunding));
      $(".pI_fundContributors div").text(jsonData[id].FundingContributors);

      // $("").text(jsonData[id].RegionImg);
      $(".pI_regionDetails").css({
        "margin-top": "270px",
        "position": "absolute"
      });
      $(".pI_regionName").text(jsonData[id].RegionName);
      // $(".pI_regionImg").attr('src',jsonData[id].RegionImg);
      if (setImage(jsonData[id].RegionName) != '') {
        $(".pI_regionImg").show();
        $(".pI_regionImg").attr('src', setImage(jsonData[id].RegionName));
      } else {
        $(".pI_regionImg").hide();
      }
      // $(".pI_regionImg").attr('src',setImage(jsonData[id].RegionName));
      $(".pI_assetClassDetails").css({
        "margin-top": "270px",
        "left": "620px",
        "width": "100%",
        "position": "absolute"
      });
      $(".pI_assetImg").attr('src', setImageAsset(jsonData[id].AssetClass));
      $(".pI_assetName").text(jsonData[id].AssetClass);
      $(".pI_leadAgency span").text(jsonData[id].LeadAgency);
      // $(".pI_stateFund span").text(jsonData[id].StateFund);
      // console.log(jsonData[id].Website);

      var websitesList = [];
      $.each(jsonData[id].Website, function(index, value) {
        websitesList.push('<a target="_blank" href="' + value + '">' + value + '</a><br>');
      })

      // $(".pI_website").html('<a target="_blank" href="' +jsonData[id].Website+'">'+ jsonData[id].Website+'</a>');
      if (websitesList.length > 0) {
        $(".pI_website").html(websitesList.join(" "));
      } else {
        $(".pI_website").html('TBA');
      }

    } else {
      //
      $(".pI_sipPanel").show();
      $(".pI_proposalDetails").show();
      $(".pI_leftPanel").hide();
      $(".pI_rightPanel").hide();
      $(".pI_webInfo").hide();
      $(".pI_bottom").hide();
      $(".pI_leadAgency").hide();
      // $(".pI_stateFund").hide();

      $(".pI_tag").text('');
      // if(jsonData[id].OpportunityFlag === true){
      $(".pI_header").text(jsonData[id].OpportunityFlag); //jsonData[id].Header
      // }
      // else {
      //     $(".pI_header").text('Proposal raised through consultation');//jsonData[id].Header
      // }
      $(".pI_sipStatusData").text(jsonData[id].SIPStatus);

      $(".pI_regionDetails").css({
        "margin-top": "50px",
        "position": "relative"
      });
      // $(".pI_pipeLineSource span").text(jsonData[id].PipelineSource);

      var pipelinesourceText = [];
      $.each(jsonData[id].PipelinResource, function(index, value) {
        pipelinesourceText.push('<a target="_blank" href="' + jsonData[id].PipelinResource[index].Value + '">' + jsonData[id].PipelinResource[index].Text + '</a><br>');
      });

      $(".pI_pipeLineSource div").html(pipelinesourceText.join(" "));
      if (projectStage.toUpperCase() == 'Planning'.toUpperCase()) {
        // $(".pI_currentStage2 span").text(firstLetterCaps(jsonData[id].CurrentStage)+ ' - ' + jsonData[id].SubStage);
        $(".pI_currentStage2Data").text(firstLetterCaps(jsonData[id].CurrentStage) + ' - ' + jsonData[id].SubStage);
      } else {
        // $(".pI_currentStage2 span").text(firstLetterCaps(jsonData[id].CurrentStage));
        $(".pI_currentStage2Data").text(firstLetterCaps(jsonData[id].CurrentStage));
      }
      // $(".pI_valueRange span").text(jsonData[id].ValueRange);
      $(".pI_leadAgency2 span").text(jsonData[id].LeadAgency);

      $(".pI_assetClassDetails").css({
        "margin-top": "-130px",
        "left": "620px",
        "width": "100%",
        "position": "relative"
      });
      $(".pI_regionName").text(jsonData[id].RegionName);
      // $(".pI_regionImg").attr('src',jsonData[id].RegionImg);
      if (setImage(jsonData[id].RegionName) != '') {
        $(".pI_regionImg").show();
        $(".pI_regionImg").attr('src', setImage(jsonData[id].RegionName));
      } else {
        $(".pI_regionImg").hide();
      }
      $(".pI_assetImg").attr('src', setImageAsset(jsonData[id].AssetClass));
      $(".pI_assetName").text(jsonData[id].AssetClass);

      // console.log(jsonData[id].SIPStatus);
      // console.log("PROPOSAL DETAILS");
    }

  });
  // console.log("AAAA");
}

function showMoreTag(tagToCollpase, tagLength) {
  var minimized_elements = $(tagToCollpase);

  minimized_elements.each(function() {
    var t = $(this).text();
    if (t.length < tagLength) return;
    // console.log(t.length);
    $(this).html(
      t.slice(0, tagLength) + '<span>... </span><a href="#" class="more">More</a>' +
      '<span style="display:none;">' + t.slice(tagLength, t.length) + ' <a href="#" class="less">Less</a></span>'
    );

  });

  $('a.more', minimized_elements).click(function(event) {
    event.preventDefault();
    $(this).hide().prev().hide();
    $(this).next().show();
  });

  $('a.less', minimized_elements).click(function(event) {
    event.preventDefault();
    $(this).parent().hide().prev().show().prev().show();
  });

}

function setImage(name) {
  if (name.toUpperCase().indexOf("Brisbane".toUpperCase()) >= 0) {
    name = 'Greater Brisbane';
  }
  if (name.toUpperCase().indexOf("Queensland".toUpperCase()) >= 0) {
    name = 'Remote Queensland';
  }
  switch (name) {
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
    default:
      return "images/StateWide_edit.svg";
      break;
  }
}

function setImageAsset(name) {
  // console.log(name);
  switch (name) {
    case 'Water':
      return "images/water.svg";
      break;
    case 'Cross-government':
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
    case 'Justice and Public Safety':
      return "images/justice.svg";
      break;
    case 'Social housing':
      return "images/social.svg";
      break;
    case 'Transport':
      return "images/transport.svg";
      break;
    default:
      return "";
      break;
  }
}

function loadAnnualInfo() {

  var jsonData;

  $.when(
    $.ajaxSetup({
      crossDomain: true,
      beforeSend: function(xhr) {
        if (xhr.overrideMimeType) {
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
    $.each(jsonData, function(index, value) {
      switch (jsonData[index].Key) {
        case "CurrentFY":
          $(".hlPanelHeader span").text(jsonData[index].Value);
          $(".year p").text(jsonData[index].Value);
          yearglobal = jsonData[index].Value;
          updateYearText();
          break;
        case "RegionalBudget":
          var temp = jsonData[index].Value.slice(0, -2) + "B";
          $(".regBudget span").text(temp);
          // $(".regBudget span").text(jsonData[index].Value);
          break;
        case "SEQBudget":
          var temp = jsonData[index].Value.slice(0, -2) + "B";
          $(".seqBudget span").text(temp);
          // $(".seqBudget span").text(jsonData[index].Value);
          break;
        case "CapitalBudget":
          $(".capitalbudget span").text(jsonData[index].Value);
          break;
        case "JobsSupported":
          $(".jobssupported span").text(jsonData[index].Value);
          break;
        case "TotalProjects":
          $(".totalprojects span").text(jsonData[index].Value);
          break;
        case "TotalProgram":
          $(".programs span").text(jsonData[index].Value);
          break;
        case "TotalGrants":
          $(".grants span").text(jsonData[index].Value);
          break;
      }
    });
  });
}

$(".dataTable").on('click', "tbody tr", function() {

  slideIndex = 3;

  var arrayData = $(this).data('value');
  var arr = arrayData.split(',');

  // loadProjectInfo($(this).data('value'));
  loadProjectInfo(arr[0], arr[1]);
  // debugger


  // $(this).css({"color":"#000","background-color":"#e5f5f3"});
  $(this).addClass("selected").siblings().removeClass("selected");

  $('.dataTable tbody tr').each(function() {
    $(this).addClass('pI_unselected');
  });


  $(".dataTable").animate({
    'width': '214px',
    'left': '-20px',
  });
  $(".dataTable").css({
    'color': '#fff',
    'position': 'relative'
  });
  $(".mainPanel").css({
    'width': '100%'
  });
  $(".linelst").css({
    'border-left': 'solid 1px #fff'
  });
  $(".circle").css({
    'background': '#fff'
  });

  $(".projectPanel").animate({
    'width': '1256px',
    'left': '0px'
  });
  $(".backBtn").fadeIn();

  $(".overviewlst").hide();
  $(".valuelst").hide();
  $(".stagelst").hide();
  $(".assetclasslst").hide();
  $(".regionlst").hide();

  $(".h_overviewlst").hide();
  $(".h_valuelst").hide();
  $(".h_stagelst").hide();
  $(".h_assetclasslst").hide();
  $(".h_regionlst").hide();

  $("#search").css({
    'width': '180px'
  });
  $("#search").addClass("green");

  $(".innerProjectPanel").css({
    'width': '0px',
    'margin-left': '20px'
  });
  $(".projectTableBackground").fadeIn();
  $(".projectInfo").fadeIn();

  $("#projectHeader").fadeOut();
  $("#proposalHeader").fadeOut();
  // debugger
});


$('.backBtn').click(function() {

  $(".dataTable").css({
    'color': '#000',
    'width': '1050px',
    'left': '0'
  });
  $(".mainPanel").css({
    'width': '1050px'
  });
  $(".overviewlst").show();
  $(".valuelst").show();
  $(".stagelst").show();
  $(".assetclasslst").show();
  $(".regionlst").show();

  $(".h_overviewlst").show();
  $(".h_valuelst").show();
  $(".h_stagelst").show();
  $(".h_assetclasslst").show();
  $(".h_regionlst").show();

  slideIndex = 2;
  $(".backBtn").hide();
  $(".projectTableBackground").fadeOut();
  $(".projectInfo").hide();
  if (headerType == 1) {
    $("#projectHeader").show();
  } else {
    $("#proposalHeader").show();
  }
  $('.dataTable tbody tr').removeClass('selected').removeClass('pI_unselected');

  $('.projectPanel')
    .animate({
        'left': '206px'
      },
      'slow',
      function() {
        $("#search").css({
          'width': '500px'
        });
        $("#search").removeClass("green");

        $(".innerProjectPanel").css({
          'width': '50%',
          'margin': 'auto'
        });
      }
    );


  $(".linelst").css({
    'border-left': 'solid 1px #797979'
  });
  $(".circle").css({
    'background': '#797979'
  });

});



/////////////////////////SCROLL POSITION/////////////////////////////
$("#canvasContainer").scroll(function(event) {
  var scroll = $("#canvasContainer").scrollTop();
  // console.log(scroll);
  if (scroll > 200) {
    $(".scrollIndicator").fadeOut();
    $(".scrollIndicatorUp").fadeIn();
  } else {
    $(".scrollIndicator").fadeIn();
    $(".scrollIndicatorUp").fadeOut();
  }

  // Do something
});

/////////////////////////SCROLL TO BOTTOM/////////////////////////////
$(".scrollIndicator").click(function(event) {
  $('#canvasContainer').animate({
    scrollTop: $("#canvasContainer").height()
  }, 1000);
});
$(".scrollIndicatorUp").click(function(event) {
  $('#canvasContainer').animate({
    "scrollTop": "0"
  }, 1000);
});

/////////////////////// FOOTER POSITION/////////////

function isVisible() {
  // $(function () {
  if ((".infoSection:visible").length !== 0) {
    $(".footer").css('top', '1346px');
  } else {
    $(".footer").css('top', '0px');
  }
};

///////////

function loadScene3() {
  $(".infoSection").hide(function() {
    $(".footer").css('top', '0px');
  });
  $(".helpbtn").show();
  //  loadPieChart();

  game.state.start('scene-preload');
}


$("#skip").click(function() {
  loadScene3();
});
$("#explore").click(function() {
  loadScene3();
});

function loadScene1() {
  $(".infoSection").hide(function() {
    $(".footer").css('top', '0px');
  });
  $(".scene1_Text").show();
  // game.state.start('scene1');
  game.state.start('scene-boot');
}

$("#backToStart").click(function() {
  loadScene1();
});

///////////
$("#infoImg1").on('mouseover', function() {
  $("#infoHov1").fadeIn(400);
});
$("#infoImg1").on('mouseout', function() {
  $("#infoHov1").fadeOut(400);
});

$("#infoImg2").on('mouseover', function() {
  $("#infoHov2").fadeIn(400);
});
$("#infoImg2").on('mouseout', function() {
  $("#infoHov2").fadeOut(400);
});

$("#infoImg3").on('mouseover', function() {
  $("#infoHov3").fadeIn(400);
});
$("#infoImg3").on('mouseout', function() {
  $("#infoHov3").fadeOut(400);
});

$("#infoImg4").on('mouseover', function() {
  $("#infoHov4").fadeIn(400);
});
$("#infoImg4").on('mouseout', function() {
  $("#infoHov4").fadeOut(400);
});

///FLOAT PANEL DROP


var floatOpen = false;
$(".floatDropPanel").on('click', function() {
  $('img', this).toggle();
  // $(".dropFloatPanel").slideToggle();
  if (!floatOpen) {
    // $(".floatDropDown").fadeIn();
    $(".floatDropDown").animate({
      "top": "199px"

    }, function() {
      $(this).css({
        "box-shadow": " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)"
      });
    });
    floatOpen = true;
  } else {
    $(".floatDropDown").css({
      "box-shadow": "none"
    });
    $(".floatDropDown").animate({
      "top": "70px"
    });
    // $(".floatDropDown").fadeOut();
    floatOpen = false;
  }
});


$('#q_year').on('change', function() {
  if (this.value === String('2017')) {
    $('.year-wise').css({
      'display': 'block'
    });
    $('#year-span').text('2017-18');
    $('.year-span h6').text('2017-18');
    url1_temp = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectMetaData_1_2018.Json';
    url2_temp = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectDetailedData_1_2018.Json';
    url3_temp = 'https://strategydotzero.blob.core.windows.net/dilgpjson/ProjectYearlyDetailedData_1_2018.Json';
    $(".dataTable tbody").remove();
    jsonLoader();
    summaryLoader(2017);
    g_countProposals();
  } else if (this.value === String('2018')) {
    $('.year-wise').css({
      'display': 'block'
    });
    $('#year-span').text('2018-19');
    $('.year-span h6').text('2018-19');
    url1_temp = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectMetaData';
    url2_temp = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectDetailedData';
    url3_temp = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectYearlyDetailedData';
    $(".dataTable tbody").remove();
    jsonLoader();
    summaryLoader(2018);
    g_countProposals();
  }
});


$('#skip').click(function () {
  $('#q_year').val('2018');
  $('.year-wise').css({
    'display': 'block'
  });
  $('.leftColumn').css({
    'display': 'block'
  });
  url1_temp = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectMetaData';
  url2_temp = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectDetailedData';
  url3_temp = 'https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectYearlyDetailedData';
  $(".dataTable tbody").remove();
  jsonLoader();
  init();
  summaryLoader(2018);
  g_countProposals();
})

function g_countProposals() {
  var g_conceptCount = 0,  g_strategicCount = 0,  g_preliminaryCount = 0,  g_businessCount = 0,  g_investmentCount = 0,  g_deliveryCount = 0;
  for (item of g_data) {
    if (String('Concept') === String(item.SubStage)) {
      g_conceptCount += 1;
    }else if (String('Strategic Assessment') === String(item.SubStage)) {
      g_strategicCount += 1;
    }else if (String('Preliminary Evaluation') === String(item.SubStage)) {
      g_preliminaryCount += 1;
    }else if (String('Business Case') === String(item.SubStage)) {
      g_businessCount += 1;
    }else if (String('Investment Decision') === String(item.SubStage)) {
      g_investmentCount += 1;
    }
  }
  for (item of g_data) {
    if (String('DELIVERY') === item.Stage) {
      g_deliveryCount += 1;
    }
  }
  $("#new-concept").text(g_conceptCount);
  $("#new-strategy").text(g_strategicCount);
  $("#new-evaluation").text(g_preliminaryCount);
  $("#new-business").text(g_businessCount);
  $("#new-delivery").text(g_deliveryCount);
}

function summaryLoader(currentYear) {
  if (currentYear === 2018) {
    $(".seqBudget span").text('$5.986B');
    $(".regBudget span").text('$5.597B');
    $(".capitalbudget .floatData").text('$11.583B');
    $(".jobssupported .floatData").text('33,000');
    $(".totalprojects .floatData").text('394');
    $(".programs .floatData").text('213');
    $(".grants .floatData").text('101');
  }else if (currentYear === 2017) {
    $(".seqBudget span").text('$5.359B');
    $(".regBudget span").text('$4.811B');
    $(".capitalbudget .floatData").text('$10.17B');
    $(".jobssupported .floatData").text('29,000');
    $(".totalprojects .floatData").text('427');
    $(".programs .floatData").text('226');
    $(".grants .floatData").text('90');
  }
}
