"use strict";


$(document).ready(function () {
    getPriorities();
    getLabels();
    getStatus();
    getTypes();

    
    $('#addPriority').on('click', function (e) {
       
        var newElement = $("#newPriority").val();
        console.log(newElement);
        /*var btn = $('<button/>')
            .text( newElement)
            .addClass('btn btn-success addUserToProject')
            .append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>') 
            .appendTo($('#priorityDiv'));*/
        
        setPriorities(newElement);   
    });
    
    $('#addLabel').on('click', function (e) {
       
        var newElement = $("#newLabel").val();
        console.log(newElement);
        /*var btn = $('<button/>')
            .text( newElement)
            .addClass('btn btn-success addUserToProject')
            .append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>') 
            .appendTo($('#labelDiv'));*/
        
        setLabels(newElement);   
    });
    
    $('#addType').on('click', function (e) {
       
        var newElement = $("#newType").val();
        /*console.log(newElement);
        var btn = $('<button/>')
            .text( newElement)
            .addClass('btn btn-success addUserToProject')
            .append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>') 
            .appendTo($('#typeDiv'));*/
        
        setTypes(newElement);   
    });
    
    $('#addStatus').on('click', function (e) {
       
        var newElement = $("#newStatus").val();
        console.log(newElement);
        /*var btn = $('<button/>')
            .text( newElement)
            .addClass('btn btn-success addUserToProject')
            .append('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>') 
            .appendTo($('#statusDiv'));*/
        
        setStatus(newElement);   
    });
    
    
    $('#priorityDiv').on('click', '.removePriority', function () {
        console.log("removing priority");
        var priorityid = $(this).val();
        console.log(priorityid);
        deletePriority(priorityid);   
    });
    
     $('#labelDiv').on('click', '.removeLabel', function () {
        console.log("removing label");
        var labelid = $(this).val();
        console.log(labelid);
        deleteLabel(labelid);   
    });
    
     $('#typeDiv').on('click', '.removeType', function () {
        console.log("removing type");
        var typeid = $(this).val();
        console.log(typeid);
        deleteType(typeid);   
    });
    
     $('#statusDiv').on('click', '.removeStatus', function () {
        console.log("removing status");
        var statusid = $(this).val();
        console.log(statusid);
        deleteStatus(statusid);   
    });
    
});

function callbackGetPriorities(result){
    console.log(result);
    
    var pList = $('#priorityDiv')
    $.each(result, function(e) {
        console.log(this.title);
        var btn = $('<button/>')
            .val(this.id)
            .text( this.title)
            .addClass('btn removePriority remove btn-default')
            .append('<span class="glyphicon glyphicon-remove spanBtn" aria-hidden="true"></span>') 
            .appendTo(pList);
        
    });
}
    
function callbackGetLabels(result){
    console.log(result);
    
    var pList = $('#labelDiv')
    $.each(result, function(e) {
    console.log(this.title);
    var btn = $('<button/>')
            .val(this.id)
            .text( this.title)
            .addClass('btn removeLabel remove btn-default')
            .append('<span class="glyphicon glyphicon-remove spanBtn" aria-hidden="true"></span>') 
            .appendTo(pList);
    });
}

function callbackGetTypes(result){
    console.log(result);
    
    var pList = $('#typeDiv')
    $.each(result, function(e) {
    console.log(this.title);
    var btn = $('<button/>')
            .val(this.id)
            .text( this.title)
            .addClass('btn removeType remove btn-default')
            .append('<span class="glyphicon glyphicon-remove spanBtn" aria-hidden="true"></span>') 
            .appendTo(pList);
    });
}

function callbackGetStatus(result){
    console.log(result);
    
    var pList = $('#statusDiv')
    $.each(result, function(e) {
    console.log(this.title);
   var btn = $('<button/>')
            .val(this.id)
            .text( this.title)
            .addClass('btn removeStatus remove btn-default')
            .append('<span class="glyphicon glyphicon-remove spanBtn" aria-hidden="true"></span>') 
            .appendTo(pList);
    });
}

