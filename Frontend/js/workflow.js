jsPlumb.ready(function () {
    console.log("jsplumb loaded!");

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
        containment: "parent"
    });
    
    

});