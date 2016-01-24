$(document).ready(function () {
    console.log("login.js");
    $("#login").on("click", function () {
        login($("#inputEmail").val(), $("#inputPassword").val());
    });
});


function callbackLogin(result) {
    console.log("result: ")
    console.log(result);
    if (result == "false") {
        console.log("Login failed");
        $("#loginFailBox").show();
        $("#loginFailBox").css('color', 'red');
    } else {
        Cookies.set('loggedin', 'true');
        location.href = 'http://localhost:8080/uni.saarland.se.cdit/projects.html';
        console.log("Logging in");
    }
}