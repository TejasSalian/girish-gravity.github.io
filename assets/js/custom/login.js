function onClickRegister() {
    var ab = new alertbox();
    ab.id = "#regAlert";


    if ($("#fname").val() == "") {
        ab.showError('Please enter your first name.');
        return;
    }
    if ($("#sname").val() == "") {
        ab.showError('Please enter your surname.');
        return;
    }

    if ($("#c_email").val() == "") {
        ab.showError('Please enter your email.');
        return;
    }

    if ($("#pno").val() == "") {
        ab.showError('Please enter your contact number.');
        return;
    }




    if (!validateEmail($("#c_email").val())) {
        ab.showError('Please enter valid email.');
        return;
    }

    if ($("#cpass1").val() == "") {
        ab.showError('Please enter password.');
        return;
    }

    if ($("#cpass2").val() == "") {
        ab.showError('Please enter confirm password.');
        return;
    }

    if (!validatePass($("#cpass1").val()) || !validatePass($("#cpass2").val())) {
        ab.showError('Password should have minimum 8 character.');
        return;
    }



    if ($("#cpass1").val() != $("#cpass2").val()) {
        ab.showError('Password does not match with each other.');
        return;
    }

    if ($("#org_name").val() == "") {
        ab.showError('Please enter organisation.');
        return;
    }


    var u = new User();
    u.email = $("#c_email").val();
    u.password = $("#cpass1").val();
    u.firstname = $("#fname").val();
    u.lastname = $("#sname").val();
    u.organization = $("#org_name").val();
    u.image = "data:image/jpeg;base64,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";
    u.phone = $("#pno").val();
    u.refcode = $("#hdnrefcode").val();
    u.userid = parseInt($("#hdnUserID").val());

    if($("#hdnRefUser").val() == "" || $("#hdnRefUser").val() == null) {
        var re = _gUserService.IsEmailExists(u, null, false);
        if (re)
        {
            ab.showError('Email already registered.');
            return;
        }

        var ore = _gUserService.IsOrgExists(u, null, false);
        if (ore) {
            ab.showError('Organisation already registered.');
            return;
        }
    }

   


    var cb = new CallBack();
    cb.func = "onCreatedUser"
    cb.data = ab;

    blockUI("body");
    _gUserService.CreateProfile(u, cb, true);

}

function onCreatedUser(res, cb) {
    unblockUI("body");
    if (res != null) {
        if (res.userid > 0) {
            if ($("#hdnRefUser").val() == "")
                cb.showSuccess('Registered successfully. your account will get activated once its verified.');
            else
                cb.showSuccess('Registered successfully. click login button to login.');

            $("#c_email").val("");
            $("#cpass1").val("");
            $("#cpass2").val("");
            $("#fname").val("");
            $("#sname").val("");
            $("#org_name").val("");
            $("#pno").val("");
        }
    }
    else {
        cb.showError('Something went wrong.');
    }

    window.setTimeout(function () { $(cb.id).html(""); }, 5000);
}


function onClickLogin() {

    var ab = new alertbox();
    ab.id = "#loginAlert";

    if ($("#l_email").val() == "") {
        ab.showError('Please enter your email.');
        return;
    }

    if (!validateEmail($("#l_email").val())) {
        ab.showError('Please enter valid email.');
        return;
    }

    if ($("#l_pass").val() == "") {
        ab.showError('Please enter password.');
        return;
    }


    var u = new User();
    u.email = $("#l_email").val();
    u.password = $("#l_pass").val();

    var cb = new CallBack();
    cb.func = "onLoggedIn"
    cb.data = ab;

    blockUI("body");
    _gUserService.AuthenticateUser(u, cb, true);

}

function onLoggedIn(res, cb) {
    unblockUI("body");
    if (res != null) {
        if (res.userid > 0) {
            localStorage.setItem('userid', res.userid);
            localStorage.setItem('type', res.usertype);
            if (res.usertype == 2)
                window.location.href = "dashboard.aspx";
            if (res.usertype == 8)
                window.location.href = "admin.aspx";
        }

    }
    else {
        cb.showError('Invalid credentials/user not verified/deactivated.');
    }

    window.setTimeout(function () { $(cb.id).html(""); }, 5000);
}

function onLoadLoginPage() {
    if ($("#hdnRefUser").val() != "" && $("#hdnRefUser").val() != null) {
        $("#slide1").hide();
        var data = JSON.parse($("#hdnRefUser").val());

        $("#c_email").val(data[0].email);
        $("#c_email").attr("disabled", "disabled");
        $("#org_name").val(data[0].orgname);
        $("#org_name").attr("disabled", "disabled");
        $("#hdnUserID").val(data[0].userid);
        $("#hdnrefcode").val(data.refcode);
    }
}



function onClickForgotPass() {

    var ab = new alertbox();
    ab.id = "#loginAlert";

    if ($("#l_email").val() == "") {
        ab.showError('Please enter your email.');
        return;
    }

    if (!validateEmail($("#l_email").val())) {
        ab.showError('Please enter valid email.');
        return;
    }


    ab.showError('');
    var u = new User();
    u.email = $("#l_email").val();

    var cb = new CallBack();
    cb.func = "onForgotPass"
    cb.data = ab;


    blockUI("body");
    _gUserService.ForgotPassword(u, cb, true);

}


function onForgotPass(res,cb)
{
    unblockUI("body");

    if(res)
    {
        cb.showSuccess('Reset password link has been send to your registered email.');
    }
    else
        cb.showError('Email not registered/verified.');


    window.setTimeout(function () { $(cb.id).html(""); }, 5000);
}



function onClickSavePassowrd()
{

    var ab = new alertbox();
    ab.id = "#passAlert";


    if ($("#pass1").val() == "") {
        ab.showError('Please enter password.');
        return;
    }

    if ($("#pass2").val() == "") {
        ab.showError('Please enter confirm password.');
        return;
    }

    if (!validatePass($("#pass1").val()) || !validatePass($("#pass2").val())) {
        ab.showError('Password should have minimum 8 character.');
        return;
    }



    if ($("#pass1").val() != $("#pass2").val()) {
        ab.showError('Password does not match with each other.');
        return;
    }

    var u = new User();
    u.userid = parseInt($("#hdnUserID").val());
    u.password = $("#pass1").val();

    var cb = new CallBack();
    cb.func = "onPassChanged"
    cb.data = ab;

    blockUI("body");
    _gUserService.ChangePassword(u, cb, true);
    
}


function onPassChanged(res, cb) {
    unblockUI("body");

    if (res) {
        cb.showSuccess('Password changed successfully.');
        $("#passBtn").attr("disabled", "disabled");
        $("#pass1").val("");
        $("#pass2").val("")
    }
    else
        cb.showError('something went wrong.');


    window.setTimeout(function () { $(cb.id).html(""); }, 5000);
}