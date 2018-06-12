
var _totalProject = 0;
var _runningProject = 0;
var _completedProject = 0;
var _projectData = null;
var _isFileUploaded = false;

$(document).ready(function () {
    $('#fullpage').fullpage({
        anchors: ['firstPage'],
        css3: true,
        scrollingSpeed: 1000,
        scrollOverflow: true,
    });

    GetNotificationCount();
    //setInterval(function () {
    //    GetNotificationCount();
    //}, 10000);

    var cb = new CallBack();
    cb.func = "onGetProjectList";
    blockUI("body");
    _gUserService.GetProjectList("", cb, true);


    $('#txtProName').donetyping(function () {
        onClickSearchByName();
    });


    setInfoImgClick();


    var myDropzonep = new Dropzone("#drop-purpose", {addRemoveLinks: true});

    myDropzonep.on("removedfile", function (file) {
        var fd = new FileDetail();
        fd.pCount = parseInt($("#drop-purpose").find("#hdnProjectCount").val());
        fd.FolderName = "purpose";
        fd.FileName = file.name;

        _gUserService.DeleteFile(fd, null, true);


    });
    myDropzonep.on("complete", function (file) {
        if (file.status == "success") {
            _isFileUploaded = true;
        }
    });

    //var myDropzonei = new Dropzone("#drop-intent");
    //myDropzonei.on("complete", function (file) {
    //    if (file.status == "success") {
    //        _isFileUploaded = true;
    //    }
    //});

    //var myDropzoner = new Dropzone("#drop-req");
    //myDropzoner.on("complete", function (file) {
    //    if (file.status == "success") {
    //        _isFileUploaded = true;
    //    }
    //});


    var myDropzonef = new Dropzone("#drop-final", { maxFiles: 1, maxFilesize: 10, addRemoveLinks: true });

    myDropzonef.on("removedfile", function (file) {
        var fd = new FileDetail();
        fd.pCount = parseInt($("#drop-final").find("#hdnProjectCount").val());
        fd.FolderName = "";
        fd.FileName = file.name;

        _gUserService.DeleteFile(fd, null, true);
        $("#btnsubmit").attr("disabled","disabled");

    });
    myDropzonef.on("complete", function (file) {
        if (file.status == "success") {
            _isFileUploaded = false;

            var html = "";
            //if (parseInt(file.xhr.response) != "") {

            //}
            $("#btnsubmit").removeAttr("disabled");

            var ab = new alertbox();
            ab.id = "#stMsg";
            ab.showError("");
        }
    });

    myDropzonef.on("error", function (file, message) {
        var ab = new alertbox();
        ab.id = "#stMsg";
        ab.showError("Invalid file type, please upload the template downloaded on previous step.");
        this.removeFile(file);
    });

});


function onClickSetDate(ele)
{
    $(ele).parent().find(".setDate").show();
    $(ele).hide();
    $(ele).parent().find(".estimateDat").datepicker({
    });
}

function setEstimatedDate(ele, projectID)
{
    var cb = new CallBack();
    cb.func = "onSetDate"

    var pD = new ProjectDetail();
    pD.projectid = projectID;
    pD.deliverydate = $(ele).parent().find(".estimateDat").val();

    _gUserService.SetProjectDate(pD, cb, true);
    blockUI("body");
}

function onSetDate(res)
{
    unblockUI("body");
    if (res)
    {
        window.location.reload();
    }
}
var pStag = new Array();
pStag[0] = "cg";
pStag[3] = "a";
pStag[1] = "im";
pStag[2] = "c";

function onGetProjectList(res, cb) {

    if (res.length > 0) {
        $("#hdnProjects").val(res.length);
        $(".pCount").attr("value", res.length);
        _totalProject = res.length;
        _projectData = res;
        var htm = "";
        var prohtml = "";
        var ig = 0;
        var ia = 0;
        var s = 0;
        var fa = 0;

        for (var i = 0 ; i < res.length; i++) {
            var searchStat = res[i].projectstagename.toLowerCase().replace(" ", "");

            if (searchStat == "informationgathering" && parseInt(res[i].status) <= 0)
                ig++;
            else if (searchStat == "informationarchitecture" && parseInt(res[i].status) <= 0)
                ia++;
            else if (searchStat == "storyboard" && parseInt(res[i].status) <= 0)
                s++;
            else if (searchStat == "finalartwork" && parseInt(res[i].status) <= 0)
                fa++;

            var stat = "Running <br /><span class='" + pStag[res[i].projectstage] + "'>" + res[i].projectstagename + "</span>";
            var ostat = "Running";
            if (parseInt(res[i].status) > 0) {
                stat = "Completed";
                ostat = "Completed";
                _completedProject += 1;
                searchStat = "";
            }
            else {
                _runningProject += 1;
            }

         

            var acHtml = "";
            if (res[i].estimateddelivery == null) {
                acHtml += "<input type='button' class='btn btn-blue btn-block' value='Set' onclick='onClickSetDate(this)' /> <div class='form-group setDate' style='display:none'>" +
                       
                       " <div class='input-group'>" +
                         " <input type='text' class='form-control estimateDat' placeholder='Date'>" +
                          "<div onClick='setEstimatedDate(this," + res[i].projectid + ")' class='input-group-addon btn dateok'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></div>" +
                       " </div>" +
                     " </div> ";
            }
            else
                acHtml += " <div class='input-group'>" +
                         " <input type='text' class='form-control estimateDat' placeholder='Date' value='"+new Date(res[i].estimateddelivery).toLocaleDateString()+"'>" +
                          "<div onClick='setEstimatedDate(this," + res[i].projectid + ")' class='input-group-addon btn dateok'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></div>" +
                       " </div>";


            var verH = "<br><span class='clr-red'>Deactivated</span>";
            if (res[i].isverified)
            {
                verH = "";
            }

            htm += "<tr>" +
                          "<td id='" + res[i].projectid + "' stage='" + res[i].projectstage + "' onclick='onClickOpenProject(this)'>" + res[i].projectname + "<br />" +
                                "<span>Started on " + new Date(res[i].startdate).toLocaleDateString() + "</span><br />" +
                    "<span>" + res[i].orgname + "</span></td>" +
                            "<td>" + res[i].projecttypename + "</td>" +
                            "<td>" + res[i].firstname + " " + res[i].lastname +
                            "<br><span>" + res[i].email + " </span>" +
                             "<br><span>" + res[i].phone + " </span>" + verH+
                            "</td>" +
                            "<td>" + stat +"</td>" +
                             "<td>" + acHtml + " </td>" +
                        "</tr>";


            var indicator = "";
            if (parseInt(res[i].projectstage) == 0) {
                indicator = "<li class='active'>IG</li>" +
               "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
               "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
               "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
            }
            else if (parseInt(res[i].projectstage) == 1) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
              "<li class='active'>IA</li>" +
              "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
              "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
            }
            else if (parseInt(res[i].projectstage) == 2) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
                    "<li><i class='glyphicon glyphicon-ok'></i></li>" +
              "<li class='active'>S</li>" +
              "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
            }
            else if (parseInt(res[i].projectstage) == 3) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
             "<li class='active'>FA</li>";
            }


            if (parseInt(res[i].status) > 0) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
             "  <li><i class='glyphicon glyphicon-ok'></i></li>";
            }

            prohtml += "<div class='col-md-4 mix " + ostat.toLowerCase() + " " + searchStat + "'>" +
                                    "<div id='" + res[i].projectid + "' stage='" + res[i].projectstage + "' onclick='onClickOpenProject(this)' class='" + pStag[res[i].projectstage] + " pholder'>" +
                                        "<div class='pImgHolder'>" +
                                            "<div class='shHov'>" +
                                                "<img src='assets/imgs/eye.png' />" +
                                            "</div>" +
                                            "<img src='service/getfile.aspx?type=timage&id=" + res[i].templateid + "' />" +
                                            "</div>" +
                                        "<div class='line'>" +
                                        "</div>" +
                                        "<div>" +
                                            "<table class='fullT projT'>" +
                                                "<tr>" +
                                                    "<td class='txt-lt vTop'>" +
                                                        "<p class='lr14b pnams'>" + res[i].projectname + "</p>" +
                                                        "<span class='ll12i'>Started on " + new Date(res[i].startdate).toLocaleDateString() + "</span></td>" +
                                                    "<td></td>" +
                                                    "<td class='lr14b vTop'>" + res[i].projecttypename +
                                                    "</td>" +
                                                "</tr>" +
                                                "<tr>" +
                                                    "<td colspan='2'>" +
                                                        "<ul class='indicator'>" +
                                                           indicator +
                                                        "</ul>" +
                                                    "</td>" +
                                                    "<td>" +
                                                        "<p class='pro-ow-name'>" + res[i].firstname + " " + res[i].lastname + "</p>" +

                                                        "<p class='ll12i pro-ow-name'>" + res[i].orgname + "</span>" +
                                                    "</td>" +
                                                "</tr>" +
                                            "</table>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>";
        }
        $("#proListTable").html(htm);
        $("#ProContainer").html(prohtml);
        $('#example').DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "scrollY": "530px",
            "scrollCollapse": false,
            "paging": false,
            "bFilter": true,
            "bInfo": false,
            "bAutoWidth": false,
            "oLanguage": { "sSearch": "<i class='icon-cls glyphicon glyphicon-search'></i>" },
            "dom": ' <"search"f><"top"l>rt<"bottom"ip><"clear">',
            "aaSorting": []

        });


    }

    $("#das-run-pro").html(_runningProject);
    $("#das-tot-pro").html(_totalProject);
    $("#totalProCirc").circleChart({ percentage: 100, data: _totalProject, msg: ["Total", "Projects"] });
    $("#runningProCirc").circleChart({ percentage: (_completedProject / _totalProject) * 100, data: _completedProject, msg: ["Closed", "Projects"] });
    $("#centerProCirc").pieChart({
        series: [
            { percentage: (ig / (_totalProject - _completedProject)) * 100, label: "Information Gathering", color: "#ea4e4e", value: ig },
            { percentage: (ia / (_totalProject - _completedProject)) * 100, label: "Information Architecture", color: "#ffcb05", value: ia },
            { percentage: (s / (_totalProject - _completedProject)) * 100, label: "Storyboard", color: "#052a44", value: s },
            { percentage: (fa / (_totalProject - _completedProject)) * 100, label: "Final Artwork", color: "#00C3FF", value: fa }
        ], msg: ["Running", "Projects"], data: (_totalProject - _completedProject)
    });

    
    $("#igCount").html(ig);
    $("#faCount").html(fa);
    $("#iaCount").html(ia);
    $("#sCount").html(s);
    unblockUI("body");
    $(".estimateDat").datepicker({
    });
}

