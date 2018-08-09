function loadPieChart()
{
	var ctx2 = $("#pie-chartcanvas-2");
	var data2 = {
		labels : ["Cairns", "Toowoomba", "Mackay", "Fitzroy", "Wide Bay","Sunshine Coast","Greater Brisbane","Gold Coast","Darling Downs","Townsville","Remote Queensland","Multi-region","Statewide"],
		datasets : [
			{
				label : "Region",
				// data : [100, 50, 25, 70, 40,100, 50, 25, 70, 40,100, 50,12],
				data: regionCount,
				backgroundColor : [
                    "#DEB887",
                    "#A9A9A9",
                    "#DC143C",
                    "#F4A460",
                    "#2E8B57",
                    "#DEB887",
                    "#A9A9A9",
                    "#DC143C",
                    "#F4A460",
                    "#2E8B57",
                    "#DEB887",
                    "#A9A9A9",
                    "#2E8B57"
                ],
                borderColor : [
                    "#DEB887",
                    "#A9A9A9",
                    "#DC143C",
                    "#F4A460",
                    "#2E8B57",
                    "#DEB887",
                    "#A9A9A9",
                    "#DC143C",
                    "#F4A460",
                    "#2E8B57",
                    "#DEB887",
                    "#A9A9A9",
                    "#2E8B57"
                ],
                borderWidth : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			}
		]
	};

	var options = {
		title : {
			display : true,
			position : "top",
			// text : "Pie Chart",
			fontSize : 18,
			fontColor : "#111"
		},
		legend : {
			display : false,
			position : "bottom"
		},
		animation: false,
		tooltips: {
            backgroundColor: 'rgba(255,255,255,1)',
            bodyFontColor: 'rgba(0,0,0,1)',
            xAlign: "center",
		    custom: function(tooltip) {
		        if (!tooltip) return;
		        // disable displaying the color box;
		        tooltip.displayColors = false;
		        // tooltip.xAlign;
		    },
            callbacks: {
		        label: function(tooltipItem, data) {
		          var dataset = data.datasets[tooltipItem.datasetIndex];
		          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
		            return previousValue + currentValue;
		          });
		          var currentValue = dataset.data[tooltipItem.index];
		          var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
		          return [data.labels[tooltipItem.index], precentage + "%"];
		        }
		      }
        }
	};

	var chart2 = new Chart( ctx2, {
		type : "pie",
		data : data2,
		options : options,
		xAlign: "center",
		percentageInnerCutout : 70
	});


	var ctx1 = $("#pie-chartcanvas-1");
	var data1 = {
		labels : ["Cross-Government", "Transport", "Energy", "Water", "Health", "Education and Training", "Digital", "Justice and public safety", "Arts, culture and recreation", "Social Housing"],
		datasets : [
			{
				label : "TeamB score",
				// data : [20, 35, 40, 60, 50, 20, 35, 40, 60, 50],
				data: assetCount,
				backgroundColor : [
                    "#FAEBD7",
                    "#DCDCDC",
                    "#E9967A",
                    "#F5DEB3",
                    "#9ACD32",
                    "#DCDCDC",
                    "#E9967A",
                    "#F5DEB3",
                    "#DCDCDC",
                    "#E9967A"
                ],
                borderColor : [
                    "#FAEBD7",
                    "#DCDCDC",
                    "#E9967A",
                    "#F5DEB3",
                    "#9ACD32",
                    "#DCDCDC",
                    "#E9967A",
                    "#F5DEB3",
                    "#DCDCDC",
                    "#E9967A"
                ],
                borderWidth : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			}
		]
	};


	var chart1 = new Chart( ctx1, {
		type : "pie",
		data : data1,
		options : options
	});


}

	