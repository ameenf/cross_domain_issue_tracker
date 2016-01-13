"use strict";
var allNodes = [];
var i = 50;
var k = 0;

$(document).ready(function () {
    getNodes();
});

function listener() {
    var nodename;
    $('.addTicket').on('click', function (e) {
        $('#myModal').modal('toggle');
        nodename = $(this).next().html();
        $("#input_new_status").val(nodename);
        $('.modal-title').html('New ticket in <b>' + nodename + '</b>'); // replaces the title
    });

    $('#submitTicket').on('click', function (e) {
        var data = {
            "title": $("#input_new_title").val(),
            "creationDate": "2015-12-05 10:44:52",
            "description": $("#input_new_desc").val(),
            "priorityId": $("#input_new_priority").val(),
            "typeId": $("#input_new_type").val(),
            "statusId": $("#input_new_status").val(),
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
                console.log(result);
                $('#myModal').modal('toggle');
            },
            error: function (a, b, c) {
                console.log(a + " " + b + " " + c + "ERROR");
                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            }
        })

    });
}

// Get all nodes from server and create nodes
function getNodes() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/general/status",
        dataType: 'json',
        async: true,
        success: function (result) {
            allNodes = result;
            for (var key in result) {
                // console.log("desc: " + result[key].description);
                // console.log("id: " + result[key].id);

                // Create nodes in workflow view
                $('.bgRaster').append('<div id="' + result[key].id + 'node" class="item" style=left:' + k + 'px;top:' + i + 'px><div class="addTicket"> </div><div class="topTitle">' + result[key].title + '</div></div>');
                i += 50;
                k += 150;
            }
            startJsplumb(); // When finished with nodecreation, start jsplumb to create connection etc.
            listener(); // Activate the listener after create HTML content
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
                        label: "Label", // Name of the label at the arrow
                        location: 0.5, // Position of the label at the arrow
                }]
                      ],
                paintStyle: {
                    strokeStyle: "gray",
                    lineWidth: 5
                },
                endpointStyle: {
                    fillStyle: "rgba(211, 211, 211, 0.7)"
                },
                isSource: true,
                isTarget: true,
                ConnectionsDetachable: false,
                ReattachConnections: false
            }
            // Anchors can switch position
        var dynamicAnchors1 = ["Left", "Right", "Top", "Bottom"];
        var dynamicAnchors2 = ["Right", "Left", "Top", "Bottom"];

        // Connect nodes
        jsPlumb.connect({
            source: "1node",
            target: "2node",
        }, common);

        jsPlumb.connect({
            source: "2node",
            target: "3node",
        }, common);
        jsPlumb.connect({
            source: "3node",
            target: "4node",
        }, common);
        jsPlumb.connect({
            source: "4node",
            target: "5node",
        }, common);
        jsPlumb.connect({
            source: "5node",
            target: "6node",
        }, common);
        jsPlumb.connect({
            source: "6node",
            target: "7node",
        }, common);
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
        $('#diagramContainer').bind('mousewheel', function () {
            var stage = $(this);
            var scaleData = getZoom(stage);
            console.log(scaleData)
            if (event.wheelDelta < 0) {
                //Zoom out
                setZoom(scaleData.curScale * '.9', stage);
            } else if (event.wheelDelta > 1) {
                //Zoom in
                setZoom(scaleData.curScale * '1.1', stage);
            }

            return false;
            event.stopPropagation();

        });


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



    });
}