function Note(projectid, versionid) {
    this.projectid = projectid;
    this.versionid = versionid;
    this.id = 1;
    this.notes = [];
}

Note.prototype.load = function (string) {
    if (string != null && string != "") {
        this.notes = JSON.parse(string);
        if (this.notes.length > 0) {
            this.id = this.notes[this.notes.length - 1].id;
        }
    }
}

Note.prototype.add = function (x, y, text) {
    var obj = { x: x, y: y, note: text, id: this.id++, userid:0, username:"" };
    this.notes.push(obj);
}

Note.prototype.setText = function (id, text) {
    for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id == id)
            this.notes[i].note = text;
    }
}

Note.prototype.removeNote = function (id) {
    for (var index = 0; index < this.notes.length; index++) {
        if (this.notes[index].id == id) {
            this.notes.splice(index, 1);
            break;
        }
    }
}

Note.prototype.updateServer = function () {
    var cb = new CallBack();
    cb.func = "UpdateComment"
    var pD = new ProjectDetail();
    pD.projectid = this.projectid;
    pD.versionid = this.versionid;
    pD.comments = JSON.stringify(this.notes);
    pD.userid = parseInt(localStorage.getItem('userid'));

    _gUserService.UpdateComment(pD, null, true);

}


function onUpdateNotes(res, cb) {
    if (!res) {
        alert("comment update error.")
    }
}

var _proNotes = null;
var mslider = null;
var pData = null;
var isStoryDisabled = false;
var isArtDisabled = false;


function AdminProjectDetail(ele) {
    var projectId = parseInt(ele.getAttribute("id"));
    pData = _gUserService.GetProjectDetails(projectId, null, false);
    $("#hdnProjectID").val(projectId);

    if (pData != null && pData.length > 0) {
        if (pData[0].projectstage == 0) {
            isStoryDisabled = true;
            isArtDisabled = true;
        }
        else if (pData[0].projectstage == 1) {
            isStoryDisabled = true;
            isArtDisabled = true;
        }
        else if (pData[0].projectstage == 2) {
            isStoryDisabled = false;
            isArtDisabled = true;
        }
        else if (pData[0].projectstage == 3) {
            isStoryDisabled = false;
            isArtDisabled = false;
        }
        GetAdminProjectDetails(projectId, pData[0].projectstage, ele, true);
        window.setTimeout(function () {
            $.fn.fullpage.silentMoveTo('firstPage', 3);
        }, 1000);
    }
}

