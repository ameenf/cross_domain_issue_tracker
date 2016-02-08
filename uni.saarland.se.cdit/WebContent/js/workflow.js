"use strict";
var allNodes = [];
var allTickets = [];
var allTicketInNode = [];
var ticketById = [];
var allTypes = [];
var allPriorities = [];
var allLabels = [];
var allUsers = [];
var optionsLabel = [];
var optionsUser = [];
var workflowNodes = [];
var nodeArrows = [];
var feedbackTicket = [];
var currentTicketIndex;
var currentStatusId;
var projectId = 1; // add prject id from cookie here
var userId = Cookies.get("userid"); // get UserId from cookie
var nodeIndex;
var lastarrowId;
var popoverId;
var firstNode;

$(document).ready(function () {
    getTickets(); // Get the amount of tickets and store number in node
    getStatus();
    getTypes();
    getPriorities();
    getUsers();
    getLabels();
});
// If user leaves workflow, the position of the nodes will be updated
$(window).unload(function (e) {

    console.log("unload function");

    $.each(workflowNodes, function (index, value) {
        var posLeft = (100 * $('#' + workflowNodes[index].id).position().left) / $('#diagramContainer').width(); // posX
        var posTop = (100 * $('#' + workflowNodes[index].id).position().top) / $('#diagramContainer').height(); // posY

        e.preventDefault();
        // TODO add userid
        updateWorkflowposition(workflowNodes[index].id, posLeft, posTop);

    });
});

