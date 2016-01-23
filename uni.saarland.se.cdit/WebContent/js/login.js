$(document).ready(function () {
    console.log("pardy hard!");
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
            crossDomain: true,
            async: true,
            success: function (result, textStatus, xhr) {
            	console.log("result: ")
                console.log(result);
                console.log(textStatus);
                console.log(xhr);
                if (result == "false") {
                	console.log("Login failed");
                	$("#loginFailBox").show();
                	$("#loginFailBox").css('color', 'red');
                }else{
                	location.href = 'http://localhost:8080/uni.saarland.se.cdit/projects.html';
                	console.log("Logging in");
                	
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
//            url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/searchById/1",
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