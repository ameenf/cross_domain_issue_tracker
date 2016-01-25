var port = 8080;
var baseurl = 'http://localhost:' + port + '/uni.saarland.se.cdit/';
$(document).ready(function () {
    //Check for authentication
    if ((Cookies.get('loggedin') == "true") || (window.location = "index.html")) {
        console.log("jow");
    } else {
        console.log("window.location");
        window.stop();
        window.location = "index.html";
    }
});

function changePage(newurl) {
    location.href = baseurl + newurl;
}