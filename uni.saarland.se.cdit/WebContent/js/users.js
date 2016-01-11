"use strict";
var allTickets = [];
var filteredTickets = [];

$(document).ready(function () {
    console.log("users.js");

    //Clickhandler for an element in the issues list
    $('.issue').on('click', function (e) {
        openIssue(e);
    });

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterIssues').on('change', function () {
        filterIssues();
    });

    getTickets();
});

function openIssue(e) {
    e.preventDefault(); //Prevents link from forwarding
    console.log('openIssue()');
}

function filterIssues() {
    console.log('searchIssues()');

    var substring = $('.filterIssues').val();

    $('.issues').empty();

    for (var key in allTickets) {
        if ((allTickets[key].title).indexOf(substring) > -1) {
            filteredTickets.push(allTickets[key]);
            console.log(allTickets[key].id);
            $('.users').append('<li class="itemRow user' + allTickets[key].id + '"></li>');
            $('.issue' + allTickets[key].id).append('<div class="flexrow centeritems flexspacebetween innerIssue' + allTickets[key].id + '"></div>');
            $('.innerIssue' + allTickets[key].id).append('<div class="itemTag"></div>');
            $('.innerIssue' + allTickets[key].id).append('<a class="itemName" href="workflow.html">' + allTickets[key].title + '</a>');
            $('.innerIssue' + allTickets[key].id).append('<div class="itemInfo">' + allTickets[key].description + '</div>');
        }
    }
}

function getTickets() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets",
        dataType: 'json',
        async: true,
        success: function (result) {
            console.log(result);
            allTickets = result;
            for (var key in result) {
                $('.users').append('<li class="itemRow user' + result[key].id + '"></li>');
                $('.user' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerUser' + result[key].id + '"></div>');
                $('.innerUser' + result[key].id).append('<div class="itemTag"></div>');
                $('.innerUser' + result[key].id).append('<a class="itemName" href="workflow.html">' + result[key].title + '</a>');
                $('.innerUser' + result[key].id).append('<div class="itemInfo">' + result[key].description + '</div>');
            }
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}