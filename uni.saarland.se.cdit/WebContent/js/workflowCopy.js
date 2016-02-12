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
var projectId = Cookies.get("projectid"); // add prject id from cookie here
var userId = Cookies.get("userid"); // get UserId from cookie
var userName = Cookies.get("username"); // get UserId from cookie
var userType = Cookies.get("usertype"); // get UserId from cookie
var nodeIndex;
var lastarrowId;
var popoverId;
var firstNode;
var nodename;
var nodeId;
var ticketLabel = [];
var ticketUser = [];
var fileId;
var ticketFiles = [];
var dropStatusId;
var dragId, dragTitle, dragDate, dragDesc, dragPrio, dragType, dragProject, dragUser, dragLabel;

$(document).ready(function () {
    if (userType == "admin") { // if user is admin, add adminarea
        console.log("ADMIN HERE");
        $('.alertPlaceholder').before('<div id="adminArea"></div>');
        $('#adminArea').append('<form class="form-inline"></form>');
        $('#adminArea .form-inline').append('<div class="row editRow"></div>');

        ////// Switch
        $('#adminArea .editRow').append('<div class="onoffswitch col-md-2"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox switchEditMode" id="myonoffswitch"><label class="onoffswitch-label" for="myonoffswitch"></label></div>');

        ////// Craete content for adding nodes
        $('#adminArea .editRow').append('<button id="addNode" type="button" class="btn btn-default" data-toggle="popover" title="Select status" data-placement="bottom">Add Node</button>');

        $('#adminArea .editRow').append('<div class="popover"><div class="form-group"><div class="checkbox"></div><div class="usrCheckContent"></div></div>');

        $('#adminArea .usrCheckContent').append('<div class="btn-group"><button type="button" id="btnAddNodeUser" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><ul class="dropdown-menu dropdownUsersAddNode"></ul></div>');

        $('#addNode + .popover').append('<div class="modal-footer"><button id="closeAddNode" type="button" class="btn btn-default btn-block">Close</button><button id="saveAddNode" type="button" class="btn btn-primary btn-block">Save</button></div>');

    };
    //    $('#btnFileUpload').click(function () {
    $('body').on('click', '#btnFileUpload', function () {

        var formData = new FormData($('form')[2]);
        //        var formData = new FormData($('.popover-content-addTicket #uploadFile'));
        //        var formData = new FormData($('.uploadFile'));
        $('#submitTicket').attr("disabled", "disabled"); //Most likely wrong selector
        createFile(formData);
    });

    getTickets(); // Get the amount of tickets and store number in node
    getStatus();
    getTypes();
    getPriorities();
    getUsers();
    getLabels();
});

function callbackCreateFile(result) {
    $('#submitTicket').removeAttr("disabled");
    ticketFiles.push(result);
    console.log('TickerFuiles : ', ticketFiles);
}

