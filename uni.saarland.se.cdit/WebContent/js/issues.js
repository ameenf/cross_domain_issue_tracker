"use strict";
var allTickets = [];
var filteredTickets = [];
var statusList = [];

$(document).ready(function () {
    console.log("issues.js");

    //Clickhandler for an element in the issues list
    $('.issue').on('click', function (e) {
        openIssue(e);
    });

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterIssues').on('keyup', function () {
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
        if ((allTickets[key].title).indexOf(substring.toLowerCase()) > -1) {
            addRow(allTickets[key].id, allTickets[key].title, allTickets[key].description);
        }
    }
}

function callbackGetTickets(result) {
    console.log(result);
    allTickets = result;
    filterIssues();
}

function addRow(id, title, description) {
    $('.issues').append('<li class="itemRow issue' + id + '"></li>');
    $('.issue' + id).append('<div class="flexrow centeritems flexspacebetween innerIssue' + id + '"></div>');
    $('.innerIssue' + id).append('<div class="itemTag"></div>');
    $('.innerIssue' + id).append('<a class="itemName" href="workflow.html">' + title + '</a>');
    $('.innerIssue' + id).append('<div class="innerUserlist' + id + ' "aria-hidden="true"></div>');
    $('.innerUserlist' + id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    $('.innerUserlist' + id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    $('.innerUserlist' + id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    $('.innerUserlist' + id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    $('.innerUserlist' + id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    $('.innerIssue' + id).append('<div class="itemInfo">' + description + '</div>');
    $('.issue' + id).append('<div class="dividerHorizontal"></div>');
}