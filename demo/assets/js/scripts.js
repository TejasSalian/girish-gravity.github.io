/***----------------------------------- Gobal Variables -----------------------------------***/

// Initialization
var projectObject, // Project (Table) jQuery Object
  projectDataTable, // Project DataTable Object
  projectTableOptions, // Project DataTable Default Settings
  assetFilter, // Array of filters for assets
  regionsFilter, // Array of filters for regions
  boardFilter, // String represent board filter
  yearSelector, // Points to the Select Node
  isDetailView, // Whether details view is open or not
  currentUrls, // DataUrls
  dataObject, // An Object with all data fetched
  activeDataObject; // A temparary Object with all data fetched for selected year

// Default Values / DataModel
yearSelector = $('#year-select');
projectObject = $('#projects');
isDetailView = false;
assetFilter = '';
regionsFilter = '';
boardFilter != '';
projectTableOptions = {
  "paging": false,
  "autoWidth": false,
  "dom": 'Bfrtip',
  "buttons": ['copy', 'csv', 'excel', 'pdf', 'print'],
  "search": {
    regex: true
  },
  "columnDefs": [{
    className: "projectsHead",
    "targets": [0]
  }],
  "columns": [{
      className: "pProjects"
    },
    {
      className: "pStage"
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
    "ProjectMetaData": "https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectMetaData",
    "ProjectYearlyDetailedData": "https://strategydotzero.blob.core.windows.net/dilgp2018test/ProjectYearlyDetailedData"
  },
  "year2017": {
    "ProjectDetailedData": "/assets/json/data/ProjectDetailedData.json",
    "ProjectMetaData": "/assets/json/data/ProjectMetaData.json",
    "ProjectYearlyDetailedData": "/assets/json/data/ProjectYearlyDetailedData.json"
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
    // Infrastructure Class
    htmlRowTemplate += '<td class="pInfrastructure">' + project.AssetClass + '</td>';
    // Agency
    htmlRowTemplate += '<td class="pAgency">' + 'N/A' + '</td>';
    // Region
    htmlRowTemplate += '<td class="pRegion">' + project.Region + '</td>';
    // Total estimated cost
    htmlRowTemplate += '<td class="pTCost" data-order="' + project.Value + '">' + formatCurrency(project.Value) + '</td>';
    // Expenditure to June 2018
    htmlRowTemplate += '<td class="pExpenditure">' + 'N/A' + '</td>';
    // Funding
    // 2018 - 19
    htmlRowTemplate += '<td class="pFundingS1">' + 'N/A' + '</td>';
    // 2019 - 20
    htmlRowTemplate += '<td class="pFundingS2">' + 'N/A' + '</td>';
    // 2020 - 21 to 2021 - 22
    htmlRowTemplate += '<td class="pFundingS3">' + 'N/A' + '</td>';
    // Beyond
    htmlRowTemplate += '<td class="pFundingS4">' + 'N/A' + '</td>';
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
  }, 1300);
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
  for (var i = 1; i < 11; i++) {
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
      loadDelivaryProjectView(targetedProject);
      $('.planningPanel').addClass('d-none');
      $('.delivaryPanel').removeClass('d-none');
      break;
    case 'PLANNING':
      loadPlanningProjectView(targetedProject);
      $('.delivaryPanel').addClass('d-none');
      $('.planningPanel').removeClass('d-none');
      break;
    default:
      console.warn('Targeted Project is Neither on Planning nor on Delivary Stage');
  }
}

