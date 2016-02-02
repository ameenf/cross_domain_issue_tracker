"use strict";
var allProjects = [];
var projectToDelete;

$(document).ready(function () {
    console.log("projectmanagement.js");

    getProjects();

    //Clickhandler for an element in the issues list
    $('.issue').on('click', function (e) {
        openIssue(e);
    });

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterUsers').on('change', function () {
        filterProjects();
    });

    $('.b_addProject').on('click', function (e) {
        expandAddProject();
    });

    $('#createProject').on('click', function (e) {
        createProject($("#i_addProject_title").val(), $("#i_addProject_desc").val(), [1, 4, 5])
    });

    $('.users').on('click', '#b_deleteProject', function () {
        console.log("closestclass");
        console.log($('#b_deleteProject').closest("li").attr('class'));
        var str = $('#b_deleteProject').closest("li").attr('class');
        console.log(str.split("itemRow user"));
        var split = str.split("itemRow user");
        projectToDelete = split[1];
        openModalDeleteProject();
    });

    $('#deleteProject').on('click', function () {
        deleteProject(projectToDelete);
    });

    $('.addUserToProject').on('click', function () {
        console.log("Test");
        console.log($(this).next().html());
        $('.usertaglist').append($(this).next().html());
    });

});


function callbackCreateProject(result) {
    console.log(result);

    //After the user has been added, close the expanded view
    $(".addProjectExpandable").slideUp();
    $("#s_newProjectIcon").toggleClass("glyphicon-plus glyphicon-minus");
    $("#s_newProjectIcon").removeClass("glyphicon-minus");
    $("#s_newProjectIcon").addClass("glyphicon-plus");

    addProjectRow(result.id, result.title.substring(0, 1), result.title, result.users);
}

function expandAddProject() {
    console.log("ExpandAddUser");

    //Toggle to switch icons
    $(".addProjectExpandable").slideToggle("slow", function () {
        $("#s_newProjectIcon").toggleClass("glyphicon-plus glyphicon-minus");
    });
}


function openIssue(e) {
    e.preventDefault(); //Prevents link from forwarding
    console.log('openProject()');
}

function filterProjects() {
    console.log('searchProjects()');

    var substring = $('.filterUsers').val();
    $('.users').empty();
    for (var key in allProjects) {
        if ((allProjects[key].title).indexOf(substring) > -1) {
            addProjectRow(allProjects[key].id, allProjects[key].title.substring(0, 1), allProjects[key].title, allProjects[key].users);
        }
    }
}


function callbackGetProjects(result) {
    console.log(result);
    allProjects = result;
    filterProjects();
}

function addProjectRow(id, tag, title, users) {
    console.log("addProjectRow");
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    $('.users').append('<li class="itemRow user' + id + '"></li>');
    $('.user' + id).append('<div class="flexrow centeritems flexspacebetween innerUser' + id + '"></div>');
    $('.innerUser' + id).append('<div class="itemTag" style="background-color:#' + randomColor + '">' + tag + '</div>');
    $('.innerUser' + id).append('<a class="itemName" href="">' + title + '</a>');
    $('.innerUser' + id).append('<div class="inneruserlist innerUserlist' + id + ' "aria-hidden="true"></div>');
    for (var keyy in users) {
        $('.innerUserlist' + id).append('<span title="' + users[keyy] + '" class="glyphicon glyphicon-user" aria-hidden="true"></span>');
    }
    $('.innerUser' + id).append('<span id="b_deleteProject" class="glyphicon glyphicon-trash" aria-hidden="true"></span>');
}

function openModalDeleteProject() {
    $('#m_deleteProject').modal('toggle');
}