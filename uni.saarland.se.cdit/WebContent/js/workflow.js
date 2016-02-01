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
var currentTicketIndex;
var currentStatusId;
var projectId = 1;
var editModeTemp = false;
var nodeIndex;

$(document).ready(function () {
    getTickets(); // Get the amount of tickets and store number in node
    getStatus();
    getTypes();
    getPriorities();
    getUsers();
    //getLabels(); --> TODO
    allLabels[0] = {
        id: "1",
        title: "First"
    };
    allLabels[1] = {
        id: "2",
        title: "Second"
    };
    allLabels[2] = {
        id: "3",
        title: "Third"
    };
});
// If user leaves workflow, the position of the nodes will be updated
$(window).unload(function (e) {

    console.log("unload function");

    $.each(workflowNodes, function (index, value) {

        //            console.log("each " + workflowNodes[key].id + " ");
        //        console.log("each " + workflowNodes[index].id + " " + value);
        var posLeft = (100 * $('#' + workflowNodes[index].id).position().left) / $('#diagramContainer').width(); // posX
        var posTop = (100 * $('#' + workflowNodes[index].id).position().top) / $('#diagramContainer').height(); // posY
        console.log("New left " + workflowNodes[index].id + " " + value.id + " " + posLeft + " | " + index);
        console.log("New t o p " + " " + posTop + " | " + index);
        // TODO: REST CALL TO UPDATE IN DB
        var data = {
            "id": workflowNodes[index].id,
            "positionX": posLeft,
            "positionY": posTop
        }
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/uni.saarland.se.cdit/rest/workflow/updatePosition",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            async: false,
            success: function (result) {
                console.log("WORKFLOW UPDATED!");
                console.log(result);
            },
            error: function (a, b, c) {
                console.log(a + " " + b + " " + c + "ERROR");
                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            }
        })

    });
});