function progressHandlingFunction(a) {
    console.log(a);
}
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
    //////////////////////////////////////////////////Show one Ticket//////////////////////////////////////////////////////

    //        $('body').on('click', '.userCheck', function () {
    // Enlarge and show a ticket
    //$('body').on('click', '.nodeTicket', function () {
    $('.nodeTicket').off().on('click', function (e) {
        if ($(this).hasClass('noclick')) {
            console.log($(this).attr('id'));
            $(this).removeClass('noclick');
        } else {
            e.preventDefault();
            e.stopPropagation();
            currentTicketIndex = $('.nodeTicket').index(this);
            currentStatusId = allTicketInNode[currentTicketIndex].statusId;

            console.log('currentTicketIndex: ', currentTicketIndex);
            console.log("allticketinnode: ", allTicketInNode);
            console.log("nodename: ", nodename);
            console.log("ticketstatus: ", currentStatusId);

            //        currentStatusId = 1;

            //        getTicketsById(allTicketInNode[$('.nodeTicket').index(this)].id);
            //        getTicketFeedback(allTicketInNode[$('.nodeTicket').index(this)].id);
            getTicketsById(allTicketInNode[$('.nodeTicket').index(this)].id);
            //getTicketFeedback(4); TODO -> FEEDBACK

            //        $('.popover-content #ticketOverview').toggle();
            //        $('.popover-content #ticketView').popover('show');


            //////////Fill Ticketview//////////
            ////////// Title
            $('.popover-content').empty();


            $('.popover-content').append('<div class="modal-header"><h4 class="modal-title" id="myModalLabel"></h4></div><div class="modal-body"></div>');
            $('.popover-content .modal-title').html('Edit Ticket <b>' + allTicketInNode[currentTicketIndex].title + '</b>'); // replaces the title
            $('.popover-content .modal-body').append('<form class="form-horizontal"></form>');

            //        $('.popover-content').append('<div class="form-group"> <label class="col-sm-2 control-label">Title</label><div class="col-sm-10"><input type="text" class="form-control updTitle" value="' + allTicketInNode[$('.nodeTicket').index(this)].title + '" readonly></div></div>');
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Title</label><div class="col-sm-10"><input type="text" class="form-control updTitle" value="' + allTicketInNode[currentTicketIndex].title + '" readonly></div></div>');


            ////////// Description
            //        $('.popover-content').append('<div class="form-group"> <label class="col-sm-2 control-label">Description</label><div class="col-sm-10"><textarea class="form-control updDesc" readonly>' + allTicketInNode[$('.nodeTicket').index(this)].description + '</textarea></div></div>');
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Description</label><div class="col-sm-10"><textarea class="form-control updDesc" readonly>' + allTicketInNode[currentTicketIndex].description + '</textarea></div></div>');

            ////////// Creation date
            //        $('.popover-content').append('<div class="form-group"> <label class="col-sm-2 control-label">Creation Date</label><div class="col-sm-10"><input type="text" class="form-control updCreat" value="' + allTicketInNode[$('.nodeTicket').index(this)].creationDate + '" readonly></div></div>');
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Creation Date</label><div class="col-sm-10"><input type="text" class="form-control updCreat" value="' + allTicketInNode[currentTicketIndex].creationDate + '" readonly></div></div>');

            ////////// Priority
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Priority</label><div class="col-sm-10"><select id="updPrioritylist" class="form-control" disabled></select></div></div>');
            // TODO geht das nich auch mit id?
            for (var key in allPriorities) {
                //            if (allPriorities[allTicketInNode[$('.nodeTicket').index(this)].priorityId - 1].title == allPriorities[key].title)
                if (allPriorities[allTicketInNode[currentTicketIndex].priorityId - 1].title == allPriorities[key].title)
                    $('#updPrioritylist').append('<option value="' + allPriorities[key].id + '" selected>' + allPriorities[key].title + '</option>');
                else
                    $('#updPrioritylist').append('<option value="' + allPriorities[key].id + '">' + allPriorities[key].title + '</option>');
            }

            ////////// Type
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updType">Type</label><div class="col-sm-10"><select id="updTypelist" class="form-control" disabled></select></div></div>');
            // TODO geht das nich auch mit id?
            for (var key in allTypes) {
                //            if (allTypes[allTicketInNode[$('.nodeTicket').index(this)].typeId - 1].title == allTypes[key].title)
                if (allTypes[allTicketInNode[currentTicketIndex].typeId - 1].title == allTypes[key].title)
                    $('#updTypelist').append('<option value="' + allTypes[key].id + '" selected>' + allTypes[key].title + '</option>');
                else
                    $('#updTypelist').append('<option value="' + allTypes[key].id + '">' + allTypes[key].title + '</option>');
            }

            ////////// Label
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updLabel">Labels</label><div class="col-sm-10"></div></div>');
            // + button to add label
            $('.updLabel + .col-sm-10').append('<span class="label label-success btnEdit" id="btnaddLabels" data-toggle="popover" title="Select label" data-placement="top">+</span><div class="popover"><div class="col-sm-6 checkbox"></div></div>');

            if (allTicketInNode[currentTicketIndex].labels == null) {
                ticketLabel = []
            } else {
                //            ticketLabel = allTicketInNode[$('.nodeTicket').index(this)].labels;
                ticketLabel = allTicketInNode[currentTicketIndex].labels;
            }
            console.log("TICKETLABL: ", ticketLabel);
            $.each(allLabels, function (key, value) {
                var found = $.inArray(allLabels[key].id, ticketLabel);
                if (found != -1) {
                    $('.updLabel + .col-sm-10').append('<span class="label label-primary  ' + allLabels[key].title + allLabels[key].id + '">' + allLabels[key].title + '</span>');
                    $('#btnaddLabels + .popover .checkbox').append('<label><input class="labelCheck" type="checkbox" checked/>' + allLabels[key].title + '</label>');
                } else {
                    $('#btnaddLabels + .popover .checkbox').append('<label><input class="labelCheck" type="checkbox"/>' + allLabels[key].title + '</label>');
                }
            });
            // Popover for Labels
            $('.popover-content #btnaddLabels').popover({
                html: true,
                title: 'Select labels',
                content: function () {
                    $('#btnaddLabels + .popover .checkbox').empty();
                    $.each(allLabels, function (key, value) {
                        var found = $.inArray(allLabels[key].id, ticketLabel);
                        if (found != -1) {
                            $('#btnaddLabels + .popover .checkbox').append('<label><input class="labelCheck" type="checkbox" checked/>' + allLabels[key].title + '</label>');
                        } else {
                            $('#btnaddLabels + .popover .checkbox').append('<label><input class="labelCheck" type="checkbox"/>' + allLabels[key].title + '</label>');
                        }
                    });
                    return $('#btnaddLabels + .popover').html();
                }
            });

            ////////// Users
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updUsers">Users</label><div class="col-sm-10"></div></div>');
            // + button to add user
            $('.updUsers + .col-sm-10').append('<button class="btn btn-default btnEdit" id="btnUpdUsers" type="button" data-toggle="popover" title="Select users" data-placement="top"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><div class="popover"><div class="col-sm-6 checkbox"></div></div>');

            // add existing user in a ticket as default icon and in the checkboxlist

            if (allTicketInNode[currentTicketIndex].users == null) {
                ticketUser = []
            } else {
                ticketUser = allTicketInNode[currentTicketIndex].users;
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

            $('.popover-content #btnUpdUsers').popover({
                html: true,
                title: 'Select users',
                content: function () {
                    $('#btnUpdUsers + .popover .checkbox').empty();
                    $.each(allUsers, function (key, value) {
                        var found = $.inArray(allUsers[key].id, ticketUser);
                        if (found != -1) {
                            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                            $('#btnUpdUsers + .popover .checkbox').append('<label><input class="userCheck" id="check' + allUsers[key].id + '" type="checkbox" checked/>' + allUsers[key].username + '</label>');
                        } else {
                            $('#btnUpdUsers + .popover .checkbox').append('<label><input class="userCheck" id="check' + allUsers[key].id + '" type="checkbox"/>' + allUsers[key].username + '</label>');
                        }
                    });
                    return $('#btnUpdUsers + .popover').html();
                }
            });


            ////////// Files
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updFiles">Files</label><div class="col-sm-10"></div></div>');
            $('.updFiles + .col-sm-10').append('<button class="btn btn-default btnEdit" type="button" id="btnUpdFile"><span class="glyphicon glyphicon glyphicon-open-file" aria-hidden="true"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button>');

            ////////// Feedback
            $('.popover-content .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updFiles">Comments</label><div class="col-sm-10"></div></div>');

            // TODO: add here comment section with usericon, username and his commment. Further a user can add comments and existing comments should be modifiable.

            ////////// Buttons to close, edit and update tickets
            $('.popover-content .form-horizontal').append('<button type="button" class="btn btn-default closeTicket">Close</button><button id="updateTicket" type="button" class="btn btn-primary btnEdit">Update Ticket</button><button type="button" class="btn btn-default editTicket"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></button>');


            ////////// Listener
            // close button to close the ticket
            $('.popover-content .closeTicket').off().on('click', function (e) {
                console.log("CLOSE TICKET BTN");
                $("#" + nodeId + " .showNode").trigger("click");
            });
            // edit the ticket
            $('.popover-content .editTicket').off().on('click', function (e) {
                console.log('Edit ticket' + allTicketInNode[currentTicketIndex].title);
                //$('#ticketView p').toggleClass('form-control-static form-control');
                $('.btnEdit').toggle();
                if ($('.popover-content input').attr('readonly') && $('.popover-content select').attr('disabled') && $('.popover-content textarea').attr('readonly')) {
                    $('.popover-content input').removeAttr('readonly');
                    $('.popover-content select').removeAttr('disabled');
                    $('.popover-content textarea').removeAttr('readonly');
                } else {
                    $('.popover-content input').attr('readonly', '');
                    $('.popover-content select').attr('disabled', '');
                    $('.popover-content textarea').attr('readonly', '');
                }
            });

            // Update Ticket Button -> Submits values to server
            $('.popover-content #updateTicket').off().on('click', function (e) {
                console.log("UPDATE TICKET BTN");

                var elem = document.getElementById("updPrioritylist");
                var prioId = elem.options[elem.selectedIndex].value;

                var elem = document.getElementById("updTypelist");
                var typeId = elem.options[elem.selectedIndex].value;
                console.log($(".updTitle").val(), " | ", $(".updDesc").val());
                console.log("creatDate: ", $(".updCreat").val());
                console.log("priority: ", prioId);
                console.log("type: ", typeId);
                console.log("status: ", currentStatusId);
                console.log("project: ", projectId);
                console.log("users: ", ticketUser);
                console.log("labels: ", ticketLabel);
                // update the ticket
                updateTicket(allTicketInNode[currentTicketIndex].id, $(".updTitle").val(), $(".updCreat").val(), $(".updDesc").val(), prioId, typeId, currentStatusId, projectId, ticketUser, ticketLabel);
            });

        } // else
    }); // nodeTicket click


    // Popover for showing one Ticket of a node
    //    $(".nodeTicket").popover({
    //        html: true,
    //        content: function (e) {
    //            nodename = $(this).prev().html();
    //
    //            nodeId = workflowNodes[$(this).parent().index()].id;
    //            //$('.nodeTicket').not(this).popover('hide');
    //            nodename = $(this).prev().html();
    //            nodeId = workflowNodes[$(this).parent().index()].id;
    //            popoverId = nodeId;
    //            //                getTicketsByNodeId(nodeId);
    //            return $('#popover-content-show').html();
    //        },
    //        trigger: 'manual'
    //    }).click(function (e) {
    //        //$(this).popover('toggle');
    //        e.stopPropagation();
    //    });
} ////////// listenershowticket()

