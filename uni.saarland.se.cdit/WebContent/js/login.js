$(document).ready(function () {
    console.log("pardy hard!");
    $("#login").on("click", function () {
        login($("#inputEmail").val(), $("#inputPassword").val());
    });
});


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
            crossDomain: true,
            async: true,
            success: function (result, textStatus, xhr) {
                console.log('result: ' + result);
                console.log(result);
                console.log(textStatus);
                console.log(xhr);
                if (result === "true") {
                    location.href = 'http://localhost:8080/uni.saarland.se.cdit/projects.html';
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