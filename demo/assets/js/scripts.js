/***----------------------------------- Gobal Variables -----------------------------------***/

// Global Variables
var projectObject, // Project (Table) jQuery Object
  projectDataTable, // Project DataTable Object
  projectTableOptions, // Project DataTable Default Settings
  projectColumnNum, // Indicates column number of Project Column in table
  boardColumnNum, // Indicates column number of board Column in table
  capitalColumnNum, // Indicates column number of Capital Type Column in table
  assetColumnNum, // Indicates column number of asset Column in table
  regionsColumnNum, // Indicates column number of Region Column in table
  totalColumnCount, // total columns table has
  assetFilter, // Array of filters for assets
  regionsFilter, // Array of filters for regions
  boardFilter, // String represent board filter
  stageSelection, // ProjectStage filtered Indicator
  yearSelector, // Points to the Select Node
  isDetailView, // Whether details view is open or not
  currentUrls, // DataUrls
  dataObject, // An Object with all data fetched
  activeDataObject; // A temparary Object with all data fetched for selected year

// Default Values / DataModel
yearSelector = $('#year-select');
projectObject = $('#projects');
isDetailView = false;
projectColumnNum = 0;
boardColumnNum = 1;
capitalColumnNum = 2;
assetColumnNum = 3;
regionsColumnNum = 5;
totalColumnCount = 12;
assetFilter = '';
regionsFilter = '';
boardFilter != '';
stageSelection = 0;
projectTableOptions = {
  "paging": false,
  "autoWidth": false,
  "info": true,
  "scrollY" : "487px",
  "scrollX" : true,
  "scrollCollapse" : true,
  "dom": '<"d-none"i>rt<"clear">',
  "drawCallback": function( settings ) {
    $('#summary_info').text($.fn.DataTable.settings[0].aanFeatures.i[0].outerText);
  },
  // "fixedHeader": true,
  // "dom": 'Bfrtip',
  // "buttons": ['copy', 'csv', 'excel', 'pdf', 'print'],
  "search": {
    regex: true
  },
  "columnDefs": [
    { className: "projectsHead", "targets": [projectColumnNum] },
    { className: "stageHead", "targets": [boardColumnNum] },
  ],
  "columns": [{
      className: "pProjects"
    },
    {
      className: "pStage"
    },
    {
      className: "pCapital"
    },
    {
      className: "pInfrastructure"
    },
    {
      className: "pAgency"
    },
    {
      className: "pRegion"
    },
    {
      className: "pTCost"
    },
    {
      className: "pExpenditure"
    },
    {
      className: "pFundingS1"
    },
    {
      className: "pFundingS2"
    },
    {
      className: "pFundingS3"
    },
    {
      className: "pFundingS4"
    },
  ],
  "aoColumns": [{
      "sName": "Projects"
    },
    {
      "sName": "Stage"
    },
    {
      "sName": "pCapital"
    },
    {
      "sName": "Infrastructure"
    },
    {
      "sName": "Agency"
    },
    {
      "sName": "Region"
    },
    {
      "sName": "TCost"
    },
    {
      "sName": "Expenditure"
    },
    {
      "sName": "FundingS1"
    },
    {
      "sName": "FundingS2"
    },
    {
      "sName": "FundingS3"
    },
    {
      "sName": "FundingS4"
    }
  ]
};
currentUrls = {
  "year2018": {
    "ProjectDetailedData": "https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectDetailedData",
    "ProjectMetaData": "assets/json/newData/ProjectMetaData.json",
    "ProjectYearlyDetailedData": "https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectYearlyDetailedData"
  },
  "year2018Old": {
    "ProjectDetailedData": "https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectDetailedData",
    "ProjectMetaData": "https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectMetaData",
    "ProjectYearlyDetailedData": "https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectYearlyDetailedData"
  }
};
activeDataObject = {
  "ProjectDetailedData": null,
  "ProjectMetaData": null,
  "ProjectYearlyDetailedData": null
};
/***--------------------------------------- Methods ---------------------------------------***/
// Read JSON Dats of Purticular Year
var populateTable = function(targetedYear) {
  $.when(
    refreshDataObject(targetedYear),
    flashRows(),
    flashBaloons()
  ).then(function () {
      buildTable();
  });
}