function listenerShowTicket() {
    // Enlarge a ticket
    $('.nodeTicket').on('click', function (e) {
        $('#ticketViewWrapper').toggle();
        currentTicketIndex = $('.nodeTicket').index(this);
        console.log('currentTicketIndex');
        console.log(currentTicketIndex);
        console.log(allTicketInNode);
        console.log($('.nodeTicket').index(this));
        //        currentStatusId = allTicketInNode[$('.nodeTicket').index(this)].statusId;
        currentStatusId = 1;

        //        getTicketsById(allTicketInNode[$('.nodeTicket').index(this)].id);
        //        getTicketFeedback(allTicketInNode[$('.nodeTicket').index(this)].id);

        getTicketsById(4);
        getTicketFeedback(4);


        $("[data-toggle=" + popoverId + "popover]").popover({
            html: true,
            content: function () {
                $('#popover-content .modal-title').html('NEWTITLE'); // replaces the title
                return $('#popover-content').html();
            }
        });


        //        $('#myModal2').modal('toggle');
        $('#ticketView').fadeToggle('fast');
        //        $('#ticketView').append('<div id="ticket');
        // Title
        $('#ticketView .form-horizontal').empty();
        //        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Title</label><div class="col-sm-10"><input type="text" class="form-control updTitle" value="' + allTicketInNode[$('.nodeTicket').index(this)].title + '" readonly></div></div>');
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Title</label><div class="col-sm-10"><input type="text" class="form-control updTitle" value="' + allTicketInNode[1].title + '" readonly></div></div>');

        //Description
        //        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Description</label><div class="col-sm-10"><textarea class="form-control updDesc" readonly>' + allTicketInNode[$('.nodeTicket').index(this)].description + '</textarea></div></div>');
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Description</label><div class="col-sm-10"><textarea class="form-control updDesc" readonly>' + allTicketInNode[1].description + '</textarea></div></div>');

        // Creation date
        //        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Creation Date</label><div class="col-sm-10"><input type="text" class="form-control updCreat" value="' + allTicketInNode[$('.nodeTicket').index(this)].creationDate + '" readonly></div></div>');
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Creation Date</label><div class="col-sm-10"><input type="text" class="form-control updCreat" value="' + allTicketInNode[1].creationDate + '" readonly></div></div>');

        // Priority
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Priority</label><div class="col-sm-10"><select id="updPrioritylist" class="form-control" disabled></select></div></div>');
        // TODO geht das nich auch mit id?
        for (var key in allPriorities) {
            //            if (allPriorities[allTicketInNode[$('.nodeTicket').index(this)].priorityId - 1].title == allPriorities[key].title)
            if (allPriorities[allTicketInNode[1].priorityId - 1].title == allPriorities[key].title)
                $('#updPrioritylist').append('<option value="' + allPriorities[key].id + '" selected>' + allPriorities[key].title + '</option>');
            else
                $('#updPrioritylist').append('<option value="' + allPriorities[key].id + '">' + allPriorities[key].title + '</option>');
        }

        // Type
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updType">Type</label><div class="col-sm-10"><select id="updTypelist" class="form-control" disabled></select></div></div>');
        // TODO geht das nich auch mit id?
        for (var key in allTypes) {
            //            if (allTypes[allTicketInNode[$('.nodeTicket').index(this)].typeId - 1].title == allTypes[key].title)
            if (allTypes[allTicketInNode[1].typeId - 1].title == allTypes[key].title)
                $('#updTypelist').append('<option value="' + allTypes[key].id + '" selected>' + allTypes[key].title + '</option>');
            else
                $('#updTypelist').append('<option value="' + allTypes[key].id + '">' + allTypes[key].title + '</option>');
        }

        // Label
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updLabel">Labels</label><div class="col-sm-10"></div></div>');
        // + button to add label
        $('.updLabel + .col-sm-10').append('<span class="label label-success btnEdit" id="btnaddLabels" data-toggle="popover" title="Select label" data-placement="top">+</span><div class="popover"><div class="col-sm-6 checkbox"></div></div>');

        var ticketLabel = []
        if (allTicketInNode[$('.nodeTicket').index(this)].labels == null) {
            ticketLabel = []
        } else {
            //            ticketLabel = allTicketInNode[$('.nodeTicket').index(this)].labels;
            ticketLabel = allTicketInNode[1].labels;
        }
        $.each(allLabels, function (key, value) {
            var found = $.inArray(allLabels[key].id, ticketLabel);
            if (found != -1) {
                $('.updLabel + .col-sm-10').append('<span class="label label-primary  ' + allLabels[key].title + allLabels[key].id + '">' + allLabels[key].title + '</span>');
                $('#btnaddLabels + .popover .checkbox').append('<label><input class="labelCheck" type="checkbox" checked/>' + allLabels[key].title + '</label>');
            } else {
                $('#btnaddLabels + .popover .checkbox').append('<label><input class="labelCheck" type="checkbox"/>' + allLabels[key].title + '</label>');
            }
        });

        $('#btnaddLabels').popover({
            html: true,
            title: 'Select labels',
            content: function () {
                return $('#btnaddLabels + .popover').html();
            }
        });

        // select labels and add labels in UI and in the checkboxlist
        $('body').off().on('click', '.labelCheck', function () {
            var found = $.inArray(allLabels[$('.labelCheck').index(this)].id, ticketLabel);

            if ($(this).prop('checked') == true) {
                ticketLabel.push(allLabels[$('.labelCheck').index(this)].id);
                $('.updLabel + .col-sm-10').append('<span class="label label-primary ' + allLabels[$('.labelCheck').index(this)].title + allLabels[$('.labelCheck').index(this)].id + '">' + allLabels[$('.labelCheck').index(this)].title + '</span>');
            } else {
                ticketLabel.splice(found, 1);
                $('.' + allLabels[$('.labelCheck').index(this)].title + allLabels[$('.labelCheck').index(this)].id).remove();
            }
            console.log(ticketLabel);
        });
        // Users
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updUsers">Users</label><div class="col-sm-10"></div></div>');
        // + button to add user
        $('.updUsers + .col-sm-10').append('<button class="btn btn-default btnEdit" id="btnUpdUsers" type="button" data-toggle="popover" title="Select users" data-placement="top"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><div class="popover"><div class="col-sm-6 checkbox"></div></div>');

        // add existing user in a ticket as default icon and in the checkboxlist
        var ticketUser = []
        if (allTicketInNode[$('.nodeTicket').index(this)].users == null) {
            ticketUser = []
        } else {
            ticketUser = allTicketInNode[$('.nodeTicket').index(this)].users;
        }
        $.each(allUsers, function (key, value) {
            var found = $.inArray(allUsers[key].id, ticketUser);
            if (found != -1) {
                var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                $('.updUsers + .col-sm-10').append('<div class="itemTag ' + allUsers[key].id + '" style="background-color:#' + randomColor + '" title="' + allUsers[key].username + '">' + allUsers[key].username.substring(0, 1) + '</div>');
                $('#btnUpdUsers + .popover .checkbox').append('<label><input class="userCheck" id="check' + allUsers[key].id + '" type="checkbox" checked/>' + allUsers[key].username + '</label>');
            } else {
                $('#btnUpdUsers + .popover .checkbox').append('<label><input class="userCheck" id="check' + allUsers[key].id + '" type="checkbox"/>' + allUsers[key].username + '</label>');
            }
        });

        $('#btnUpdUsers').popover({
            html: true,
            title: 'Select users',
            content: function () {
                return $('#btnUpdUsers + .popover').html();
            }
        });
        // select users and add users in UI
        $('body').on('click', '.userCheck', function () {
            var found = $.inArray(allUsers[$('.userCheck').index(this)].id, ticketUser);

            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            if ($(this).prop('checked') == true) {
                console.log(allUsers[$('.userCheck').index(this)].id);
                console.log(ticketUser);
                console.log(allUsers);
                ticketUser.push(allUsers[$('.userCheck').index(this)].id);
                $('.updUsers + .col-sm-10').append('<div class="itemTag ' + allUsers[$('.userCheck').index(this)].id + '" style="background-color:#' + randomColor + '" title="' + allUsers[$('.userCheck').index(this)].username + '">' + allUsers[$('.userCheck').index(this)].username.substring(0, 1) + '</div>');
            } else {
                ticketUser.splice(found, 1);
                $('.itemTag.' + allUsers[$('.userCheck').index(this)].id).remove();
            }
        });

        // Files
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updFiles">Files</label><div class="col-sm-10"></div></div>');
        $('.updFiles + .col-sm-10').append('<button class="btn btn-default btnEdit" type="button" id="btnUpdFile"><span class="glyphicon glyphicon glyphicon-open-file" aria-hidden="true"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button>');

        // Feedback
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updFiles">Comments</label><div class="col-sm-10"></div></div>');

        // TODO: add here comment section with usericon, username and his commment. Further a user can add comments and existing comments should be modifiable.

        // adding buttons
        $('#ticketView .form-horizontal').append('<button type="button" class="btn btn-default closeTicket">Close</button><button id="updateTicket" type="button" class="btn btn-primary btnEdit">Update Ticket</button><button type="button" class="btn btn-default editTicket"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></button>');



        // close button to close the ticket
        $('#ticketView .closeTicket').off().on('click', function (e) {
            console.log("CLOSE TICKET BTN");
            $('#ticketView').fadeOut('fast');
            $('#ticketViewWrapper').fadeOut('fast');
        });

        $('#ticketView .editTicket').off().on('click', function (e) {
            console.log("EDIT TICKET BTN");

            console.log('Edit ticket' + allTicketInNode[currentTicketIndex].title);
            $('#ticketView p').toggleClass('form-control-static form-control');
            $('.btnEdit').toggle();
            if ($('#ticketView input').attr('readonly') && $('#ticketView select').attr('disabled') && $('#ticketView textarea').attr('readonly')) {
                $('#ticketView input').removeAttr('readonly');
                $('#ticketView select').removeAttr('disabled');
                $('#ticketView textarea').removeAttr('readonly');
            } else {
                $('#ticketView input').attr('readonly', '');
                $('#ticketView select').attr('disabled', '');
                $('#ticketView textarea').attr('readonly', '');
            }
        });

        // Update the ticket
        $('#updateTicket').off().on('click', function (e) {
            console.log("UPDATE TICKET BTN");

            var elem = document.getElementById("updPrioritylist");
            var prioId = elem.options[elem.selectedIndex].value;

            var elem = document.getElementById("updTypelist");
            var typeId = elem.options[elem.selectedIndex].value;

            // update the ticket
            updateTicket(allTicketInNode[currentTicketIndex].id, $(".updTitle").val(), $(".updCreat").val(), $(".updDesc").val(), prioId, typeId, currentStatusId, projectId, ticketUser, ticketLabel);
        });

    });

    $('#ticketViewWrapper').off().on('click', function (e) {
        $('#ticketAdd').fadeOut('fast');
        $('#ticketView').fadeOut('fast');
        $('#ticketViewWrapper').fadeOut('fast');
    });
}

