"use strict";

$(document).ready(function () {
    console.log("Getting ID");
    var userid;
    userid = Cookies.get('userid')
    console.log("User ID " + userid);
    
    getProfiles(userid);
    
    $('#cogBtn').on('click', function (e) {
        console.log("EDIT PROFILE BTN");

        if ($('#name').attr('readonly')) {
            console.log("unlocking...");
            $('#name').removeAttr('readonly');
            $('#surname').removeAttr('readonly');
            $('#links').removeAttr('readonly');
            $('#experience').removeAttr('readonly');
            $('#field').removeAttr('readonly');
            //$('#field').removeAttr('disabled');
        } 
        /*else {
            console.log("locking...");

            $('#name').attr('readonly', '');
            $('#surname').attr('readonly', '');
            $('#links').attr('readonly', '');
            $('#experience').attr('readonly', '');
            $('#field').attr('readonly', '');
            //$('#field').attr('disabled', '');
        }*/
        $('#cancel').toggle();
        $('#save').toggle();
        $('#pwchange').toggle();
        $('#cogBtn').toggle();

        // $('#updateTicket').toggle();
    });

    
    $('#cancel').on('click', function (e) {
        console.log("Cancel changes");

        $('#name').attr('readonly', '');
        $('#surname').attr('readonly', '');
        $('#links').attr('readonly', '');
        $('#experience').attr('readonly', '');
        $('#field').attr('readonly', '');
    
        $('#cancel').toggle();
        $('#save').toggle();
        $('#pwchange').toggle();
        $('#cogBtn').toggle();
        
        getProfiles(userid); 
    });
    
    $('#save').on('click', function (e) {
        console.log("Saving changes");

        $('#name').attr('readonly', '');
        $('#surname').attr('readonly', '');
        $('#links').attr('readonly', '');
        $('#experience').attr('readonly', '');
        $('#field').attr('readonly', '');
    
        $('#cancel').toggle();
        $('#save').toggle();
        $('#pwchange').toggle();
        $('#cogBtn').toggle();
        
        var changes ={
            "firstName": "",
            "lastName": "",
            "experience": "",
            "field": "",
            "links": "",
            "id": "",
            "userId": "" 
        }
    });

    $('#pwchange').on('click', function (e) {
        console.log("CHANGE PW BTN");
        $('#pwchange').toggle();
        $('#changePW').toggle();
    });

    $('#savePW').on('click', function (e) {
        console.log("SAVE PW BTN");
        //$('#pwchange').toggle();
        //$('#changePW').toggle();
        var oldpw = $("#oldPW").val();
        var pw = $("#newPW1").val();
        var pw2 = $("#newPW2").val();
        
        Cookies.get('username');
        Cookies.get('password');
        
        if ( pw != pw2){
            $('#errorRepeat').show();
        }else{
            $('#errorRepeat').hide()
            
            if ( oldpw == Cookies.get('password')){
                $('#errorOld').hide();
                
                updateUser(Cookies.get('username'), Cookies.get('userid'), pw);
                
            }else{
                $('#errorOld').show();
                
            }
        }
    });
});

function callbackupdateProfile(result) {
    console.log("Returning Profile");
    console.log(result);
    
    $('#name').val(result.firstName);
    $('#surname').val(result.lastName);
    $('#experience').val(result.experience);
    $('#field').val(result.field);
    $('#links').val(result.links);   
}