$(document).ready(function () {
    startJsplumb();
    //    $('.switchEditMode').click();
});

function startJsplumb() {

    jsPlumb.ready(function () {
        console.log("jsplumb loaded!");
        // Set the container for the workflow
        jsPlumb.setContainer("diagramContainer");

        // Default setting of connections
        var common = {
                connector: ["StateMachine"], // Form of the line between connected nodes
                endpoint: "Dot", // Form of the anchorpoint
                anchor: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], // dynamic anchor positioning
                overlays: [["Arrow", { // define the arrow
                        width: 20,
                        length: 20,
                        location: 1,
                        foldback: 1,
                        id: "arrow"
            }],
                       ["Label", { // define the label on arrows
                        labelStyle: {
                            fillStyle: "white",
                            font: "15px sans-serif",
                            color: "rgba(97, 170, 224, 0.72)",
                        },
                        label: "", // Name of the label at the arrow
                        location: 0.5, // Position of the label at the arrow
                }]
                      ],
                paintStyle: { // color and thickness of arrow      
                    strokeStyle: "rgb(51, 122, 183)",
                    lineWidth: 5
                },
                endpointStyle: { // style of endpoint
                    fillStyle: "rgb(51, 122, 183)",
                    radius: 8
                },
                ConnectionsDetachable: true,
                ReattachConnections: true
            }
            // configure some drop options for use by all endpoints.
            //        var exampleDropOptions = {
            //            tolerance: "touch",
            //            hoverClass: "dropHover",
            //            activeClass: "dragActive"
            //        };
            //        var exampleEndpoint2 = {
            //            endpoint: ["Dot", {
            //                radius: 8
            //            }],
            //            paintStyle: {
            //                fillStyle: "rgb(51, 122, 183)"
            //            },
            //            isSource: true,
            //            scope: "green",
            //            connectorStyle: {
            //                strokeStyle: "rgb(51, 122, 183)",
            //                lineWidth: 5
            //            },
            //            connector: ["Bezier"],
            //            isTarget: true,
            //            dropOptions: exampleDropOptions
            //        };

        //        jsPlumb.registerConnectionTypes({
        //            "normal": {
        //                paintStyle: {
        //                    strokeStyle: "rgb(51, 122, 183)",
        //                    lineWidth: 5
        //                }
        //            },
        //            "bar": {
        //                paintStyle: {
        //                    strokeStyle: "green",
        //                    lineWidth: 10
        //                }
        //            },
        //
        //        });

        jsPlumb.registerEndpointTypes({
            "src": {
                paintStyle: {
                    fillStyle: "rgba(51, 122, 183, 0)"
                }
            },
            "trg": {
                paintStyle: {
                    fillStyle: "rgba(111, 111, 111, 0)",
                }
            },
            "selectedSrc": {
                paintStyle: {
                    fillStyle: "green"
                }
            },
            "selectedTrg": {
                paintStyle: {
                    fillStyle: "black"
                }
            }
        });

        var anchSrc = ["Right", "Top"];
        var anchTrg = ["Left", "Bottom"];


        // Connect nodes
        var arrConnect = [];
        var srcEndP = [];
        var trgEndP = [];

        // set endpoints
        for (var i = 0; i < 6; i++) {
            //            srcEndP.push(jsPlumb.addEndpoint(i + 1 + "", {
            //                type: "src",
            //                anchor: anchSrc,
            //                isSource: true
            //            }));
            //            trgEndP.push(jsPlumb.addEndpoint(i + 1 + "", {
            //                type: "trg",
            //                anchor: anchTrg,
            //                isTarget: true
            //            }));

        }
        // connection of nodes
        //        for (var j = 0; j < 6; j++) {
        //            arrConnect.push(jsPlumb.connect({
        //                type: "normal",
        //                source: srcEndP[j],
        //                target: trgEndP[j + 1],
        //                detachable: true
        //            }, common));
        //        }

        function end() {
            for (var key in srcEndP) {
                srcEndP[key].toggleType("selectedSrc");
                trgEndP[key].toggleType("selectedTrg");

            }
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

        $(".item").off().on('click', function () {
            console.log("clicked node: " + $(this).attr("id"));
        });

        // Event to get info about sourceId and targetId of node if you connect 2 nodes together
        //        jsPlumb.bind("connection", function (info) {
        //            console.log(info);
        //            console.log(info.sourceId);
        //            console.log(info.targetId);
        //        });
        jsPlumb.bind("click", function (c) {
            console.log(c);
            jsPlumb.detach(c);
        });

        $('#addNode').off().on('click', function () {
            if ($('.nodeForm').hasClass('has-error'))
                $('.nodeForm').removeClass('has-error');
            // TODO add if statement if title already exists
            // TODO push id and title in statusarray and new node in nodearray
            if ($('#nodeTitleInput').val() == "") {
                $('.nodeForm').addClass("has-error");
            } else {
                $(".bgRaster").append('<div id="' + 7 + '" class="item" <div class="topTitle">' + $('#nodeTitleInput').val() + '</div></div>');
                startJsplumb();
            }
        });
        $('#addConn').off().on('click', function () {
            var srcStr = $("#srcnodeInput").val();
            var trgStr = $("#trgnodeInput").val();

            if ($('.connectForm').hasClass('has-error'))
                $('.connectForm').removeClass('has-error');
            console.log(srcStr + " " + trgStr);
            
            var alreadyConnected = false;
            // if same value, warning
            if (srcStr == trgStr) {
                alreadyConnected = true;

            } else {    // else check if they are already connected
                for (var key in arrConnect) {
                    // if already connected, warning
                    if (srcStr == arrConnect[key].sourceId && trgStr == arrConnect[key].targetId) {
                        alreadyConnected = true;
                    }
                }
            }
            
            if (alreadyConnected == true) {
                $('.connectForm').addClass('has-error');
            } else {
                arrConnect.push(jsPlumb.connect({
                    type: "normal",
                    source: $("#srcnodeInput").val(),
                    target: $("#trgnodeInput").val(),
                    detachable: true
                }, common));
            }
        });


        $('.switchEditMode').off().on('click', function () {
            console.log("click: " + $(this).prop('checked'));
            end();
        });
    });
}