function listener() {
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    var nodename;
    var nodeId;
    // Open dialog to create a ticket
    $('.addTicket').off().on('click', function (e) {
        optionsLabel = [];
        optionsUser = [];
        var allInputs = $(":input");
        allInputs.prop('checked', false);
        //$('#myModal1').modal('toggle');
        //                $('#ticketAdd').fadeToggle('fast');
        //                $('#ticketViewWrapper').fadeToggle('fast');

        nodeIndex = $(this).parent().index();
        //
        //        $('#ticketAdd .title').html('New ticket in <b>' + nodename + '</b>'); // replaces the title

        console.log("popoverid");
        console.log($(this).attr('data-toggle'));
        console.log($(this).attr('data-toggle').substr(0, 1));
        popoverId = $(this).attr('data-toggle').substr(0, 1);
        console.log("[data-toggle=" + popoverId + "popoverAddTicket]");
        $("[data-toggle=" + popoverId + "popoverAddTicket]").popover({
            html: true,
            content: function () {
                var nodename = $(this).next().html();
                $('#popover-content-addTicket .title').html('Add Ticket in <b>' + nodename + '</b>'); // replaces the title
                var nodeId = workflowNodes[$(this).parent().index()].id;
                console.log(nodeId);
                //                getTicketsByNodeId(nodeId);
                return $('#popover-content-addTicket').html();
            }
        });
        $("[data-toggle=" + popoverId + "popoverAddTicket]").popover('show');


    });

    $('#closeTicket').off().on('click', function (e) {
        $('#ticketAdd').fadeOut('fast');
        $('#ticketViewWrapper').fadeOut('fast');
    });

    // Show all tickets within a node
    //    $('.showNode').off().on('click', function (e) {
    //        $('#myModal2').modal('toggle');
    //        nodename = $(this).prev().html();
    //        $('#myModal2 .modal-title').html('All Tickets in <b>' + nodename + '</b>'); // replaces the title
    //        nodeId = workflowNodes[$(this).parent().index()].id;
    //        console.log(nodeId);
    //        getTicketsByNodeId(nodeId);
    //
    //    });

    $('.showNode').off().on('click', function (e) {
        nodename = $(this).prev().html();
        $('#popover-content .modal-title').html('All Tickets in <b>' + nodename + '</b>'); // replaces the title
        nodeId = workflowNodes[$(this).parent().index()].id;
        console.log(nodeId);
        console.log("popoverid");
        console.log($(this).attr('data-toggle'));
        console.log($(this).attr('data-toggle').substr(0, 1));
        popoverId = $(this).attr('data-toggle').substr(0, 1);
        getTicketsByNodeId(nodeId);
    });

    $('body').on('click', '.closePopupNodeView', function () {
        $("[data-toggle=" + popoverId + "popoverNodeView]").popover('hide');
    });
    $('body').on('click', '.closePopupAddTicketView', function () {
        $("[data-toggle=" + popoverId + "popoverAddTicket]").popover('hide');
    });

    $('body').on('click', '#submitTicket', function (e) {
        var elem = $(".popover #prioritylist")[0];
        var prioId = elem.options[elem.selectedIndex].value;

        var elem = $(".popover #typelist")[0];
        var typeId = elem.options[elem.selectedIndex].value;
        var subTicketTitle = $(".popover #input_new_title").val();
        var subTicketDesc = $(".popover #input_new_desc").val();

        console.log(subTicketTitle + " | " + subTicketDesc);
        console.log("priority: " + prioId);
        console.log("type: " + typeId);
        console.log("status: " + workflowNodes[nodeIndex].statusId);
        console.log("project: " + projectId);
        console.log("users: " + optionsUser);
        console.log("labels: " + optionsLabel);

        var data = {
            "title": $(".popover #input_new_title").val(),
            "creationDate": datetime,
            "description": $(".popover #input_new_desc").val(),
            "priorityId": prioId,
            "typeId": typeId,
            "statusId": workflowNodes[nodeIndex].statusId,
            "projectId": projectId,
            "users": optionsUser,
            "labels": optionsLabel
        }

        // call to create a ticket
        createTicket(subTicketTitle, datetime, subTicketDesc, prioId, typeId, workflowNodes[nodeIndex].statusId, projectId, optionsUser, optionsLabel);
        $("[data-toggle=" + popoverId + "popoverAddTicket]").popover('hide');

    });

    // Submit a ticket to the database
    //    $('#submitTicket').off().on('click', function (e) {
    //        var elem = document.getElementById("prioritylist");
    //        var prioId = elem.options[elem.selectedIndex].value;
    //
    //        var elem = document.getElementById("typelist");
    //        var typeId = elem.options[elem.selectedIndex].value;
    //
    //        var data = {
    //            "title": $("#input_new_title").val(),
    //            "creationDate": datetime,
    //            "description": $("#input_new_desc").val(),
    //            "priorityId": prioId,
    //            "typeId": typeId,
    //            "statusId": workflowNodes[nodeIndex].statusId,
    //            "projectId": projectId,
    //            "users": optionsUser,
    //            "labels": optionsLabel
    //        }
    //
    //        // call to create a ticket
    //        createTicket($("#input_new_title").val(), datetime, $("#input_new_desc").val(), prioId, typeId, workflowNodes[nodeIndex].statusId, projectId, optionsUser, optionsLabel);
    //    });
    $('body').on('click', '.popover .dropdown-menu.dropdownLabels a', function (e) {

        var $target = $(this),
            val = $target.attr('data-value'),
            $inp = $target.find('input'),
            idx;

        if ((idx = optionsLabel.indexOf(val)) > -1) {
            optionsLabel.splice(idx, 1);
            setTimeout(function () {
                $inp.prop('checked', false)
            }, 0);
        } else {
            optionsLabel.push(val);
            setTimeout(function () {
                $inp.prop('checked', true)
            }, 0);
        }

        $(event.target).blur();

        console.log(optionsLabel);
        return false;
    });

    $('body').on('click', '.popover .dropdown-menu.dropdownUsers a', function (e) {
        var $target = $(this),
            val = $target.attr('data-value'),
            $inp = $target.find('input'),
            idx;

        if ((idx = optionsUser.indexOf(val)) > -1) {
            optionsUser.splice(idx, 1);
            setTimeout(function () {
                $inp.prop('checked', false)
            }, 0);
        } else {
            optionsUser.push(val);
            setTimeout(function () {
                $inp.prop('checked', true)
            }, 0);
        }

        $(event.target).blur();

        console.log(optionsUser);
        return false;
    });


    $('#btnFileUpload').off().on('click', function (event) {
        // select file and upload 
    });

}

