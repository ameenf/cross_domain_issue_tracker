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
        $('#m_addUser').modal('toggle');
    });

    $('#createUser').on('click', function (e) {
        createUser();
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/users",
        dataType: 'json',
        async: true,
        success: function (result) {
            console.log(result);
            allUsers = result;
            for (var key in result) {
                $('.users').append('<li class="itemRow user' + result[key].id + '"></li>');
                $('.user' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerUser' + result[key].id + '"></div>');
                $('.innerUser' + result[key].id).append('<div class="itemTag"></div>');
                $('.innerUser' + result[key].id).append('<a class="itemName" href="profile.html">' + result[key].username + '</a>');
                $('.innerUser' + result[key].id).append('<div class="itemInfo">' + result[key].id + '</div>');
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