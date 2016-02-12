$(document).ready(function () {
    //Check for authentication
    if ((Cookies.get('loggedin') == "true") || (window.location.pathname === "/uni.saarland.se.cdit/index.html")) {

    } else {
        console.log("window.location");
        console.log(window.location);
        window.stop();
        window.location = "index.html";
    }


    $('#profileLink').on('click', function (e) {
        Cookies.set('profileid', "-1");
        console.log('profileid set');
    });
});

function changePage(newurl) {
    location.href = baseurl + newurl;
}