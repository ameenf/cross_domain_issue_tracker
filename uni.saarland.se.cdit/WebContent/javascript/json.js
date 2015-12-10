$(document).ready(function () {

    getTickets();

    $("#btnGetTicket").click(function () {
        //        getTicket($("#input_get_ticket").val());
        getTickets();
    });

    $("#btnGetTicket1").click(function () {
        getTicket(1);
    });

    $("#btnGetTicket2").click(function () {
        getTicket(2);
    });

    $("#btnGetTicket3").click(function () {
        getTicket(3);
    });

    $("#btnDeleteTicket").click(function () {
        deleteTicket($("#input_rmv_ticket").val());
    });

    $("#btnDeleteTicket1").click(function () {
        deleteTicket(1);
    });

    $("#btnDeleteTicket2").click(function () {
        deleteTicket(2);
    });

    $("#btnDeleteTicket3").click(function () {
        deleteTicket(3);
    });

    $("#btnNewTicket").click(function () {
        newTicket();
    });
});

function deleteTicket(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/remove/" + id,
        success: function (result) {
            console.log("Successfully deleted Ticket" + id);
            getTickets();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

function newTicket() {
    var data = {
        "title": $("#input_new_title").val(),
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
            getTickets();

        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

function getTicket(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/searchById/" + id,
        dataType: 'json',
        async: true,
        success: function (result) {

            console.log(result);
            console.log(result.id);

            //            console.log(obj);
            //            var ticket1 = $('.ticket1');
            //
            //            var t1_title = $('.ticket1').find('.Title');
            //            t1_title.text(($(result).find('title')).text());
            //
            //            var t1_title = $('.ticket1').find('.Description');
            //            t1_title.text(($(result).find('description')).text());
            //
            //            var t1_title = $('.ticket1').find('.Priority');
            //            t1_title.text(($(result).find('priorityId')).text());
            //
            //            var t1_title = $('.ticket1').find('.Type');
            //            t1_title.text(($(result).find('typeId')).text());
            //
            //            var t1_title = $('.ticket1').find('.Status');
            //            t1_title.text(($(result).find('statusId')).text());
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

function getTickets() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets",
        dataType: 'json',
        async: true,
        success: function (result) {

            $('.tickets').empty();
            for (var key in result) {
                $('.tickets').append('<div class="ticket ticket' + result[key].id + '"></div>');
                $('.ticket' + result[key].id).append('<div class="Id">Id: ' + result[key].id + '</div>');
                $('.ticket' + result[key].id).append('<div class="Title">Title: ' + result[key].title + '</div>');
                $('.ticket' + result[key].id).append('<div class="Description">Description: ' + result[key].description + '</div>');
                $('.ticket' + result[key].id).append('<div class="Priority">Priority: ' + result[key].priorityId + '</div>');
                $('.ticket' + result[key].id).append('<div class="Type">Type: ' + result[key].typeId + '</div>');
                $('.ticket' + result[key].id).append('<div class="Status">Status: ' + result[key].statusId + '</div>');
            }
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}