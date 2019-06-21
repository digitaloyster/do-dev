/*jslint browser: true*/
/*global $, jQuery, console, alert, Event*/
//console.log("Hooks.js overwritten");

var hooks = document.cdnMultiStep.hooks;
var $submit = $('#' + document.cdnMultiStep.settings.submitButton);
var submit_text = $submit.find('span').html();

var setCookie = function (ref) {
    "use strict";
    var d = new Date(), expires, timeout;
    //setTime.setTime(setTime.getTime());
    d.setTime(d.getTime() + (30 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    //var timeout = "timeout="+ setTime.getTime();
    timeout = "timeout=" + Math.round((new Date()).getTime() / 1000);
    document.cookie = "reference=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "reference=" + ref + ";" + expires + ";path=/";
    document.cookie = timeout + ";" + expires + ";path=/";
    console.log("setCookie");
};

var multiLender = function () {
    "use strict";
    return $('input[name="multilender"]:checked').map(function () {
        return $(this).val();
    }).get().join(',');
};

hooks.register(
    'hookSubmit',
    function (args) {
        "use strict";
        $submit.unbind("click");
        $submit.find('span').html('<strong>Please wait...</strong>');
        var formData = new FormData(),
            $fields = $(':input').not('[type="file"], [type="button"], button');
        $fields.each(function (i, val) {
            var name = $(val).attr('name'),
                value = $(val).val();
            if (name !== "multilender") {
                formData.append(name, value);
            }

        });
        formData.append("lenders", multiLender());
        $.ajax({
            type: "post",
            url: "https://digitaloyster.co.uk/dev/sigform/API-Stage-1.php",
            //url: "https://digitaloyster.co.uk/dev/sigform/test-page.php",
            data: formData,
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            crossDomain: true
        })
            .done(function (data) {
                if (data === "email exists") {
                    alert("Thank you, We have received your application.");
                    return false;
                }
                //console.log("Ajax Done");
                //console.log(data);
                $('#reference').val(data);
                setCookie(data);
                return true;
            })
            .fail(function () {
                var d = new Date(), message, event;
                event = new Event('submitActive');
                message = "Fail: " + $('#ckm_request_id').val() + " - " + d.toUTCString();
                $.get("https://digitaloyster.co.uk/dev/sigform/error_logging.php", {
                    msg: message
                });
                document.dispatchEvent(event);
                $submit.find('span').html(submit_text);
                alert("ajax error");
                return false;
            });
    }
);
