"use strict";
var allUsers = [];
var filteredTickets = [];
var projectToDelete;

$(document).ready(function () {
    console.log("projectmanagement.js");

    getUsers();

    //Clickhandler for an element in the issues list
    $('.issue').on('click', function (e) {
        openIssue(e);
    });

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterUsers').on('change', function () {
        filterUsers();
    });

    $('.b_addProject').on('click', function (e) {
        openModalCreateUser();
    });

    $('#createUser').on('click', function (e) {
        createProject($("#i_addProject_title").val(), $("#i_addProject_desc").val(), [1, 4, 5])
    });


    $('.b_addUserProjectList').on('click', function (e) {
        console.log("LGODAGFJAPSOFD");
        $('#dd_addUserProjectListTitle').text = "TEST";
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





});

function openIssue(e) {
    e.preventDefault(); //Prevents link from forwarding
    console.log('openIssue()');
}

function filterUsers() {
    console.log('searchIssues()');

    var substring = $('.filterUsers').val();

    $('.users').empty();

    for (var key in allUsers) {
        if ((allUsers[key].username).indexOf(substring) > -1) {
            filteredTickets.push(allUsers[key]);
            console.log(allUsers[key].id);
            $('.users').append('<li class="itemRow user' + allUsers[key].id + '"></li>');
            $('.user' + allUsers[key].id).append('<div class="flexrow centeritems flexspacebetween innerUser' + allUsers[key].id + '"></div>');
            $('.innerUser' + allUsers[key].id).append('<div class="itemTag"></div>');
            $('.innerUser' + allUsers[key].id).append('<a class="itemName" href="workflow.html">' + allUsers[key].username + '</a>');
            $('.innerUser' + allUsers[key].id).append('<div class="itemInfo">' + allUsers[key].id + '</div>');
        }
    }
}

function getUsers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects",
        dataType: 'json',
        async: true,
        success: function (result) {
            console.log(result);
            allUsers = result;
            for (var key in result) {
                var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                $('.users').append('<li class="itemRow user' + result[key].id + '"></li>');
                $('.user' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerUser' + result[key].id + '"></div>');
                $('.innerUser' + result[key].id).append('<div class="itemTag" style="background-color:#' + randomColor + '">' + result[key].title.substring(0, 1) + '</div>');
                $('.innerUser' + result[key].id).append('<a class="itemName" href="">' + result[key].title + '</a>');

                $('.innerUser' + result[key].id).append('<div class="inneruserlist innerUserlist' + result[key].id + ' "aria-hidden="true"></div>');
                for (var keyy in result[key].users) {
                    console.log("for");
                    $('.innerUserlist' + result[key].id).append('<span title="' + result[key].users[keyy] + '" class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                }

                $('.innerUser' + result[key].id).append('<span id="b_deleteProject" class="glyphicon glyphicon-trash" aria-hidden="true"></span>');

                //$('.innerUser' + result[key].id).append('<button id="b_deleteProject" type="button" class="btn btn-default b_deleteProject" aria-label="Left Align"> <span class="glyphicon glyphicon-trash b_deleteProject" aria-hidden = "true"></span></button>');




            }
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

function openModalCreateUser() {
    $('#m_addProject').modal('toggle');


    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects",
        dataType: 'json',
        async: true,
        success: function (result) {
            console.log(result);
            $('#dd_addUserProjectList').empty();
            for (var key in result) {
                $('#dd_addUserProjectList').append('<li class="b_addUserProjectList"><a>' + result[key].title + '</a></li>');
                //                $('#dd_addUserProjectList').append('<li><a href="#">Action</a></li>');

            }
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}



function getProjectsFromUser() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects/searchByUser/" + userid,
        dataType: 'json',
        async: true,
        success: function (result) {
            console.log(result);

            for (var key in result) {

            }
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

function openModalDeleteProject() {
    $('#m_deleteProject').modal('toggle');
}