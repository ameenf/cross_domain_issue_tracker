$(document).ready(function () {
    console.log("Jquery loaded");


    $("#login").on("click", function () {
        console.log($("#inputPassword").val());
        console.log($("#inputEmail").val());
        login($("#inputEmail").val(), $("#inputPassword").val());
    });



    //login();

});

// Ausgewählte Sprache aus dem Login Screen dem Server melden
function login(email, pwd) {
    $.ajax({
            type: "POST",
            url: "http://localhost:8080/uni.saarland.se.cdit/rest/users/login",
            data: {
                //                inputEmail: "email",
                //                inputPassword: "pwd"
                inputEmail: "test@test.com",
                inputPassword: "admin"
            },
            //       dataType: 'jsonp',
            //       jsonp: false,
            //       jsonpCallback: 'JSONPCallback',
            async: true,
            //       crossDomain: true,
            //       username: 'user1',
            //       password: 'user1',
            success: function (result, textStatus, xhr) {
                console.log("SUCCESS");
                console.log(result);
                console.log(textStatus);
                console.log(xhr);
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

//// Ausgewählte Sprache aus dem Login Screen dem Server melden
//function get() {
//    $.ajax({
//            type: "GET",
//            url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/searchById/1",
//            //       dataType: 'jsonp',
//            //       jsonp: false,
//            //       jsonpCallback: 'JSONPCallback',
//            async: true,
//            //       crossDomain: true,
//            //       username: 'user1',
//            //       password: 'user1',
//            success: function (result) {
//
//            },
//            error: function (a, b, c) {
//                console.log(a + " " + b + " " + c + "ERROR");
//                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
//            }
//        })
//        .fail(function (e) {
//            console.log(e.msg + "ERROR");
//        });
//
//    function JSONPCallback() {}
//}