// load selected year data to activeData
function refreshDataObject() {}

// flash activeData to table
function flashRows() {
  let htmlRowTemplate;
  $.each(activeDataObject.ProjectMetaData, function(i, project) {
    htmlRowTemplate = '<tr>';
    // Project
    htmlRowTemplate += '<td class="pProjects" project-id="' + project.ProjectId + '">' + project.Project + '</td>';
    // Stage
    htmlRowTemplate += '<td class="pStage" status="' + project.Stage + '" data-search="' + project.Stage + ' ' + project.SubStage + '">' + project.SubStage + '</td>';
    // Capital Type
    htmlRowTemplate += '<td class="pCapital">' + project.CapitalType + '</td>';
    // Infrastructure Class
    htmlRowTemplate += '<td class="pInfrastructure">' + project.AssetClass + '</td>';
    // Agency
    htmlRowTemplate += '<td class="pAgency">' + project.LeadAgency + '</td>';
    // Region
    htmlRowTemplate += '<td class="pRegion">' + project.Region + '</td>';
    // Total estimated cost
    htmlRowTemplate += '<td class="pTCost" data-order="' + project.Value + '">' + formatCurrency(project.Value) + '</td>';
    // Expenditure to June 2018
    htmlRowTemplate += '<td class="pExpenditure" data-order="' + project.TotalExpenseTillJune + '">' + millionfy(project.TotalExpenseTillJune) + '</td>';
    // Funding
    // 2018 - 19
    htmlRowTemplate += '<td class="pFundingS1" data-order="' + project.Budget1819 + '">' + millionfy(project.Budget1819) + '</td>';
    // 2019 - 20
    htmlRowTemplate += '<td class="pFundingS2" data-order="' + project.Budget1920 + '">' + millionfy(project.Budget1920) + '</td>';
    // 2020 - 21 to 2021 - 22
    htmlRowTemplate += '<td class="pFundingS3" data-order="' + project.Budget2021 + project.Budget2122 + '">' + millionfy( fyYearExpenseSum(project.Budget2021, project.Budget2122) ) + '</td>';
    // Beyond
    htmlRowTemplate += '<td class="pFundingS4" data-order="' + project.Beyond + '">' + millionfy(project.Beyond) + '</td>';
    // End of Row
    htmlRowTemplate += '</tr>';
    // append Data
    projectObject.children('tbody').append(htmlRowTemplate);
  });
}

// fetch current selected year data
function buildTable() {
  if (!projectDataTable) {
    projectDataTable = projectObject.DataTable(projectTableOptions);
  }
}

// Roundoff Value to one decimal point and Format to Currency
function formatCurrency(value) {
  if (value) {
    let valueRange;
    value = Number(value);

    if (value >= 1000000000) {
      value = value / 1000000000;
      valueRange = 'B';
    } else if (value >= 1000000) {
      value = value / 1000000;
      valueRange = 'M';
    } else if (value >= 1000) {
      value = value / 1000;
      valueRange = 'K';
    } else {
      valueRange = '';
    }

    value = value.toFixed(2);
    return '$' + value + valueRange;
  }else {
    return '--';
  }

}

// Just Make it Million Dollar
function millionfy(value) {
  if (value != '') {
    return '$' + value + 'M';
  }else {
    return '--';
  }
}

function fyYearExpenseSum(fy1, fy2){
  if (fy1 && fy2) {
    return String( Number(fy1) + Number(fy2) );
  }else {
    return '';
  }
}

// Close table panel and return to Animation
function closeTablePanel() {
  $('.tablePannelContent').fadeOut(100).addClass('d-none');
  $('.tablePannel').toggleClass('white')
                   .css({ width: '1680%' })
                   .removeClass('animation-forward')
                   .addClass('animation-backward');
  setTimeout(function() {
    $('.project-details-btn').removeClass('d-none');
    $('.project-details').addClass('d-none');
    $('.tablePannelContent').removeAttr('style');
    $('.tablePannel').removeAttr('style');
  }, 800);
  // previously it was 1300
}