function GetAdminProjectDetails(projectId, stage, element, isFirstLoad) {
    if ($(element).hasClass('not-clickable')) {
        return;
    }
    blockUI('body');

    var data = '<div style=" height:100%;">' +
                    '<ul class="nav nav-tabs container" role="tablist">' +

                        '<li role="presentation" id="liinfoGather" class="active" ' +
                        'onclick="GetAdminProjectDetails(' + projectId + ', 0, this, false)">' +
                            '<a data-toggle="tab" data-target="#infoGather">' +
                                '<img class="gathImg" src="assets/imgs/gath.png" /><br />' +
                                'InformationGathering' +
                            '</a>' +
                        '</li>' +

                        '<li role="presentation">' +
                            '<div style="position: relative; padding: 10px 15px;">' +
                                '<img class="arr" src="assets/imgs/arrow3.png" />' +
                            '</div>' +
                        '</li>' +

                        '<li role="presentation" id="liinfoArch" class="active" ' +
                        'onclick="GetAdminProjectDetails(' + projectId + ', 1, this, false)">' +
                            '<a data-toggle="tab" data-target="#infoArch">' +
                                '<img class="arcImg" src="assets/imgs/arch2.png" /><br />' +
                                'Information Architecture' +
                            '</a>' +
                        '</li>' +

                        '<li role="presentation">' +
                            '<div style="position: relative; padding: 10px 15px;">' +
                                '<img class="arr" src="assets/imgs/arrow3.png" />' +
                            '</div>' +
                        '</li>' +

                        '<li role="presentation" id="listoryBoard" class="active" ' +
                        'onclick="GetAdminProjectDetails(' + projectId + ', 2, this, false)">' +
                            '<a data-toggle="tab" data-target="#storyBoard">' +
                                '<img class="storyImg" src="assets/imgs/story2.png" /><br />' +
                                'Storyboard' +
                            '</a>' +
                        '</li>' +

                        '<li role="presentation">' +
                            '<div style="position: relative; padding: 10px 15px;">' +
                                '<img class="arr" src="assets/imgs/arrow3.png" />' +
                            '</div>' +
                        '</li>' +

                        '<li role="presentation" id="lifinalArt" class="active" ' +
                        'onclick="GetAdminProjectDetails(' + projectId + ', 3, this, false)">' +
                            '<a data-toggle="tab" data-target="#finalArt">' +
                                '<img class="storyImg" src="assets/imgs/final2.png" /><br />' +
                                'Final Artwork' +
                            '</a>' +
                        '</li>' +
                    '</ul>' +

                    '<div class="tab-content-container">' +
                        '<div class="container tab-content" >' +
                            '<div class="tab-pane active" id="infoGather">' +
                                '<div id="e_slider1">' +
                                    '<div class="reqDiv">' +
                                        '<div class="spname clr-blue">' + pData[0].projectname + '</div>' +
                                        '<div class="sptitle">CONTENT/PURPOSE</div>' +
                                        '<div class="row" style="margin-top: 30px;">' +
                                            '<div class="col-md-6 ">' +
                                                '<div data-type="textarea" class="qBox">' +
                                                    '<p>What is the over all purpose of this visualisation?</p>' +
                                                    '<textarea rows="6" placeholder="Please mention the purpose of this visualisation">' + pData[0].answer +
                                                    '</textarea>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-6">' +
                                                '<div data-type="textarea" class="qBox">' +
                                                    '<p>In what way do you intend to present this information ?</p>' +
                                                    '<span>(i.e: as part of a collaborative workshop, as a communication requiring no interaction, as a presentation, as a sales pitch or as a point of discussion in a meeting etc.)</span>' +
                                                    '<textarea rows="4" placeholder="Describe briefly how this visualisation would be presented">' + pData[1].answer +
                                                    '</textarea>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-6" style="margin-top: 30px;">' +
                                                '<div data-type="textarea" class="qBox">' +
                                                    '<p>Who is the intended audience for this visualisation ?</p>' +
                                                    '<textarea rows="6" placeholder="Please list the intended audience for this visualisation">' + pData[2].answer + '</textarea>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-6" style="margin-top: 30px;">' +
                                                '<div>UPLOADS</div>' +
                                                '<div class="cent">' +
                                                    '<a href="service/GetFile.aspx?type=fileZip&id=' + projectId + '" class="btn btn-blue">Download</a>' +
                                              '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="reqDiv">' +
                                        '<div class="spname clr-blue">' + pData[0].projectname + '</div>' +
                                        '<div class="sptitle">CONTENT/INTENT</div>' +
                                        '<div class="row" style="margin-top: 30px;">' +
                                            '<div class="col-md-6 ">' +
                                                '<div data-type="textarea" class="qBox">' +
                                                    '<p>What is the one main message you want to put across through this infographic?</p>' +
                                                    '<textarea style="height: 115px;" placeholder="Please mention the key message of this visualisation">' + pData[3].answer + '</textarea>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-6">' +
                                                '<div data-type="textarea" class="qBox">' +
                                                    '<p>What title would you give to this infographic ?*</p>' +
                                                    '<textarea rows="6" placeholder="Suggest a title that would describe the purpose of the visualisation">'
                                                    + pData[4].answer + '</textarea>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-6" style="margin-top: 30px;">' +
                                                '<div data-type="textarea" class="qBox">' +
                                                    '<p>Who will be presenting this visualisation and why ?</p>' +
                                                    '<textarea rows="6" placeholder="Please mention who would be presenting this visualisation">' + pData[5].answer +
                                                    '</textarea>' +
                                                '</div>' +
                                            '</div>' +
                                            //'<div class="col-md-6" style="margin-top: 30px;">' +
                                            //    '<div>UPLOADS</div>' +
                                            //    '<div class="qBox">' +
                                            //    '</div>' +
                                            //'</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="reqDiv">' +
                                        '<div class="spname clr-blue">' + pData[0].projectname + '</div>' +
                                        '<div class="sptitle">REQUIREMENTS</div>' +
                                        '<div class="row" style="margin-top: 30px;">' +
                                            '<div class="col-md-6 ">' +
                                                '<div class="qBox" style="padding: 40px;">' +
                                                    '<div data-type="ratio">' +
                                                        '<p >How will you be presenting this information? ' +
                                                        '</p><span>Check whichever options are applicable:</span><br />' +
                                                    '   <div class="radio radio-info radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio1" value="On Screen" name="e_qid7" />' +
                                                            '<label for="e_inlineRadio1">On Screen </label>' +
                                                        '</div>' +
                                                        '<div class="radio  radio-info  radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio2" value="As a handout (on paper)" name="e_qid7" />' +
                                                            '<label for="e_inlineRadio2">As a handout (on paper) </label>' +
                                                        '</div>' +
                                                        '<div class="radio  radio-info  radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio3" value="As an interactive visualisation" name="e_qid7" />' +
                                                            '<label for="e_inlineRadio3">As an interactive visualisation </label>' +
                                                        '</div>' +
                                                        '<div class="radio  radio-info  radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio4" value="Other" name="e_qid7" />' +
                                                            '<label for="e_inlineRadio4">Other </label>' +
                                                        '</div>' +
                                                        '<input type="text" id="e_txtOthers" style="font-size: 12px; padding: 5px; width: 200px;" '
                                                        + 'placeholder="please specify" />' +
                                                    '</div>' +
                                                    '<div data-type="ratio" style="margin-top: 20px;">' +
                                                        '<p>' +
                                                            'Are you going to use this visualisation as:' +
                                                        '</p><span>Check whichever options are applicable:</span><br />' +
                                                        '<div class="radio radio-info radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio11" value="One time communication" name="e_qid8" />' +
                                                            '<label for="e_inlineRadio11">One time communication </label>' +
                                                        '</div>' +
                                                        '<div class="radio  radio-info  radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio12" value="Future reference / guide" name="e_qid8" />' +
                                                            '<label for="e_inlineRadio12">Future reference / guide </label>' +
                                                        '</div>' +
                                                        '<div class="radio  radio-info  radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio13" ' +
                                                            'value="A document that is going to be updated / changed over time" name="e_qid8" />' +
                                                            '<label for="e_inlineRadio13">A document that is going to be updated / changed over time </label>' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div data-type="ratio" style="margin-top: 20px;">' +
                                                        '<p style="margin-bottom: 15px;">Would you like to receive editable/source files as a deliverable ?</p>' +
                                                        '<div class="radio radio-info radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio21" value="Yes" name="e_qid9" />' +
                                                            '<label for="e_inlineRadio21">Yes </label>' +
                                                        '</div>' +
                                                        '<div class="radio  radio-info  radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio22" value="No" name="e_qid9" />' +
                                                            '<label for="e_inlineRadio22">No </label>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-6" style="">' +
                                                '<div class="qBox">' +
                                                    '<div data-type="textarea">' +
                                                        '<p>' +
                                                            'Are there any specific elements that you would like to be included necessarily in the visualisation ?' +
                                                        '</p>' +
                                                        '<span>(Such as brand/organisation colours, mascots, characters, names and any other ' +
                                                        'features that you would like to appear in the infographic )</span>' +
                                                        '<textarea style="height: 60px; margin-top: 5px;" placeholder="">'
                                                        + pData[9].answer + '</textarea>' +
                                                    '</div>' +

                                                    '<div data-type="ratio" style="margin-top: 10px;">' +
                                                        '<p style="margin-bottom: 0px;">Please make sure you (the client) have provided us with the ' +
                                                        'following items:</p>' +
                                                        '<div class="radio  radio-info  radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio32" value="Logos in editable format" name="e_qid11" />' +
                                                            '<label for="e_inlineRadio32">Logos in editable format </label>' +
                                                        '</div>' +
                                                        '<div class="radio radio-info radio-inline">' +
                                                            '<input type="radio" id="e_inlineRadio31" value="Brand guidelines or Brand manual" name="e_qid11" />' +
                                                            '<label for="e_inlineRadio31">Brand guidelines or Brand manual</label>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            //'<div class="col-md-6" style="margin-top: 30px;">' +
                                            //    '<div>UPLOADS</div>' +
                                            //    '<div class="qBox">' +
                                            //    '</div>' +
                                            //'</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="reqDiv">' +
                                        '<div class="spname clr-blue">' + pData[0].projectname + '</div>' +
                                        '<div class="sptitle">INFOGRAPHIC TYPE</div>' +
                                        '<div class="row" style="margin-top: 30px;">' +
                                            '<div class="col-md-12" style="font-size: 16px;">' +
                                                '<div class="col-md-2 cent">' +
                                                    'Selected Infographic Type' +
                                                '</div>' +
                                                '<div class="col-md-10 cent">' +
                                                    'Selected Infographic Layout' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-12">' +
                                                '<div class="col-md-2" style="height: 420px; overflow: auto;">' +
                                                    '<div class="infoTypeThum active">' +
                                                        '<img class="infoTypeImg" data-id="e_lay' + pData[11].templateid + '" src="service/getfile.aspx?type=timage&id=' + pData[11].templateid + '" />' +
                                                        '<div>' + pData[11].templatename + '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-md-10" style="height: 420px; overflow: auto;">' +
                                                    '<div class="layouts" id="e_lay' + pData[11].templateid + '" style="display: block;">' +
                                                        '<div style="width: 420px; margin: 0 auto;">' +
                                                            '<div class="e_lay' + pData[11].templateid + '">' +
                                                                '<img src="service/getfile.aspx?type=timage&id=' + pData[11].templateid + '" /><br />' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="laydesc">' + pData[11].layoutdesc +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="row" style="display: none;">' +
                                            '<div class="col-md-2">' +
                                            '</div>' +
                                            //'<div class="col-md-10">' +
                                            //    '<div class="cent">' +
                                            //        '<a href="service/GetFile.aspx?type=file&id=' + projectId + '" class="btn btn-blue">Download</a>' +
                                            //    '</div>' +
                                            //'</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="reqDiv">' +
                                        '<div class="spname clr-blue">' + pData[0].projectname + '</div>' +
                                        '<div class="sptitle">FINALIZE</div>' +
                                        '<div style="text-align: center;">' +
                                            '<div class="cent">' +
                                                    '<a href="service/GetFile.aspx?type=file&id=' + projectId + '" class="btn btn-blue">Download</a>' +
                                              '</div>' +
                                        '</div>' +
                                        '<div>' +
                                        '<br />' +
                                    'Upload the filled-in templates here. Please note that the completed templates will greatly enable the implementation of the project. <br />'+
'If you have not downloaded the templates, please Go Back to the previous screen and download the same. '+
'You can also upload other documents that are relevant for this project. </div>' +
                                    '</div>' +
                                '</div>' +
                                '<div style="text-align: center;">' +
                                    '<a class="clr-blue" id="e_btnprev" onclick="showPrevSlide();" style="padding: 15px; cursor: pointer;">Prev</a>' +
                                    '<a class="clr-blue" id="e_btnnext" onclick="showNextSlide();" style="padding: 15px; cursor: pointer;">Next</a>' +
                                '</div>' +
                            '</div>' +

                            '<div class="tab-pane active" id="infoArch"></div>' +

                            '<div class="tab-pane active" id="storyBoard"></div>' +

                            '<div class="tab-pane active" id="finalArt"></div>' +

                            '</div>' +
                        '</div>' +
                    '</div>';

    $('#project-details').html('');
    $('#project-details').html(data);


    $('#project-details').find('input[name="e_qid7"]').each(function () {
        if ($(this).val() == pData[6].answer) {
            $('#project-details').find("input[name='e_qid7'][value='" + pData[6].answer + "']").prop('checked', true);
        }
    });

    $('#project-details').find('input[name="e_qid8"]').each(function () {
        if ($(this).val() == pData[7].answer) {
            $('#project-details').find("input[name='e_qid8'][value='" + pData[7].answer + "']").prop('checked', true);
        }
    });

    $('#project-details').find('input[name="e_qid9"]').each(function () {
        if ($(this).val() == pData[8].answer) {
            $('#project-details').find("input[name='e_qid9'][value='" + pData[8].answer + "']").prop('checked', true);
        }
    });

    $('#project-details').find('input[name="e_qid11"]').each(function () {
        if ($(this).val() == pData[10].answer) {
            $('#project-details').find("input[name='e_qid11'][value='" + pData[10].answer + "']").prop('checked', true);
        }
    });

    $('#project-details').find('input[name="e_qid7"]').attr('disabled', 'disabled');
    $('#project-details').find('input[name="e_qid8"]').attr('disabled', 'disabled');
    $('#project-details').find('input[name="e_qid9"]').attr('disabled', 'disabled');
    $('#project-details').find('input[name="e_qid11"]').attr('disabled', 'disabled');

    
        generateProjectStage(projectId, stage);
    
    if (parseInt(pData[0].projectstage) == 0) {
        currentTab = '#infoArch';
    }

    else if (parseInt(pData[0].projectstage) == 1) {
        currentTab = '#infoArch';
    }

    else if (parseInt(pData[0].projectstage) == 2) {
        currentTab = '#storyBoard';
    }

    else if (parseInt(pData[0].projectstage) == 3) {
        currentTab = '#finalArt';
    }

    $img = $(currentTab).find("#image").imgNotes({
        onAdd: function () {
            this.options.vAll = "bottom";
            this.options.hAll = "middle";
            elem = $(document.createElement('div'))
                   .css({ width: '27px', height: '40px', 'text-align': 'center', color: '#fff', 'font-weight': 'bold', 'font-size': '14px' })
            .prepend("<img src='assets/imgs/msg.png' style='width:30px; height:30px; position:absolute; top:6px; left:6px;' />");
            return elem;
        }
    });

    var lslider = null;

    window.setTimeout(function () {
        $("#e_btnprev").hide();
        var _sliders = null;
        mslider = $('#e_slider1').bxSlider({
            mode: 'horizontal',
            adaptiveHeight: true,
            onSlideBefore: function ($slideElement, oldIndex, newIndex) {

                if (newIndex == 0) {
                    $("#e_btnprev").hide();
                    $("#e_btnnext").show();
                }

                else if (newIndex == 4) {
                    $("#e_btnprev").show();
                    $("#e_btnnext").hide();
                }
                else {
                    $("#e_btnprev").show();
                    $("#e_btnnext").show();
                }
            }
        });

        mslider.reloadSlider();

        $('#liinfoGather,#liinfoArch,#listoryBoard,#lifinalArt').removeClass('active');
        $('#infoGather,#infoArch,#storyBoard,#finalArt').removeClass('active');

        if (isStoryDisabled && isArtDisabled) {
            $('#listoryBoard').find('a').addClass('not-allowed');
            $('#lifinalArt').find('a').addClass('not-allowed');
            $('#listoryBoard').find('a').removeAttr('data-toggle');
            $('#lifinalArt').find('a').removeAttr('data-toggle');
            $('#listoryBoard').addClass('not-clickable');
            $('#lifinalArt').addClass('not-clickable');
        }

        else if (isArtDisabled) {
            $('#lifinalArt').find('a').addClass('not-allowed');
            $('#lifinalArt').find('a').removeAttr('data-toggle');
            $('#lifinalArt').addClass('not-clickable');
        }

        else if ((!isStoryDisabled) && (!isArtDisabled)) {

        }

        if (isFirstLoad) {
            if (isStoryDisabled && isArtDisabled) {
                $('#infoArch').addClass('active');
                $('#liinfoArch').addClass('active');
            }

            else if (isArtDisabled) {
                $('#storyBoard').addClass('active');
                $('#listoryBoard').addClass('active');
            }

            else if ((!isStoryDisabled) && (!isArtDisabled)) {
                $('#finalArt').addClass('active');
                $('#lifinalArt').addClass('active');
            }
        }
        else {
            $('#' + element.id).addClass('active');
            $('#' + (element.id).replace('li', '')).addClass('active');
        }

        $('#new-version-images').hide();

        unblockUI('body');

    }, 1000);
}




