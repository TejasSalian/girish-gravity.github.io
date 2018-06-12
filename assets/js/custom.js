$(document).ready(function () {
    $('#fullpage').fullpage({
        anchors: ['firstPage'],
        css3: true,
        scrollingSpeed: 1000,
        scrollOverflow: true,
    });
});
//Modal pop up hide by ESC key press-our work page//
$(document).keyup(function (event) {
    if (event.which === 27) {
        $('#infographicsModal').modal('hide');
    }
});

//login enter key press function//
$(document).keyup(function (event) {
    var loc = window.location.pathname;
    var hash = window.location.hash;
    if (event.which === 13 && loc == "/login.aspx" && hash != "#firstPage/slide2") {

        onClickLogin();
    }
    else if (event.which === 13 && hash == "#firstPage/slide2") {
        onClickRegister();
    }
});