// Expand tablePannel for row Details
function panelMaximize() {
  let tablePannel = $('.tablePannel');
  let tablePannelContent = $('.tablePannelContent');
  let tableView = $('.tableView');
  let projectsHead = $('.projectsHead');
  let minimizeBtn = $('.tablePannel-minimize');
  let detailsPanel = $('.detailsPanel');
  $('#seachProjectDataTable').attr('placeholder', 'Search Projects by Name');
  $.when(
    tablePannel.css({'width' : '1680%', 'z-index' : '20', 'position' : 'relative'})
  ).then(function() {
    tablePannel.removeClass('animation-forward')
               .addClass('animation-maximize');
    tablePannelContent.css({'background-color' : 'white'});
    tableView.css({'width' : '244px', 'float' : 'left'});
    detailsPanel.removeClass('d-none');
    projectsHead.css({
                      'height'     : projectsHead.height(),
                      'min-height' : projectsHead.height()
                    });
  });
  minimizeBtn.removeClass('d-none');
  isDetailView = !isDetailView;
}

// Expand tablePannel for row Details
function panelMinimize() {
  let tablePannel = $('.tablePannel');
  let tablePannelContent = $('.tablePannelContent');
  let tableView = $('.tableView');
  let projectsHead = $('.projectsHead');
  let minimizeBtn = $('.tablePannel-minimize');
  let detailsPanel = $('.detailsPanel');
  $('#seachProjectDataTable').attr('placeholder', 'Search Projects by Name, Contract Type, Region etc.');
  tablePannel.css({
              'width'    : '2000%',
              'z-index'  : '20',
              'position' : 'relative'
            })
             .removeClass('animation-maximize')
             .addClass('animation-minimize');
  tableView.removeAttr('style');
  detailsPanel.addClass('d-none');
  setTimeout(function () {
    tablePannelContent.removeAttr('style');
    tablePannel.css({'width' : '1680%', 'z-index' : '20', 'position' : 'relative'})
               .removeClass('animation-minimize playing')
               .addClass('animation-forward');
  }, 650);
  setTimeout(function () {
    tablePannel.removeAttr('style').css({'width' : '1680%', 'background-color': 'white'});
    projectsHead.removeAttr('style');
  }, 700);
  minimizeBtn.addClass('d-none');
  isDetailView = !isDetailView;
}

//Return from Detailed view
function returnDetailedView() {
  for (let i = 1; i < totalColumnCount; i++) {
    projectDataTable.column(i).visible(true);
  }
  $('#projects tr.active').removeClass('active');
  projectObject.removeClass('minimized');
  panelMinimize();
}

// Show Detail View of Projects
function showProjectDetails(projectID) {
  let targetedProject = activeDataObject.ProjectDetailedData[String(projectID)];
  switch (targetedProject.CurrentStage) {
    case 'DELIVERY':
      loadDeliveryProjectView(targetedProject);
      $('.planningPanel').addClass('d-none');
      $('.deliveryPanel').removeClass('d-none');
      break;
    case 'PLANNING':
      loadPlanningProjectView(targetedProject);
      $('.deliveryPanel').addClass('d-none');
      $('.planningPanel').removeClass('d-none');
      break;
    default:
      console.warn('Targeted Project is Neither on Planning nor on Delivery Stage');
  }
}