function onClickPrevVersion(projectId, stage, versionID) {
    var p = new ProjectDetail();
    p.projectid = projectId;
    p.projectstage = stage;
    p.versionid = versionID;

    var cb = new CallBack();
    cb.func = "onGetVersionData";
    cb.data = p;

    _gUserService.GetPreviousVersion(p, cb, true);

    blockUI("body");
}

function onGetVersionData(res, cb) {


    generateVersion(res, cb.projectid, cb.projectstage);
}

function generateProjectStage(projectId, stage) {
    var p = new ProjectDetail();
    p.projectid = projectId;
    p.projectstage = stage;

    var cb = new CallBack();
    cb.func = "onGetVersionData";
    cb.data = p;

    _gUserService.GetLatestVersion(p, cb, true);

    blockUI("body");
}



function generateVersion(versionData, projectId, stage) {


    if (versionData != null)
    {
        if(versionData.total != undefined)
        {

        }
    }

    var indicator = "";
    if (pData[0].projectstage == 0) {
        indicator = "<li class='active'>IG</li>" +
       "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
       "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
       "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
    }
    else if (pData[0].projectstage == 1) {
        indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
      "<li class='active'>IA</li>" +
      "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
      "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
    }
    else if (pData[0].projectstage == 2) {
        indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
            "<li><i class='glyphicon glyphicon-ok'></i></li>" +
      "<li class='active'>S</li>" +
      "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
    }
    else if (pData[0].projectstage == 3) {
        indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
           "<li><i class='glyphicon glyphicon-ok'></i></li>" +
           "<li><i class='glyphicon glyphicon-ok'></i></li>" +
     "<li class='active'>FA</li>";
    }

    var pStatus = "Running";

    if (parseInt(pData[0].status) > 0) {
        indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
           "<li><i class='glyphicon glyphicon-ok'></i></li>" +
           "<li><i class='glyphicon glyphicon-ok'></i></li>" +
     "  <li><i class='glyphicon glyphicon-ok'></i></li>";

        pStatus = "completed";
    }



    var upNewVer = '<div id="new-version-images" style="display:none">' +
                    '<div class="container" style="padding-top: 40px;">' +
                        '<div class="col-md-12" style="text-align: left;">' +
                            '<i onclick="window.history.back();" class="backArrow glyphicon glyphicon-menu-left"></i>' +
                            '<h3>' + pData[0].projectname + '</h3>' +
                            '<p>Started on ' + new Date(pData[0].startdate).toLocaleDateString() + '</p>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-8" style="margin-top: 30px;">' +
                                '<div class="import-img">' +
                                    '<input type="file" id="newVersionImage" onchange="readURL(this);" />' +
                                    '<img id="newVersionPreview" style=" display: none;     max-width: 748px;max-height: 498px;width: auto;height: auto; margin: 0px" >' +
                                    '<span class="import-text">Click to import</span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-4" style="margin-top: 30px;">' +
                                    '<div class="import-release">' +
                                    '<span style="font-size: 22px; text-align: left;">Release Notes</span><br /><br />' +
                                    '<textarea id="newVersionText" placeholder="type..."></textarea><br />' +
                                    '<input type="button" value="Submit" ' +
                                    'onclick="onClickAddNewVersion(' + projectId + ', ' + stage + ')"  ' +
                                    'class="btn btn-lg btn-blue-full"><br /><br />' +
                                    '<div style="text-align: center">' +
                                        '<span style="font-size: 10px; color: #A2A6AB;">Or</span><br /><br />' +
                                        '<span style="color: #000; cursor: pointer;" onclick="showOldVersion();">Cancel</span>' +
                                    '</div>' +
                                '</div>' +
                                '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';



    if (versionData == null) {
        if (stage == 0) {
            $('#infoArch').html(upNewVer);
        }
        else if (stage == 1) {
            $('#infoArch').html(upNewVer);
        }
        else if (stage == 2) {
            $('#storyBoard').html(upNewVer);
        }
        else if (stage == 3) {
            $('#finalArt').html(upNewVer);
        }

        unblockUI("body");
        window.setTimeout(function () { $("#new-version-images").show() }, 500);
        return;
    }

    var dis = "";
    if (!versionData.islatestversion || versionData.versiondata[0].isapproved)
        dis = "disabled";
    var releaseNotes = '';

    var isApproved = 'Approve';
    var disabled = '';

    var p = new ProjectDetail();
    p.projectid = projectId;
    p.projectstage = stage;

    var latestVersion = versionData.versiondata[0];

    if (latestVersion != null) {
        latestVersionImg = latestVersion.image;
        p.versionid = latestVersion.versionid;
        isApproved = (latestVersion.isapproved == true) ? 'Approved' : 'Approve';
        disabled = (latestVersion.isapproved == true) ? 'disabled' : '';
        releaseNotes = latestVersion.releasenote;
    }
    var vHtml = "";

    if (!versionData.islatestversion) {
        vHtml += '<table class="btn-latest"  onclick="generateProjectStage(' + projectId + ',' + stage + ')">' +
                            '<tr>' +
                                '<td><img style="height: 14px; margin: 0;" src="assets/imgs/eye.png" /></td>' +
                                '<td>Latest Version</td>' +
                            '</tr>' +
                        '</table>';
    }

    if (versionData.haspreviousversion) {
        vHtml +=
                        '<table class="btn-prev" onclick="onClickPrevVersion(' + projectId + ',' + stage + ',' + p.versionid + ')" >' +
                            '<tr>' +
                                '<td><img style="height: 14px; margin: 0;" src="assets/imgs/eye.png" /></td>' +
                                '<td>Previous Version</td>' +
                            '</tr>' +
                        '</table>';
    }
    else {
        vHtml += '<table class="btn-prev" style="opacity: 0.6;cursor: not-allowed;"  >' +
                          '<tr>' +
                              '<td><img style="height: 14px; margin: 0;" src="assets/imgs/eye.png" /></td>' +
                              '<td>Previous Version</td>' +
                          '</tr>' +
                      '</table>';
    }





    var data = '<div class="container" style="padding-top: 40px;" id="version-images">' +
                    '<div class="col-md-12" style="text-align: left;">' +
                        '<i onclick="window.history.back();" class="backArrow glyphicon glyphicon-menu-left"></i>' +
                        '<h3>' + pData[0].projectname + '</h3>' +
                        '<p>Started on ' + new Date(pData[0].startdate).toLocaleDateString() + '</p>' +
                    '</div>' +
                    '<div class="col-md-12">' +
                        '<button type="button" style="width: 160px;" onclick="showUploadNewVersion()" ' + dis +
                        ' class="btn-blue btn pull-right">Upload New Version</button>' +
                        vHtml +
                    '</div>' +
                    '<div class="col-md-12 imgtool_cont" style="">' +
                    '<div class="imgTool_content">'
                            + '<p> Please use <span style="color:#00C3FF;"> Add comments</span> button to add your feedback by clicking on the image. Please click<span style="color:#00C3FF;"> Send Feedback </span> to submit your comments to visualinsights team.</p>' +
                           '</div>' +
                        '<div id="imgPort" class="imgdiv">' +
                            '<img id="image" src="service/getfile.aspx?type=vimage&id=' + p.versionid + '" style="display: none;" />' +
                            '<div class="imgTool">' +
                                '<table class="fullT">' +
                                    '<tr>' +
                                        '<td>' +
                                            '<div class="switch" style="width: 50px; margin: 0 auto;">' +
                                                '<input id="cmn-toggle-41" onchange="onChangeAnnot(this)" ' +
                                                'class="cmn-toggle cmn-toggle-round-flat" type="checkbox" />' +
                                                '<label for="cmn-toggle-41"></label>' +
                                            '</div>' +
                                            '<p>Comments</p>' +
                                            '<p>On/Off</p>' +
                                        '</td>' +
                                        '<td>' +
                                            '<img src="assets/imgs/fillscreen.png" />' +
                                            '<p>Full screen</p>' +
                                        '</td>' +
                                        '<td>' +
                                            '<img onclick="fitToScreen()" src="assets/imgs/fit_to_page.png" />' +
                                            '<p>Fit to Page</p>' +
                                        '</td>' +
                                        '<td></td>' +
                                        '<td><a  onclick="if(!$(this).hasClass(&apos;disabled&apos;)){addComment();}" class="' + dis + '">' +
                                            '<img src="assets/imgs/add_comment.png" />' +
                                            '<p>Add Comments</p>' +
                                        '</td></a>' +
                                        '<td>' +
                                            '<img src="assets/imgs/pan.png" />' +
                                            '<p>Pan</p>' +
                                        '</td>' +
                                        '<td></td>' +
                                        '<td></td>' +
                                         '<td></td>' +
                                        '<td><a target="_blank" href="HtmlTemplateTest.aspx?vid=' + p.versionid + '&v=' + versionData.version + '">' +
                                            '<img src="assets/imgs/export.png" />' +
                                            '<p>Export</p>' +
                                        '</td></a>' +
                                    '</tr>' +
                                '</table>' +
                            '</div>' +
                           
                               '<div class="vNotes" id="verNote">' +
                                '<div class="notesDiv">' +
                                    '<div class="shDiv" id="shbtnDiv" onclick="openNotePanel(this)">' +
                                        '<img style="margin-top: 40px !important;" src="assets/imgs/bleft_arrow.png" class="leftA" />' +
                                        '<img style="margin-top: 40px !important;" src="assets/imgs/bright_arrow.png" class="rightA" />' +
                                    '</div>' +
                                    '<h2 class="flt m0 txtlt">Release Notes' +
                                        '<img onclick="$(&#39;#shbtnDiv&#39;).click();" ' +
                                        'style="height: 30px; cursor: pointer; float: right;" src="assets/imgs/close2.png" />' +
                                    '</h2>' +
                                    '<div class="verNotedata">' +
                                        '<div class="vCount">Version ' + versionData.version + '<span class="vDate">(' + new Date(latestVersion.releasedate).toLocaleDateString() + ')</span></div>' +
                                        '<p>' + releaseNotes + '</p>' +
                                    '</div>' +
                                    '<div class="txtlt pgOwn">' +
                                        '<p class="lr14b pb5">Project Owner:</p>' +
                                        '<p class="lr14b cbfb">' + pData[0].firstname + ' ' + pData[0].lastname + '</p>' +
                                        '<p class="ll12i">' + pData[0].orgname + '</p>' +
                                    '</div>' +
                                    '<div class="txtlt pgDat">' +
                                        '<p class="lr14b pb5">Estimated Delivery Date:</p>' +
                                        '<p class="lr14b cbfb">';

    if (pData[0].estimateddelivery == null)
        data += "Not Set";
    else
        data += new Date(pData[0].estimateddelivery).toLocaleDateString();
                                        
    data +=          '</p>' +
                                        '<div class="' + pStag[pData[0].projectstage] + ' pind">' +
                                        "<ul class='indicator'>" +
                                            indicator + "</ul>" +
                                            '<span class="txtSmBl">' + pStatus + '</span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +                           
                        '</div>' +
                    '</div>' +
                '</div>' + upNewVer;

    if (stage == 1) {
        $('#infoArch').html('');
        $('#infoArch').html(data);
        currentTab = '#infoArch';
    }
    else if (stage == 2) {
        $('#storyBoard').html('');
        $('#storyBoard').html(data);
        currentTab = '#storyBoard';
    }
    else if (stage == 3) {
        $('#finalArt').html('');
        $('#finalArt').html(data);
        currentTab = '#finalArt';
    }

    $img = $(currentTab).find("#image").imgNotes({
        onAdd: function () {
            this.options.vAll = "bottom";
            this.options.hAll = "middle";
            elem = $(document.createElement('div'))
                   .css({ width: '27px', height: '40px', 'text-align': 'center', color: '#fff', 'font-weight': 'bold', 'font-size': '14px' })
            .prepend("<img src='assets/imgs/msg.png' style='width:30px; height:30px; position:absolute; top:6px; left:6px;' />");
            return elem;
        }
    });

    if (latestVersion != null) {
        _proNotes = new Note(p.projectid, latestVersion.versionid);

        if (latestVersion.comments != null) {
            _proNotes.load(latestVersion.comments);
        }
    }

    //var html = '<div class="imgTool_content">'
    //                       + '<p> Please use <span style="color:#00C3FF;"> Add comments</span> button to add your feedback by clicking on the image. Please click<span style="color:#00C3FF;"> Send Feedback </span> to submit your comments to visualinsights team. </p>' +
    //                       '</div>';
    //$('.imgtool_cont').append(html);
    unblockUI("body");
}

