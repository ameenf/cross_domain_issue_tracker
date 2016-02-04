"use strict";
var allProjects = [];
var filteredProjects = [];

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
});

function callbackGetProjectsFromUser(result) {
    console.log("callbackGetProjects");
    console.log(result);
    allProjects = result;
    for (var key in result) {
        $('.projects').append('<li class="itemRow project' + result[key].id + '"></li>');
        $('.project' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerProject' + result[key].id + '"></div>');
        $('.innerProject' + result[key].id).append('<div class="itemTag" style="background-color:' + getCharColor(result[key].title.substring(0, 1)) + '">' + result[key].title.substring(0, 1) + '</div>');
        $('.innerProject' + result[key].id).append('<a class="itemName" href="workflow.html">' + result[key].title + '</a>');
        $('.innerProject' + result[key].id).append('<div class="inneruserlist innerUserlist' + result[key].id + ' "aria-hidden="true"></div>');
        for (var keyy in result[key].users) {
            $('.innerUserlist' + result[key].id).append('<span title="' + result[key].users[keyy] + '" class="glyphicon glyphicon-user" aria-hidden="true"></span>');
        }
    }
}

function getCharColor(char) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letterPosition = alphabet.indexOf(char.toLowerCase());
    console.log("letterPosition");
    console.log(letterPosition);
    return colors[letterPosition];
}