// load Delivery View and Flash Project Details
function loadDeliveryProjectView(projectObject) {
   let flatArray = '';

   $('.deliveryPanel .poject-metaData > h3').text(projectObject.Header);
   $('.deliveryPanel .poject-metaData > p').text(projectObject.TagHeader);

   $('.deliveryPanel .statusInfo tr:nth-child(1) > td:nth-child(3)').text(projectObject.CapitalType);
   $('.deliveryPanel .statusInfo tr:nth-child(2) > td:nth-child(3)').text(projectObject.EstmDate);
   $('.deliveryPanel .statusInfo tr:nth-child(3) > td:nth-child(3)').text(projectObject.ReportStatusNameProject);
   $('.deliveryPanel .statusInfo tr:nth-child(4) > td:nth-child(3)').text('Delivery -'+ projectObject.SubStage);
   $('.deliveryPanel .statusInfo tr:nth-child(5) > td:nth-child(3)').text(projectObject.NextMileStoneName);
   $('.deliveryPanel .statusInfo tr:nth-child(5) > td:nth-child(3)').text(projectObject.NextMileStoneStartDate);

   $('.deliveryPanel .fundingInfo tr:nth-child(1) > td:nth-child(3)').text(projectObject.Budget);
   $('.deliveryPanel .fundingInfo tr:nth-child(2) > td:nth-child(3)').text(formatCurrency(projectObject.TotalCost));
   $('.deliveryPanel .fundingInfo tr:nth-child(3) > td:nth-child(3)').text(formatCurrency(projectObject.PostFunding));
   $.each(projectObject.FundingContributors, function(key, item) {
     if (key > 0) {
       flatArray = flatArray +', '+ item;
     }else{
       flatArray = item;
     }
   });
   $('.deliveryPanel .fundingInfo tr:nth-child(4) > td:nth-child(3)').text(flatArray);

   $('.deliveryPanel .regionInfo p').text(projectObject.RegionName);
   $('.deliveryPanel .infrastructureClass .asset p').text(projectObject.AssetClass);
   $('.deliveryPanel .infrastructureClass .agency h6').text(projectObject.LeadAgency);
}

// load Plannning View and Flash Project Details
function loadPlanningProjectView(projectObject) {
  let pipelineSource = '<a href="'+ projectObject.PipelinResource[0].Value +'" target="_blank">'+projectObject.PipelinResource[0].Text+'</a>';

  $('.planningPanel .poject-metaData > h5').text(projectObject.OpportunityFlag);
  $('.planningPanel .poject-metaData > h3').text(projectObject.Header);

  $('.planningPanel .projectStatus .statusInfo tr:nth-child(1) > td:nth-child(3)').text('Plannning - ' + projectObject.SubStage);
  $('.planningPanel .projectStatus .statusInfo tr:nth-child(2) > td:nth-child(3)').text(projectObject.SIPStatus);

  $('.planningPanel .regionInfo p').text(projectObject.RegionName);
  $('.planningPanel .infrastructureClass .asset p').text(projectObject.AssetClass);
  $('.planningPanel .infrastructureClass .pipeline-source h6').html(pipelineSource);
  $('.planningPanel .infrastructureClass .agency h6').text(projectObject.LeadAgency);
}

