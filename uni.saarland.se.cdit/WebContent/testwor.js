$(document).ready(function () {
    startJsplumb();
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
                EndpointHoverStyle: {
                    fillStyle: "orange"
                },
                HoverPaintStyle: {
                    strokeStyle: "orange"
                },
                isSource: true,
                isTarget: true,
                ConnectionsDetachable: true,
                ReattachConnections: true
            }
            // configure some drop options for use by all endpoints.
        var exampleDropOptions = {
            tolerance: "touch",
            hoverClass: "dropHover",
            activeClass: "dragActive"
        };
        var exampleEndpoint2 = {
            endpoint: ["Dot", {
                radius: 8
            }],
            paintStyle: {
                fillStyle: "rgb(51, 122, 183)"
            },
            isSource: true,
            scope: "green",
            connectorStyle: {
                strokeStyle: "rgb(51, 122, 183)",
                lineWidth: 5
            },
            connector: ["StateMachine"],
            isTarget: true,
            dropOptions: exampleDropOptions
        };

        jsPlumb.registerConnectionTypes({
            "foo": {
                paintStyle: {
                    fillStyle: "red",
                    lineWidth: 5
                }
            },
            "bar": {
                paintStyle: {
                    strokeStyle: "green",
                    lineWidth: 10
                }
            },

        });
        jsPlumb.registerEndpointTypes({
            "basic": {
                paintStyle: {
                    fillStyle: "yellow"
                }
            },
            "selected": {
                paintStyle: {
                    fillStyle: "red"
                }
            }
        });

        var dynamicAnchors1 = ["Left", "Right", "Top", "Bottom"];


        // Connect nodes
        var arrConnect = [];
        var endP = [];
        endP[0] = jsPlumb.addEndpoint("1", {
            type: "basic",
            anchor: dynamicAnchors1,
            isSource: true,
            isTarget: true
        });
        endP[1] = jsPlumb.addEndpoint("2", {
            type: "basic",
            anchor: dynamicAnchors1,
            isSource: true,
            isTarget: true
        });
        endP[2] = jsPlumb.addEndpoint("3", {
            type: "basic",
            anchor: dynamicAnchors1,
            isSource: true,
            isTarget: true
        });
        endP[3] = jsPlumb.addEndpoint("4", {
            type: "basic",
            anchor: dynamicAnchors1,
            isSource: true,
            isTarget: true
        });
        endP[4] = jsPlumb.addEndpoint("5", {
            type: "basic",
            anchor: dynamicAnchors1,
            isSource: true,
            isTarget: true
        });
        endP[5] = jsPlumb.addEndpoint("6", {
            type: "basic",
            anchor: dynamicAnchors1,
            isSource: true,
            isTarget: true
        });
        //        arrConnect[0] = jsPlumb.connect({
        //            source: "1",
        //            target: "2",
        //            detachable: true,
        //            type: "bar"
        //
        //        }, common);

        endP[0].toggleType("selected");

        arrConnect[1] = jsPlumb.connect({
            source: "2",
            target: "3",
            detachable: true

        }, common);
        arrConnect[2] = jsPlumb.connect({
            source: "3",
            target: "4",
            detachable: false

        }, common);
        arrConnect[3] = jsPlumb.connect({
            source: "4",
            target: "5",
            detachable: false

        }, common);
        arrConnect[4] = jsPlumb.connect({
            source: "5",
            target: "6",
            detachable: false

        }, common);

        function end() {
            for (var key in arrConnect) {
                arrConnect[key].toggleType("foo");

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

        // Event to get info about sourceId and targetId of node if you connect 2 nodes together
        jsPlumb.bind("connection", function (info) {
            console.log(info.sourceId);
            console.log(info.targetId);

        })



        $('.switchEditMode').off().on('click', function () {
            console.log("click: " + $(this).prop('checked'));
            end();
        });
    });
}