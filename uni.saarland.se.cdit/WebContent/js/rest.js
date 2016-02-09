var port = 8080;
var baseurl = 'http://localhost:' + port + '/uni.saarland.se.cdit/';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Projects/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getProjects() {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        //        url: "http://localhost:8990/uni.saarland.se.cdit/rest/projects",
        url: baseurl + "rest/projects",
        dataType: 'json',
        async: true,
        success: function (result) {
            //return result;
            callbackGetProjects(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

function getProjectsFromUser(userid) {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        //        url: "http://localhost:8990/uni.saarland.se.cdit/rest/projects/searchByUser/" + userid,
        url: baseurl + "rest/projects/searchByUser/" + userid,
        dataType: 'json',
        async: true,
        success: function (result) {
            callbackGetProjectsFromUser(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function createProject(title, desc, users) {
    var data = {
        "description": desc,
        "id": "",
        "title": title,
        "users": users,
    }

    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/projects",
        url: baseurl + "rest/projects",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackCreateProject(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function updateProject(desc, id, title, users) {
    var data = {
        "description": desc,
        "id": id,
        "title": title,
        "users": users,
    }

    $.ajax({
        type: "PUT",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/projects/update",
        url: baseurl + "rest/projects/update",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}



function addUsers(id, users) {
    var data = {
        "id": id,
        "users": users
    }

    $.ajax({
        type: "PUT",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/projects/update",
        url: baseurl + "rest/projects/addUsers",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackAddUsers(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function deleteProject(id) {
    $.ajax({
        type: "DELETE",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/projects/remove/" + id,
        url: baseurl + "rest/projects/remove/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Tickets//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getTickets() {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets",
        url: baseurl + "rest/tickets",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            // return result;
            callbackGetTickets(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
};

function getTicketsByTitle(title) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/searchByTitle/" + title,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        url: baseurl + "rest/tickets/searchByTitle/" + title,

        dataType: 'json',
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
};

function getTicketsByNodeId(nodeid) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/getNodeTickets/" + nodeid,
        url: baseurl + "rest/tickets/getNodeTickets/" + nodeid,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            callbackGetTicketsByNodeId(result);
            //            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
};

function getTicketsByType(type) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/searchByType/" + type,
        url: baseurl + "rest/tickets/searchByType/" + type,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
};

function getTicketsById(id) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/searchById/" + id,
        url: baseurl + "rest/tickets/searchById/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetTicketsById(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
};

function getTicketsByProject(id) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/searchById/" + id,
        url: baseurl + "rest/tickets/getProjectTickets/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetTicketsByProject(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
};

function getTicketFeedback(id) {
    $.ajax({
        type: "GET",
        url: baseurl + "rest/feedback/getTicketFeedback/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetTicketFeedback(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
        }
    })
};

function createTicket(title, date, description, prioId, typeId, nodeId, projId, users, labels) {
    var data = {
        "title": title,
        "creationDate": date,
        "description": description,
        "priorityId": prioId,
        "typeId": typeId,
        "statusId": nodeId,
        "projectId": projId,
        "users": users,
        "labels": labels
    }

    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/",
        url: baseurl + "rest/tickets/",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackCreateTicket(result);
            //            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function updateTicket(id, title, creationDate, description, prioId, typeId, nodeId, projId, ticketUser, ticketLabel) {
    var data = {
        "id": id,
        "creationDate": creationDate,
        "title": title,
        "description": description,
        "priorityId": prioId,
        "typeId": typeId,
        "statusId": nodeId,
        "projectId": projId,
        "users": ticketUser,
        "labels": ticketLabel
    }

    $.ajax({
        type: "PUT",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/update",
        url: baseurl + "rest/tickets/update",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackUpdateTicket(result);
            //            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function deleteTicket(id) {
    $.ajax({
        type: "DELETE",
        url: baseurl + "rest/tickets/remove/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Users////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function login(username, pwd) {
    var data = {
        username: username,
        password: pwd
    }

    //    var data = {
    //        username: "admin",
    //        password: "admin"
    //    }

    console.log(data);
    console.log(JSON.stringify(data));
    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users/login",
        url: baseurl + "rest/users/login",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + pwd));
        },
        data: JSON.stringify(data),
        //        data: data,
        contentType: "application/json; charset=utf-8",
        //contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        //dataType: "text json",
        async: true,
        success: function (result) {
            callbackSuccessLogin(result);
        },
        error: function (a, b, c) {
            callbackFailedLogin(a, b, c);
        }
    })
};

function getUsers() {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users",
        url: baseurl + "rest/users",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            callbackGetUsers(result);
            //return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c === "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function getUser(id) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/workflow/getProjectWorkflow/" + projectId,
        url: baseurl + "rest/users/byId/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //return result;
            callbackPermissions(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function createUser(username, password, type) {
    var data = {
        "email": "",
        "id": "",
        "password": password,
        "type": type,
        "username": username,
    }

    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users",
        url: baseurl + "rest/users",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackCreateUser(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c = "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}


function updateUser(username, id, password) {
    var data = {
        "email": "",
        "id": id,
        "password": password,
        "type": "",
        "username": username,
    }

    $.ajax({
        type: "PUT",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users/updatePassword",
        url: baseurl + "rest/users/updatePassword",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}


function getProjectPermissions(projectid, userid) {

    var data = {
            "id": userid,
        }
        //TODO
    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/workflow/getProjectWorkflow/" + projectId,
        url: baseurl + "rest/users/getProjectPermissions/" + projectid,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: 'json',
        async: true,
        success: function (result) {
            callbackPermissions(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function updateProjectPermissions(projectid, userid, permissions) {
    var data = {
        "id": userid,
        "permissions": permissions,
    }

    $.ajax({
        type: "PUT",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users/updatePassword",
        url: baseurl + "rest/users/updateProjectPermissions/" + projectid,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            console.log("Project Permissions updated");
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users/remove/" + id,
        url: baseurl + "rest/users/remove/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}


function getProfile(id) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users/remove/" + id,
        url: baseurl + "rest/users/getProfile/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackupdateProfile(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function createProfile(id) {
    var data = {
        "firstName": "",
        "lastName": "",
        "experience": "",
        "field": "",
        "links": "",
        "userId": id,
    }

    $.ajax({
        type: "POST",
        url: baseurl + "rest/users/createProfile",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            console.log(result);
            //callbackCreateProfile(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function updateProfile(data) {
    $.ajax({
        type: "PUT",
        url: baseurl + "rest/users/updateProfile",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackupdateProfile(data);
            console.log("Profile updated!");
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Workflow/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getWorkflow(projectId) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/workflow/getProjectWorkflow/" + projectId,
        url: baseurl + "rest/workflow/getWorkflow/" + projectId,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //return result;
            callbackGetWorkflow(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}


function getWorkflowForArray(projectId) {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/workflow/getProjectWorkflow/" + projectId,
        url: baseurl + "rest/workflow/getWorkflow/" + projectId,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //return result;
            callbackGetWorkflowForArray(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function updateWorkflowposition(nodeId, positionX, positionY) {
    var data = {
        "id": nodeId,
        "positionX": positionX,
        "positionY": positionY
    }
    $.ajax({
        type: "PUT",
        url: baseurl + "rest/workflow/updatePosition",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: false,
        success: function (result) {
            callbackUpdateWorkflowposition(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c = "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function createArrow(srcNode, trgNode, label) {
    var data = {
        "sourceNode": srcNode,
        "targetNode": trgNode,
        "label": label
    }
    $.ajax({
        type: "POST",
        url: baseurl + "rest/workflow/arrow",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackCreateArrow(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c = "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}
/*
<<<<<<< HEAD
=======

function updateArrow(arrowId, srcNode, trgNode, label) {
    var data = {
        "id": arrowId,
        "sourceNode": srcNode,
        "targetNode": trgNode,
        "label": label
    }
>>>>>>> f08b2957880ea6493b973f047c24b413ecd05003*/

function deleteArrow(id) {
    $.ajax({
        type: "DELETE",
        url: baseurl + "rest/workflow/arrow/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Files//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFiles() {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/files",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetFiles(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////General//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getStatus() {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/status",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetStatus(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

// delete node

function deleteNode(id) {
    $.ajax({
        type: "DELETE",
        url: baseurl + "rest/workflow/node/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            callbackDeleteNode(result);
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Files//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setStatus(data) {
    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/status",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            //            return result;
            //callbackSetStatus(result);
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

function deleteStatus(id) {
    $.ajax({
        type: "DELETE",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/status/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: "json",
        async: true,
        success: function (result) {
            //            return result;
            //getStatus();
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

// Get all types in the DB
function getTypes() {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/type",
        url: baseurl + "rest/general/type",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //return result;
            callbackGetTypes(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function setTypes(data) {
    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/type",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            //            return result;
            //callbackSetTypes(result);
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

function deleteType(id) {
    $.ajax({
        type: "DELETE",
        url: baseurl + "rest/general/types/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: "json",
        async: true,
        success: function (result) {
            //getStatus();
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

// Get all priorites in the DB
function getPriorities() {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/priority",
        url: baseurl + "rest/general/priority",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetPriorities(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function setPriorities(priority) {
    var data = {
        "title": priority,
    }
    console.log(data);
    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/priority",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            //            return result;
            //callbackSetPriorities(result);
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

function deletePriority(id) {
    $.ajax({
        type: "DELETE",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/priority/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: "json",
        async: true,
        success: function (result) {
            //            return result;
            //getPriorities();
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

// Get all labels in the DB
function getLabels() {
    $.ajax({
        type: "GET",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/priority",
        url: baseurl + "rest/general/label",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetLabels(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
}

function setLabels(data) {
    $.ajax({
        type: "POST",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/label",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            //            return result;
            //callbackSetLabels(result);
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};

function deleteLabel(id) {
    $.ajax({
        type: "DELETE",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/general/status",
        url: baseurl + "rest/general/label/" + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
        },
        dataType: "json",
        async: true,
        success: function (result) {
            //            return result;
            //getStatus();
            location.reload();
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            if (c == "Unauthorized") {
                window.location.href = baseurl;
            }
        }
    })
};