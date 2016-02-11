"use strict";
var allGroups = [];
var grouptoDelete;

$(document).ready(function () {
    console.log("users.js");

    //Initial rest calls
    //getProjects();
    //getUsers();
    getGroups();

    //Changehandler for the search bar. Change something and press enter to call this
    $('.filterUsers').on('keyup', function () {
        filterGroups();
    });

    $('.b_addUser').on('click', function (e) {
        expandAddUser();
    });

    $('#b_closeAddUser').on('click', function (e) {
        expandAddUser();
    });

    $('#createUser').on('click', function (e) { 
        createGroup($("#i_name").val());
    });

    $('.users').on('click', '.groupLink', function (e) {
        var groupid = $(this).data("id");
        //console.log(groupid);
        Cookies.set('groupid', groupid); 
    });
    
    $('.users').on('click', '.b_deleteUser', function (event) {
        /*console.log('e');
        console.log(event);
        console.log($(event.target).parent().attr('class'));
        console.log($('.b_deleteUser'));
        console.log($('.b_deleteUser').closest("li").attr('class'));*/
        var str = $(event.target).parent().attr('class');
        console.log(str.split("userButtons"));
        var split = str.split("userButtons");
        console.log(split);
        grouptoDelete = split[1];
        $('#m_deleteUser').modal('toggle');
    });


    $('#deleteUser').on('click', function () {
        console.log(grouptoDelete);
        deleteGroup(grouptoDelete);
        $('#m_deleteUser').modal('toggle');
    });

    $('.users').on('click', '.b_editUser', function () {
        changePage("userPreferences.html");
    });
});

function callbackCreateGroup(result) {
    console.log(result);

    //After the user has been added, close the expanded view
    $(".addUserExpandable").slideUp();
    $("#s_newUserIcon").toggleClass("glyphicon-plus glyphicon-minus");
    $("#s_newUserIcon").removeClass("glyphicon-minus");
    $("#s_newUserIcon").addClass("glyphicon-plus");

    addGroupRow(result.id, result.name.substring(0, 1), result.name, result.description, result.active);
}

function expandAddUser() {
    console.log("ExpandAddGroup");
    //Clear dropdown
    $('#dd_addUserProjectList').empty();
    //Add available projects to the dropdown

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

function filterGroups() {
    console.log('searchIssues()');
    var substring = $('.filterUsers').val();
    $('.users').empty();

    for (var key in allGroups) {
        if ((allGroups[key].name).indexOf(substring.toLowerCase()) > -1) {
            addGroupRow(allGroups[key].id, allGroups[key].name.substring(0, 1), allGroups[key].name, allGroups[key].description, allGroups[key].active);
        }
    }
    $('.user' + allGroups[allGroups.length - 1].id + ' .dividerHorizontal').remove();
}

function addGroupRow(id, tag, name, description, active) {
    console.log("addUserRow"); 
    console.log(active);
    if (!active){
        console.log("not active");
        return;
    }
    
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    $('.users').append('<li class="itemRow user' + id + '"></li>');
    $('.user' + id).append('<div class="flexrow centeritems flexspacebetween innerUser' + id + '"></div>');
    $('.innerUser' + id).append('<div class="itemTag" style="background-color:#' + randomColor + '">' + tag + '</div>');
    $('.innerUser' + id).append('<a class="itemName groupLink" href="permissions_group.html" data-id="' + id + '">' + name + '</a>');
    $('.innerUser' + id).append('<div class="itemInfo">' + description  + '</div>');
    $('.innerUser' + id).append('<div class="userButtons' + id + '"></div>');
    //$('.userButtons' + id).append('<span class="glyphicon glyphicon-cog managementIcon b_editUser" aria-hidden="true"></span>');
    $('.userButtons' + id).append('<span class="glyphicon glyphicon-trash managementIcon b_deleteUser" aria-hidden="true"></span>');
    $('.user' + id).append('<div class="dividerHorizontal"></div>');
    
}


function callbackGetGroups(result) {
    console.log(result);
    allGroups = result;
    filterGroups();
}

function callbackGetProjects(result) {
    allProjects = result;
}