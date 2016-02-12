"use strict";
var allFiles = [];

$(document).ready(function () {
    console.log("issues.js");

    //Clickhandler for an element in the issues list
    $('.issue').on('click', function (e) {
        openIssue(e);
    });

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterFiles').on('keyup', function () {
        filterFiles();
    });

    $('.files').on('click', '.itemName', function () {
        var str = $(this).parent().attr('class');
        console.log('--------------------------------------------------------------');
        console.log(str);
        console.log(str.split("innerFile"));
        var split = str.split("innerFile");
        Cookies.set('projectid', split[1]);
        //         = split[1];
        changePage('workflow.html');
    });

    getFiles(Cookies.get('projectid'));
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
    $('.files').append('<li class="itemRow file' + id + '"></li>');
    $('.file' + id).append('<div class="flexrow centeritems flexspacebetween innerFile' + id + '"></div>');
    $('.innerFile' + id).append('<a class="itemName">' + title + '</a>');
    $('.project' + id).append('<div class="dividerHorizontal"></div>');
}