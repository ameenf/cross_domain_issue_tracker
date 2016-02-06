$(document).ready(function () {
    console.log("login.js");
    $("#login").on("click", function () {
        Cookies.set('username', $("#inputEmail").val());
        Cookies.set('password', $("#inputPassword").val());
        login($("#inputEmail").val(), $("#inputPassword").val());
    });
});


function callbackSuccessLogin(result) {
    console.log(result);
    Cookies.set('loggedin', 'true');
    Cookies.set('userid', result.id);

    $("#login-username").removeClass('has-error');
    $("#login-password").removeClass('has-error');
    $("#login-username").addClass('has-success');
    $("#login-password").addClass('has-success');

    changePage("projects.html")

    console.log("Logging in");
}

function callbackFailedLogin(a, b, c) {
    console.log(a + " - " + b + " - " + c);
    console.log(a);

    console.log("Login failed");
    //    $("#loginFailBox").show();

    $("#login-username").addClass('has-error');
    $("#login-password").addClass('has-error');

    $("#loginFailBox").show();
    $("#loginFailBox").fadeTo(2000, 500).slideUp(1000, function () {
        //                                $("#connectionExistsAlert").alert('close');
        $("#loginFailBox").hide();
    });
    //$("#loginFailBox").css('color', 'red');
}