// Callback to get all tickets
function callbackGetTickets(result) {
    console.log("callbackGetTickets");
    allTickets = result;
    getWorkflow(projectId);
}


// Callback for the workflow of a user
function callbackGetWorkflow(result) {
    console.log("callbackGetWorkflow");
    workflowNodes = result;
    for (var key in workflowNodes) {

        if (workflowNodes[key].arrows == null) {
            console.log("null");
        } else {
            nodeArrows[key] = workflowNodes[key].arrows;
        }

        $('.bgRaster').append('<div id="' + workflowNodes[key].id + '" class="item" style=left:' + workflowNodes[key].positionX + '%;top:' + workflowNodes[key].positionY + '%></div>');
        $('#' + workflowNodes[key].id).append('<div class="addTicket" data-placement="bottom" data-toggle="' + workflowNodes[key].id + 'popoverAddTicket" data-container="body" data-placement="left" data-html="true"></div>');
        $('#' + workflowNodes[key].id + ' .addTicket').append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>');
        $('#' + workflowNodes[key].id).append('<div class="topTitle">' + allNodes[workflowNodes[key].statusId - 1].title + '</div>');
        $('#' + workflowNodes[key].id).append('<div class="showNode" data-placement="bottom" data-toggle="' + workflowNodes[key].id + 'popoverNodeView" data-container="body" data-placement="left" data-html="true"></div>');
        $('#' + workflowNodes[key].id + ' .showNode').append('<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>');
        $('#' + workflowNodes[key].id + ' .showNode').after('<div class="amountTickets"></div>');
        $('#' + workflowNodes[key].id + ' .amountTickets').html(workflowNodes[key].ticketsCount);
        //        $("[data-toggle=popover]").popover({
        //            html: true,
        //            content: function () {
        //                $(this).next('.popover').find('#closePopup').click(function (e) {
        //                    $(this).popover('hide');
        //                });
        //
        //                var nodename = $(this).prev().html();
        //                $('#popover-content .modal-title').html('All Tickets in <b>' + nodename + '</b>'); // replaces the title
        //                var nodeId = workflowNodes[$(this).parent().index()].id;
        //                console.log(nodeId);
        //                getTicketsByNodeId(nodeId);
        //                return $('#popover-content').html();
        //            }
        //        });
    }
    startJsplumb(); // When finished with nodecreation, start jsplumb to create connection etc.
    listener(); // Activate the listener after create HTML content
}

