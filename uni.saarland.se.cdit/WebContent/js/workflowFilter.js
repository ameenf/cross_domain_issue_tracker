'use strict';
$(document).ready(function () {
    $('.filterWorkflow').on('keyup', function () {
        filterWorkflow();
    });
});

function filterWorkflow() {
    console.log("workflowfilter");
    var searchkey = $('.filterWorkflow').val();
    var that = this;
    $('.topTitle').each(function (i, obj) {

        var classList = $(obj).parent().attr('class').split(/\s+/);
        var str = classList[1]
            //        console.log(str.split("userid"));
        var split = str.split("userid");


        //Check if username exists in Userlist
        var test1 = $.grep(allUsers, function (e) {
            return e.username == searchkey;
        });

        //If user exists get the id and append a highlight
        if (test1.length > 0) {
            var test = $.grep(allUsers, function (e) {
                return e.id == test1[0].id;
            });
            $('.userid' + test1[0].id).addClass("highlightUser");
            //Remove highlight again
        } else {
            console.log('else');
            $('.highlightUser').removeClass("highlightUser");
        }

        //Same here, if searchkey matches the heading
        if (searchkey.length <= 0) {
            $(obj).parent().removeClass("highlighted");
        } else if (obj.innerHTML.toLowerCase().indexOf(searchkey.toLowerCase()) > -1) {
            $(obj).parent().addClass("highlighted");
        } else {
            $(obj).parent().removeClass("highlighted");
        }
    });
}