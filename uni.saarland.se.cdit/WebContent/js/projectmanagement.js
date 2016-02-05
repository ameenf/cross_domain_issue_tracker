"use strict";
var allProjects = [];
var projectToDelete;
var userList = [];
var userNames = [];

$(document).ready(function () {
    console.log("projectmanagement.js");

    getProjects();
    getUsers();

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
        createProject($("#i_addProject_title").val(), $("#i_addProject_desc").val(), userList);
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
    $('.users').on('click', '#b_editProject', function () {
        changePage('projectmanagement.html')
    });

    $('#deleteProject').on('click', function () {
        deleteProject(projectToDelete);
    });

    $('.scrollContainer').on('click', '.addUserToProject', function () {
        console.log("Test");
        console.log($(this.firstChild).attr('class'));


        console.log($(this));
        console.log($(this).next().attr('class'));
        //        console.log($(this.attr('class')));
        var str = $(this).next().attr('class')
        console.log(str);
        console.log(str.split("userName userid"));
        var split = str.split("userName userid");

        $('.usertagWrapper').empty();


        if ($(this.firstChild).attr('class') === 'glyphicon glyphicon-plus') {
            console.log("add");
            userList.push(split[1]);
            userNames.push($(this).next().html());
        } else if ($(this.firstChild).attr('class') === 'glyphicon glyphicon-minus') {
            console.log("min");
            var index = userList.indexOf(split[1]);
            if (index > -1) {
                userList.splice(index, 1);
            }

            var index1 = userNames.indexOf($(this).next().html());
            if (index > -1) {
                userNames.splice(index, 1);
            }
        }
        $(this.firstChild).toggleClass("glyphicon-plus glyphicon-minus");
        $(this).toggleClass("btn-success btn-danger");

        console.log(userList);
        console.log($(this).next().html());
        $('.usertagWrapper').append('Users :');
        for (var key in userNames) {
            //            $('.usertaglist').append(userNames[key] + ' ; ');
            $('.usertagWrapper').append('<div class="usertagItem">' + userNames[key] + '</div>');
        }

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

function callbackGetUsers(result) {

    console.log("Users:");
    console.log(result);

    for (var key in result) {
        console.log("Fot loop");
        $('.scrollContainer').append('<div id="useritem" class = "flexrow centeritems col-md-4 useritem' + result[key].id + '">');
        $('.useritem' + result[key].id).append('<button type="button" class="btn btn-success addUserToProject addUserToProject' + result[key].id + '">');
        $('.addUserToProject' + result[key].id).append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>');
        $('.useritem' + result[key].id).append('<div class="userName userid' + result[key].id + '">' + result[key].username + '</div>');
    }
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
    $('.innerUser' + id).append('<div class="projectButtons' + id + '"></div>');
    $('.projectButtons' + id).append('<span id="b_editProject" class="glyphicon glyphicon-cog managementIcon" aria-hidden="true"></span>');
    $('.projectButtons' + id).append('<span id="b_deleteProject" class="glyphicon glyphicon-trash managementIcon" aria-hidden="true"></span>');
    $('.user' + id).append('<div class="dividerHorizontal"></div>');
}

function openModalDeleteProject() {
    $('#m_deleteProject').modal('toggle');
}