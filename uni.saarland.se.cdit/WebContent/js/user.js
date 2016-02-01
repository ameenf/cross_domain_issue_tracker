$(document).ready(function () {
    console.log("header.js");


    $.ajax({
        type: "GET",
        url: baseurl + "rest/tickets?callback=?",
        crossDomain: true,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'fnsuccesscallback',
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

function fnsuccesscallback() {
    console.log("fnsuccesscallback");
}