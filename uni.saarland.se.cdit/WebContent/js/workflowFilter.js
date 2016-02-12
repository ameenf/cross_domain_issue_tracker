$(document).ready(function () {
    $('.filterWorkflow').on('keyup', function () {
        filterWorkflow();
    });
});

function filterWorkflow() {
    //$('.item').removeClass("highlighted")
    console.log("workflowfilter");
    var searchkey = $('.filterWorkflow').val();
    console.log('#' + searchkey + 'node');
    console.log($('#' + searchkey + 'node'));
    $('#' + searchkey + 'node').addClass("highlighted")
}