// select labels and add labels in UI and in the checkboxlist
$('body').on('click', '.labelCheck', function (e) {
    console.log("TICKETLABL 2 : ", ticketLabel);

    var labelCheckID = $(this).parent().index();
    var found = $.inArray(allLabels[labelCheckID].id, ticketLabel);

    if ($(this).prop('checked') == true) {
        ticketLabel.push(allLabels[labelCheckID].id);
        $('.updLabel + .col-sm-10').append('<span class="label label-primary ' + allLabels[labelCheckID].title + allLabels[labelCheckID].id + '">' + allLabels[labelCheckID].title + '</span>');
    } else {
        ticketLabel.splice(found, 1);
        $('.' + allLabels[labelCheckID].title + allLabels[labelCheckID].id).remove();
    }
    console.log(ticketLabel);
});


// select users and add users in UI
$('body').on('click', '.userCheck', function (e) {
    var userCheckID = $(this).parent().index();
    var found = $.inArray(allUsers[userCheckID].id, ticketUser);

    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if ($(this).prop('checked') == true) {
        ticketUser.push(allUsers[userCheckID].id);
        $('.updUsers + .col-sm-10').append('<div class="itemTag ' + allUsers[userCheckID].id + '" style="background-color:#' + randomColor + '" title="' + allUsers[userCheckID].username + '">' + allUsers[userCheckID].username.substring(0, 1) + '</div>');
    } else {
        ticketUser.splice(found, 1);
        $('.itemTag.' + allUsers[userCheckID].id).remove();
    }
    console.log(ticketUser);
});




