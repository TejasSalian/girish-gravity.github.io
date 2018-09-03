/***----------------------------------- Gobal Variables -----------------------------------***/

// Initialization
var   projectObject,                // Project (Table) jQuery Object
      projectDataTable,             // Project DataTable Object
      projectTableOptions,          // Project DataTable Default Settings
      isTableMinimized,             // is Table on minimized mode (Project Column Only)
      yearSelector,                 // Points to the Select Node
      currentUrls,                  // Data Model With CurrentURL
      dataObject,                   // An Object with all data fetched
      activeDataObject;             // A temparary Object with all data fetched for selected year

// Default Values / DataModel
yearSelector                    = $('#year-select');
projectObject                   = $('#projects');
isTableMinimized                = false;
projectTableOptions             = {
                                    "autoWidth" : false,
                                    "columnDefs": [
                                                    { className: "my_class", "targets": [ 0 ] }
                                                  ],
                                      "columns" : [
                                                    { className: "pProjects" },
                                                    { className: "pStage" },
                                                    { className: "pInfrastructure" },
                                                    { className: "pAgency" },
                                                    { className: "pRegion" },
                                                    { className: "pTCost" },
                                                    { className: "pExpenditure" },
                                                    { className: "pFundingS1" },
                                                    { className: "pFundingS2" },
                                                    { className: "pFundingS3" },
                                                    { className: "pFundingS4" },
                                                  ]
                                  };
currentUrls                     = {
                                    "year2018": {
                                      "ProjectDetailedData"		    : "/assets/json/data/ProjectDetailedData.json",
                                      "ProjectMetaData"			      : "/assets/json/data/ProjectMetaData.json",
                                      "ProjectYearlyDetailedData"	: "/assets/json/data/ProjectYearlyDetailedData.json"
                                    },
                                    "year2017": {
                                      "ProjectDetailedData"		    : "/assets/json/data/ProjectDetailedData.json",
                                      "ProjectMetaData"			      : "/assets/json/data/ProjectMetaData.json",
                                      "ProjectYearlyDetailedData"	: "/assets/json/data/ProjectYearlyDetailedData.json"
                                    }
                                  };
activeDataObject                = {
                                    "ProjectDetailedData"		    : null,
                                    "ProjectMetaData"			      : null,
                                    "ProjectYearlyDetailedData"	: null
                                  };
/***--------------------------------------- Methods ---------------------------------------***/
// Read JSON Dats of Purticular Year
var populateTable = function(targetedYear) {
  refreshDataObject();
  flashRows();
  buildTable();
}

// load selected year data to activeData
function refreshDataObject() {
}

// flash activeData to table
function flashRows() {
  let htmlRowTemplate;
  for(project of activeDataObject.ProjectMetaData){
    htmlRowTemplate = '<tr>';
      // Project
      htmlRowTemplate    += '<td project-id="'+ project.ProjectId +'">' + project.Project + '</td>';
      // Stage
      htmlRowTemplate    += '<td status="' + project.Stage + '">' + project.SubStage + '</td>';
      // Infrastructure Class
      htmlRowTemplate    += '<td>' + project.AssetClass + '</td>';
      // Agency
      htmlRowTemplate    += '<td>' + 'N/A' + '</td>';
      // Region
      htmlRowTemplate    += '<td>' + project.Region + '</td>';
      // Total estimated cost
      htmlRowTemplate    += '<td data-order="'+ project.Value +'">' + formatCurrency(project.Value) + '</td>';
      // Expenditure to June 2018
      htmlRowTemplate    += '<td>' + 'N/A' + '</td>';
      // Funding
        // 2018 - 19
        htmlRowTemplate    += '<td>' + 'N/A' + '</td>';
        // 2019 - 20
        htmlRowTemplate    += '<td>' + 'N/A' + '</td>';
        // 2020 - 21 to 2021 - 22
        htmlRowTemplate    += '<td>' + 'N/A' + '</td>';
        // Beyond
        htmlRowTemplate    += '<td>' + 'N/A' + '</td>';
    // End of Row
    htmlRowTemplate    += '</tr>';
    // append Data
    projectObject.children('tbody').append(htmlRowTemplate);
  }
}

// fetch current selected year data
function buildTable() {

}

// Roundoff Value to one decimal point and Format to Currency
function formatCurrency(value) {

  let valueRange;
  value = Number(value);

  if (value >= 1000000000) {
    value    = value / 1000000000;
    valueRange = 'B';
  } else if (value >= 1000000) {
    value    = value / 1000000;
    valueRange = 'M';
  }else if (value >= 1000) {
    value    = value / 1000;
    valueRange = 'K';
  }else{
    valueRange = '';
  }

  value      = value.toFixed(2);
  return '$'+ value + valueRange;
}

// Expand Row Details - Pass Row Details
function expandRowData ( tableData ) {
  // `tableData` is the original data object for the row
  return '<div class="col-12">'+
            '<p>'+
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+
            '</p>'+
          '</div>';
}

/***--------------------------------------- Events ----------------------------------------***/

// Initialize Table on button click
$('#table-loader').on('click', function() {
  projectDataTable = projectObject.DataTable(projectTableOptions);
});

$('#table-minimize').on( 'click', function (e) {
    e.preventDefault();
    if (projectDataTable) {
      isTableMinimized = !isTableMinimized;
});


// Row Selector
$('#projects tbody').on('click', 'tr[role=row]', function() {
  // If projectDataTable is Initialized and Table is minimized
  if (projectDataTable && isTableMinimized) {
    let row = projectDataTable.row(this);

  }

});

/***------------------------------ On Page Ready Preparations ------------------------------***/

$(document).ready(function(){

  // Prefetch
  $.when(
    $.ajaxSetup({
      // crossDomain: true,
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
