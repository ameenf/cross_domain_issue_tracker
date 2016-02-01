$(document).ready(function () {
    console.log("header.js");


    $.ajax({
        type: "GET",
        url: "http://192.168.0.155:8080/uni.saarland.se.cdit/rest/tickets/test",
        crossDomain: true,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        jsonp: 'jsonpCallback',
        jsonpCallback: 'MyCallback',
        success: function (result) {
            console.log("SUCCESS")
        },
        error: function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }
    });



});

function MyCallback() {
    console.log("fnsuccesscallback");
}