// Load project count on ballons
function flashBaloons() {
  // Select Planning Stage Project and Make them Object
  let planning = activeDataObject.ProjectMetaData.filter(function(p){
    return p.Stage.toLowerCase() === String('PLANNING').toLowerCase();
  });
  planning = JSON.stringify(planning);
  planning = JSON.parse(planning);

  // Select Delivery Stage Project and Make them Object
  let delivery = activeDataObject.ProjectMetaData.filter(function(p){
    return p.Stage.toLowerCase() === String('DELIVERY').toLowerCase();
  });
  delivery = JSON.stringify(delivery);
  delivery = JSON.parse(delivery);

  // Split up each filters
  let filterAssetArray = assetFilter.split('|');
  let filterRegionsArray = regionsFilter.split('|');

  let fiteredItemsPlanning = [];
  let fiteredItemsDelivery = [];

  let allFilterSkipCounting = filterAssetArray.length == $('.asset-class .filters').length && filterRegionsArray.length == $('.regions .filters').length;

  if (!allFilterSkipCounting) {

      // if either of the filter is active
      if (assetFilter.length != 0 || regionsFilter.length != 0) {

        // Non empty Asset Filter then Apply both or skip region filter on empty
        if (assetFilter.length != 0) {
          fiteredItemsPlanning = [];
          fiteredItemsDelivery = [];
          $.each(filterAssetArray, function(key, item) {
            // Find Selected items from Planning
            Array.prototype.push.apply(fiteredItemsPlanning, planning.filter(function(p){
              return p.AssetClass.toLowerCase() === item.toLowerCase(); })
            );
            // Find Selected items from Delivery
            Array.prototype.push.apply(fiteredItemsDelivery, delivery.filter(function(p){
              return p.AssetClass.toLowerCase() === item.toLowerCase(); })
            );

          });

          // Non empty region filter -> apply region filter on top of Asset filter result
          if (regionsFilter.length != 0) {
            //  Convert to Object for filtering
            let fiteredItemsPlanningObj = JSON.stringify(fiteredItemsPlanning);
            fiteredItemsPlanningObj = JSON.parse(fiteredItemsPlanningObj);

            let fiteredItemsDeliveryObj = JSON.stringify(fiteredItemsDelivery);
            fiteredItemsDeliveryObj = JSON.parse(fiteredItemsDeliveryObj);

            let regionFilterPlanningItems = [];
            let regionFilterDeliveryItems = [];

            $.each(filterRegionsArray, function(key, item) {
              Array.prototype.push.apply(regionFilterPlanningItems, fiteredItemsPlanningObj.filter(function(p){
                return p.Region.toLowerCase() === item.toLowerCase(); })
              );
              Array.prototype.push.apply(regionFilterDeliveryItems, fiteredItemsDeliveryObj.filter(function(p){
                return p.Region.toLowerCase() === item.toLowerCase(); })
              );

            });
            fiteredItemsPlanning = regionFilterPlanningItems;
            fiteredItemsDelivery = regionFilterDeliveryItems;
          }

        }else if (regionsFilter.length != 0) {
          // we have an empty Asset filter and on empty Region Filter
          fiteredItemsPlanning = [];
          fiteredItemsDelivery = [];
          $.each(filterRegionsArray, function(key, item) {
            Array.prototype.push.apply(fiteredItemsPlanning, planning.filter(function(p){
              return p.Region.toLowerCase() === item.toLowerCase(); })
            );
            Array.prototype.push.apply(fiteredItemsDelivery, delivery.filter(function(p){
              return p.Region.toLowerCase() === item.toLowerCase(); })
            );
          });
        }

        // filtering is done prepare for Counting -> Make them objects
        fiteredItemsPlanning = JSON.stringify(fiteredItemsPlanning);
        fiteredItemsPlanning = JSON.parse(fiteredItemsPlanning);

        fiteredItemsDelivery = JSON.stringify(fiteredItemsDelivery);
        fiteredItemsDelivery = JSON.parse(fiteredItemsDelivery);

      }else{
        fiteredItemsPlanning = planning;
        fiteredItemsDelivery = delivery;
      }
  }else{
    fiteredItemsPlanning = planning;
    fiteredItemsDelivery = delivery;
  }

  // Let Counting Begin
  let concept     = fiteredItemsPlanning.filter(function(p){
    return p.SubStage.toLowerCase() === String('Concept').toLowerCase();
  });
  let strategic   = fiteredItemsPlanning.filter(function(p){
    return p.SubStage.toLowerCase() === String('Strategic Assessment').toLowerCase();
  });
  let preliminary = fiteredItemsPlanning.filter(function(p){
    return p.SubStage.toLowerCase() === String('Preliminary Evaluation').toLowerCase();
  });
  let business    = fiteredItemsPlanning.filter(function(p){
    return p.SubStage.toLowerCase() === String('Business Case').toLowerCase();
  });

  // flash count to ballons
  $('.baloons > ul > li:nth-child(1) > strong').text(concept.length);
  $('.baloons > ul > li:nth-child(2) > strong').text(strategic.length);
  $('.baloons > ul > li:nth-child(3) > strong').text(preliminary.length);
  $('.baloons > ul > li:nth-child(4) > strong').text(business.length);
  $('.baloons > ul > li:nth-child(5) > strong').text(fiteredItemsDelivery.length);

  // Incase We want to fake it
  // $('.baloons > ul > li:nth-child(1) > strong').text((concept.length == 44 )? 31 : concept.length);
  // $('.baloons > ul > li:nth-child(2) > strong').text((strategic.length == 21)? 11 : strategic.length);
  // $('.baloons > ul > li:nth-child(3) > strong').text((preliminary.length == 41)? 38 : preliminary.length);
  // $('.baloons > ul > li:nth-child(4) > strong').text((business.length == 53)? 45 : business.length);
  // $('.baloons > ul > li:nth-child(5) > strong').text((fiteredItemsDelivery.length == 628) ? 635 : fiteredItemsDelivery.length);
}

