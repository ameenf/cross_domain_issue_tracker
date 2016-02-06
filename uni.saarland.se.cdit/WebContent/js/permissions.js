"use strict";

$(document).ready(function () {
    console.log("Getting ID");
    var userid;
    //userid = Cookies.get('userid')
    userid = 3;
    
    console.log("User ID " + userid);
    getUser(userid);

    
});

function callbackSavedPermissions(result) {
    
}

function callbackPermissions(result) {
    console.log(result);
    
    console.log(result.permissions.length);

    for ( var i = 0; i < result.permissions.length; i++){
        switch(result.permissions[i]){
            case "addticket":
                $('#addTicket').prop('checked', true);
                break;
            case "updateticket":
                $('#updateTicket').prop('checked', true);
                break;
            case "deleteticket":
                $('#deleteTicket').prop('checked', true);
                break;
            case "addfeedback":
                $('#addFeedback').prop('checked', true);
                break;
            case "addfile":
                $('#addFile').prop('checked', true);
                break;
            case "addproject":
                $('#addProject').prop('checked', true);
                break;
            case "adduser":
                $('#addUser').prop('checked', true);
                break;
            case "addlabel":
                $('#addLabel').prop('checked', true);
                break;
            case "addtype":
                $('#addType').prop('checked', true);
                break;
            case "updatefeedback":
                $('#updateFeedback').prop('checked', true);
                break;
            case "updateproject":
                $('#updateProject').prop('checked', true);
                break;
            case "updatenode":
                $('#updateNode').prop('checked', true);
                break;
            case "updatepassword":
                $('#updatePassword').prop('checked', true);
                break;
            case "updatelabel":
                $('#updateLabel').prop('checked', true);
                break;
            case "updatestatus":
                $('#updateStatus').prop('checked', true);
                break;
            case "updatetype":
                $('#updateType').prop('checked', true);
                break;
            case "deleteproject":
                $('#deleteProject').prop('checked', true);
                break;
            case "deletenode":
                $('#deleteNode').prop('checked', true);
                break;
            case "deletefile":
                $('#deleteFile').prop('checked', true);
                break;
            case "deletestatus":
                $('#deleteStatus').prop('checked', true);
                break;
            case "deletetype":
                $('#deleteType').prop('checked', true);
                break;
            case "deleteuser":
                $('#deleteUser').prop('checked', true);
                break;      
            case "addstatus":
                $('#addStatus').prop('checked', true);
                break;    
            default:
                console.log(i + " not a permission");
        }
    }
/*"addticket"
"updateticket"
"deleteticket"
"addfeedback"
"addfile"
"addproject"
"adduser"
"addlabel"
"addtype"
"addstatus"
"updatefeedback"
"updateproject"
"updatenode"
"updatepassword"
"updatelabel"
"updatestatus"
"updatetype"
"deleteproject"
"deletenode"
"deletefile"
"deletestatus"
"deletetype"
"deleteuser"*/

}



