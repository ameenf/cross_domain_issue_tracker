$(document).ready(function () {
    console.log("login.js");
    $("#login").on("click", function () {
        login($("#inputEmail").val(), $("#inputPassword").val());
    });
});


function callbackSuccessLogin(result) {
    Cookies.set('loggedin', 'true');
    changePage("projects.html")
    console.log("Logging in");
}

function callbackFailedLogin(a, b, c) {
    console.log(a + " - " + b + " - " + c);
    console.log(a);

    console.log("Login failed");
    $("#loginFailBox").show();
   //$("#loginFailBox").css('color', 'red');
}