function showPrevSlide() {
    mslider.goToPrevSlide();
}

function showNextSlide() {
    mslider.goToNextSlide();
}

function onClickProject(ele) {
    $(ele).parent().parent().find(".active").removeClass("active");

    $("#pro-run").html(_runningProject);
    $("#pro-tot").html(_totalProject);

    $(ele).addClass("active");
    $.fn.fullpage.silentMoveTo('firstPage', 1);
    window.setTimeout(function () { $('#ProContainer').mixItUp() }, 1000);
}

function onClickDashboard(ele) {
    $(ele).parent().parent().find(".active").removeClass("active");

    $(ele).addClass("active");

    $.fn.fullpage.silentMoveTo('firstPage', 0);
}


function onClickStartProject(ele) {
    $(ele).parent().parent().find(".active").removeClass("active");

    $(ele).addClass("active");

    var data = _gUserService.GetProjectTemplates(new ProjectDetail(), null, false);

    if (data != null && data.length > 0) {
        $("#fDown").attr("href", data[0].file)
        var layout = "";
        var templates = '<div class="col-md-2" style="height: 420px; overflow: auto;">';
        for (var index = 0; index < data.length; index++) {
            templates += '<div class="infoTypeThum" id="template' + data[index].templateid + '">' +
                            '<img class="infoTypeImg" data-file="' + data[index].file + '" data-id="lay' + data[index].templateid + '" src="service/getfile.aspx?type=timage&id=' + data[index].templateid + '" />' +
                            '<div>' + data[index].templatename + '</div>' +
                        '</div>';

            layout += '<div class="layouts" id="lay' + data[index].templateid + '">' +
                        '<div style="width: 420px; margin: 0 auto;">' +
                            '<div class="lay' + data[index].templateid + '">' +
                                '<img src="service/getfile.aspx?type=timage&id=' + data[index].templateid + '" />' +
                            '</div>' +
                         '</div>' +
                         '<div class="laydesc">' + data[index].layoutdesc + '</div>' +
                    '</div>';
        }

        templates += '</div>' +
                '<div class="col-md-10" style="height: 420px; overflow: auto;">' + layout + '</div>';


        $('#layout-templates').html('');
        $('#layout-templates').html(templates);

        $('#template1').addClass('active');

        setInfoImgClick();

        $.fn.fullpage.silentMoveTo('firstPage', 2);
        _isFileUploaded = false;
    }
}





