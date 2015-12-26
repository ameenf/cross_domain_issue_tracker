$(document).ready(function () {
    console.log("Jquery loaded");
    $("button").button();
    $("#dlgNewTicket").dialog({
        height: 400,
        width: 500,
        draggable: true,
        droppable: true,
        autoOpen: false,
        resizable: false,
        autoResize: true,
        top: '0px'

    });

    $("li").droppable({
        drop: function () {
            alert("dropped");
        }
    });
    $("#btnNewTicket").click(function () {
        $("#dlgNewTicket").dialog("open");

    });
    $("#btnTicketCreate").click(function () {
        $("#dlgNewTicket").dialog("close");

    });
    $("#btnTicketCancel").click(function () {
        $("#dlgNewTicket").dialog("close");

    });

    $("#dlgNewTicket").dialog({
        dragStart: function (event, ui) {
            console.log("drag");
        }
    });


});