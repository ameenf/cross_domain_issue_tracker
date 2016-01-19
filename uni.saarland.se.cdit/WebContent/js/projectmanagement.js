"use strict";
var allUsers = [];
var filteredTickets = [];

$(document).ready(function () {
    console.log("users.js");

    //Clickhandler for an element in the issues list
    $('.issue').on('click', function (e) {
        openIssue(e);
    });

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterUsers').on('change', function () {
        filterUsers();
    });

    $('.b_addUser').on('click', function (e) {
        openModalCreateUser();
    });

    $('#createUser').on('click', function (e) {
        createUser();
    });


    $('.b_addUserProjectList').on('click', function (e) {
        console.log("LGODAGFJAPSOFD");
        $('#dd_addUserProjectListTitle').text = "TEST";
    });



    getUsers();
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
                $('.users').append('<li class="itemRow user' + result[key].id + '"></li>');
                $('.user' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerUser' + result[key].id + '"></div>');
                $('.innerUser' + result[key].id).append('<div class="itemTag"></div>');
                $('.innerUser' + result[key].id).append('<a class="itemName" href="">' + result[key].title + '</a>');

                $('.innerUser' + result[key].id).append('<div class="innerUserlist' + result[key].id + ' "aria-hidden="true"></div>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');

                $('.innerUser' + result[key].id).append('<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>');



            }
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

function openModalCreateUser() {
    $('#m_addUser').modal('toggle');


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

function createUser() {
    var data = {
        "email": $("#i_email").val(),
        "id": "",
        "password": "test",
        "type": "",
        "username": $("#i_name").val(),
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/users",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            console.log("SUCCESS!");
            console.log(result);
            $('#myModal').modal('toggle');
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