$(document).ready(function () {
    console.log("header.js");

    //Clicnhandler for the logout button always present in the header
    $('.glyphicon-log-out').on('click', function (e) {
        console.log('click');
        Cookies.set('loggedin', 'false');
        Cookies.get('userid', '');
        window.location = "index.html";
    });

    dynamicNavbar();
});

function dynamicNavbar(e) {
    console.log('dynamicNavbar');

    //Only show the management section if the user is an admin
    if (Cookies.get('usertype') === 'admin') {
        console.log('test')
        $('.nav-management').append('<li><a href="usermanagement.html">Management</a></li>');
    } else {

    }
}