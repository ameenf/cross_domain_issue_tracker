$(document).ready(function () {
    console.log("login.js");
    $("#login").on("click", function () {
        login($("#inputEmail").val(), $("#inputPassword").val());
    });
});


function callbackSuccessLogin(result) {
    console.log("result: ")
    console.log(result);
    if (result == true) {
        Cookies.set('loggedin', 'true');
        changePage("projects.html")
        console.log("Logging in");
    } else {
        console.log("Login failed");
        $("#loginFailBox").show();
        $("#loginFailBox").css('color', 'red');
    }
}

function callbackFailedLogin(a, b, c) {
    console.log(a + " - " + b + " - " + c);
}