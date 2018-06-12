var _userData = null;
var _cData = new Array();
var _type = 0;

function onloadAdmin() {
    var data = JSON.parse($("#hdnOwners").val());
    _userData = data;
    $("#totalC").html(data.length);
    onLoad(0);
}

function onLoad(type) {
    _type = type;
    _cData = new Array();
    var count = 0;
    if (type == 0) {
        var html = "";
        for (var index = 0; index < _userData.length; index++) {
            html += '<div class="col-md-12 clDiv">';
            if (_userData[index].isverified) {
                html += generateApprovedRequest(true, _userData[index]);
                count++;
            }
            else
                html += generatePendingRequest(true, _userData[index]);

            html += "</div>";
        }
        $("#approvedC").html(count);

        $("#CollabListDiv").html(html);

        _cData = _userData;
    }
    if (type == 1) {
        var html = "";
        for (var index = 0; index < _userData.length; index++) {
            html += '<div class="col-md-12 clDiv">';
            if (_userData[index].isverified) {
                html += generateApprovedRequest(true, _userData[index]);
                count++;

                _cData.push(_userData[index]);
            }

            html += "</div>";
        }

        $("#CollabListDiv").html(html);
    }

    if (type == 2) {
        var html = "";
        for (var index = 0; index < _userData.length; index++) {
            html += '<div class="col-md-12 clDiv">';
            if (!_userData[index].isverified) {
                html += generatePendingRequest(true, _userData[index]);
                _cData.push(_userData[index]);
            }
            html += "</div>";
        }

        $("#CollabListDiv").html(html);
    }

}


function FilterbyName(ele) {
    var html = "";
    for (var index = 0; index < _cData.length; index++) {
        if (_cData[index].firstname.toLowerCase().contains($(ele).val().toLowerCase()) || _cData[index].lastname.toLowerCase().contains($(ele).val().toLowerCase())) {
            html += '<div class="col-md-12 clDiv">';
            if (_cData[index].isverified) {
                html += generateApprovedRequest(true, _cData[index]);
            }
            else
                html += generatePendingRequest(true, _cData[index]);

            html += "</div>";
        }

    }

    $("#CollabListDiv").html(html);
}

function onClickAcceptUser(ele, userid) {
    var parent = $(ele).parents(".clDiv");
    var userData = "";
    for (var index = 0; index < _cData.length; index++) {
        if (userid == _cData[index].userid)
            userData = _cData[index];
    }

    var cb = new CallBack();
    cb.func = "onAcceptedUser"
    cb.data = userData;
    blockUI("body");
    _gUserService.ApproveUser(userData, cb, true);
}

function onAcceptedUser(res, cb) {
    var ab = new alertbox();
    ab.id = "#admAlert";

    unblockUI("body");

    if (res) {
        window.location.reload();

    }
    else {
        ab.showError("something went wrong");
    }
}


function onClickDeleteUser(ele, userid) {
    var parent = $(ele).parents(".clDiv");
    var ud = new User();
    ud.userid = userid;

    if (_gUserService.DeleteUser(ud, null, false)) {
        // $(parent).remove();
        window.location.reload();
    }
}

function showUploadNewVersion() {
    $(currentTab).find('#version-images').fadeOut();
    $(currentTab).find('#new-version-images').fadeIn();
}

function showOldVersion() {
    $(currentTab).find('#new-version-images').fadeOut();
    $(currentTab).find('#version-images').fadeIn();
}