$(document).ready(function () {
    //Check for authentication
    if ((Cookies.get('loggedin') == "true") || (window.location = "index.html")) {

    } else {
        console.log("window.location");
        window.stop();
        window.location = "index.html";
    }
});