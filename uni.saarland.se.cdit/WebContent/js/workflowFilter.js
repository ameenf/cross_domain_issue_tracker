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

        console.log('allUsers', allUsers);

        var test1 = $.grep(allUsers, function (e) {
            return e.username == searchkey;
        });

        console.log('test1 : ', test1);
        console.log('test1length : ', test1.length);

        if (test1.length > 0) {
            var test = $.grep(allUsers, function (e) {
                return e.id == test1[0].id;
            });
            console.log('test', test);


            console.log('if');
            $('.userid' + test1[0].id).addClass("highlightUser");

        } else {
            console.log('else');
            //            $('.userid' + test1[0].id).removeClass("highlightUser");
            $('.highlightUser').removeClass("highlightUser");
        }




        //        if (test1.length > 0) {
        //            console.log('if');
        //            $('.userid' + test1[0].id).addClass("highlightUser");
        //        } else {
        //            console.log('else');
        //            //            $('.userid' + test1[0].id).removeClass("highlightUser");
        //            $('.highlightUser').removeClass("highlightUser");
        //        }


        //        console.log($(obj).parent());
        //        console.log(obj.innerHTML.toLowerCase());
        //        console.log('===');
        //        console.log(searchkey.toLowerCase());
        if (searchkey.length <= 0) {
            $(obj).parent().removeClass("highlighted");
        } else if (obj.innerHTML.toLowerCase().indexOf(searchkey.toLowerCase()) > -1) {
            $(obj).parent().addClass("highlighted");
        } else {
            $(obj).parent().removeClass("highlighted");
        }
    });
}