function listenerShowTicket() {
    // Enlarge a ticket
    $('.nodeTicket').off().on('click', function (e) {
        $('#ticketViewWrapper').toggle();
        currentTicketIndex = $('.nodeTicket').index(this);
        currentStatusId = allTicketInNode[$('.nodeTicket').index(this)].statusId;

        getTicketsById(allTicketInNode[$('.nodeTicket').index(this)].id);
        $('#myModal2').modal('toggle');
        $('#ticketView').fadeToggle('fast');
        //        $('#ticketView').append('<div id="ticket');
        // Title
        $('#ticketView .form-horizontal').empty();
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Title</label><div class="col-sm-10"><input type="text" class="form-control updTitle" value="' + allTicketInNode[$('.nodeTicket').index(this)].title + '" readonly></div></div>');

        //Description
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Description</label><div class="col-sm-10"><textarea class="form-control updDesc" readonly>' + allTicketInNode[$('.nodeTicket').index(this)].description + '</textarea></div></div>');

        // Creation date
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Creation Date</label><div class="col-sm-10"><input type="text" class="form-control updCreat" value="' + allTicketInNode[$('.nodeTicket').index(this)].creationDate + '" readonly></div></div>');

        // Priority
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label">Priority</label><div class="col-sm-10"><select id="updPrioritylist" class="form-control" disabled></select></div></div>');
        // TODO geht das nich auch mit id?
        for (var key in allPriorities) {
            if (allPriorities[allTicketInNode[$('.nodeTicket').index(this)].priorityId - 1].title == allPriorities[key].title)
                $('#updPrioritylist').append('<option value="' + allPriorities[key].id + '" selected>' + allPriorities[key].title + '</option>');
            else
                $('#updPrioritylist').append('<option value="' + allPriorities[key].id + '">' + allPriorities[key].title + '</option>');
        }

        // Type
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updType">Type</label><div class="col-sm-10"><select id="updTypelist" class="form-control" disabled></select></div></div>');
        // TODO geht das nich auch mit id?
        for (var key in allTypes) {
            if (allTypes[allTicketInNode[$('.nodeTicket').index(this)].typeId - 1].title == allTypes[key].title)
                $('#updTypelist').append('<option value="' + allTypes[key].id + '" selected>' + allTypes[key].title + '</option>');
            else
                $('#updTypelist').append('<option value="' + allTypes[key].id + '">' + allTypes[key].title + '</option>');
        }

        // Label
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updLabel"></label><div class="col-sm-10"></div></div>');
        // + button to add label
        $('.updLabel + .col-sm-10').append('<span class="label label-success" id="btnaddLabels" data-toggle="popover" title="Select label" data-placement="top">+</span><div class="popover"><div class="col-sm-6 checkbox"></div></div>');

        var templab = []
        templab = allTicketInNode[$('.nodeTicket').index(this)].labels;

        $.each(allLabels, function (key, value) {
            if (templab == null) {} else if (templab[key] == allLabels[key].id) {
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

        $('body').off().on('click', '.labelCheck', function () {
            console.log($('.labelCheck').index(this) + " " + $(this).prop('checked'));
            if ($(this).prop('checked') == true) {
                $('.updLabel + .col-sm-10').append('<span class="label label-primary ' + allLabels[$('.labelCheck').index(this)].title + allLabels[$('.labelCheck').index(this)].id + '">' + allLabels[$('.labelCheck').index(this)].title + '</span>');

            } else {
                $('.' + allLabels[$('.labelCheck').index(this)].title + allLabels[$('.labelCheck').index(this)].id).remove();
            }
        });


        // Users
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updUsers"></label><div class="col-sm-10"></div></div>');
        // + button to add user
        $('.updUsers + .col-sm-10').append('<button class="btn btn-default btnEdit" id="btnUpdUsers" type="button" data-toggle="popover" title="Select users" data-placement="top"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><div class="popover"><div class="col-sm-6 checkbox"></div></div>');

        // add existing user in a ticket as default icon
        var tempuser = []
        tempuser = allTicketInNode[$('.nodeTicket').index(this)].users;

        $.each(allUsers, function (key, value) {
            if (tempuser == null) {} else if (tempuser[key] == allUsers[key].id) {
                var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                $('.updUsers + .col-sm-10').append('<div class="itemTag ' + allUsers[key].id + '" style="background-color:#' + randomColor + '">' + allUsers[key].username.substring(0, 1) + '</div>');
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

        $('body').on('click', '.userCheck', function () {
            console.log($('.userCheck').index(this) + " " + $(this).prop('checked'));
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            if ($(this).prop('checked') == true) {
                $('.updUsers + .col-sm-10').append('<div class="itemTag ' + allUsers[$('.userCheck').index(this)].id + '" style="background-color:#' + randomColor + '">' + allUsers[$('.userCheck').index(this)].username.substring(0, 1) + '</div>');
            } else {

                $('.itemTag.' + allUsers[$('.userCheck').index(this)].id).remove();

            }

        });

        // Files
        $('#ticketView .form-horizontal').append('<div class="form-group"> <label class="col-sm-2 control-label updFiles"></label><div class="col-sm-10"></div></div>');
        $('.updFiles + .col-sm-10').append('<button class="btn btn-default btnEdit" type="button" id="btnUpdFile"><span class="glyphicon glyphicon glyphicon-open-file" aria-hidden="true"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button>');

        // adding buttons
        $('#ticketView .form-horizontal').append('<button type="button" class="btn btn-default closeTicket">Close</button><button id="updateTicket" type="button" class="btn btn-primary btnEdit">Update Ticket</button><button type="button" class="btn btn-default editTicket"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></button>');


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

        $('#updateTicket').off().on('click', function (e) {
            console.log("UPDATE TICKET BTN");
            console.log($(".updTitle").val());
            console.log($(".updDesc").html());

            var elem = document.getElementById("updPrioritylist");
            var prioId = elem.options[elem.selectedIndex].value;
            console.log("NEW PRIOID: " + prioId);

            var elem = document.getElementById("updTypelist");
            var typeId = elem.options[elem.selectedIndex].value;
            console.log("NEW PRIOID: " + typeId);

            var data = {
                "id": allTicketInNode[currentTicketIndex].id,
                "creationDate": $(".updCreat").val(),
                "title": $(".updTitle").val(),
                "description": $(".updDesc").html(),
                "priorityId": prioId,
                "typeId": typeId,
                "statusId": currentStatusId,
                "projectId": projectId
            }

            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/update",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (result) {
                    console.log("TICKET UPDATED!");
                    console.log(result);
                    $('#ticketView').fadeOut('fast');
                    $('#ticketViewWrapper').fadeOut('fast');
                },
                error: function (a, b, c) {
                    console.log(a + " " + b + " " + c + "ERROR");
                    document.body.innerHTML = a + " " + b + " " + c + "ERROR";
                }
            })
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
        //$('#myModal1').modal('toggle');
        $('#ticketAdd').fadeToggle('fast');
        $('#ticketViewWrapper').fadeToggle('fast');

        nodename = $(this).next().html();
        nodeId = $(this).parent().attr("id").charAt(0);
        nodeIndex = $(this).parent().index();

        var found = 0;
        for (var i = 0; i < allNodes.length; i++) {
            if (allNodes[i].title == nodename) {
                found = i;
                break;
            }
        }
        //        console.log("nodename: " + nodename);
        //console.log("nodeID: " + nodeId);
        $('#ticketAdd .title').html('New ticket in <b>' + nodename + '</b>'); // replaces the title
    });

    $('#closeTicket').off().on('click', function (e) {
        $('#ticketAdd').fadeOut('fast');
        $('#ticketViewWrapper').fadeOut('fast');
    });

    $('.showNode').off().on('click', function (e) {
        $('#myModal2').modal('toggle');
        nodename = $(this).prev().html();
        $('#myModal2 .modal-title').html('All Tickets in <b>' + nodename + '</b>'); // replaces the title
        var nodeId = $(this).parent().attr("id").charAt(0);
        getAllTicketsNodes(nodeId);
    });

    // Submit a ticket to the database
    $('#submitTicket').off().on('click', function (e) {
        var elem = document.getElementById("prioritylist");
        var prioId = elem.options[elem.selectedIndex].value;

        var elem = document.getElementById("typelist");
        var typeId = elem.options[elem.selectedIndex].value;

        var data = {
            "title": $("#input_new_title").val(),
            "creationDate": datetime,
            "description": $("#input_new_desc").val(),
            "priorityId": prioId,
            "typeId": typeId,
            "statusId": workflowNodes[nodeIndex].sourceNodeId,
            "projectId": 1
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            async: true,
            success: function (result) {
                console.log("SUCCESS!");
                $('#' + workflowNodes[nodeIndex].id + ' .amountTickets').html(++workflowNodes[nodeIndex].ticketsCount);
                //$('#myModal1').modal('toggle');
                $('#ticketAdd').fadeOut('fast');
                $('#ticketViewWrapper').fadeOut('fast');
            },
            error: function (a, b, c) {
                console.log(a + " " + b + " " + c + "ERROR");
                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            }
        })
    });

    $('.dropdown-menu.dropdownLabels a').off().on('click', function (event) {

        var $target = $(event.currentTarget),
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

    $('.dropdown-menu.dropdownUsers a').off().on('click', function (event) {

        var $target = $(event.currentTarget),
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
    for (var key in result) {
        $('.bgRaster').append('<div id="' + result[key].id + '" class="item" style=left:' + result[key].positionX + '%;top:' + result[key].positionY + '%></div>');
        $('#' + result[key].id).append('<div class="addTicket"></div>');
        $('#' + result[key].id + ' .addTicket').append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>');
        $('#' + result[key].id).append('<div class="topTitle">' + allNodes[result[key].sourceNodeId - 1].title + '</div>');
        $('#' + result[key].id).append('<div class="showNode"></div>');
        $('#' + result[key].id + ' .showNode').append('<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>');
        $('#' + result[key].id + ' .showNode').after('<div class="amountTickets"></div>');
        $('#' + result[key].id + ' .amountTickets').html(result[key].ticketsCount);
        //        console.log("nodeid: " + result[key].id + " | countticket: " + result[key].ticketsCount);
        //getTicketsByNodeId(allNodes[result[key].sourceNodeId - 1].id);
    }
    startJsplumb(); // When finished with nodecreation, start jsplumb to create connection etc.
    listener(); // Activate the listener after create HTML content

}

function updateAmountTicketsNodes(projectId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/workflow/getProjectWorkflow/" + projectId,
        dataType: 'json',
        async: true,
        success: function (result) {
            workflowNodes = result;
            $('#' + nodeId + ' .amountTickets').html(workflowNodes[nodeId]);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

// Callback to get all status from server
function callbackGetStatus(result) {
    console.log("callbackGetStatus");
    allNodes = result;
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
// Get all labels 
function callbackGetLabels(result) {
    console.log("callbackGetLabels");
    allLabels = result;
    for (var key in result) {
        $('#labellist').append('<option value="' + allLabel[key].id + '">' + allLabel[key].title + '</option>');
    }
}
// Get all labels 
function callbackGetUsers(result) {
    console.log("callbackGetUsers");
    allUsers = result;
    for (var key in result) {
        $('.dropdown-menu.dropdownUsers').append('<li><a href="#" class="small" data-value="' + result[key].id + '" tabIndex="-1"><input type="checkbox" id="user' + result[key].id + '" /><label for="user' + result[key].id + '"><span></span>' + result[key].username + '</label></a></li>');
        // 
    }
}


function callbackGetTicketsById(result) {
    ticketById = result;
}

// get all tickets for showing all within a node  
function getAllTicketsNodes(nodeId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/getNodeTickets/" + nodeId,
        dataType: 'json',
        async: true,
        success: function (result) {
            allTicketInNode = result;
            $('#myModal2 .modal-body').empty();
            for (var key in result) {
                //        Load tickets into Nodes
                $('#myModal2 .modal-body').append('<div class="nodeTicketWrapper"></div>');
                $('#myModal2 .nodeTicketWrapper').last().append('<div id="' + allTicketInNode[key].id + allTicketInNode[key].title + 'ticket" class="nodeTicket"><b>' + allTicketInNode[key].title + ' </b></br></br> Priority: ' + allPriorities[allTicketInNode[key].priorityId - 1].title + '</br> Type: ' + allTypes[allTicketInNode[key].typeId - 1].title + '</div>');
            }
            listenerShowTicket();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
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
                    labelStyle: {
                        fillStyle: "white",
                        font: "15px sans-serif",
                        color: "rgba(97, 170, 224, 0.72)",
                    },
                    label: "", // Name of the label at the arrow
                    location: 0.5, // Position of the label at the arrow
                }]
                      ],
            paintStyle: {
                strokeStyle: "rgba(51, 122, 183, 1)",
                lineWidth: 5
            },
            endpointStyle: {
                fillStyle: "rgba(49, 49, 49, 0)"
            },
            isSource: true,
            isTarget: true,
            ConnectionsDetachable: false,
            ReattachConnections: false
        }

        jsPlumb.registerEndpointTypes({
            "basic": {
                paintStyle: {
                    fillStyle: "blue"
                }
            },
            "selected": {
                paintStyle: {
                    fillStyle: "red"
                }
            }
        });

        var adminCommon = {
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
                    labelStyle: {
                        fillStyle: "white",
                        font: "15px sans-serif",
                        color: "rgba(97, 170, 224, 0.72)",
                    },
                    label: "", // Name of the label at the arrow
                    location: 0.5, // Position of the label at the arrow
                }]
                      ],
            paintStyle: {
                strokeStyle: "rgba(51, 122, 183, 1)",
                lineWidth: 5
            },
            endpointStyle: {
                fillStyle: "rgba(49, 49, 49, 1)"
            },
            isSource: true,
            isTarget: true,
            ConnectionsDetachable: false,
            ReattachConnections: false
        }

        jsPlumb.registerEndpointTypes({
            "basic": {
                paintStyle: {
                    fillStyle: "blue"
                }
            },
            "selected": {
                paintStyle: {
                    fillStyle: "red"
                }
            }
        });
        // Anchors can switch position
        var dynamicAnchors1 = ["Left", "Right", "Top", "Bottom"];
        var dynamicAnchors2 = ["Right", "Left", "Top", "Bottom"];

        // Connect nodes
        for (var i = 0; i < workflowNodes.length; i++) {
            var sourceName = workflowNodes[i].id;
            var targetName = workflowNodes[i].targetNodeId;
            var arrConnect = [];
            arrConnect[i] = jsPlumb.connect({
                source: sourceName + "", // + "" has to be stated here, otherwise the nodes won't connect, dunno why
                target: targetName + "",
                detachable: false

            }, common);

        }

        function end() {

            $('#1node').endpoints[0].setPaintStyle({
                fillStyle: "FF0000"
            });

        }
        // adding anchorpoints to nodes
        //    jsPlumb.addEndpoint($(".item"), {
        //        anchors: dynamicAnchors1
        //    }, common);
        //
        //    jsPlumb.addEndpoint($(".item"), {
        //        anchors: dynamicAnchors2
        //    }, common);

        // Node is draggable on a 10x10 grid
        jsPlumb.draggable($(".item"), {
            containment: "parent",
            grid: [10, 10]
        });

        // Event to get info about sourceId and targetId of node if you connect 2 nodes together
        jsPlumb.bind("connection", function (info) {
            console.log(info.sourceId);
            console.log(info.targetId);

        })

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

        $('.switchEditMode').bootstrapSwitch();
        $('.switchEditMode').bootstrapSwitch('labelText', 'Edit Mode');
        $('.switchEditMode').off().on('switchChange.bootstrapSwitch', function (event, state) {
            if (editModeTemp == false)
                editModeTemp = true;
            else
                editModeTemp = false;
            end();
        });
    });

}