function callbackGetWorkflowForArray(result) {
    console.log("callbackGetWorkflowForArray");
    workflowNodes = result;
}
// Callback to get all status from server
function callbackGetStatus(result) {
    allNodes = result;
    console.log("callbackGetStatus: " + allNodes);
    for (var key in allNodes) {
        $('#addNode + .popover .checkbox').append('<div class="radio"><label><input type="radio" name="optionsRadios" class="radioStatus" id="option' + allNodes[key].id + '" value="' + allNodes[key].id + '" />' + allNodes[key].title + '</label></div>');
    }
}

// Callback to get all types in the DB
function callbackGetTypes(result) {
    console.log("callbackGetTypes");
    allTypes = result;
    for (var key in result) {
        $('#typelist').append('<option value="' + allTypes[key].id + '">' + allTypes[key].title + '</option>');
    }
}


// Get all priorites
function callbackGetPriorities(result) {
    console.log("callbackGetTypes");
    allPriorities = result;
    for (var key in result) {
        $('#prioritylist').append('<option value="' + allPriorities[key].id + '">' + allPriorities[key].title + '</option>');
    }
}

function callbackGetTicketFeedback(result) {
    console.log("callbackGetTicketFeedback")
    feedbackTicket = result;
    for (var key in result) {
        console.log("FEEDBACK: " + feedbackTicket[key].feedbackText + " | " + feedbackTicket[key].id);
    }
}

// Get all labels 
function callbackGetLabels(result) {
    console.log("callbackGetLabels");
    allLabels = result;
    for (var key in result) {
        $('.dropdown-menu.dropdownLabels').append('<li><a href="#" class="small" data-value="' + result[key].id + '" tabIndex="-1"><input type="checkbox" id="label' + result[key].id + '" /><label for="label' + result[key].id + '"><span></span>' + result[key].title + '</label></a></li>');
    }
}
// Get all Users 
function callbackGetUsers(result) {
    console.log("callbackGetUsers");
    allUsers = result;
    for (var key in result) {
        $('.dropdown-menu.dropdownUsers').append('<li><a href="#" class="small" data-value="' + result[key].id + '" tabIndex="-1"><input type="checkbox" id="user' + result[key].id + '" /><label for="user' + result[key].id + '"><span></span>' + result[key].username + '</label></a></li>');
        // 
    }
}

// Get all tickets by ticketid
function callbackGetTicketsById(result) {
    ticketById = result;
}
// Update the position of the nodes in the workflow
function callbackUpdateWorkflowposition(result) {
    console.log("callbackUpdateWorkflowposition");
}
// Update ticket
function callbackUpdateTicket(result) {
    console.log("callbackUpdateTicket");
    $('#ticketView').fadeOut('fast');
    $('#ticketViewWrapper').fadeOut('fast');
}

function callbackCreateTicket(result) {
    console.log("callbackCreateTicket");
    $('#' + workflowNodes[nodeIndex].id + ' .amountTickets').html(++workflowNodes[nodeIndex].ticketsCount);
    $('#ticketAdd').fadeOut('fast');
    $('#ticketViewWrapper').fadeOut('fast');
}
// get all tickets for showing all within a node  
//function callbackGetTicketsByNodeId(result) {
//    console.log("callbackGetTicketsByNodeId");
//
//    allTicketInNode = result;
//    $('#myModal2 .modal-body').empty();
//    for (var key in result) {
//        console.log("allticket: " + allTicketInNode);
//        //        Load tickets into Nodes
//        $('#myModal2 .modal-body').append('<div class="nodeTicketWrapper"></div>');
//        $('#myModal2 .nodeTicketWrapper').last().append('<div id="' + allTicketInNode[key].statusId + allTicketInNode[key].title + 'ticket" class="nodeTicket"><b>' + allTicketInNode[key].title + ' </b></br></br> Priority: ' + allPriorities[allTicketInNode[key].priorityId - 1].title + '</br> Type: ' + allTypes[allTicketInNode[key].typeId - 1].title + '</div>');
//    }
//    listenerShowTicket();
//}

