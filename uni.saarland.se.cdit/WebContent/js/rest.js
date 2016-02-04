var port = 8990;
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
            return result;
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

function createTicket(title, description, prioId, typeId, nodeId, projId) {
    var data = {
        "title": title,
        "creationDate": "",
        "description": description,
        "priorityId": prioId,
        "typeId": typeId,
        "statusId": nodeId,
        "projectId": projId
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

function updateTicket(id, title, description, prioId, typeId, nodeId, projId) {
    var data = {
        "id": id,
        "title": title,
        "creationDate": "",
        "description": description,
        "priorityId": prioId,
        "typeId": typeId,
        "statusId": nodeId,
        "projectId": projId
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

function deleteTicket(id) {
    $.ajax({
        type: "DELETE",
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/tickets/remove/" + id,
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

function createUser(username, password) {
    var data = {
        "email": "",
        "id": "",
        "password": password,
        "type": "",
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
        "id": id,       
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
        //url: "http://localhost:8990/uni.saarland.se.cdit/rest/users/remove/" + id,
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
        url: baseurl + "rest/workflow/getProjectWorkflow/" + projectId,
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