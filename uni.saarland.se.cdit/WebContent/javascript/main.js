$(document).ready(function () {
    getTicket(1);
});



function getTicket(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/searchById/" + id,
        dataType: 'xml',
        jsonp: false,
        //       jsonpCallback: 'JSONPCallback',
        async: true,
        //       crossDomain: true,
        //       username: 'user1',
        //       password: 'user1',
        success: function (result) {    
        	
        	var ticket1 = $('.ticket1');
        	
        	var t1_title = $('.ticket1').find('.Title');
        	t1_title.text(($(result).find('title')).text());

        	
            //                console.log("SUCCESS1");
            //                console.log(result);
            //                var data1 = $(result).find('tickets');
            //                console.log(data1);
            //                console.log(data1.text());
            //                var data2 = $(result).find('ticket');
            //                console.log(data2);
            //
            //                console.log(data2.text());
            //                var data3 = $(data2).find('title');
            //                console.log(data3);
            //
            //                console.log(data3.text());
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
                url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/",
                dataType: 'xml',
                jsonp: false,
                //       jsonpCallback: 'JSONPCallback',
                async: true,
                //       crossDomain: true,
                //       username: 'user1',
                //       password: 'user1',
                success: function (result) {    
                    //                console.log("SUCCESS1");
                    //                console.log(result);
                    //                var data1 = $(result).find('tickets');
                    //                console.log(data1);
                    //                console.log(data1.text());
                    //                var data2 = $(result).find('ticket');
                    //                console.log(data2);
                    //
                    //                console.log(data2.text());
                    //                var data3 = $(data2).find('title');
                    //                console.log(data3);
                    //
                    //                console.log(data3.text());
                },
                error: function (a, b, c) {
                    console.log(a + " " + b + " " + c + "ERROR");
                    document.body.innerHTML = a + " " + b + " " + c + "ERROR";
                }
            })

    //    $.ajax({
    //            type: "GET",
    //            url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/",
    //            dataType: 'json',
    //            jsonp: true,
    //            //       jsonpCallback: 'JSONPCallback',
    //            async: true,
    //            crossDomain: true,
    //            success: function (result) {
    //                console.log("SUCCESSJSON");
    //                console.log(result);
    //
    //            },
    //            error: function (a, b, c) {
    //                console.log(a + " " + b + " " + c + "ERROR");
    //                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
    //            }
    //        })
    //        .fail(function (e) {
    //            console.log(e.msg + "ERROR");
    //        })


    // Assign handlers immediately after making the request,
    // and remember the jqxhr object for this request
//    var jqxhr = $.getJSON("http://localhost:8080/uni.saarland.se.cdit/rest/tickets/", function () {
//            console.log("success");
//        })
//        .done(function () {
//            console.log("second success");
//        })
//        .fail(function (w) {
//            console.log("error");
//            console.log(w);
//        })
//        .always(function () {
//            console.log("complete");
//        });

    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.complete(function () {
        console.log("second complete");
    });
}