// load Delivary View and Flash Project Details
function loadDelivaryProjectView(projectObject) {
   let flatArray = '';

   $('.delivaryPanel .poject-metaData > h3').text(projectObject.Header);
   $('.delivaryPanel .poject-metaData > p').text(projectObject.TagHeader);

   $('.delivaryPanel .statusInfo tr:nth-child(1) > td:nth-child(3)').text(projectObject.CapitalType);
   $('.delivaryPanel .statusInfo tr:nth-child(2) > td:nth-child(3)').text(projectObject.EstmDate);
   $('.delivaryPanel .statusInfo tr:nth-child(3) > td:nth-child(3)').text(projectObject.ReportStatusNameProject);
   $('.delivaryPanel .statusInfo tr:nth-child(4) > td:nth-child(3)').text('Delivary -'+ projectObject.SubStage);
   $('.delivaryPanel .statusInfo tr:nth-child(5) > td:nth-child(3)').text(projectObject.NextMileStoneName);
   $('.delivaryPanel .statusInfo tr:nth-child(5) > td:nth-child(3)').text(projectObject.NextMileStoneStartDate);

   $('.delivaryPanel .fundingInfo tr:nth-child(1) > td:nth-child(3)').text(projectObject.Budget);
   $('.delivaryPanel .fundingInfo tr:nth-child(2) > td:nth-child(3)').text(formatCurrency(projectObject.TotalCost));
   $('.delivaryPanel .fundingInfo tr:nth-child(3) > td:nth-child(3)').text(formatCurrency(projectObject.PostFunding));
   $.each(projectObject.FundingContributors, function(key, item) {
     if (key > 0) {
       flatArray = flatArray +', '+ item;
     }else{
       flatArray = item;
     }
   });
   $('.delivaryPanel .fundingInfo tr:nth-child(4) > td:nth-child(3)').text(flatArray);

   $('.delivaryPanel .regionInfo p').text(projectObject.RegionName);
   $('.delivaryPanel .infrastructureClass .asset p').text(projectObject.AssetClass);
   $('.delivaryPanel .infrastructureClass .agency h6').text(projectObject.LeadAgency);
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

  // Select Delivary Stage Project and Make them Object
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
          Array.prototype.push.apply(regionFilterDeliveryItems, fiteredItemsPlanningObj.filter(function(p){
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
        Array.prototype.push.apply(fiteredItemsDelivery, planning.filter(function(p){
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
    projectDataTable.column(2).search(assetFilter, true, false).draw();
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
    projectDataTable.column(4).search(regionsFilter, true, false).draw();
    flashBaloons();
  }
});

// Clear Asset filters click event
$('#clear-assets-filter').on('click', function() {
  $('.asset-class .filters').removeClass('active');
  $(this).addClass('d-none');
  assetFilter = '';
  projectDataTable.column(2).search('', true, false).draw();
  flashBaloons();
});

// Clear Region filters click event
$('#clear-regions-filter').on('click', function() {
  $('.regions .filters').removeClass('active');
  $(this).addClass('d-none');
  regionsFilter = '';
  projectDataTable.column(4).search('', true, false).draw();
  flashBaloons();
});

// Search Table dataTables
$('#seachProjectDataTable').on('keyup', function() {
  if (projectDataTable) {
    if (isDetailView) {
      projectDataTable.columns(0).search(this.value).draw();
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
  $('.project-details-btn').addClass('d-none');
  $('.project-details').removeClass('d-none');
  $('.tablePannel').removeClass('animation-backward').addClass('animation-forward playing');
  setTimeout(function() {
    $('.tablePannelContent').removeClass('d-none');
  }, 1300);
  setTimeout(function() {
    buildTable();
    if (projectDataTable) {
      if (assetFilter != '') {
        projectDataTable.column(2).search(assetFilter, true, false).draw();
      }
      if (regionsFilter != '') {
        projectDataTable.column(4).search(regionsFilter, true, false).draw();
      }
      if (boardFilter != '') {
        projectDataTable.columns(1).search(boardFilter, true, false).draw();
      }else{
        projectDataTable.columns(1).search('', true, false).draw();
      }
    }
  }, 1400);
});

// Close projectTable minimize mode event
$('.tablePannel-minimize').on('click', function(){
  returnDetailedView();
});

// Close projectTable Button click event
$('.tablePannel-close').on('click', function() {
  boardFilter = '';
  if (!isDetailView) {
    closeTablePanel();
  }else {
    returnDetailedView();
    closeTablePanel();
  }
});

// Row Selector
$('#projects tbody').on('click', 'tr[role=row]', function() {
  // If projectDataTable is Initialized and Table is minimized
  if (projectDataTable) {
    let rowObject = $(this);
    let projectID;
    if ( rowObject.hasClass('active') ) {
      for (var i = 1; i < 11; i++) {
        projectDataTable.column(i).visible(true);
      }
      rowObject.removeClass('active');
      projectObject.removeClass('minimized');
      panelMinimize();
    }else {
      projectID = rowObject.find('[project-id]').attr('project-id');
      $('#projects tr.active').removeClass('active');
      for (var i = 1; i < 11; i++) {
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
  $('.project-details-btn').trigger('click');
  if ($(this).attr('filter-as') == 'planning') {
    boardFilter = 'planning';
  }else if($(this).attr('filter-as') == 'delivery'){
    boardFilter = 'delivery';
  }
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
