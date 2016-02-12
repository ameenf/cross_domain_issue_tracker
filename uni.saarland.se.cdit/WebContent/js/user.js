var files;
$(document).ready(function () {
    console.log("header.js");


    $(':button').click(function () {
        var formData = new FormData($('form')[0]);
        $.ajax({
            url: baseurl + "rest/files/upload",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Cookies.get('username') + ':' + Cookies.get('password')));
            },
            type: 'POST',
            xhr: function () { // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Check if upload property exists
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            //Ajax events
            //            beforeSend: beforeSendHandler,
            success: function (data, textStatus, jqXHR) {
                console.log("SUCCESS");
            },
            error: function (a, b, c) {
                console.log("ERROR");
                console.log(a);
                console.log(b);
                console.log(c);
            },
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    });

});

function progressHandlingFunction(a) {
    console.log(a);
}