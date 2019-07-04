// Version 1.1.1


// XXX: Variables/Objects
if (document.cdnMultiStep.debugMode) var d = true;
else var d = false;

if (document.cdnMultiStep.steps != '') {
    var steps = document.cdnMultiStep.steps;
} else alert('steps not found');
//var buttons = document.cdnMultiStep.buttons;
if (document.cdnMultiStep.settings != '') {
    var settings = document.cdnMultiStep.settings;
} else alert('settings not found');

if (document.cdnMultiStep.hooks != '') {
    var hooks = document.cdnMultiStep.hooks;
} else alert('hooks not found');

// Variables/Objects
/*--------------------------------------------------------------------------*/
// XXX: Functions
// Initialise Step Structre
var initialise = function() {
    console.log('init');
    hooks.call('hookPreInit', []); // Hook
    var msBrowser = false;
    if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
        msBrowser = true;
    }

    $.each(steps, function(i, val) {
        var page = [];
        $.each(steps[i].fields, function(k, val) {
            page.push("#container_" + k);
        });
        if (objSize(page) == 0) $('#step-' + (i - 1)).after('<div id="step-' + i + '" data-id="' + i + '" class="step"></div>');
        else $(page.join(',')).wrapAll('<div id="step-' + i + '" data-id="' + i + '" class="step"></div>');
    });

    // Add custom aspects
    $.each(steps, function(i, val) {
        if ("fields" in steps[i] && steps[i].fields != '') {
            $.each(steps[i].fields, function(k, val) {
                // Buttons
                if ("display" in val && val.display == "buttons") {
                    if (!$('#' + k).length) {
                        $("[name='" + k + "']").parent().addClass('select-button');
                        if (objSize(steps[i].fields) === 1 && $("[name='" + k + "']")[0].type !== "checkbox") {
                            $("[name='" + k + "']").parent().addClass('single-field');
                        }
                        $("[name='" + k + "']").bind('change', function() {
                            //$("#container_"+k+" .selected").removeClass('selected');
                            var $update = $(this).parent('div');
                            if ($update.hasClass('single-field')) {
                                $("#container_" + k + " .selected").removeClass('selected');
                                $update.addClass('selected');
                            } else {
                                if ($update.hasClass('selected')) {
                                    $update.removeClass('selected');
                                } else {
                                    $update.addClass('selected');
                                }
                            }
                            if ($update.hasClass('single-field') && !msBrowser) {
                                nextStep();
                            }
                        });
                    }
                }

                if ("display" in val && val.display == "datepicker") {
                    var dt = new Date();
                    var yearEnd = dt.getYear() + 1900;
                    var yearStart = dt.getYear() + 1880;
                    var defaultPikaSettings = {
                        field: document.getElementById(k),
                        firstDay: 1,
                        format: 'YYYY-MM-DD',
                        yearRange: [yearStart, yearEnd],
                        toString(date, format) {
                            // you should do formatting based on the passed format,
                            // but we will just return 'D/M/YYYY' for simplicity
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            if ( day < 10 ) day = "0" + day;
                            if ( month < 10 ) month = "0" + month;
                            return `${year}-${month}-${day}`;
                        },
                        parse(dateString, format) {
                            // dateString is the result of `toString` method
                            const parts = dateString.split('/');
                            const day = parseInt(parts[2], 10);
                            const month = parseInt(parts[1], 10) - 1;
                            const year = parseInt(parts[0], 10);
                            return new Date(year, month, day);
                        }
                    };
                    var picker = new Pikaday(defaultPikaSettings);
                }
                // DONE: Test Custom Error events
                if ("error" in val && val.error != '') {
                    if ($('#' + i).length) {
                        document.getElementById(k).setAttribute("oninvalid", "this.setCustomValidity('" + val.error + "');")
                        document.getElementById(k).setAttribute("onchange", "this.setCustomValidity('');");
                    } else if ($('[name="' + k + '"]').length) {
                        var elements = document.getElementsByName(k);
                        for (i = 0; i < elements.length; i++) {
                            elements[i].setAttribute("oninvalid", "this.setCustomValidity('" + val.error + "');");
                            elements[i].setAttribute("onchange", "this.setCustomValidity('');");
                        }
                    }
                }

                if ("numeric" in val && val.numeric == "Y") {
                    var field = document.getElementById(k);
                    //field.type = "number";
                    field.setAttribute('pattern', '[0-9]*');
                    field.setAttribute('inputmode', 'numeric');
                }
            });
        }
    });

    $('form').show();

    hooks.call('hookPageInit', []); // HOOK
}

// D8 Validation
var d8Validate = function() {
    if (d) console.log("d8Validate()");
    // TODO: Switch custom validity from hardcoded to set variable if exists.
    document.getElementById('telephone').setCustomValidity("Please enter a valid telephone number.");
    var event = new Event('d8Validate');
    document.dispatchEvent(event);
}

