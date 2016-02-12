'use strict';
$(document).ready(function () {
    $('.filterWorkflow').on('keyup', function () {
        filterWorkflow();
    });
});

function filterWorkflow() {
    //$('.item').removeClass("highlighted")
    console.log("workflowfilter");
    var searchkey = $('.filterWorkflow').val();
    var that = this;
    $('.topTitle').each(function (i, obj) {
        //        console.log(i);
        //        console.log(obj);
        //        console.log(obj.innerHTML);
        console.log($(obj).parent());
        console.log(obj.innerHTML.toLowerCase());
        console.log('===');
        console.log(searchkey.toLowerCase());
        if (searchkey.length <= 0) {
            $(obj).parent().removeClass("highlighted");
        } else if (obj.innerHTML.toLowerCase().indexOf(searchkey.toLowerCase()) > -1) {
            $(obj).parent().addClass("highlighted");
        } else {
            $(obj).parent().removeClass("highlighted");
        }
    });

    //    console.log($('.topTitle'));
    //    console.log($('.topTitle').first());
    //    console.log($('.topTitle').val());
    //$('#' + searchkey + 'node').addClass("highlighted")
}