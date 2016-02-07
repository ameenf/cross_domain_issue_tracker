"use strict";

$(document).ready(function () {
    console.log("Getting ID");
    var userid;
    userid = Cookies.get('userid')
    console.log("User ID " + userid);
    
    getProfile(userid);
    
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
        $('#cancel').show();
        $('#save').show();
        $('#pwchange').show();
        $('#cogBtn').hide();

        // $('#updateTicket').toggle();
    });

    
    $('#cancel').on('click', function (e) {
        console.log("Cancel changes");

        $('#name').attr('readonly', '');
        $('#surname').attr('readonly', '');
        $('#links').attr('readonly', '');
        $('#experience').attr('readonly', '');
        $('#field').attr('readonly', '');
    
        $('#cancel').hide();
        $('#save').hide();
        $('#pwchange').hide();
        $('#cogBtn').show();
        
        getProfile(userid); 
    });
    
    $('#save').on('click', function (e) {
        console.log("Saving changes");

        $('#name').attr('readonly', '');
        $('#surname').attr('readonly', '');
        $('#links').attr('readonly', '');
        $('#experience').attr('readonly', '');
        $('#field').attr('readonly', '');
    
        $('#cancel').hide();
        $('#save').hide();
        $('#pwchange').hide();
        $('#cogBtn').show();
        //$('#changePW').hide();
        
        var changes ={
            "firstName": $('#name').val(),
            "lastName": $('#surname').val(),
            "experience": $('#experience').val(),
            "field": $('#field').val(),
            "links": $('#links').val(),
            "userId": userid, 
        }
        
        updateProfile(changes);
        //getProfile(userid);
    });

    $('#pwchange').on('click', function (e) {
        console.log("CHANGE PW BTN");
        $('#pwchange').hide();
        $('#changePW').show();
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
                
                updatePW(Cookies.get('username'), Cookies.get('userid'), pw);
                $('#pwchange').show();
                $('#changePW').hide();
                console.log("PW saved");
                
            }else{
                $('#errorOld').show();
                
            }
        }
    });
    
    $('#cancelPW').on('click', function (e) {
        console.log("CHANGE PW BTN");
        $('#pwchange').show();
        $('#changePW').hide();
        
        $("#oldPW").val("");
        $("#newPW1").val("");
        $("#newPW2").val("");
    });
    
});

function callbackupdateProfile(result) {
    console.log("Returning Profile");
    console.log(result);
    
    if (result == undefined){
        console.log("Creating Profile");
        createProfile(Cookies.get('userid'));
    } else{
        $('#name').val(result.firstName);
        $('#surname').val(result.lastName);
        $('#experience').val(result.experience);
        $('#field').val(result.field);
        $('#links').val(result.links);   
    }
}

function callbackCreateProfile(result) {
    console.log("Returning created Profile");
    console.log(result);

    $('#name').val(result.firstName);
    $('#surname').val(result.lastName);
    $('#experience').val(result.experience);
    $('#field').val(result.field);
    $('#links').val(result.links);       
}



