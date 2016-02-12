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
    $('.filterUsers').on('keyup', function () {
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

    $('.users').on('click', '#profileLink', function () {
        Cookies.set('profileid', $(this).data('id'));
        console.log(Cookies.get('profileid'));
        //changePage('profile.html');
    });


    getUsersByProject(Cookies.get('projectid'));
});

function openIssue(e) {
    e.preventDefault(); //Prevents link from forwarding
    console.log('openIssue()');
    //    getUsers();
    getUsersByProject();
}

//function filterUsers() {
//    console.log('searchIssues()');
//
//    var substring = $('.filterUsers').val();
//
//    $('.users').empty();
//
//    for (var key in allUsers) {
//        if ((allUsers[key].username).indexOf(substring) > -1) {
//            filteredTickets.push(allUsers[key]);
//            console.log(allUsers[key].id);
//            $('.users').append('<li class="itemRow user' + allUsers[key].id + '"></li>');
//            $('.user' + allUsers[key].id).append('<div class="flexrow centeritems flexspacebetween innerUser' + allUsers[key].id + '"></div>');
//            $('.innerUser' + allUsers[key].id).append('<div class="itemTag"></div>');
//            $('.innerUser' + allUsers[key].id).append('<a class="itemName" href="workflow.html">' + allUsers[key].username + '</a>');
//            $('.innerUser' + allUsers[key].id).append('<div class="itemInfo">' + allUsers[key].id + '</div>');
//        }
//    }
//}
//
//function callbackGetUsers(result) {
//    console.log(result);
//    allUsers = result;
//    for (var key in result) {
//        $('.users').append('<li class="itemRow user' + result[key].id + '"></li>');
//        $('.user' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerUser' + result[key].id + '"></div>');
//        $('.innerUser' + result[key].id).append('<div class="itemTag"></div>');
//        $('.innerUser' + result[key].id).append('<a class="itemName" href="profile.html">' + result[key].username + '</a>');
//        $('.innerUser' + result[key].id).append('<div class="itemInfo">' + result[key].id + '</div>');
//    }
//}


function filterUsers() {
    console.log('searchIssues()');
    var substring = $('.filterUsers').val();
    $('.users').empty();

    for (var key in allUsers) {
        if ((allUsers[key].username).indexOf(substring.toLowerCase()) > -1) {
            addUserRow(allUsers[key].id, allUsers[key].username.substring(0, 1), allUsers[key].username);
        }
    }
}

function addUserRow(id, tag, username) {
    console.log("addUserRow");
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    $('.users').append('<li class="itemRow user' + id + '"></li>');
    $('.user' + id).append('<div class="flexrow centeritems flexspacebetween innerUser' + id + '"></div>');
    $('.innerUser' + id).append('<div class="itemTag" style="background-color:#' + randomColor + '">' + tag + '</div>');
    $('.innerUser' + id).append('<a id="profileLink" class="itemName" href="profile.html" data-id="' + id + '">' + username + '</a>');
    $('.innerUser' + id).append('<div class="itemInfo">' + 'Cross Domain Issue Tracker' + '</div>');
    $('.innerUser' + id).append('<div class="userButtons' + id + '"></div>');
    $('.user' + id).append('<div class="dividerHorizontal"></div>');
}


//function callbackGetUsers(result) {
//    console.log(result);
//    allUsers = result;
//    filterUsers();
//}

function callbackGetUsersByProject(result) {
    console.log(result);
    allUsers = result;
    filterUsers();
}