function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}



var $img = null;
//var elementArray = [{ x: "0.5", y: "0.5", note: "AFL Grand Final Trophy AFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand FinalAFL Grand Final", id: 1 },
//                                { x: "0.322", y: "0.269", note: "Brisbane Lions Flag", id: 2 },
//                                { x: "0.824", y: "0.593", note: "Fluffy microphone", id: 3 }];

function addComment() {
    $img.imgNotes("option", "isAdd", true);
}


function InitPop() {
    $('.ppOver').each(function () {
        $(this).popover({
            html: true,
            placement: function (context, source) {
                var position = $(source).position();

                if (position.left > 250 && position.top > 125) {
                    return "left";
                }

                if (position.left < 250 && position.top > 125) {
                    return "right";
                }

                if (position.top < 250) {
                    return "bottom";
                }

                return "top";
            },
            content: function () {
                var el = "disabled";
                if ($img.imgNotes("option", "isAdd")) {
                    el = "";
                }
                var Name = $(this).attr("data-uname");
                if (Name == undefined)
                    Name = $("#hdnUName").val();

                var htm = "<div data-popid='#" + $(this).attr("id") + "' id='_" + $(this).attr("id") + "' class='popCont'><textarea " + el + ">" + $(this).find('.pCont').html() + "</textarea> </div><img src='assets/imgs/close.png' data-popid='#" +
                    $(this).attr("id") + "' onclick='onClickClosePP(this)'  class='closePop' />" +
                    "<div class='poNameDiv'><img src='assets/imgs/profile_img.png' class='proImg' /> &nbsp;" + Name +
                    "</div><div style='height: 40px;'> ";

                if (parseInt($("#hdnUserID").val()) == parseInt($(this).attr("data-uid")) || $(this).attr("data-uid") == undefined) {
                    htm += "<img src='assets/imgs/delete.png' data-popid='#" + $(this).attr("id") + "' onclick='onClickDeletePP(this)' class='pdelImg' /> " +
                    "<img class='saveImg' onclick='onClickSavePP(this)' src='assets/imgs/tick.png' />" +
                    "<img class='editImg' onclick='onClickEditPP(this)' src='assets/imgs/edit.png' />";
                }

                htm += "</div> </div>";

                return htm;
            },
            trigger: 'disabled',
            animation: true
        }).on('shown.bs.popover', function () {
            var popup = $(this);
            $(this).parent().find("div.popover .close").click(function () {
                popup.click();
            });
        });
    });
}

