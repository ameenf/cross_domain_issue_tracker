$(document).ready(function () {
    $("#login").on("click", function () {
        login($("#inputEmail").val(), $("#inputPassword").val());
    });
});

// Ausgewählte Sprache aus dem Login Screen dem Server melden
function login(email, pwd) {
    console.log('login');
    console.log(email);
    console.log(pwd);
    $.ajax({
            type: "POST",
            url: "http://localhost:8080/uni.saarland.se.cdit/rest/users/login",
            data: {
                inputEmail: email,
                inputPassword: pwd
            },
            async: true,
            success: function (result, textStatus, xhr) {
                console.log(result);
                console.log(textStatus);
                console.log(xhr);
                location.href = 'http://localhost:8080/uni.saarland.se.cdit/main.html';
                if (result) {

                }
            },
            error: function (a, b, c) {
                console.log(a + " " + b + " " + c + "ERROR");
                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            }
        })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        });

    function JSONPCallback() {}
}