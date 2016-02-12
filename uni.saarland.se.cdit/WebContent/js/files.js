"use strict";
var allFiles = [];
var allTickets = [];

$(document).ready(function () {
    console.log("issues.js");

    getTicketsByProject(Cookies.get('projectid'));
    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterFiles').on('keyup', function () {
        filterFiles();
    });

    $('.files').on('click', '.itemName', function () {
        var id_str = $(this).parent().attr('class');
        var split_id = id_str.split("innerFile");
        var str = $(this).attr('class');
        window.open(baseurl + "rest/files/" + split_id[1] + "/" + $(this).html());
    });
});

function callbackGetFiles(result) {
    console.log('callbackGetFiles');
    console.log(result);
    allFiles = result;
    filterFiles();
}

function filterFiles() {
    console.log('searchFiles()');

    var substring = $('.filterFiles').val();
    $('.files').empty();
    for (var key in allFiles) {
        console.log(allFiles[key].fullname);
        console.log(allFiles[key]);
        if ((allFiles[key].fullname.toLowerCase()).indexOf(substring.toLowerCase()) > -1) {
            addFileRow(allFiles[key].id, allFiles[key].fullname, allFiles[key].tickerId);
        }
    }
    $('.project' + allFiles[allFiles.length - 1].id + ' .dividerHorizontal').remove();
}

function addFileRow(id, title, ticketid) {
    console.log("addFileRow");

    var ticket = $.grep(allTickets, function (e) {
        return e.id == id;
    });

    console.log("ticket", ticket);

    $('.files').append('<li class="itemRow file' + id + '"></li>');
    $('.file' + id).append('<div class="flexrow centeritems flexspacebetween innerFile innerFile' + id + '"></div>');
    $('.innerFile' + id).append('<a class="itemName">' + title + '</a>');
    if (ticket.length > 0) {
        $('.innerFile' + id).append('<div class="itemInfo">' + ticket[0].title + '</div>');
        $('.innerFile' + id).append('<div class="itemInfo">' + ticket[0].creationDate + '</div>');
    }

    $('.file' + id).append('<div class="dividerHorizontal"></div>');
}

function callbackGetTicketsByProject(result) {
    console.log(result);
    allTickets = result;
    getFiles(Cookies.get('projectid'));
}