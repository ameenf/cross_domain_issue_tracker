"use strict";
var allTickets = [];
var filteredTickets = [];

$(document).ready(function () {
    console.log("issues.js");

    //Clickhandler for an element in the issues list
    $('.issue').on('click', function (e) {
        openIssue(e);
    });

    //    //Changehandler for the search bar. Change something and press enter to call this
    //    $('.filterIssues').on('change', function () {
    //        filterIssues();
    //    });

    getTickets();
});

function openIssue(e) {
    e.preventDefault(); //Prevents link from forwarding
    console.log('openIssue()');
}