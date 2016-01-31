"use strict";
var allProjects = [];
var filteredProjects = [];

$(document).ready(function () {
    console.log("projects.js");
    getProjectsFromUser(1);
});

function callbackGetProjectsFromUser(result) {
    console.log("callbackGetProjects");
    console.log(result);
    allProjects = result;
    for (var key in result) {
        $('.projects').append('<li class="itemRow project' + result[key].id + '"></li>');
        $('.project' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerProject' + result[key].id + '"></div>');
        $('.innerProject' + result[key].id).append('<div class="itemTag"></div>');
        $('.innerProject' + result[key].id).append('<a class="itemName" href="workflow.html">' + result[key].title + '</a>');
        $('.innerProject' + result[key].id).append('<div class="inneruserlist innerUserlist' + result[key].id + ' "aria-hidden="true"></div>');
        for (var keyy in result[key].users) {
            $('.innerUserlist' + result[key].id).append('<span title="' + result[key].users[keyy] + '" class="glyphicon glyphicon-user" aria-hidden="true"></span>');
        }
    }
}