function listener() {
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    console.log("LISTENER ACITVATET");


    //////////////////////////////////////////////////Create Ticket//////////////////////////////////////////////////////
    // Open dialog to create a ticket
    $('.addTicket').off().on('click', function (e) {
        optionsLabel = [];
        optionsUser = [];
        nodeIndex = $(this).parent().index();
        nodeId = workflowNodes[$(this).parent().index()].id;
        popoverId = nodeId;
    });
    // Popover for adding a ticket
    $(".addTicket").popover({
        animation: false,
        html: true,
        content: function () {
            var nodename = $(this).next().html();
            $('#popover-content-addTicket .title').html('Add Ticket in <b>' + nodename + '</b>'); // replaces the title
            var nodeId = workflowNodes[$(this).parent().index()].id;
            $('.popover').not(this).popover('hide'); // Hide all other popovers
            console.log("addticket ", nodeId);
            //                getTicketsByNodeId(nodeId);
            return $('#popover-content-addTicket').html();
        },
        trigger: 'manual'
    }).click(function (e) {
        $(this).popover('toggle');
        e.stopPropagation();
        e.preventDefault();
    });

    ////////// Fileupload
    var files;
    // Clicklistener to upload file
    $('body').on('click', '#fileuploader', function (e) {
        console.log("ADD FILE");

        // select file and upload 
    });

    // Closebutton for the popover creating ticket
    $('body').on('click', '.closePopupAddTicketView', function () {
        $("[data-toggle=" + popoverId + "popoverAddTicket]").popover('hide');
    });

    // Create a ticket and submit it to the server
    $('body').on('click', '#submitTicket', function (e) {
        var elem = $(".popover #prioritylist")[0];
        var prioId = elem.options[elem.selectedIndex].value;

        var elem = $(".popover #typelist")[0];
        var typeId = elem.options[elem.selectedIndex].value;
        var subTicketTitle = $(".popover #input_new_title").val();
        var subTicketDesc = $(".popover #input_new_desc").val();

        //        console.log(subTicketTitle, " | ", subTicketDesc);
        //        console.log("priority: ", prioId);
        //        console.log("type: ", typeId);
        //        console.log("status: ", workflowNodes[nodeIndex].statusId);
        //        console.log("project: ", projectId);
        //        console.log("users: ", optionsUser);
        //        console.log("labels: ", optionsLabel);

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
        createTicket(subTicketTitle, datetime, subTicketDesc, prioId, typeId, workflowNodes[nodeIndex].statusId, projectId, optionsUser, optionsLabel, ticketFiles);
        $("[data-toggle=" + popoverId + "popoverAddTicket]").popover('hide');

    });

    //////////////////////////////////////////////////Show Tickets in node//////////////////////////////////////////////////////

    $(".showNode").popover({
        animation: false,
        html: true,
        content: function () {
            $('.popover').not(this).popover('hide'); // Hide all other popovers
            $('.popover-content').empty();
            $('.popover-content').append('<div class="modal-header"><button type="button" class="close closePopupNodeView" data-dismiss="popover" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel"> </h4></div><div class="modal-body ticketScrollContainer"></div><div class="modal-footer"><button type="button" class="btn btn-default closePopup closePopupNodeView">Close</button></div>');

            console.log("shownode");
            return $('#popover-content').html();
        },
        trigger: 'manual'
    }).click(function (e) {
        $(this).popover('toggle');
        nodename = $(this).prev().html();
        nodeIndex = $(this).parent().index();

        nodeId = workflowNodes[$(this).parent().index()].id;

        nodename = $(this).prev().html();
        console.log("popoverid", nodeId);
        //console.log($(this).attr('data-toggle'));
        popoverId = nodeId;
        getTicketsByNodeId(nodeId);
        console.log("shownode popover");
        e.stopPropagation();
    });
    // Closebutton for the popover view node
    $('body').on('click', '.closePopupNodeView', function () {
        //        $('.popover-content #ticketOverview').toggle();
        //        $('.popover-content #ticketView').toggle();
        console.log($("#" + nodeId + " .showNode"));
        $("#" + nodeId + " .showNode").trigger("click");
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


} // listener()



//////////////////////////////////////////////////Callbacks//////////////////////////////////////////////////////
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
        $('.bgRaster').append('<div id="' + workflowNodes[key].id + '" class="item userid' + workflowNodes[key].userId + '" style=left:' + workflowNodes[key].positionX + '%;top:' + workflowNodes[key].positionY + '%></div>');
        $('#' + workflowNodes[key].id).append('<div class="addTicket" data-placement="bottom" data-toggle="' + workflowNodes[key].id + 'popoverAddTicket" data-container="body" data-placement="left" data-html="true"></div>');
        $('#' + workflowNodes[key].id + ' .addTicket').append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>');
        $('#' + workflowNodes[key].id).append('<div class="topTitle">' + allNodes[workflowNodes[key].statusId - 1].title + '</div>');
        $('#' + workflowNodes[key].id).append('<div class="showNode" data-placement="auto" data-toggle="' + workflowNodes[key].id + 'popoverNodeView" data-container="body" data-placement="left" data-html="true"></div>');
        $('#' + workflowNodes[key].id + ' .showNode').append('<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>');
        $('#' + workflowNodes[key].id + ' .showNode').after('<div class="amountTickets"></div>');
        $('#' + workflowNodes[key].id + ' .amountTickets').html(workflowNodes[key].ticketsCount);
        if (userId == workflowNodes[key].userId) {
            console.log(userId, " ", workflowNodes[key].userId);
        } else {
            $('.item.userid' + workflowNodes[key].userId).css("opacity", "0.6");
        }
    }
    $('.item').droppable({
        hoverClass: "hoverdrop",
        drop: function (e, ui) {
            console.log("drop______________________");
            dropStatusId = workflowNodes[$(this).index()].statusId;
            //var currentDropStatusId = allNodes[dragId].statusId;


            //            console.log(dragId, " | ", dragTitle, " | ", dragDesc);
            //            console.log("priority: ", dragPrio);
            //            console.log("type: ", dragType);
            //            console.log("statusID: ", dropStatusId);
            //            console.log("project: ", dragProject);
            //            console.log("users: ", dragUser);
            //            console.log("labels: ", dragLabel);
            updateTicket(dragId, dragTitle, dragDate, dragDesc, dragPrio, dragType, dropStatusId, dragProject, dragUser, dragLabel);
            // Increase counter of current node
            $('#' + workflowNodes[$(this).index()].id + ' .amountTickets').html(++workflowNodes[$(this).index()].ticketsCount);
            // Decrease counter of previous node
            $('#' + workflowNodes[nodeIndex].id + ' .amountTickets').html(--workflowNodes[nodeIndex].ticketsCount);

        }
    });
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
    }
}

