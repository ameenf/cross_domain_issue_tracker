jsPlumb.ready(function () {
    console.log("jsplumb loaded!");
    jsPlumb.setContainer("diagramContainer");

    // variable to describe the look of nodes
    var common = {
            connector: ["StateMachine"], // Form of the line between connected nodes
            endpoint: "Dot", // Form of the anchorpoint
            isSource: true,
            isTarget: true
        }
        // Anchors can switch position
    var dynamicAnchors1 = ["Left", "Right", "Top", "Bottom"];
    var dynamicAnchors2 = ["Right", "Left", "Top", "Bottom"];


    // adding anchorpoints to nodes
    jsPlumb.addEndpoint($(".item"), {
        anchors: dynamicAnchors1
    }, common);

    jsPlumb.addEndpoint($(".item"), {
        anchors: dynamicAnchors2
    }, common);

    // Node is draggable
    jsPlumb.draggable($(".item"), {
        containment: "parent",
        grid: [10, 10]
    });

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