$(document).ready(function () {
    if (Cookies.get('loggedin') == "true") {
        console.log("jow");
    } else {
        window.stop();
        window.location = "index.html";
    }
});