// Project Button Click
function projectBtnClick() {

  $('.project-details-btn').addClass('d-none');
  $('.project-details').removeClass('d-none');
  $('.tablePannel').removeClass('animation-backward').addClass('animation-forward playing');

  // fixing Context - planning or projects or both
  let projectsHead = 'Projects / Proposals';
  let stageHead = 'Stage';
  switch (stageSelection) {
    case 1:
      projectsHead = 'Projects';
      stageHead = 'Stage';
      $('#planHead span.title').text('Plan Delivery Program');
      $('#seachProjectDataTable').attr('placeholder', 'Search by Name, Infrastructure Class, Region etc');
      for (let i = 0; i < totalColumnCount; i++) {
        projectDataTable.column(i).visible(true);
      }
      projectDataTable.column(boardColumnNum).visible(false);
      $('.dataTables_scrollBody').css('max-height', '487px');
      break;
    case -1:
      projectsHead = 'Proposals';
      stageHead = 'Planning Stage';
      $('#seachProjectDataTable').attr('placeholder', 'Search Proposals by Name, Infrastructure Class, Region etc');
      $('#planHead span.title').text('Plan Proposals');
      for (let i = regionsColumnNum + 1; i < totalColumnCount; i++) {
        projectDataTable.column(i).visible(false);
      }
      projectDataTable.column(boardColumnNum).visible(true);
      projectDataTable.column(capitalColumnNum).visible(false);
      $('.dataTables_scrollBody').css('max-height', '533px');
      break;
    default:
      projectsHead = 'Projects / Proposals';
      stageHead = 'Stage';
      $('#planHead span.title').text('Projects & Proposals');
      $('#seachProjectDataTable').attr('placeholder', 'Search by Name, Infrastructure Class, Region etc');
      for (let i = 1; i < totalColumnCount; i++) {
        projectDataTable.column(i).visible(true);
      }
      $('.dataTables_scrollBody').css('max-height', '487px');
  }
  $('th.projectsHead').text(projectsHead);
  $('th.stageHead').text(stageHead);

  setTimeout(function() {
    $('.tablePannelContent').removeClass('d-none');
  }, 1300);
  setTimeout(function() {
    buildTable();
    if (projectDataTable) {
      if (assetFilter != '') {
        projectDataTable.column(assetColumnNum).search(assetFilter, true, false).draw();
      }
      if (regionsFilter != '') {
        projectDataTable.column(regionsColumnNum).search(regionsFilter, true, false).draw();
      }
      if (boardFilter != '') {
        projectDataTable.column(boardColumnNum).search(boardFilter, true, false).draw();
      }else{
        projectDataTable.column(boardColumnNum).search('', true, false).draw();
      }
    }
  }, 1400);

}

/***--------------------------------------- Events ----------------------------------------***/

// Click on Explore btn
$('.explore-btn').on('click', function() {
  $('.explore').removeClass('d-flex').addClass('d-none');
  $('.video').removeClass('d-none').addClass('d-flex');
  $('#CubeAnim').currentTime = 0;
  $('#CubeAnim').get(0).play();
});

// Animation Finished
document.getElementById('CubeAnim')
  .addEventListener('ended', CubeAnimFinished, false);
