"use strict";
var allProjects = [];

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
var letterPosition;

$(document).ready(function () {
    console.log("projects.js");
    getProjectsFromUser(Cookies.get('userid'));

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterProjects').on('keyup', function () {
        filterProjects();
    });

    $('.projects').on('click', '.itemName', function () {
        var str = $(this).parent().attr('class');
        console.log('--------------------------------------------------------------');
        console.log(str);
        console.log(str.split("innerProject"));
        var split = str.split("innerProject");
        Cookies.set('projectid', split[1]);
        //         = split[1];
        changePage('workflow.html');
    });
});

function callbackGetProjectsFromUser(result) {
    console.log("callbackGetProjects");
    console.log(result);
    allProjects = result;
    filterProjects();
}

function filterProjects() {
    console.log('searchProjects()');

    var substring = $('.filterProjects').val();
    $('.projects').empty();
    for (var key in allProjects) {
        if ((allProjects[key].title.toLowerCase()).indexOf(substring.toLowerCase()) > -1) {
            addProjectRow(allProjects[key].id, allProjects[key].title, allProjects[key].users);
        }
    }
    $('.project' + allProjects[allProjects.length - 1].id + ' .dividerHorizontal').remove();
}

function addProjectRow(id, title, users) {
    console.log("addProjectRow");
    $('.projects').append('<li class="itemRow project' + id + '"></li>');
    $('.project' + id).append('<div class="flexrow centeritems flexspacebetween innerProject' + id + '"></div>');
    $('.innerProject' + id).append('<div class="itemTag" style="background-color:' + getCharColor(title.substring(0, 1)) + '">' + title.substring(0, 1) + '</div>');
    $('.innerProject' + id).append('<a class="itemName">' + title + '</a>');
    $('.innerProject' + id).append('<div class="inneruserlist innerUserlist' + id + ' "aria-hidden="true"></div>');
    for (var keyy in users) {
        $('.innerUserlist' + id).append('<span title="' + users[keyy] + '" class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    }
    $('.project' + id).append('<div class="dividerHorizontal"></div>');
}

function getCharColor(char) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letterPosition = alphabet.indexOf(char.toLowerCase());
    console.log("letterPosition");
    console.log(letterPosition);
    return colors[letterPosition];
}