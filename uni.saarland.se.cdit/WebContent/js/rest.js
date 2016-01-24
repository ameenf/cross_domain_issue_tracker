///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Projects/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getProjects() {
    $.ajax({
        type: "GET",
        //        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects",
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
        }
    })
};

function getProjectsFromUser(userid) {
    $.ajax({
        type: "GET",
        //        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects/searchByUser/" + userid,
        url: baseurl + "rest/projects/searchByUser/" + userid,
        dataType: 'json',
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

function createProject(desc, title, users) {
    var data = {
        "description": desc,
        "id": "",
        "title": title,
        "users": users,
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects",
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects/update",
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
        }
    })
}

function deleteProject(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/projects/remove/" + id,
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Tickets//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getTickets() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets",
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/searchByTitle/" + title,
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/getNodeTickets/" + nodeid,
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/searchByType/" + type,
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/searchById/" + id,
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/",
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/update",
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
        }
    })
}

function deleteTicket(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/tickets/remove/" + id,
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Users////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function login(username, pwd) {
    $.ajax({
            type: "POST",
            url: "http://localhost:8080/uni.saarland.se.cdit/rest/users/login",
            data: {
                inputUsername: username,
                inputPassword: pwd
            },
            crossDomain: true,
            async: true,
            success: function (result, textStatus, xhr) {
                callbackLogin(result);
            },
            error: function (a, b, c) {
                console.log(a + " " + b + " " + c + "ERROR");
                document.body.innerHTML = a + " " + b + " " + c + "ERROR";
            }
        })
        .fail(function (e) {
            console.log(e.msg + "ERROR");
        });
};

function getUsers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/users",
        dataType: 'json',
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
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
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/users",
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
        }
    })
}

function updateUser(username, password) {
    var data = {
        "email": "",
        "id": "",
        "password": password,
        "type": "",
        "username": username,
    }

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/users/updatePassword",
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
        }
    })
}

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/users/remove/" + id,
        crossDomain: true,
        dataType: "json",
        async: true,
        success: function (result) {
            return result;
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////Workflow/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getWorkflow(projectId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/workflow/getProjectWorkflow/" + projectId,
        dataType: 'json',
        async: true,
        success: function (result) {
            //return result;
            callbackGetWorkflow(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////General//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getStatus() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/general/status",
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetStatus(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
};

// Get all types in the DB
function getTypes() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/general/type",
        dataType: 'json',
        async: true,
        success: function (result) {
            //return result;
            callbackGetTypes(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}

// Get all priorites in the DB
function getPriorities() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/uni.saarland.se.cdit/rest/general/priority",
        dataType: 'json',
        async: true,
        success: function (result) {
            //            return result;
            callbackGetPriorities(result);
        },
        error: function (a, b, c) {
            console.log(a + " " + b + " " + c + "ERROR");
            document.body.innerHTML = a + " " + b + " " + c + "ERROR";
        }
    })
}