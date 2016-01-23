"use strict";
var allProjects = [];
var filteredProjects = [];

$(document).ready(function () {
    console.log("projects.js");
    getProjects();
});

function callbackGetProjects(result) {
    console.log("callbackGetProjects");
    allProjects = result;
    for (var key in result) {
        $('.projects').append('<li class="itemRow project' + result[key].id + '"></li>');
        $('.project' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerProject' + result[key].id + '"></div>');
        $('.innerProject' + result[key].id).append('<div class="itemTag"></div>');
        $('.innerProject' + result[key].id).append('<a class="itemName" href="workflow.html">' + result[key].title + '</a>');
        //                $('.innerProject' + result[key].id).append('<div class="itemInfo">' + result[key].description + '</div>');
        $('.innerProject' + result[key].id).append('<div class="innerUserlist' + result[key].id + ' "aria-hidden="true"></div>');
        $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
        $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
        $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
        $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
        $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    }
}