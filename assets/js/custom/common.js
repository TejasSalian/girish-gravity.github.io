
var latestVersion = null;
var previousVersion = null;
var isFirstUpload = false;
var currentTab = null;

function GetNotificationCount() {
    var uid = parseInt(localStorage.getItem('userid'));
    var cb = new CallBack();
    cb.func = "onGetNoti";
   
    var result = _gUserService.GetNotificationCount(uid, cb, false);
    if (result != null && result.total > 0) {
        $('#notification-badge').html(result.total);
        $('#notification-badge').css('visibility', 'visible');
    }
}





function GetNotifications() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var uid = parseInt(localStorage.getItem('userid'));
    var result = _gUserService.GetNotification(uid, null, false).notification;
    if (result != null && result.length > 0) {
        var data = '<li>' +
                        '<p style="font-size: 20px;">Latest Updates</p>' +
                        '<p id="currentDate">' + (new Date().getDate()) + ' ' + (months[new Date().getMonth()]) + ' ' + (new Date().getFullYear()) + '</p>' +
                   '</li>';
        for (var index = 0; index < result.length; index++) {
            data += '<li class="' + getOddEven(index + 1) + '">' +
                        '<div style="width: 100%; max-height: 60px;">' +
                            '<div class="notify-div-1">' +
                                '<img src="assets/imgs/male.jpg" />' +
                            '</div>' +
                            '<div class="notify-div-2">' +
                                '<span class="notification-name">' + result[index].firstname + '</span>' +
                            '</div>' +
                            '<div class="notify-div-3">' +
                                '<span class="notification-text">' +
                                    (((result[index].message).length > 45) ? ((result[index].message).substring(0, 42) + '...') : result[index].message) +
                                '</span>' +
                            '</div>' +
                         '</div>' +
                         '<div style="text-align: right">' +
                            '<span class="notification-text-ago">' + result[index].timestamp + '</span>' +
                        '</div>' +
                      '</li>';

            $('#new-notifications').html('');
            $('#new-notifications').html(data);
            $('#notification-badge').css('visibility', 'hidden');
        }
    }
}

function getOddEven(number) {
    return (number % 2 == 0) ? 'even' : 'odd';
}

function onClickOpenProject(element) {
    var type = parseInt(localStorage.getItem('type'));
    if (type == 2) {
        CollaboratorProjectDetail(element);
    }
    else if (type == 8) {
        AdminProjectDetail(element);
    }
}