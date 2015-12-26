$(document).ready(function () {
    console.log("auth.js laoded");
    getTickets();
});

function getTickets() {
    $.ajax({
            type: "GET",
            url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/",
            dataType: 'xml',
            jsonp: false,
            //       jsonpCallback: 'JSONPCallback',
            async: true,
            //       crossDomain: true,
            //       username: 'user1',
            //       password: 'user1',
            success: function (result) {
                console.log("SUCCESS");
                console.log(result);
                //                console.log(textStatus);
                //                console.log(xhr);
            },
            error: function (a, b, c) {
                console.log(a + " " + b + " " + c + "ERROR");
                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            }
        })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        })
}