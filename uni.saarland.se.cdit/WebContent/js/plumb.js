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
                    id: "label",
                    cssClass: "labelstyle",
                    location: 0.5, // Position of the label at the arrow
                }]
                      ],
            paintStyle: {
                strokeStyle: "#428bca",
                lineWidth: 5
            },
            endpointStyle: {
                fillStyle: "#428bca",
                radius: 6
            },
            ConnectionsDetachable: false,
            ReattachConnections: false
        }

        jsPlumb.registerConnectionTypes({
            "normal": {
                paintStyle: {
                    strokeStyle: "#428bca",
                    lineWidth: 5
                }
            },
            "edit": {
                paintStyle: {
                    strokeStyle: "#ca4242",
                    lineWidth: 5
                },
                hoverPaintStyle: {
                    strokeStyle: "#baca42"
                }
            }
        });
        var arrConnect = [];

        // Anchors can switch position
        var dynamicAnchors1 = ["Left", "Right", "Top", "Bottom"];
        var dynamicAnchors2 = ["Right", "Left", "Top", "Bottom"];

        // Node is draggable on a 10x10 grid
        jsPlumb.draggable($(".item"), {
            containment: "parent",
            grid: [10, 10]
        });
        var counter = 0;
        // Loop through nodes and connect them
        for (var i = 0; i < workflowNodes.length; i++) {
            // if the node has no arrows, don't do anything
            if (workflowNodes[i].arrows == null) {} else { // if the node has arrows, connect them
                for (var key in workflowNodes[i].arrows) {
                    var sourceName = workflowNodes[i].arrows[key].sourceNode;
                    var targetName = workflowNodes[i].arrows[key].targetNode;
                    var arrowId = workflowNodes[i].arrows[key].id;
                    console.log("Arrows:" + arrowId);
                    arrConnect[counter] = jsPlumb.connect({
                        source: sourceName + "", // + "" has to be stated here, otherwise the nodes won't connect, dunno why
                        target: targetName + "",
                        detachable: false
                    }, common);

                    var label = arrConnect[counter].getOverlay("label");
                    counter++;
                    if (workflowNodes[i].arrows[key].label == null) {} else {
                        label.setLabel(workflowNodes[i].arrows[key].label);
                    }
                }
            }
        }

        var srcClick = "";
        var trgClick = "";
        var found = false;

        //////////////////////////////////////////////////Connect nodes//////////////////////////////////////////////////////

        // connect 2 nodes together
        function connectNodes() {

            for (var key in workflowNodes) {
                $('#' + workflowNodes[key].id).append('<div class="deleteNode" data-placement="bottom" data-container="body"></div>');
                $('#' + workflowNodes[key].id + ' .deleteNode').append('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
            }

            $('body').on('click', '.item', function (e) {
                if (e.target !== this)
                    return;

                if (srcClick == "") {
                    srcClick = $(this).attr("id");
                    firstNode = $(this);
                    firstNode.addClass('borderHighlight');
                    console.log("set src: " + $(this).attr("id"));
                } else if (srcClick == $(this).attr("id")) {
                    srcClick = "";
                    firstNode.removeClass('borderHighlight');
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
                        //                            $("#connectionExistsAlert").alert('open');
                        $("#connectionExistsAlert").show();
                        $("#connectionExistsAlert").fadeTo(2000, 500).slideUp(500, function () {
                            $("#connectionExistsAlert").hide();
                        });
                        srcClick = "";
                        trgClick = "";
                        console.log("make both empty");
                        found = false;
                        firstNode.removeClass('borderHighlight');

                    } else { // create the arrow
                        var label = "";

                        createArrow(srcClick, trgClick);

                        // create an arrow between 2 nodes
                        arrConnect.push(jsPlumb.connect({
                            type: "edit",
                            source: srcClick,
                            target: trgClick,
                            detachable: false
                        }, common));

                        srcClick = "";
                        trgClick = "";
                        console.log("make both empty");
                        firstNode.removeClass('borderHighlight');
                    }
                }
            });

            var arrowIdTemp;
            var cSourceId;
            var cTargetId;
            var cObject;
            // click on arrow to get the arrowId
            jsPlumb.bind("click", function (c) {
                console.log(c.sourceId + " " + c.targetId);
                cObject = c;
                cSourceId = c.sourceId;
                cTargetId = c.targetId;
                // look for the right node in local array
                var found;
                for (var key in workflowNodes) {
                    // console.log("iterate workflow: " + workflowNodes[key].id + workflowNodes[key].arrows);
                    if (workflowNodes[key].id == c.sourceId) {
                        //  console.log("found: " + workflowNodes[key].id);
                        found = key;
                    }
                }
                // look for the arrow that has been clicked
                for (var key in workflowNodes[found].arrows) {
                    //console.log("iterate arrow: " + workflowNodes[found].arrows[key].id);
                    if (c.sourceId == workflowNodes[found].arrows[key].sourceNode && c.targetId == workflowNodes[found].arrows[key].targetNode) {
                        // console.log("THIS ARROW ID: " + workflowNodes[found].arrows[key].id);
                        arrowIdTemp = workflowNodes[found].arrows[key].id;
                    }
                }
                // TODO Maybe if no arrow is set -> warning
            });
            //////////////////////////////////////////////////Update Arrow//////////////////////////////////////////////////////
            // clicklistener on arrow to show option to add a label or delete the arrow
            $('path').off().on('click', function (e) {
                var offset = $(this).offset();
                var left = e.pageX;
                var top = e.pageY;
                var theHeight = $('.popoverArrow').height();
                $('.popoverArrow').show();
                $('.popoverArrow').css('left', (left + 10) + 'px');
                $('.popoverArrow').css('top', (top - (theHeight / 2) - 10) + 'px');
            });


            $('.btnSaveLabel').off().on('click', function () {
                var inputLabelVal = $(".inputLabel").val();
                var arrconnLabel;
                updateArrow(arrowIdTemp, cSourceId, cTargetId, inputLabelVal);

                for (var key in arrConnect) {
                    if (cSourceId == arrConnect[key].sourceId && cTargetId == arrConnect[key].targetId) {
                        arrconnLabel = arrConnect[key].getOverlay("label");
                    }
                }
                arrconnLabel.setLabel(inputLabelVal);

                $('.popoverArrow').hide();
            });
            // delete arrow
            $('.btnDeleteArrow').off().on('click', function (c) {
                console.log(arrowIdTemp + " | " + cSourceId + " | " + cTargetId);
                deleteArrow(arrowIdTemp);
                for (var key in arrConnect) {
                    if (cSourceId == arrConnect[key].sourceId && cTargetId == arrConnect[key].targetId) {
                        delete arrConnect[key];
                    }
                }
                // delete arrow in UI
                jsPlumb.detach(cObject);
                $('.popoverArrow').hide();
            });

            $('.btnCloseLabel').off().on('click', function () {
                $('.popoverArrow').hide();
            });
        } // content()

        //////////////////////////////////////////////////Deleting Nodes//////////////////////////////////////////////////////
        var nodeObject, nodeStatusId, nodeIndex, nodeId;
        $('body').on('click', '.deleteNode', function (e) {

            nodeObject = $(this).parent();
            nodeIndex = $(this).parent().index();
            nodeStatusId = workflowNodes[$(this).parent().index()].statusId;
            nodeId = workflowNodes[$(this).parent().index()].id;

            console.log("deletenode");
            var offset = $(this).offset();
            var left = e.pageX;
            var top = e.pageY;
            var theHeight = $('.popoverDeleteNode').height();
            $('.popoverDeleteNode').show();
            $('.popoverDeleteNode').css('left', (left + 10) + 'px');
            $('.popoverDeleteNode').css('top', (top - (theHeight / 2) - 10) + 'px');
        });

        $('body').on('click', '.btnDeleteNode', function () {
            console.log("dom object: " + nodeObject);
            console.log("node statusid: " + nodeStatusId);
            console.log("nodeid: " + nodeId);
            deleteNode(nodeId);

            srcClick = ""; // make srcClick empty to avoid conencting nodes with a deleted node

            // delete node in UI
            for (var key in arrConnect) {
                if (nodeId == arrConnect[key].sourceId || nodeId == arrConnect[key].targetId) {
                    console.log("arrconn delete: ");
                    console.log(arrConnect[key]);
                    delete arrConnect[key];
                }
            }

            jsPlumb.remove(nodeId + "");
            console.log(workflowNodes[nodeIndex]);
            $('.popoverDeleteNode').hide();
        });

        $('.btnCloseDeleteNode').off().on('click', function () {
            $('.popoverDeleteNode').hide();
        });

        //////////////////////////////////////////////////Adding Nodes//////////////////////////////////////////////////////
        // Popover for adding a new node
        var statusIdTemp;
        $('#addNode').popover({
            html: true,
            title: 'Select status',
            content: function () {
                $('#adminArea .dropdown-menu').empty();
                for (var key in allUsers) {
                    $('#adminArea .dropdown-menu').append('<li data-id="' + allUsers[key].id + '"><a href="#">' + allUsers[key].username + '</a></li>');
                }
                return $('#addNode + .popover').html();
            }
        });

        // Click on a user in dropdown and highlight it
        var clickedUserTemp;
        $('body').on('click', '.popover .dropdown-menu.dropdownUsersAddNode a', function () {

            clickedUserTemp = $(this).parent().attr('data-id');
            $(".dropdown-menu.dropdownUsersAddNode>li>a").css("color", "black");
            $(".dropdown-menu.dropdownUsersAddNode>li>a").css("background-color", "white");
            $(this).css("color", "white");
            $(this).css("background-color", "#337AB7")
        });

        // Add a new node with title of the available status
        $('body').on('click', '#saveAddNode', function () {
            var found = false;
            // Go through all Nodes and look if it already exists
            for (var key in workflowNodes) {
                if (allNodes[statusIdTemp].id == workflowNodes[key].statusId) {
                    console.log("exists already: " + allNodes[statusIdTemp].title);
                    found = true;
                }
            }
            if (found == true) { // node exists already
                $("#connectionExistsAlert").show();
                $("#connectionExistsAlert").fadeTo(2000, 500).slideUp(500, function () {
                    $("#connectionExistsAlert").hide();
                });
            } else if (clickedUserTemp == null) {
                console.log("nothing clicked");
            } else { // add the new node
                console.log(allNodes[statusIdTemp].title);
                createNode(projectId, clickedUserTemp, allNodes[statusIdTemp].id, 0, 0);

                jsPlumb.draggable($(".item"), {
                    containment: "parent",
                    grid: [10, 10]
                });

                console.log("save");
                $('#addNode').trigger("click");
                jsPlumb.repaintEverything();
            }
        });
        // Set the current statusid regarding checked item
        $('body').on('click', '.radioStatus', function () {
            statusIdTemp = $('.radioStatus').index(this);
            console.log(allNodes[statusIdTemp].id);
        });
        // Close adding node popover
        $('body').on('click', '#closeAddNode', function () {
            console.log("close");
            $('#addNode').trigger("click");
        });




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
        // clicklistener for turning editWorkflow on
        $('.switchEditMode').off().on('click', function () {
            // if switch is turned on, add listener to connect nodes
            if ($(this).prop('checked') == true) {
                for (var key in arrConnect) {
                    arrConnect[key].toggleType("edit");
                }
                connectNodes();
            } else { // if switch is turned off, delete clicklistener
                for (var key in arrConnect) {
                    arrConnect[key].toggleType("edit");
                }
                firstNode.removeClass('borderHighlight');
                srcClick = "";

                $('path').off().on('click', function () {});
                $('body').off('click', '.item');
                $(".deleteNode").remove();
                $(".item").off().on('click', function () {});
                jsPlumb.unbind("click");
                // TODO updatecall nodes
            }


        });
    });

}