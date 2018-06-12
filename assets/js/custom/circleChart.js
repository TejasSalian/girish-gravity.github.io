(function ($) {
    $.fn.circleChart = function (options) {
        var settings = $.extend({
            // These are the defaults.
            dataCircleColor: "black",
            innerCircleColor: "black",
            outerCircleColor: "#c5c5c5",
            radius: null,
            percentage: 0.28,
            legend: "Legend",
            radius: null,
            innerLineWidth: 1,
            outerLineWidth: 3,
            outerDataWidth: 8,
            innerOuterGap: 8,
            padding: 5,
            data: 0,
            msg: [""]
        }, options);

        if (window.id === undefined)
            window.id = 1;

        return this.each(function () {
            var item = $(this);
            var width = item.width();
            var height = item.height();

            item.html('');
            
            var canvas = createHiDPICanvas(width, height);
            canvas.id = "cancir" + window.id;
            item.append(canvas);
            var context = canvas.getContext("2d");

            window.id++;

            var radius = ((settings.radius == null) ? Math.min(width, height) / 2 : settings.radius) - settings.padding;
            // Draw inner circle
            var innerRadius = radius - settings.innerOuterGap;

            context.beginPath();
            context.strokeStyle = settings.innerCircleColor;
            context.arc(width / 2, height / 2, innerRadius, 0, 2 * Math.PI, false);
            context.lineWidth = settings.innerLineWidth;
            context.stroke();

            var degrees = settings.percentage / 100 * 360.0;
            var radians = degrees * Math.PI / 180.0;

            context.beginPath();
            context.strokeStyle = settings.dataCircleColor;
            context.arc(width / 2, height / 2, radius, Math.PI * 1.5, Math.PI * 1.5 + radians, false);
            context.lineWidth = settings.outerDataWidth;
            context.stroke();


            var gap = 0.05;
            if (settings.percentage < 100) {
                context.beginPath();
                context.strokeStyle = settings.outerCircleColor;
                if (settings.percentage == 0)
                    context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, true);
                else
                    context.arc(width / 2, height / 2, radius, Math.PI * 1.5 - gap, Math.PI * 1.5 + radians + gap, true);
                context.lineWidth = settings.outerLineWidth;
                context.stroke();
            }
            var textFontSize = 18;
            var textGap = 1;
            var verticalSpacing = 0 /* number font size*/ + ((settings.msg.length - 1) * textGap) /* gap */ + textFontSize /*text font size */;

            context.font = "40px Lato_Bold";
            context.fillStyle = "black";
            context.textAlign = "center";
            context.fillText(settings.data, width / 2, height / 2 - (verticalSpacing / 2) + textGap);

            var pos = height / 2 - (verticalSpacing / 2) + 25;
            for (var index = 0; index < settings.msg.length; index++) {
                context.font = textFontSize + "px Lato_Regular";
                context.fillStyle = "black";
                context.textAlign = "center";
                context.fillText(settings.msg[index], width / 2, pos);
                pos += textFontSize + textGap;
            }


        });


    }
}(jQuery));






 (function ($) {

     $.fn.pieChart = function (options) {
         var settings = $.extend({
             // These are the defaults.
             radius: null,
             percentage: 0.28,
             legend: "Legend",
             radius: null,
             innerLineWidth: 1,
             outerLineWidth: 8,
             padding: 2,
             msg: [""],
             data:0,
             series: [

             ]

         }, options);

         var fadeColor = function (hex, alpha) {
             var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
             var rgba = 'rgba(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ', ' + alpha + ')';

             return rgba;
         }

         if (window.id === undefined)
             window.id = 1;

         return this.each(function () {
             var item = $(this);
             var width = item.width();
             var height = item.height();

             item.html('');
             item.append("<canvas id='piecir" + window.id + "' width='" + width + "' height='" + height + "'></canvas>");
             var context = document.getElementById("piecir" + window.id).getContext("2d");

             window.id++;

             var radius = ((settings.radius == null) ? Math.min(width, height) / 2 : settings.radius);
             // Draw inner circle
             var innerRadius = radius - 4 * (settings.outerLineWidth + settings.padding);

             context.beginPath();
             context.strokeStyle = settings.innerCircleColor;
             context.arc(width / 2, height / 2, innerRadius, 0, 2 * Math.PI, false);
             context.lineWidth = settings.innerLineWidth;
             context.stroke();

             innerRadius += settings.padding + 5;
             var start = Math.PI * 1.5;
             for (var index = 0; index < settings.series.length; index++) {
                 var degrees = settings.series[index].percentage / 100 * 360.0;
                 var radians = degrees * Math.PI / 180.0;

                 var blur = [1, .50, .30, .15];
                 var gap = 0;

                 for (var lineIndex = 0; lineIndex < 4; lineIndex++) {
                     context.beginPath();
                     context.strokeStyle = fadeColor(settings.series[index].color, blur[lineIndex]);
                     context.arc(width / 2, height / 2, innerRadius + (settings.outerLineWidth + settings.padding) * lineIndex, start, start + radians, false);
                     context.lineWidth = settings.outerLineWidth;
                     context.stroke();



                 }

                 start = start + radians + 0.03;
             }



             var textFontSize = 18;
             var textGap = 1;
             var verticalSpacing = 0 /* number font size*/ + ((settings.msg.length - 1) * textGap) /* gap */ + textFontSize /*text font size */;

             context.font = "40px Lato_Bold";
             context.fillStyle = "black";
             context.textAlign = "center";
             context.fillText(settings.data, width / 2, height / 2 - (verticalSpacing / 2) + textGap);

             var pos = height / 2 - (verticalSpacing / 2) + 25;
             for (var index = 0; index < settings.msg.length; index++) {
                 context.font = textFontSize + "px Lato_Regular";
                 context.fillStyle = "black";
                 context.textAlign = "center";
                 context.fillText(settings.msg[index], width / 2, pos);
                 pos += textFontSize + textGap;
             }
         });


     }
 }(jQuery));




 var PIXEL_RATIO = (function () {
     var ctx = document.createElement("canvas").getContext("2d"),
         dpr = window.devicePixelRatio || 1,
         bsr = ctx.webkitBackingStorePixelRatio ||
               ctx.mozBackingStorePixelRatio ||
               ctx.msBackingStorePixelRatio ||
               ctx.oBackingStorePixelRatio ||
               ctx.backingStorePixelRatio || 1;

     return dpr / bsr;
 })();


 createHiDPICanvas = function (w, h, ratio) {
     if (!ratio) { ratio = PIXEL_RATIO; }
     var can = document.createElement("canvas");
     can.width = w * ratio;
     can.height = h * ratio;
     can.style.width = w + "px";
     can.style.height = h + "px";
     can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
     return can;
 }