function onChangeAnnot(ele) {
    if ($(ele).is(":checked")) {
        Import();
    }
    else {

        $('.ppOver').popover("hide");
        $img.imgNotes('clear');
    }
}



function Import() {
    $img.imgNotes("import", _proNotes.notes);
    InitPop();
}

function onClickClosePP(ele) {
    var id = $(ele).attr("data-popid");
    $(id).popover('hide');
}
function onClickSavePP(ele) {
    $parent = $(ele).parent().parent();
    $parent.find("textarea").attr("disabled", "disabled");
    $parent.find(".editImg").show();
    $(ele).hide();
    $mainelem = $($parent.find(".popCont").attr("data-popid"));
    var ID = parseInt($mainelem.find(".nID").val());
    var cObj = { x: $mainelem.attr("data-relx"), y: $mainelem.attr("data-rely"), note: $parent.find("textarea").val().trim(), id: ID };

    if (ID == 0) {
        _proNotes.add(cObj.x, cObj.y, cObj.note);
    }
    else {
        _proNotes.setText(ID, cObj.note);

    }

    $img.imgNotes("import", [cObj]);
    _proNotes.updateServer();
    InitPop();

}

function onClickEditPP(ele) {
    $parent = $(ele).parent().parent();
    $parent.find("textarea").removeAttr("disabled");
    $parent.find(".editImg").hide();
    $parent.find(".saveImg").show();
}



function onClickDeletePP(ele) {
    $parent = $(ele).parent().parent();
    $mainelem = $($parent.find(".popCont").attr("data-popid"));

    var cObj = { x: $mainelem.attr("data-relx"), y: $mainelem.attr("data-rely"), note: $parent.find("textarea").val().trim(), id: parseInt($mainelem.attr("data-id")) };

    _proNotes.removeNote(cObj.id);

    $mainelem.popover('hide');
    $mainelem.remove();
    _proNotes.updateServer();
    //$img.imgNotes("import", [elementArray]);

}

function fitToScreen() {
    $(currentTab).find("#image").imgViewer("option", "zoom", 1);
}

function zoomIn() {
    var val = parseFloat($(currentTab).find("#image").imgViewer("option", "zoom")) + 0.4;
    if (val < 1)
        val = 1;
    $(currentTab).find("#image").imgViewer("option", "zoom", val);
}

function zoomOut() {
    var val = parseFloat($(currentTab).find("#image").imgViewer("option", "zoom")) - 0.4;
    if (val < 1)
        val = 1;
    $(currentTab).find("#image").imgViewer("option", "zoom", val);
}



function openNotePanel(ele) {
    $(ele).toggleClass("active");
    $(ele).parents(".vNotes").toggleClass("active");

}


function onChangedFilter() {
    var val = "";
    var Typeval = $("#ddType").val();
    var StageVal = $("#ddStage").val();

    var sType = Typeval.split(",");
    var sStage = StageVal.split(",");

    for (var i = 0; i < sType.length; i++) {
        if (sType.length == 1 && sStage.length > 1) {
            val += sType[i];
            val += ",";
        }

        for (var j = 0; j < sStage.length; j++) {
            val += sType[i] + sStage[j];
            val += ",";
        }
    }
    val = val.substring(0, val.length - 1);

    var array = val.split(',');


    $('#ProContainer').mixItUp('filter', val);
}