// Get all tickets by ticketid
function callbackGetTicketsById(result) {
    console.log("callbackGetTicketsById");
    ticketById = result;
}
// Update the position of the nodes in the workflow
function callbackUpdateWorkflowposition(result) {
    console.log("callbackUpdateWorkflowposition");
}
// Update ticket
function callbackUpdateTicket(result) {
    console.log("callbackUpdateTicket");
    console.log(result);
    $("#" + nodeId + " .showNode").popover("hide"); // close the popup after successful update
}

function callbackCreateTicket(result) {
    console.log("callbackCreateTicket");
    $('#' + workflowNodes[nodeIndex].id + ' .amountTickets').html(++workflowNodes[nodeIndex].ticketsCount);
    $('#ticketAdd').fadeOut('fast');
}

// Callback for getting tickets for one node
//      Appending tickets in nodeview popover
function callbackGetTicketsByNodeId(result) {
    console.log("callbackGetTicketsByNodeId");
    allTicketInNode = result;
    $('.popover .modal-title').html('All Tickets in <b>' + nodename + '</b>'); // replaces the title

    //$('#popover-content .modal-body').empty();

    // Add all tickets from this node in the nodeview
    for (var key in result) {
        //        console.log("allticket: ", allTicketInNode);
        //        Load tickets into Nodes
        $('.popover .modal-body').append('<div class="nodeTicketWrapper"></div>');
        $('.popover .nodeTicketWrapper').last().append('<div id="' + allTicketInNode[key].statusId + allTicketInNode[key].title + 'ticket" class="nodeTicket"><b>' + allTicketInNode[key].title + ' </b></br></br> Priority: ' + allPriorities[allTicketInNode[key].priorityId - 1].title + '</br> Type: ' + allTypes[allTicketInNode[key].typeId - 1].title + '</div>');
    }
    // Make tickets draggable
    $('.nodeTicketWrapper').draggable({
        helper: "clone",
        revert: 'invalid',
        appendTo: 'body',
        start: function () {
            $("#" + nodeId + " .showNode").trigger("click");
            $(this).children().addClass('noclick'); // prevent clicking a ticket
            currentTicketIndex = $(this).index();

            //allTicketInNode[currentTicketIndex].id
            console.log("start____________________");
            dragId = allTicketInNode[currentTicketIndex].id;
            dragTitle = allTicketInNode[currentTicketIndex].title;
            dragDate = allTicketInNode[currentTicketIndex].creationDate;
            dragDesc = allTicketInNode[currentTicketIndex].description;
            dragPrio = allTicketInNode[currentTicketIndex].priorityId;
            dragType = allTicketInNode[currentTicketIndex].typeId;
            var tempstat = allTicketInNode[currentTicketIndex].statusId;

            dragProject = allTicketInNode[currentTicketIndex].projectId;
            dragUser = allTicketInNode[currentTicketIndex].users;
            dragLabel = allTicketInNode[currentTicketIndex].files;

            //            console.log(dragId, " | ", dragTitle, " | ", dragDesc);
            //            console.log("priority: ", dragPrio);
            //            console.log("type: ", dragType);
            //            console.log("statusID: ", tempstat);
            //            console.log("project: ", dragProject);
            //            console.log("users: ", dragUser);
            //            console.log("labels: ", dragLabel);
            console.log("NODEID START: ", workflowNodes[nodeIndex].id);
            console.log("NODEID START: ", nodeIndex);
            //getTicketsById();
        },
        drag: function () {
            console.log("dragging");
        },
        stop: function () {
            console.log("stop");
        }
    });

    listenerShowTicket();
}

// Callback creating an arrow
//      Update the workflownodes array with new arrow
function callbackCreateArrow(result) {
    console.log("callbackCreateArrow");
    console.log(result);
    getWorkflowForArray(projectId);
}

// Callback updating an arrow
function callbackUpdateArrow(result) {
    console.log("callbackCreateArrow");
    console.log(result);
}

// Callback for creating a node
//      Updating the UI
function callbackCreateNode(result) {
    console.log("callbackCreateNode");
    console.log(result);
    console.log(result.ticketsCount);
    //$(".item").last().attr("id", result.id);
    getWorkflowForArray(projectId);

    // Add new node to Workflow
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

    // Make new node draggable
    jsPlumb.draggable($(".item"), {
        containment: "parent",
        grid: [10, 10]
    });
}
// Callback for deleting a node
function callbackDeleteNode(result) {
    console.log("callbackDeleteNode");
    console.log(result);
    getWorkflowForArray(projectId);
}