// Validate current page
var isValid = function(step) {
    var valid = true;
    var event = new Event('doErrors');
    $.each(steps[step].fields, function(i, v) {

        i = i.trim();
        // NOTE: Potentially need a hook for custom validation here. Post i and return true/false.
        if ("postcode" in document.cdnParameters && document.cdnParameters.postcode != "N") {
            if ((i == "add1" || i == "postcode") && $("#" + i).val() != '') {
                if (d) console.log("setting add1/PC");
                var poke = new Event('change', {
                    bubbles: true
                });
                document.getElementById(i).dispatchEvent(poke);
                document.getElementById(i).validity['valid'];
            }
        }
        if ($('#' + i).length && !document.getElementById(i).checkValidity()) {
            valid = false;
            if (d) console.log("failed");
        } else if ($('[name="' + i + '"]').length) {
            var ele = document.getElementsByName(i);
            if (!ele[0].checkValidity()) {
                valid = false;
                if (d) console.log("failed");
            }
        }
    });

    if (!valid) document.dispatchEvent(event);
    return valid;
};

// Clear all error messages
var clearErrors = function() {
    $('.error-message').remove();
};

// Get all Elements
var getElements = function() {
    var allElements = [];
    $.each(steps, function(index, value) {
        if ("elements" in steps[index] && steps[index].elements != "") {
            var elements = steps[index].elements.split(',');
            $.each(elements, function(ind, val) {
                allElements.push('#' + val.trim());
            })
        }
    });
    return allElements.join();
};

// Show current pages elements
var showElements = function(step) {
    $(getElements()).fadeOut(400);
    if ("elements" in steps[step] && steps[step].elements != "") {
        var elements = steps[step].elements.split(',');
        $.each(elements, function(index, value) {
            $('#' + value.trim()).fadeIn(1000)
        });
    }
};

//Goto specific step
var gotoStep = function(step) {
    // TODO: Sort out fadein for fields on step change
    $('.active').removeClass('active');
    $('#step-' + step).addClass('active');
    $('body').attr('data-current-page', step);
    $('#' + settings.nextButton + ' span strong').text(steps[step].nextButtonText);
    clearErrors();
    showStep();
    showElements(step);
    if (step != 1) refocusForm();


    if (step == 1) {
        $('#' + settings.prevButton).hide();
    } else {
        $('#' + settings.prevButton).show();
    }
    if (step == objSize(steps)) {
        $('#' + settings.nextButton).hide();
        $('#' + settings.submitButton).show();
    } else {
        $('#' + settings.nextButton).show();
        $('#' + settings.submitButton).hide();
    }
    hooks.call('hookNewStep', []); //HOOK
};

//Fade between steps
var showStep = function() {
    $('fieldset > div').fadeOut(400);
    $('.active').fadeIn(1000);
};

//Detect and return current step
var getStep = function() {
    return $('.active').attr('data-id');
};


// Utility Functions

// Return size of object
var objSize = function(obj) {
    return Object.keys(obj).length;
};

//Scroll to top of form
var refocusForm = function() {
    $('html, body').animate({
        scrollTop: $(".lp-pom-form").parent().offset().top
    }, 500);
};

// Utility functions

// Functions
/*--------------------------------------------------------------------------*/
// XXX: Click Handlers

// Goto prev step
var prevStep = function() {
    if ('hookPrevCheck' in hooks && !hooks.call('hookPrevCheck', [])) return; // HOOK
    refocusForm();
    var step = getStep();
    gotoStep(--step);
};

// Goto next step
var nextStep = function() {
    var step = getStep();
    if (step != 1) refocusForm();

    if (isValid(step)) {
        if ('hookNextCheck' in hooks && !hooks.call('hookNextCheck', [])) return; // HOOK
        gotoStep(++step);
    } else console.log('validation fail going to step ' + getStep());
};

// Submit functions
var submit = function() {
    if (isValid(getStep())) {
        if (d) console.log("Submitted");
        else {
            if ('hookSubmit' in hooks && !hooks.call('hookSubmit', [])) return; // HOOK
            const myForm = document.forms[0];
            var event = new Event('submit', {
                'bubbles': true, // Whether the event will bubble up through the DOM or not
                'cancelable': true // Whether the event may be canceled or not
            });
            myForm.dispatchEvent(event);
        }
    }
}

var submitActive = function() {
    $('#' + settings.submitButton).click(function(e) {
        console.log("submitbutton specific");
        e.preventDefault();
        if ("data8" in document.cdnParameters && document.cdnParameters.data8 == "Y") d8Validate();
        else submit();
    });
};


// Event Handlers
/*--------------------------------------------------------------------------*/
// XXX: Events
$('#' + settings.nextButton).click(nextStep);
$('#' + settings.prevButton).click(prevStep);
submitActive();
$('.select-button.single-field label').click(function() {
    console.log("single button click");
    nextStep();
});
document.addEventListener("submitActive", function() {
    submitActive();
});

document.addEventListener("d8Complete", function() {
    if (isValid(getStep())) {
        submit();
    }
});

// Custom Event listeners for page control.
document.addEventListener("nextStep", function() {
    nextStep();
    console.log("nextStep heard");
});
document.addEventListener("prevStep", function() {
    prevStep();
});
document.addEventListener("gotoStep", function(e) {
    console.log(e.detail);
    gotoStep(e.detail);
});

// Prevent enter key functionality
$(window).keydown(function(event) {
    if (event.keyCode == 13 || event.keyCode == 169) {
        event.preventDefault();
        return false;
    }
});


// Events
/*--------------------------------------------------------------------------*/
    // Initialise
    initialise();
    gotoStep(1);
    // Initialise
