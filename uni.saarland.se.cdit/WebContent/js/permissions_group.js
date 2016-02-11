"use strict";

$(document).ready(function () {
    console.log("Getting ID");
    var id;
    //userid = Cookies.get('userid')
    id = Cookies.get('groupid');;
    
    console.log("Group ID " + id);
    getGroupsWithPermissions(id);

    $('#saveBtn').on('click', function (e) {
        var permissions = [];
        
        if($("#addTicket").is(':checked'))
            permissions.push("addticket");
        if($('#updateTicket').is(':checked'))
            permissions.push("updateticket");
        if($('#deleteTicket').is(':checked'))
            permissions.push("deleteticket");
        if($('#addFeedback').is(':checked'))
            permissions.push("addfeedback");
        if($('#addFile').is(':checked'))
            permissions.push("addfile");
        if($('#addProject').is(':checked'))
            permissions.push("addproject");
        if($('#addUser').is(':checked'))
            permissions.push("adduser");
        if($('#addLabel').is(':checked'))
            permissions.push("addlabel");
        if($('#addType').is(':checked'))
            permissions.push("addtype");
        if($('#updateFeedback').is(':checked'))
            permissions.push("updatefeedback");
        if($('#updateProject').is(':checked'))
            permissions.push("updateproject");
        if($('#updateNode').is(':checked'))
            permissions.push("updatenode");
        /*if($('#updatePassword').is(':checked'))
            permissions.push("updatepassword");*/
        if($('#updateLabel').is(':checked'))
            permissions.push("updatelabel");
        if($('#updateStatus').is(':checked'))
            permissions.push("updatestatus");
        if($('#updateType').is(':checked'))
            permissions.push("updatetype");
        if($('#deleteProject').is(':checked'))
            permissions.push("deleteproject");
        if($('#deleteNode').is(':checked'))
            permissions.push("deletenode");
        if($('#deleteFile').is(':checked'))
            permissions.push("deletefile");
        if($('#deleteStatus').is(':checked'))
            permissions.push("deleteStatus");
        if($('#deleteType').is(':checked'))
            permissions.push("deletetype");
        if($('#deleteUser').is(':checked'))
            permissions.push("deleteuser");     
         if($('#addStatus').is(':checked'))
                permissions.push("addstatus");
        
        console.log(permissions);
        
        updateGroup(id, $('#name').val(), $('#description').val(), permissions);    
    });
});


function callbackGetGroupsWithPermissions(result, id) {
    var group;
    for ( var i = 0; i < result.length; i++){
        if ( result[i].id == id ){
            group = result[i];
        }
    }
    
    console.log(group);
    console.log(group.description);
    $('#name').val(group.name);
    $('#description').val(group.description);
    //console.log(group.permissions.length);

    for ( var i = 0; i < group.permissions.length; i++){
        switch(group.permissions[i]){
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

}



