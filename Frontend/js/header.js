$(document).ready(function () {
    console.log("header.js");

    //Clicnhandler for the logout button always present in the header
    $('.glyphicon-log-out').on('click', function (e) {
        console.log('click');
        window.location = "login.html";
    });

    //Changehandler for the search bar. Change something and press enter to call this
    $('.searchHeader').on('change', function (e) {
        searchHeader(e);
    });
});

function searchHeader(e) {
    console.log('searchHeader');
}