function callbackGetTicketsByNodeId(result) {
    console.log("callbackGetTicketsByNodeId");

    allTicketInNode = result;
    $('#popover-content .modal-body').empty();
    for (var key in result) {
        console.log("allticket: " + allTicketInNode);
        //        Load tickets into Nodes
        $('#popover-content .modal-body').append('<div class="nodeTicketWrapper"></div>');
        $('#popover-content .nodeTicketWrapper').last().append('<div id="' + allTicketInNode[key].statusId + allTicketInNode[key].title + 'ticket" class="nodeTicket"><b>' + allTicketInNode[key].title + ' </b></br></br> Priority: ' + allPriorities[allTicketInNode[key].priorityId - 1].title + '</br> Type: ' + allTypes[allTicketInNode[key].typeId - 1].title + '</div>');
    }


    $("[data-toggle=" + popoverId + "popoverNodeView]").popover({
        html: true,
        content: function () {
            var nodename = $(this).prev().html();
            $('#popover-content .modal-title').html('All Tickets in <b>' + nodename + '</b>'); // replaces the title
            var nodeId = workflowNodes[$(this).parent().index()].id;
            console.log(nodeId);
            //                getTicketsByNodeId(nodeId);
            return $('#popover-content').html();
        }
    });
    $("[data-toggle=" + popoverId + "popoverNodeView]").popover('show');

    listenerShowTicket();
}

function callbackCreateArrow(result) {
    console.log("callbackCreateArrow");
    console.log(result);
    getWorkflowForArray(projectId);
}
// updating an existing arrow
function callbackUpdateArrow(result) {
    console.log("callbackCreateArrow");
    console.log(result);
}

function callbackCreateNode(result) {
    console.log("callbackCreateNode");
    console.log(result);
    console.log(result.ticketsCount);
    //$(".item").last().attr("id", result.id);
    getWorkflowForArray(projectId);


    $('.bgRaster').append('<div id="' + result.id + '" class="item" style=left:' + result.positionX + '%;top:' + result.positionY + '%></div>');
    $('#' + result.id).append('<div class="addTicket" data-placement="bottom" data-toggle="' + result.id + 'popoverAddTicket" data-container="body" data-placement="left" data-html="true"></div>');
    $('#' + result.id + ' .addTicket').append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>');
    $('#' + result.id).append('<div class="topTitle">' + allNodes[result.statusId - 1].title + '</div>');
    $('#' + result.id).append('<div class="showNode" data-placement="bottom" data-toggle="' + result.id + 'popoverNodeView" data-container="body" data-placement="left" data-html="true"></div>');
    $('#' + result.id + ' .showNode').append('<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>');
    $('#' + result.id + ' .showNode').after('<div class="amountTickets"></div>');
    $('#' + result.id + ' .amountTickets').html(result.ticketsCount);
    jsPlumb.draggable($(".item"), {
        containment: "parent",
        grid: [10, 10]
    });

    //        $("[data-toggle=popover]").popover({
    //            html: true,
    //            content: function () {
    //                $(this).next('.popover').find('#closePopup').click(function (e) {
    //                    $(this).popover('hide');
    //                });
    //
    //                var nodename = $(this).prev().html();
    //                $('#popover-content .modal-title').html('All Tickets in <b>' + nodename + '</b>'); // replaces the title
    //                var nodeId = workflowNodes[$(this).parent().index()].id;
    //                console.log(nodeId);
    //                getTicketsByNodeId(nodeId);
    //                return $('#popover-content').html();
    //            }
    //        });

}

