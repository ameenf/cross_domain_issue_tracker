$(document).ready(function () {
    //Check for authentication
    if ((Cookies.get('loggedin') == "true") || (window.location.pathname === "/uni.saarland.se.cdit/index.html")) {

    } else {
        console.log("window.location");
        console.log(window.location);
        window.stop();
        window.location = "index.html";
    }
});

function changePage(newurl) {
    location.href = baseurl + newurl;
}