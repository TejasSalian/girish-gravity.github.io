

function blockUI(ele) {
    $(ele).prepend("<div class='blockUI'><img src='assets/imgs/loader.gif'></div>");
}


function unblockUI(ele) {
    $(ele).find('.blockUI').fadeOut("slow", function () { $(this).remove(); });
}

String.prototype.contains = function (it) { return this.indexOf(it) != -1; };


function validatePass(pass) {
    if (pass.length >= 8)
        return true;
    else
        return false;
}

function ConvertDateCToJ(date) {
    var re = /-?\d+/;
    var m = re.exec(date);
    var d = new Date();
    d.setTime(parseInt(m[0]));
    return d;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}


function alertbox() {
    this.id = "";
}

alertbox.prototype.showError = function (message) {
    $(this.id).html("<div class='error'>" + message + "</div>");
}

alertbox.prototype.showSuccess = function (message) {
    $(this.id).html("<div class='success'>" + message + "</div>");
}



function generateApprovedRequest(isAdmin, data) {

    var className = "gry-box";
    var delbtn = "";
    if (isAdmin) {
        className = "gry-boxn";
        delbtn = '<img class="delImg" src="assets/imgs/close-red.png"  onclick="onClickDeleteUser(this,' + data.userid + ')"  />';
    }

    var html = ' <div class="' + className + '">' +
          '<span style="position: absolute; left: 5px; top: 5px; border-radius: 30%;">' +
              '<img src="assets/imgs/male.jpg" style="width: 50px; margin: 0; border-radius: 60%;" />' +
          '</span>' +
          '<div style="text-align: left; position: absolute; left: 70px;">' +
              '<span class="lr14b">' + data.firstname + " " + data.lastname +
              '</span>' +
              '<br />' +
              '<span class="ll12i" >Joined on ' + new Date(ConvertDateCToJ(data.regdate)).toLocaleDateString() +
              '</span>' +
          '</div>' +
          '<div class="content1">' +
              '<div class="shw-cont1">' +
                  '<span class="ll12">Email Address:</span><br />' +
                  '<span class="lr14b">' + data.email + '</span>' +
              '</div>' +
              '<div class="shw-cont2">' +
                  '<span class="ll12">Organization:</span><br />' +
                  '<span class="lr14b">' + data.orgname + '</span>' +
              '</div>' + delbtn +
          '</div>' +
      '</div>';

    return html;
}

function generatePendingRequest(isAdmin, data) {

    var className = "gry-box";
    var btn = "";
    if (isAdmin) {
        className = "gry-boxn";
        if (data.isdeleted)
            btn = "<div class='shw-cont3'><span class='clr-red'>Deactivated</span></div>";
        btn += 
            '<img class="accImg" src="assets/imgs/approve.png"  onclick="onClickAcceptUser(this,' + data.userid + ')"  />';
    }
    var html = '<div class="' + className + '">' +
          '<span class="proImageHold">' +
                  '<img src="assets/imgs/question.png"  />' +
          '</span>' +
          '<div style="text-align: left; position: absolute; left: 70px;">' +
              '<span class="lr14b">' + data.firstname + " " + data.lastname +
              '</span>' +
              '<br />' +
              '<span class="ll12i" >Request send on ' + new Date(ConvertDateCToJ(data.regdate)).toLocaleDateString() +
              '</span>' +
          '</div>' +
          '<div class="content1">' +
              '<div class="shw-cont1">' +
                  '<span class="ll12">Email Address:</span><br />' +
                  '<span class="lr14b">' + data.email + '</span>' +
              '</div>' +
              '<div class="shw-cont2">' +
                  '<span class="ll12">Organization:</span><br />' +
                  '<span class="lr14b">' + data.orgname + '</span>' +
              '</div>' + btn +
          '</div>' +
      '</div>';

    return html;
}



; (function ($) {
    $.fn.extend({
        donetyping: function (callback, timeout) {
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function (el) {
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function (i, el) {
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste', function (e) {
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type == 'keyup' && e.keyCode != 8) return;

                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function () {
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur', function () {
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);