function startJsplumb() {
    jsPlumb.ready(function () {
        console.log("jsplumb loaded!");
        // Set the container for the workflow
        jsPlumb.setContainer("diagramContainer");

        // Default setting of connections
        var common = {
            connector: ["StateMachine"], // Form of the line between connected nodes
            endpoint: "Dot", // Form of the anchorpoint
            anchor: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
            overlays: [["Arrow", {
                    width: 20,
                    length: 20,
                    location: 1,
                    foldback: 1,
                    id: "arrow"
            }],
                       ["Label", {
                    id: "label",
                    cssClass: "labelstyle",
                    location: 0.5, // Position of the label at the arrow
                }]
                      ],
            paintStyle: {
                strokeStyle: "#428bca",
                lineWidth: 5
            },
            endpointStyle: {
                fillStyle: "#428bca",
                radius: 6
            },
            ConnectionsDetachable: false,
            ReattachConnections: false
        }

        jsPlumb.registerConnectionTypes({
            "normal": {
                paintStyle: {
                    strokeStyle: "#428bca",
                    lineWidth: 5
                }
            },
            "edit": {
                paintStyle: {
                    strokeStyle: "#ca4242",
                    lineWidth: 5
                },
                hoverPaintStyle: {
                    strokeStyle: "#baca42"
                }
            }
        });
        var arrConnect = [];

        // Anchors can switch position
        var dynamicAnchors1 = ["Left", "Right", "Top", "Bottom"];
        var dynamicAnchors2 = ["Right", "Left", "Top", "Bottom"];

        // Node is draggable on a 10x10 grid
        jsPlumb.draggable($(".item"), {
            containment: "parent",
            grid: [10, 10]
        });
        var counter = 0;
        // Loop through nodes and connect them
        for (var i = 0; i < workflowNodes.length; i++) {
            // if the node has no arrows, don't do anything
            if (workflowNodes[i].arrows == null) {} else { // if the node has arrows, connect them
                for (var key in workflowNodes[i].arrows) {
                    var sourceName = workflowNodes[i].arrows[key].sourceNode;
                    var targetName = workflowNodes[i].arrows[key].targetNode;
                    var arrowId = workflowNodes[i].arrows[key].id;
                    console.log("Arrows:" + arrowId);
                    arrConnect[counter] = jsPlumb.connect({
                        source: sourceName + "", // + "" has to be stated here, otherwise the nodes won't connect, dunno why
                        target: targetName + "",
                        detachable: false
                    }, common);

                    var label = arrConnect[counter].getOverlay("label");
                    counter++;
                    if (workflowNodes[i].arrows[key].label == null) {} else {
                        label.setLabel(workflowNodes[i].arrows[key].label);
                    }
                }
            }
        }

        var srcClick = "";
        var trgClick = "";
        var found = false;

        // connect 2 nodes together
        function connectNodes() {

            $(".item").off().on('click', function () {
                if (srcClick == "") {
                    srcClick = $(this).attr("id");
                    firstNode = $(this);
                    firstNode.addClass('borderHighlight');
                    console.log("set src: " + $(this).attr("id"));
                } else if (srcClick == $(this).attr("id")) {
                    srcClick = "";
                    firstNode.removeClass('borderHighlight');
                    console.log("make src empty: " + $(this).attr("id"));
                } else if (trgClick == "") {
                    trgClick = $(this).attr("id");
                    for (var key in arrConnect) {
                        if (srcClick == arrConnect[key].sourceId && trgClick == arrConnect[key].targetId) {
                            console.log("FOUND");
                            found = true;
                        }
                    }
                    if (found == true) {
                        console.log("already set!");
                        //                            $("#connectionExistsAlert").alert('open');
                        $("#connectionExistsAlert").show();
                        $("#connectionExistsAlert").fadeTo(2000, 500).slideUp(500, function () {
                            $("#connectionExistsAlert").hide();
                        });
                        srcClick = "";
                        trgClick = "";
                        console.log("make both empty");
                        found = false;
                        firstNode.removeClass('borderHighlight');

                    } else { // create the arrow
                        var label = "";

                        createArrow(srcClick, trgClick);

                        // create an arrow between 2 nodes
                        arrConnect.push(jsPlumb.connect({
                            type: "edit",
                            source: srcClick,
                            target: trgClick,
                            detachable: false
                        }, common));

                        srcClick = "";
                        trgClick = "";
                        console.log("make both empty");
                        firstNode.removeClass('borderHighlight');
                        connectNodes(); // refresh clicklistener for new arrow 
                    }
                }
            });

            var arrowIdTemp;
            var cSourceId;
            var cTargetId;
            var cObject;
            // click on arrow to get the arrowId
            jsPlumb.bind("click", function (c) {
                console.log(c.sourceId + " " + c.targetId);
                cObject = c;
                cSourceId = c.sourceId;
                cTargetId = c.targetId;
                // look for the right node in local array
                var found;
                for (var key in workflowNodes) {
                    // console.log("iterate workflow: " + workflowNodes[key].id + workflowNodes[key].arrows);
                    if (workflowNodes[key].id == c.sourceId) {
                        //  console.log("found: " + workflowNodes[key].id);
                        found = key;
                    }
                }
                // look for the arrow that has been clicked
                for (var key in workflowNodes[found].arrows) {
                    //console.log("iterate arrow: " + workflowNodes[found].arrows[key].id);
                    if (c.sourceId == workflowNodes[found].arrows[key].sourceNode && c.targetId == workflowNodes[found].arrows[key].targetNode) {
                        // console.log("THIS ARROW ID: " + workflowNodes[found].arrows[key].id);
                        arrowIdTemp = workflowNodes[found].arrows[key].id;
                    }
                }
                // TODO Maybe if no arrow is set -> warning
            });

            // clicklistener on arrow to show option to add a label or delete the arrow
            $('path').off().on('click', function (e) {
                var offset = $(this).offset();
                var left = e.pageX;
                var top = e.pageY;
                var theHeight = $('.popoverArrow').height();
                $('.popoverArrow').show();
                $('.popoverArrow').css('left', (left + 10) + 'px');
                $('.popoverArrow').css('top', (top - (theHeight / 2) - 10) + 'px');
            });


            $('.btnSaveLabel').off().on('click', function () {
                var inputLabelVal = $(".inputLabel").val();
                var arrconnLabel;
                updateArrow(arrowIdTemp, cSourceId, cTargetId, inputLabelVal);

                for (var key in arrConnect) {
                    if (cSourceId == arrConnect[key].sourceId && cTargetId == arrConnect[key].targetId) {
                        arrconnLabel = arrConnect[key].getOverlay("label");
                    }
                }
                arrconnLabel.setLabel(inputLabelVal);

                $('.popoverArrow').hide();
            });
            // delete arrow
            $('.btnDeleteArrow').off().on('click', function (c) {
                console.log(arrowIdTemp + " | " + cSourceId + " | " + cTargetId);
                deleteArrow(arrowIdTemp);
                for (var key in arrConnect) {
                    if (cSourceId == arrConnect[key].sourceId && cTargetId == arrConnect[key].targetId) {
                        delete arrConnect[key];
                    }
                }
                // delete arrow in UI
                jsPlumb.detach(cObject);
                $('.popoverArrow').hide();
            });

            $('.btnCloseLabel').off().on('click', function () {
                $('.popoverArrow').hide();
            });
        }

        var statusIdTemp;
        $('#addNode').popover({
            html: true,
            title: 'Select status',
            content: function () {
                return $('#addNode + .popover').html();
            }
        });

        // add a new node with title of the available status
        $('body').on('click', '#saveAddNode', function () {
            var found = false;
            for (var key in workflowNodes) {
                if (allNodes[statusIdTemp].id == workflowNodes[key].statusId) {
                    console.log("exists already: " + allNodes[statusIdTemp].title);
                    found = true;
                }
            }
            if (found == true) {
                $("#connectionExistsAlert").show();
                $("#connectionExistsAlert").fadeTo(2000, 500).slideUp(500, function () {
                    $("#connectionExistsAlert").hide();
                });
            } else {

                //                $(".bgRaster").append('<div id="" class="item jsplumb-draggable jsplumb-endpoint-anchor jsplumb-connected"><div class="topTitle">' + allNodes[statusIdTemp].title + '</div></div>');
                console.log(allNodes[statusIdTemp].title);
                createNode(projectId, userId, allNodes[statusIdTemp].id, 0, 0);

                jsPlumb.draggable($(".item"), {
                    containment: "parent",
                    grid: [10, 10]
                });

                console.log("save");
                $('#addNode').trigger("click");
                jsPlumb.repaintEverything();
            }


        });

        $('body').on('click', '#closeAddNode', function () {
            console.log("close");
            $('#addNode').trigger("click");

        });

        $('body').on('click', '.radioStatus', function () {
            statusIdTemp = $('.radioStatus').index(this);
            console.log(allNodes[statusIdTemp].id);
        });




        // ******************************************** ZOOM ********************************************
        //Zoom the container on mousewheel
        //        $('#diagramContainer').bind('mousewheel', function () {
        //            var stage = $(this);
        //            var scaleData = getZoom(stage);
        //            console.log(scaleData)
        //            if (event.wheelDelta < 0) {
        //                //Zoom out
        //                setZoom(scaleData.curScale * '.9', stage);
        //            } else if (event.wheelDelta > 1) {
        //                //Zoom in
        //                setZoom(scaleData.curScale * '1.1', stage);
        //            }
        //            jsPlumb.repaintEverything();
        //            console.log("ALL REPAINTED");
        //            return false;
        //            event.stopPropagation();
        //
        //        });


        // Set the zoom and scale the overview
        function setZoom(scale, el) {
            console.log(scale)
                //Round scales to nearest 10th
            scale = Math.round(scale * 10) / 10;

            el.attr({
                style: 'zoom: ' + scale + ';' +
                    '-webkit-transform: scale(' + scale + ');' +
                    '-moz-transform: scale(' + scale + ');' +
                    '-o-transform: scale(' + scale + ');' +
                    '-ms-transform: scale(' + scale + ');' +
                    'transform: scale(' + scale + ');'
            });
        }

        //Helper to get the current scale factor of the stage
        function getZoom(el) {

            var curZoom = el.css('zoom');
            var curScale = el.css('transform') ||
                el.css('-webkit-transform') ||
                el.css('-moz-transform') ||
                el.css('-o-transform') ||
                el.css('-ms-transform');

            if (curScale === 'none') {
                curScale = 1;
            } else {
                //Parse retarded matrix string into array of values
                var scaleArray = $.parseJSON(curScale.replace(/^\w+\(/, "[").replace(/\)$/, "]"));

                //We only need one of the two scaling components as we are always scaling evenly across both axes
                curScale = scaleArray[0];
            }

            return {
                curZoom: curZoom,
                curScale: curScale
            };
        }
        var editmode = false;
        $('.switchEditMode').off().on('click', function () {
            // if switch is turned on, add listener to connect nodes
            if (editmode == false) {
                editmode = true;
                for (var key in arrConnect) {
                    //  console.log(arrConnect[key].id)
                    arrConnect[key].toggleType("edit");
                }
                connectNodes();
            } else { // if switch is turned off, delete clicklistener
                editmode = false;
                for (var key in arrConnect) {
                    arrConnect[key].toggleType("edit");
                }
                $(".item").off().on('click', function () {});
                jsPlumb.unbind("click");
                // TODO updatecall nodes
            }
            console.log("click: " + $(this).prop('checked'));

        });
    });

}