function CubeAnimFinished() {
  $('.video').removeClass('d-flex').addClass('d-none');
  $('.intractive-portal').removeClass('d-none').addClass('d-flex');
}

// go-back from intro
$('.go-back').on('click', function() {
  $('.explore').removeClass('d-none').addClass('d-flex');
  $('.intro').removeClass('d-flex').addClass('d-none');
  $('.video').removeClass('d-flex').addClass('d-none');
});

// go-forward to intractive view
$('.go-forward, .skip').on('click', function() {
  $('.intro').removeClass('d-flex').addClass('d-none');
  $('.intractive-portal').removeClass('d-none').addClass('d-flex');
});

// go overview from intractive view
$('.pipeline-overview').on('click', function() {
  $('.intractive-portal').removeClass('d-flex').addClass('d-none');
  $('.intro').removeClass('d-none').addClass('d-flex');
});

// Assets filters click event
$('.asset-class .filters').on('click', function() {
  // Clear Button Status
  let clearAssetsBtn = $('#clear-assets-filter');
  if (clearAssetsBtn.hasClass('d-none')) {
    clearAssetsBtn.removeClass('d-none');
  }
  let filterText = $(this).find('h6').text();
  // check wheather filter is ON or OFF
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    // remove filter
    if (assetFilter != '') {
      // Remove Filter Text
      assetFilter = assetFilter.replace(filterText, '');
      // if replace created || remove it
      assetFilter = assetFilter.replace(/\|\|/, '|');
      // First letter | then remove it
      if (assetFilter.charAt(0) === '|') {
        assetFilter = assetFilter.substr(1);
      }
      // Last letter | then remove it
      if (assetFilter.charAt(assetFilter.length - 1) === '|') {
        assetFilter = assetFilter.slice(0, -1);
      }
      // if that mode | only string empty it (this will covered in above then too fail change is there)
      if (assetFilter === '|') {
        assetFilter = '';
      }
    }
  } else {
    $(this).addClass('active');
    // check wheather filter is empty or not and build accordingly
    if (assetFilter === '') {
      assetFilter = filterText;
    } else {
      assetFilter = assetFilter + '|' + filterText;
    }
  }
  if (assetFilter == '') {
    clearAssetsBtn.addClass('d-none');
  }
  if (projectDataTable) {
    projectDataTable.column(assetColumnNum).search(assetFilter, true, false).draw();
    flashBaloons();
  }
});

// Regions filters click event
$('.regions .filters').on('click', function() {
  let clearRegionsBtn = $('#clear-regions-filter');
  if (clearRegionsBtn.hasClass('d-none')) {
    clearRegionsBtn.removeClass('d-none');
  }
  let filterText = $(this).find('button').text();
  // check wheather filter is ON or OFF
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    // remove filter
    if (regionsFilter != '') {
      // Remove Filter Text
      regionsFilter = regionsFilter.replace(filterText, '');
      // if replace created || remove it
      regionsFilter = regionsFilter.replace(/\|\|/, '|');
      // First letter | then remove it
      if (regionsFilter.charAt(0) === '|') {
        regionsFilter = regionsFilter.substr(1);
      }
      // Last letter | then remove it
      if (regionsFilter.charAt(regionsFilter.length - 1) === '|') {
        regionsFilter = regionsFilter.slice(0, -1);
      }
      // if that mode | only string empty it (this will covered in above then too fail change is there)
      if (regionsFilter === '|') {
        regionsFilter = '';
      }
    }
  } else {
    $(this).addClass('active');
    // check wheather filter is empty or not and build accordingly
    if (regionsFilter == '') {
      regionsFilter = filterText;
    } else {
      regionsFilter = regionsFilter + '|' + filterText;
    }
  }
  if (regionsFilter == '') {
    clearRegionsBtn.addClass('d-none');
  }
  if (projectDataTable) {
    projectDataTable.column(regionsColumnNum).search(regionsFilter, true, false).draw();
    flashBaloons();
  }
});

