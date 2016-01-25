$(document).ready(function () {
    console.log("login.js");
    $("#login").on("click", function () {
        login($("#inputEmail").val(), $("#inputPassword").val());
    });
});


function callbackSuccessLogin(result) {
    console.log("result: ")
    console.log(result);
    if (result == "false") {
        console.log("Login failed");
        $("#loginFailBox").show();
        $("#loginFailBox").css('color', 'red');
    } else {
        Cookies.set('loggedin', 'true');
        changePage("projects.html")
        console.log("Logging in");
    }
}

function callbackFailedLogin(a, b, c) {
    console.log(a + " - " + b + " - " + c);
}