/***----------------------------------- Gobal Variables -----------------------------------***/

// Initialization
var projectObject, // Project (Table) jQuery Object
  projectDataTable, // Project DataTable Object
  projectTableOptions, // Project DataTable Default Settings
  assetFilter, // Array of filters for assets
  regionsFilter, // Array of filters for regions
  yearSelector, // Points to the Select Node
  currentUrls, // Data Model With CurrentURL
  dataObject, // An Object with all data fetched
  activeDataObject; // A temparary Object with all data fetched for selected year

// Default Values / DataModel
yearSelector = $('#year-select');
projectObject = $('#projects');
isTableMinimized = false;
assetFilter = '';
regionsFilter = '';
projectTableOptions = {
  "paging": false,
  "autoWidth": false,
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
    flashRows()
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
    htmlRowTemplate += '<td class="pStage" status="' + project.Stage + '">' + project.SubStage + '</td>';
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

// Expand tablePannel for row Details
function panelMaximize() {
  let tablePannel = $('.tablePannel');
  let tablePannelContent = $('.tablePannelContent');
  let tableView = $('.tableView');
  let projectsHead = $('.projectsHead');
  $.when(
    tablePannel.css({'width' : '1600%', 'z-index' : '20', 'position' : 'relative'})
  ).then(function() {
    tablePannel.removeClass('animation-forward')
               .addClass('animation-maximize');
    tablePannelContent.css({'background-color' : 'white'});
    tableView.css({'width' : '244px'});
    projectsHead.css({
                      'height'     : projectsHead.height(),
                      'min-height' : projectsHead.height()
                    });
  });
}

// Expand tablePannel for row Details
function panelMinimize() {
  let tablePannel = $('.tablePannel');
  let tablePannelContent = $('.tablePannelContent');
  let tableView = $('.tableView');
  tablePannel.css({'width' : '2000%', 'z-index' : '20', 'position' : 'relative'})
             .removeClass('animation-maximize')
             .addClass('animation-minimize');
  tableView.removeAttr('style');
  setTimeout(function () {
    tablePannelContent.removeAttr('style');
    tablePannel.css({'width' : '1600%', 'z-index' : '20', 'position' : 'relative'})
               .removeClass('animation-minimize playing')
               .addClass('animation-forward');
  }, 650);
  setTimeout(function () {
    tablePannel.removeAttr('style').css({'width' : '1600%', 'background-color': 'white'});
    projectsHead.removeAttr('style');
  }, 700);

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
  $('.intro').removeClass('d-none').addClass('d-flex');
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

// Assets filters clik event
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
  if (projectDataTable) {
    projectDataTable.column(2).search(assetFilter, true, false).draw();
  }
});

// Regions filters clik event
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
  if (projectDataTable) {
    projectDataTable.column(4).search(regionsFilter, true, false).draw();
  }
});

// Clear Asset filters clik event
$('#clear-assets-filter').on('click', function() {
  $('.asset-class .filters').removeClass('active');
  $(this).addClass('d-none');
  assetFilter = '';
  projectDataTable.column(2).search('', true, false).draw();
});

// Clear Region filters clik event
$('#clear-regions-filter').on('click', function() {
  $('.regions .filters').removeClass('active');
  $(this).addClass('d-none');
  regionsFilter = '';
  projectDataTable.column(4).search('', true, false).draw();
});

// Search Table dataTables
$('#seachProjectDataTable').on('keyup', function() {
  if (projectDataTable) {
    projectDataTable.search(this.value).draw();
  }
});

// All project Button clik event
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
    }
  }, 1400);
});

// Close projectTable Button clik event
$('.tablePannel-close').on('click', function() {
  $('.tablePannelContent').fadeOut(100).addClass('d-none');
  $('.tablePannel')
    .toggleClass('white')
    .css({
      width: '1600%'
    })
    .removeClass('animation-forward')
    .addClass('animation-backward');
  setTimeout(function() {
    $('.project-details-btn').removeClass('d-none');
    $('.project-details').addClass('d-none');
    $('.tablePannelContent').removeAttr('style');
    $('.tablePannel').removeAttr('style');
  }, 1300);
});

// Row Selector
$('#projects tbody').on('click', 'tr[role=row]', function() {
  // If projectDataTable is Initialized and Table is minimized
  if (projectDataTable) {
    // let projectID = $(this).find('project-id');
    // console.log(projectID);
    // projectsHead
    let rowObject = $(this);
    if ( rowObject.hasClass('active') ) {
      for (var i = 1; i < 11; i++) {
        projectDataTable.column(i).visible(true);
      }
      rowObject.removeClass('active');
      projectObject.removeClass('minimized');
      panelMinimize();
    }else {
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
      });
    }

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


  // Prepare

});