// Clear Asset filters click event
$('#clear-assets-filter').on('click', function() {
  $('.asset-class .filters').removeClass('active');
  $(this).addClass('d-none');
  assetFilter = '';
  projectDataTable.column(assetColumnNum).search('', true, false).draw();
  flashBaloons();
});

// Clear Region filters click event
$('#clear-regions-filter').on('click', function() {
  $('.regions .filters').removeClass('active');
  $(this).addClass('d-none');
  regionsFilter = '';
  projectDataTable.column(regionsColumnNum).search('', true, false).draw();
  flashBaloons();
});

// Search Table dataTables
$('#seachProjectDataTable').on('keyup', function() {
  if (projectDataTable) {
    if (isDetailView) {
      projectDataTable.column(projectColumnNum).search(this.value).draw();
    }else{
      projectDataTable.search(this.value).draw();
    }
    if (this.value == '') {
      $('#projects tr.active').removeClass('active');
    }
  }
});

// All project Button click event
$('.project-details-btn').on('click', function() {
  // projectBtnClick();
});

// Close projectTable minimize mode event
$('.tablePannel-minimize').on('click', function(){
  returnDetailedView();
});

// Close projectTable Button click event
$('.tablePannel-close').on('click', function() {
  if (!isDetailView) {
    closeTablePanel();
  }else {
    returnDetailedView();
    closeTablePanel();
  }
  boardFilter = '';
  stageSelection = 0;
  $('#seachProjectDataTable').val('');
  projectDataTable.search('').draw();
});

// Row Selector
$('#projects tbody').on('click', 'tr[role=row]', function() {
  // If projectDataTable is Initialized and Table is minimized
  // Click event need to be disbaled for now
  if (projectDataTable && false) {
    let rowObject = $(this);
    let projectID;
    if ( rowObject.hasClass('active') ) {
      for (let i = 1; i < totalColumnCount; i++) {
        projectDataTable.column(i).visible(true);
      }
      rowObject.removeClass('active');
      projectObject.removeClass('minimized');
      panelMinimize();
    }else {
      projectID = rowObject.find('[project-id]').attr('project-id');
      $('#projects tr.active').removeClass('active');
      for (let i = 1; i < totalColumnCount; i++) {
        projectDataTable.column(i).visible(false);
      }
      projectObject.addClass('minimized');
      $.when(
        panelMaximize(),
        rowObject.addClass('slow-change')
      ).then(function () {
        rowObject.addClass('active').removeClass('slow-change');
        showProjectDetails(projectID);
      });
    }
  }
});

// Filter Board Click events
$('.filter-board').not('.inactive').on('click', function() {
  if ($(this).attr('data-filter') == 'planning') {
    boardFilter = 'planning';
    stageSelection = -1;
  }else if($(this).attr('data-filter') == 'delivery'){
    boardFilter = 'delivery';
    stageSelection = 1;
  }
  projectBtnClick();
});

// Baloon filter Events
$('.baloons li').on('click', function () {
  boardFilter = $(this).attr('data-filter');
  // Last Baloon is project, so handle that as well
  stageSelection = (boardFilter === String('delivery'))? 1 : -1;
  projectBtnClick();
});

/***------------------------------ On Page Ready Preparations ------------------------------***/
$(document).ready(function() {
  init();
  $('[data-toggle="tooltip"]').tooltip();
  // Prefetch
  $.when(
    $.ajaxSetup({
      crossDomain: true,
      beforeSend: function(xhr) {
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("application/json");
        }
      }
    }),
    $.getJSON(currentUrls.year2018.ProjectDetailedData, function(response) {
      activeDataObject.ProjectDetailedData = response;
    }),
    $.getJSON(currentUrls.year2018.ProjectMetaData, function(response) {
      activeDataObject.ProjectMetaData = response;
    }),
    $.getJSON(currentUrls.year2018.ProjectYearlyDetailedData, function(response) {
      activeDataObject.ProjectYearlyDetailedData = response;
    })
  ).then(function() {
    populateTable(2018);
  });
});