function onClickSearchByName() {
    $('#ProContainer').mixItUp('destroy', true);
    var name = $("#txtProName").val().toLowerCase();
    blockUI("body");
    var res = _projectData;
    var prohtml = "";
    for (var i = 0 ; i < res.length; i++) {

        if (res[i].projectname.toLowerCase().indexOf(name) > -1) {

            var searchStat = res[i].projectstagename.toLowerCase().replace(" ", "");
            var ostat = "Running";
            if (parseInt(res[i].status) > 0) {
                ostat = "Completed";
                searchStat = "";
            }

            var indicator = "";
            if (parseInt(res[i].projectstage) == 0) {
                indicator = "<li class='active'>Cg</li>" +
               "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
               "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
               "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
            }
            else if (parseInt(res[i].projectstage) == 1) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
              "<li class='active'>IM</li>" +
              "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>" +
              "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
            }
            else if (parseInt(res[i].projectstage) == 2) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
                    "<li><i class='glyphicon glyphicon-ok'></i></li>" +
              "<li class='active'>C</li>" +
              "<li class='empty'><i class='glyphicon glyphicon-ok'></i></li>";
            }
            else if (parseInt(res[i].projectstage) == 3) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
             "<li class='active'>A</li>";
            }


            if (parseInt(res[i].status) > 0) {
                indicator = " <li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
                   "<li><i class='glyphicon glyphicon-ok'></i></li>" +
             "  <li><i class='glyphicon glyphicon-ok'></i></li>";
            }

            prohtml += "<div class='col-md-4 mix " + ostat.toLowerCase() + " " + searchStat + "'>" +
                                    "<div id='" + res[i].projectid + "' stage='" + res[i].projectstage + "' onclick='onClickOpenProject(this)' class='" + pStag[res[i].projectstage] + " pholder'>" +
                                        "<div class='pImgHolder'>" +
                                            "<div class='shHov'>" +
                                                "<img src='assets/imgs/eye.png' />" +
                                            "</div>" +
                                            "<img src='service/getfile.aspx?type=timage&id=" + res[i].templateid + "' />" +
                                            "</div>" +
                                        "<div class='line'>" +
                                        "</div>" +
                                        "<div>" +
                                            "<table class='fullT projT'>" +
                                                "<tr>" +
                                                    "<td class='txt-lt vTop'>" +
                                                        "<p class='lr14b pnams'>" + res[i].projectname + "</p>" +
                                                        "<span class='ll12i'>Started on " + new Date(res[i].startdate).toLocaleDateString() + "</span></td>" +
                                                    "<td></td>" +
                                                    "<td class='lr14b vTop'>" + res[i].projecttypename +
                                                    "</td>" +
                                                "</tr>" +
                                                "<tr>" +
                                                    "<td colspan='2'>" +
                                                        "<ul class='indicator'>" +
                                                           indicator +
                                                        "</ul>" +
                                                    "</td>" +
                                                    "<td>" +
                                                        "<p class='pro-ow-name'>" + res[i].firstname + " " + res[i].lastname + "</p>" +

                                                        "<p class='ll12i pro-ow-name'>" + res[i].orgname + "</span>" +
                                                    "</td>" +
                                                "</tr>" +
                                            "</table>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>";
        }
    }
    $("#ProContainer").html(prohtml);
    window.setTimeout(function () { $('#ProContainer').mixItUp(); unblockUI("body"); onChangedFilter(); }, 1000);

}




function onEmptySearch() {
    if ($("#txtProName").val() == "")
        onClickSearchByName();
}


//Start Project

function onClickContinue() {
    var ab = new alertbox();
    ab.id = "#stMsg";
    ab.showError("");



    if (mainSlider.getCurrentSlide() == 1) {
        if ($("#qid5").find("textarea").val() == "") {
            ab.showError("The title of the infographic should not be empty.");
        }
        else
            mainSlider.goToNextSlide();

    }
    else {
        mainSlider.goToNextSlide();
    }


}

function onClickGoBack() {
    var ab = new alertbox();
    ab.id = "#stMsg";
    ab.showError("");
    mainSlider.goToPrevSlide();
}


var _NoOfQuestions = 11;

function onClickSubmitProject() {
    var pro = new StartProject();
    pro.foldercount = parseInt($("#hdnProjects").val());
    pro.projectname = $("#qid5").find("textarea").val();
    pro.isfileuploaded = true;
    for (var i = 1; i <= _NoOfQuestions; i++) {
        var qus = new ProjectQuestions();
        var el = $("#qid" + i).data("type");

        qus.id = i;
        if (el == "textarea") {
            qus.answer = $("#qid" + i).find("textarea").val();
        }

        else if (el == "ratio") {
            qus.answer = $("#qid" + i).find("input[type=radio]:checked").val();
            if (qus.answer == "Other")
                qus.answer = $("#txtOthers").val();

            if (qus.answer == undefined)
                qus.answer = "";
        }
        pro.questions.push(qus);
    }

    // template
    var id = $('#layout-templates').find('.active').attr('id');
    id = parseInt(id.replace('template', ''));

    var qus = new ProjectQuestions();
    qus.id = i;
    qus.answer = id;
    pro.questions.push(qus);

    var cb = new CallBack();
    cb.func = "onCreatedProject"

    _gUserService.CreateProject(pro, cb, true);

    blockUI("body");


}

function onCreatedProject(res, cb) {
    var ab = new alertbox();
    ab.id = "#stMsg";
    unblockUI("body");
    if (res) {
        ab.showSuccess("Project created successfully.");
        window.setTimeout(function () { window.location.reload(); }, 1000);
    }
    else {

    }
}

function setInfoImgClick() {
    $('.infoTypeImg').on('click', function () {
        $(this).parent().parent().find(".active").removeClass("active");
        $(this).parent().addClass("active");
        $(".layouts").hide();
        var me = this;
        $("#fDown").attr("href", $(this).data("file"));
        $(this).parents().parents().parents().find("#" + $(this).data("id")).fadeIn("slow", function () {

        });
        var slid = $("." + $(me).data("id")).bxSlider({ adaptiveHeight: true, pagerTransition: true });
        slid.reloadSlider();
    });
}

function onloadDashboard() {
    GetNotificationCount();
    setInterval(function () {
        GetNotificationCount();
    }, 10000);
}

function getOddEven(number) {
    return (number % 2 == 0) ? 'even' : 'odd';
}

function onClickAddNewVersion(projectId, stage) {
    var data = new ProjectDetail();
    data.projectid = parseInt(projectId);
    data.userid = parseInt(localStorage.getItem('userid'));
    data.stage = parseInt(stage);
    data.releasenote = $.trim($(currentTab).find('#newVersionText').val());
    data.image = uploadedImage;

    if (data.image == "" || data.releasenote == "") {
        alert("Please fill the details");
        return;
    }

    if (isFirstUpload) {
        blockUI("body");
        window.setTimeout(function () {
            _gUserService.CreateProjectStage(data, null, false);
            unblockUI("body");

            window.location.reload();
        }, 500);
    }
    else {
        blockUI("body");
        window.setTimeout(function () {
            _gUserService.CreateNewVersion(data, null, false);
            unblockUI("body");

            window.location.reload();
        }, 500);
    }
}

var uploadedImage = null;

function readURL(input) {

    var filesSelected = input.files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            $(currentTab).find('#newVersionPreview').attr("src", srcData);
            $(currentTab).find('#newVersionImage').hide();
            $(currentTab).find('.import-text').hide();
            $(currentTab).find('#newVersionPreview').show();
            uploadedImage = srcData;
        }
        fileReader.readAsDataURL(fileToLoad);
        return true;
    }
}