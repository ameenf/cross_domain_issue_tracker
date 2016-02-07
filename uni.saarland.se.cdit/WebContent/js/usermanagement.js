"use strict";
var allUsers = [];
var allProjects = [];
var usertoDelete;

$(document).ready(function () {
    console.log("users.js");

    //Initial rest calls
    getProjects();
    getUsers();

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterUsers').on('keyup', function () {
        filterUsers();
    });

    $('.b_addUser').on('click', function (e) {
        expandAddUser();
    });

    $('#b_closeAddUser').on('click', function (e) {
        expandAddUser();
    });

    $('#createUser').on('click', function (e) {
        if ($("#i_name").val().length > 0 && $("#i_password").val().length > 0) {
            createUser($("#i_name").val(), $("#i_password").val());
        } else {
            console.log("Wrong input");
        }
    });

    $('.users').on('click', '#b_deleteUser', function () {
        console.log($('#b_deleteUser'));
        console.log($('#b_deleteUser').closest("li").attr('class'));
        var str = $('#b_deleteUser').closest("li").attr('class');
        console.log(str.split("itemRow user"));
        var split = str.split("itemRow user");
        console.log(split);
        usertoDelete = split[1];
        $('#m_deleteUser').modal('toggle');
    });

    $('#deleteUser').on('click', function () {
        deleteUser(usertoDelete);
        $('#m_deleteUser').modal('toggle');
    });

    $('.users').on('click', '#b_editUser', function () {
        changePage("userPreferences.html");
    });
});

function callbackCreateUser(result) {
    console.log(result);
    var elem = document.getElementById("dd_addUserProjectList");
    var projectid = elem.options[elem.selectedIndex].value;
    console.log(projectid);

    //After the user has been added, close the expanded view
    $(".addUserExpandable").slideUp();
    $("#s_newUserIcon").toggleClass("glyphicon-plus glyphicon-minus");
    $("#s_newUserIcon").removeClass("glyphicon-minus");
    $("#s_newUserIcon").addClass("glyphicon-plus");

    addUserRow(result.id, result.username.substring(0, 1), result.username);
}

function expandAddUser() {
    console.log("ExpandAddUser");
    //Clear dropdown
    $('#dd_addUserProjectList').empty();
    //Add available projects to the dropdown
    for (var key in allProjects) {
        $('#dd_addUserProjectList').append('<option value="' + allProjects[key].id + '" selected="">' + allProjects[key].title + '</option>');
    }

    //Toggle to switch icons
    $(".addUserExpandable").slideToggle("slow", function () {
        $("#s_newUserIcon").toggleClass("glyphicon-plus glyphicon-minus");
    });
}



function openUser(e) {
    //e.preventDefault(); //Prevents link from forwarding
    console.log('openIssue()');
    changePage("userPreferences.html");
}

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
    $('.innerUser' + id).append('<a class="itemName" href="user.html">' + username + '</a>');
    $('.innerUser' + id).append('<div class="itemInfo">' + 'Cross Domain Issue Tracker' + '</div>');
    $('.innerUser' + id).append('<div class="userButtons' + id + '"></div>');
    $('.userButtons' + id).append('<span id="b_editUser" class="glyphicon glyphicon-cog managementIcon" aria-hidden="true"></span>');
    $('.userButtons' + id).append('<span id="b_deleteUser" class="glyphicon glyphicon-trash managementIcon" aria-hidden="true"></span>');
    $('.user' + id).append('<div class="dividerHorizontal"></div>');
}


function callbackGetUsers(result) {
    console.log(result);
    allUsers = result;
    filterUsers();
}

function callbackGetProjects(result) {
    allProjects = result;
}