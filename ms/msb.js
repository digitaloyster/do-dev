// Version 1.2.1

$(document).ready(function() {
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
        hooks.call('hookPreInit', []); // Hook
        var msBrowser = false;
        var loadJqueryUi = false;
        var datepicker_option = {};
        if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
            msBrowser = true;
        }
        $( '#' + document.cdnMultiStep.settings.nextButton ).addClass('button-next');
        $( '#' + document.cdnMultiStep.settings.nextButton ).addClass('button-back');
        $( ".lp-pom-button" ).each(function( ) {
            let mousedown = 0;
            $('#' + this.id).mousedown( function(e) {
                mousedown = 1;
            });
            $('#' + this.id).focus( function(e) {
                if( !mousedown ){
                   $(this).addClass('focusGlow');
                }
                mousedown = 0;
            });
            $('#' + this.id).blur( function() {
                $(this).removeClass('focusGlow');
            });
            $(this).keypress(function( ev ) {
                ev.preventDefault();
                focusClick(ev, this, 1)
            });
        });
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
                            //console.log($("[name='" + k + "']")[0].type);
                            if (objSize(steps[i].fields) === 1 && $("[name='" + k + "']")[0].type !== "checkbox") {
                                $("[name='" + k + "']").parent().addClass('single-field');
                            }
                            $("[name='" + k + "']").bind('change', function() {
                                var $update = $(this).parent('div');
                                if ($("[name='" + k + "']")[0].type !== "checkbox") $("#container_" + k + " .selected").removeClass('selected');
                                $update.toggleClass('selected');
                                if ($update.hasClass('single-field') && !msBrowser) {
                                    nextStep();
                                }
                            });
                        }
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
                        field.type = "number";
                        field.setAttribute('pattern', '[0-9]*');
                    }
                    if ("display" in val && val.display == "datepicker") {
                        loadJqueryUi = true;
                        datepicker_option[ k ] = { changeYear: true, changeMonth: true, firstDay: 1, dateFormat: "yy-mm-dd", maxDate: "+0"};
                        datepicker_option[ k ].yearRange = "-120:+0";
                        var field = document.getElementById(k);
                        field.setAttribute('pattern', '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])');
                    }
                });
            }
        });

        loadStyleSheet( 'https://cdn.jsdelivr.net/gh/digitaloyster/do-live/ms/ms.css' );
        if( loadJqueryUi ){
            loadStyleSheet( 'https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css' );
            loadScript( 'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js', datepicker_option );
        }



        $('form').show();

        hooks.call('hookPageInit', []); // HOOK
    }

    var loadStyleSheet = function( this_url ) {
        var styles = document.createElement('link');
        styles.setAttribute('href', this_url);
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('type', 'text/css');
        document.head.appendChild(styles);
    }

    var loadScript = function( this_url, option ) {
        var script = document.createElement('script');
        script.onload = function () {
              for( var el in option){
                $( "#" + el ).datepicker( option[ el ] );
              }
        };
        script.src = this_url;
        document.head.appendChild(script);
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
        updateTabIndex();
        if (step != 1) {
            $(':input:enabled:visible:first').focus();
        }
        hooks.call('hookNewStep', []); //HOOK
    };
    
    var focusClick = function( ev, el) {
        if( ev.keyCode === 32 || ev.keyCode === 13 ){
            $(':input:enabled:visible:first').focus();
            el.click();
        }
    }
    var updateTabIndex = function() {
        $( "button" ).each(function( ) {
            $('#' + this.id).focus( function() {
                $(this).addClass('focusGlow');
            });
            $('#' + this.id).blur( function() {
                $(this).removeClass('focusGlow');
            });
            $(this).keypress(function( ev ) {
                ev.preventDefault();
                focusClick(ev, this)
            });
        });
        let count = 1;
        // $( "#step-" + step + ' *' ).filter(':input').each(function( ) {
        $( 'form *' ).filter(':input').each(function( ) {
                $(this).attr('tabindex', count);
                count ++;
        });
        $( '#' + document.cdnMultiStep.settings.nextButton ).attr('tabindex', count);
        count ++;
        $( '#' + document.cdnMultiStep.settings.prevButton ).attr('tabindex', count);
        $( ".lp-pom-button" ).each(function( ) {
            if( this.id != document.cdnMultiStep.settings.nextButton && this.id != document.cdnMultiStep.settings.prevButton ){
                $(this).attr('tabindex', count);
                count ++;
            }
        });
    }

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
});
