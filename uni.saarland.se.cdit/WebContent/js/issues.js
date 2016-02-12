"use strict";
var allTickets = [];
var filteredTickets = [];
var statusList = [];
var priorityList = [];

var colors = [
    '#ba3c3c',
    '#ba6c3c',
    '#baa23c',
    '#abba3c',
    '#6cba3c',
    '#3cba3c',
    '#3cba85',
    '#3ca7ba',
    '#3c80ba',
    '#3c5eba',
    '#543cba',
    '#853cba',
    '#b03cba',
    '#ba3ca2',
    '#ba3c68',
    '#ba3c59',
    '#3d6900',
    '#556900',
    '#556900',
    '#416900',
    '#006930',
    '#006934',
    '#006969',
    '#004169',
    '#3d0069',
    '#690051',
];

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
    getStatus();
});

function openIssue(e) {
    e.preventDefault(); //Prevents link from forwarding
    console.log('openIssue()');
}

//Filter all the issues dynamically for the searchkey
function filterIssues() {
    console.log('searchIssues()');
    var substring = $('.filterIssues').val();
    $('.issues').empty();

    for (var key in allTickets) {
        if ((allTickets[key].title).indexOf(substring.toLowerCase()) > -1) {
            addRow(allTickets[key].id, allTickets[key].title, allTickets[key].description, allTickets[key].statusId, allTickets[key].priorityId);
        }
    }
}

//Remove loading animation
function callbackGetTicketsByProject(result) {
    console.log(result);
    allTickets = result;
    $('.spinner').remove();
    filterIssues();
}

//Add a row to the list
function addRow(id, title, description, statusId, priorityId) {
    $('.issues').append('<li class="itemRow issue' + id + '"></li>');
    $('.issue' + id).append('<div class="flexrow centeritems flexspacebetween innerIssue' + id + '"></div>');
    $('.innerIssue' + id).append('<div class="itemTag" style="background-color:' + getCharColor(title.substring(0, 1)) + '">' + title.substring(0, 1) + '</div>');
    $('.innerIssue' + id).append('<a class="itemName" href="workflow.html">' + title + '</a>');
    $('.innerIssue' + id).append('<div class="innerUserlist' + id + ' "aria-hidden="true"></div>');
    $('.innerIssue' + id).append('<div class="itemInfo">' + statusList[statusId - 1].title + '</div>');
    $('.innerIssue' + id).append('<div class="itemInfo">' + priorityList[priorityId - 1].title + '</div>');
    $('.issue' + id).append('<div class="dividerHorizontal"></div>');
}

function callbackGetStatus(result) {
    console.log(result);
    statusList = result;
    getPriorities();
}

function callbackGetPriorities(result) {
    console.log(result);
    priorityList = result;
    getTicketsByProject(Cookies.get('projectid'));
}

function getCharColor(char) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var letterPosition = alphabet.indexOf(char.toLowerCase());
    console.log("letterPosition");
    console.log(letterPosition);
    return colors[letterPosition];
}