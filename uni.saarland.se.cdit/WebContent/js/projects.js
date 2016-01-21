$(document).ready(function () {
    console.log("projects.js");
    getProjects();

});

function getProjects() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects",
        dataType: 'json',
        async: true,
        success: function (result) {
            console.log(result);
            //            $('.projects').empty();
            for (var key in result) {
                console.log("forloop");
                $('.projects').append('<li class="itemRow project' + result[key].id + '"></li>');
                $('.project' + result[key].id).append('<div class="flexrow centeritems flexspacebetween innerProject' + result[key].id + '"></div>');
                $('.innerProject' + result[key].id).append('<div class="itemTag"></div>');
                $('.innerProject' + result[key].id).append('<a class="itemName" href="workflow.html">' + result[key].title + '</a>');
                //                $('.innerProject' + result[key].id).append('<div class="itemInfo">' + result[key].description + '</div>');
                $('.innerProject' + result[key].id).append('<div class="innerUserlist' + result[key].id + ' "aria-hidden="true"></div>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
                $('.innerUserlist' + result[key].id).append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>');
            }
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}