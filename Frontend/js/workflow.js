jsPlumb.ready(function () {
    console.log("jsplumb loaded!");
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
                    label: "Hallo",
                    location: 0.5,
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
            ConnectionsDetachable: true,
            ReattachConnections: true
        }
        // Anchors can switch position
    var dynamicAnchors1 = ["Left", "Right", "Top", "Bottom"];
    var dynamicAnchors2 = ["Right", "Left", "Top", "Bottom"];

    // Connect nodes
    jsPlumb.connect({
        source: "item_1",
        target: "item_2",
    }, common);

    jsPlumb.connect({
        source: "item_2",
        target: "item_3",
    }, common);
    jsPlumb.connect({
        source: "item_3",
        target: "item_4",
    }, common);
    jsPlumb.connect({
        source: "item_4",
        target: "item_5",
    }, common);
    jsPlumb.connect({
        source: "item_5",
        target: "item_6",
    }, common);
    // adding anchorpoints to nodes
    //    jsPlumb.addEndpoint($(".item"), {
    //        anchors: dynamicAnchors1
    //    }, common);
    //
    //    jsPlumb.addEndpoint($(".item"), {
    //        anchors: dynamicAnchors2
    //    }, common);

    // Node is draggable on a grid
    jsPlumb.draggable($(".item"), {
        containment: "parent",
        grid: [10, 10]
    });

    // Event to get info about sourceId and targetId of node
    jsPlumb.bind("connection", function (info) {
        console.log(info.sourceId);
        console.log(info.targetId);

    })

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

    // ****** ZOOM ******
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