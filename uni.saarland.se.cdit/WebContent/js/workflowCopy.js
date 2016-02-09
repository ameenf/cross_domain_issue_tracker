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
        //        $('#ticketViewWrapper').toggle();
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


        console.log("NodeID");
        console.log($('.nodeTicket').index(this));
        console.log(allTicketInNode);
        console.log(allTicketInNode.length);

        $('.popover-content #ticketOverview').toggle();
        $('.popover-content #ticketView').toggle();

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
        $('body').on('click', '.labelCheck', function () {
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
        //        var allInputs = $(":input");
        //        allInputs.prop('checked', false);
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

    //        $('.showNode').off().on('click', function (e) {
    $('body').on('click', '.showNode', function (e) {
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
        $('.popover-content #ticketOverview').toggle();
        $('.popover-content #ticketView').toggle();
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
    $('#' + result.id).append('<div class="deleteNode" data-placement="bottom" data-container="body"></div>');
    $('#' + result.id + ' .deleteNode').append('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
    jsPlumb.draggable($(".item"), {
        containment: "parent",
        grid: [10, 10]
    });
}

function callbackDeleteNode(result) {
    console.log("callbackDeleteNode");
    console.log(result);
    //getWorkflowForArray(projectId);
}