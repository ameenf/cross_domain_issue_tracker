var port = 8080;
var baseurl = 'http://localhost:' + port + '/uni.saarland.se.cdit/';
$(document).ready(function () {
    //Check for authentication
    if (Cookies.get('loggedin') == "true") {
        console.log("jow");
    } else {
        window.stop();
        window.location = "index.html";
    }


});

function changePage(newurl) {
    location.href = baseurl + newurl;
}