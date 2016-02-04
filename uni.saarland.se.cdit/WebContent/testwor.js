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


        jsPlumb.registerConnectionTypes({
            "normal": {
                paintStyle: {
                    strokeStyle: "rgb(51, 122, 183)",
                    lineWidth: 5
                }
            },
            "edit": {
                paintStyle: {
                    strokeStyle: "rgb(183, 51, 51)",
                    lineWidth: 5
                }
            }
        });

        var anchSrc = ["Right", "Top"];
        var anchTrg = ["Left", "Bottom"];

        // Connected nodes in an array
        var arrConnect = [];

        // Node is draggable on a 10x10 grid
        jsPlumb.draggable($(".item"), {
            containment: "parent",
            grid: [10, 10]
        });

        var srcClick = "";
        var trgClick = "";
        var found = false;

        function end(mode) {
            console.log(mode);
            if (mode == false) {
                console.log("F " + mode);
                for (var key in arrConnect) {
                    arrConnect[key].toggleType("edit");
                }
                $(".item").off().on('click', function () {});
            } else {
                console.log("T " + mode);
                for (var key in arrConnect) {
                    arrConnect[key].toggleType("edit");
                }
                // connect 2 nodes together
                $(".item").off().on('click', function () {
                    if (srcClick == "") {
                        srcClick = $(this).attr("id");
                        console.log("set src: " + $(this).attr("id"));
                    } else if (srcClick == $(this).attr("id")) {
                        srcClick = "";
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
                            srcClick = "";
                            trgClick = "";
                            console.log("make both empty");
                            found = false;
                        } else {
                            arrConnect.push(jsPlumb.connect({
                                type: "edit",
                                source: srcClick,
                                target: trgClick,
                                detachable: false
                            }, common));
                            srcClick = "";
                            trgClick = "";
                            console.log("make both empty");
                        }
                    }
                });
            }
        }
        // click on arrow to remove connection
        jsPlumb.bind("click", function (c) {
            console.log(c.sourceId);
            console.log(c.targetId);
            for (var key in arrConnect) {
                if (c.sourceId == arrConnect[key].sourceId && c.targetId == arrConnect[key].targetId) {
                    delete arrConnect[key];
                }
            }
            jsPlumb.detach(c);

        });

        // add a new node with title
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


        var editmode = false;
        $('.switchEditMode').off().on('click', function () {
            if (editmode == false) {
                editmode = true;
            } else {
                editmode = false;
            }
            console.log("click: " + $(this).prop('checked'));
            end(editmode);
        });
    });
}