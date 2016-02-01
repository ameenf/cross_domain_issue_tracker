"use strict";


$('#cogBtn').on('click', function (e) {
    console.log("EDIT PROFILE BTN");

    if ($('#name').attr('readonly')){
    	console.log("unlocking...");
    	$('#name').removeAttr('readonly');
    	$('#surname').removeAttr('readonly');
    	$('#links').removeAttr('readonly');
    	$('#experience').removeAttr('readonly');
    	$('#fow_list').removeAttr('disabled');
    }else{
    	console.log("locking...");
    	
    	$('#name').attr('readonly', '');
    	$('#surname').attr('readonly', '');
    	$('#links').attr('readonly', '');
    	$('#experience').attr('readonly', '');
    	$('#fow_list').attr('disabled', '');	
    }
    $('#cancel').toggle()
    $('#save').toggle()
    $('#pwchange').toggle()

   // $('#updateTicket').toggle();
});


$('#pwchange').on('click', function (e) {
    console.log("CHANGE PW BTN");
    $('#pwchange').toggle()
    $('#changePW').toggle()
});

$('#savePW').on('click', function (e) {
    console.log("SAVE PW BTN");
    $('#pwchange').toggle()
    $('#changePW').toggle()
});