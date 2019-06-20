/*------------------------------------------------
Output:
multilender hidden csv
multitype hidden csv
--------------------------------------------------*/

/*jslint browser: true*/
/*global $, jQuery, console, alert*/


//--------------- VARIABLES
var hooks = document.cdnMultiStep.hooks;

var selectedLenders = [];
var lenderTypeWrapper = '';
var lenderTypeTpl = '<div class="selected-lender" >' +
        '<div class="lender_name">{1}</div>' +
            '<div class="lender_type"><input type="radio" name="lender_type-{0}" id="loan-{0}" value="Loan" checked/><label for="loan-{0}">Loan</label></div>' +
                '<div class="lender_type"><input type="radio" name="lender_type-{0}" id="cc_card-{0}" value="Credit Card" /><label for="cc_card-{0}">Credit Card</label></div>' +
                    '<div class="lender_type"><input type="radio" name="lender_type-{0}" id="mortgage-{0}" value="Mortgage" /><label for="mortgage-{0}">Mortgage</label></div>' +
                        '</div>';
var customBanks = 0;
var lenders = [];
var customBanksArr = [];
var maxCustomBanks = 3;

var $submit = $('#' + document.cdnMultiStep.settings.submitButton);
var submit_text = $submit.find('span').html();

//--------------- VARIABLES

//--------------- FUNCTIONS
var setCookie = function (ref) {
    "use strict";
    var d = new Date(),
        expires = "expires=" + d.toUTCString(),
        timeout = "timeout=" + Math.round((new Date()).getTime() / 1000);
    d.setTime(d.getTime() + (30 * 60 * 1000));
    document.cookie = "reference=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "reference=" + ref + ";" + expires + ";path=/";
    document.cookie = timeout + ";" + expires + ";path=/";
};

var autocomplete = function () {
    "use strict";
    var selector = '#other_1';
    $(selector).attr('multiple', true);
    $(selector).selectize({
        plugins: ['remove_button'],
        dropdownParent: 'body',
        maxItems: maxCustomBanks,
        openOnFocus: false,
        hideSelected: true,
        closeAfterSelect: true,
        onItemAdd: function (value) {
            customBanksArr.push(value);
            $('body').addClass('hide-dropdown');
            console.log(customBanksArr);
        },
        onItemRemove: function (value) {
            //customBanks--;
            customBanksArr.removeByValue(value);
            $('body').addClass('hide-dropdown');
            console.log(customBanksArr);
        },
        onType: function (str) {
            if (str && str.trim().length) {
                $('body').removeClass('hide-dropdown');
            }
        }
    });
    $('body').addClass('hide-dropdown');
};


var fillLenderFields = function (page) {
    "use strict";
    var all = [], j, i, multitypesetting, multitypesettings;
    all.extend(lenders);
    all.extend(customBanksArr);
    lenderTypeWrapper = '';

    for (j = 0; j < all.length; j += 1) {
        lenderTypeWrapper += lenderTypeTpl.format(j, all[j]);
    }

    $('#multilender').val(all.join(','));
    $('#lender_types').remove();
    $('#step-' + page).append('<div id="lender_types">' + lenderTypeWrapper + '</div>');

    multitypesetting = $('#multitype')[0].value;
    if (multitypesetting !== '') {
        multitypesettings = multitypesetting.split(',');
        for (i = 0; i < multitypesettings.length; i += 1) {
            if (multitypesettings[i] === "Credit Card") { $('#cc_card-' + i).attr('checked', 'true');
                } else if (multitypesettings[i] === "Mortgage") { $('#mortgage-' + i).attr('checked', 'true'); }
        }
    }
};

var fillTypeField = function () {
    "use strict";
    var allTypes = [], all = [], i;
    all.extend(lenders);
    all.extend(customBanksArr);
    for (i = 0; i < all.length; i += 1) {
        allTypes.push($('input[name=lender_type-' + i + ']:checked')[0].value);
    }
    $('#multitype').val(allTypes.join(','));
};

// Utilities
var isArrayEqual = function (arr1, arr2) {
    "use strict";
    return arr1.toString() === arr2.toString();
};

if (!Array.prototype.extend) {
    Array.prototype.extend = function (other_array) {
        "use strict";
        other_array.forEach(function (v) {this.push(v); }, this);
    };
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        "use strict";
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

//--------------- FUNCTIONS

//--------------- EVENTS/HOOKS
//Hooks Page Init
hooks.register(
    'hookPageInit',
    function (args) {
        "use strict";
        $('#lender_other').load(autocomplete());

        $('input[name=lender]').change(function () {
            lenders = [];
            var $checked = $('input[name=lender]:checked'), other = false, i;
            for (i = 0; i < $checked.length; i += 1) {
                if ($checked[i].value === "Other") {
                    other = true;
                    $('#container_other_1').show();
                } else {
                    lenders.push($checked[i].value);
                }
            }
            if (!other) {
                $('#container_other_1').hide();
            }
        });
        return true;
    }
);

//Hooks New Step
hooks.register(
    'hookNewStep',
    function (args) {
        "use strict";
        if ($('body[data-current-page="1"]').length) {
            if ($('#lender_other:checked').val() === "Other") {
                $('#container_other_1').show();
            } else {
                $('#container_other_1').hide();
            }
        } else if ($('body[data-current-page="2"]').length) {
            fillLenderFields(2);
        } else if ($('body[data-current-page="3"]').length) {
            fillTypeField();
            //console.log($('#multitype'));
        }
        return true;
    }
);

//Hooks Next Check
hooks.register(
    'hookNextCheck',
    function (args) {
        "use strict";
        //TODO : Need check for blank other, 0 selects and >8 selects
        /*var selected = $(':input:checked, select', '#step-1');
        if (selected.length === 1) {
            if (selected.val() === "Other" && customBanksArr.length === 0) {
            document.getElementById('lender_abbey_national').setCustomValidity('Please choose your other bank/lender below');
            return false;
        }

        } else if (selected.length > 8) {
        document.getElementById('lender_abbey_national').setCustomValidity('Please select 8 or less banks/lenders');
        return false;
        }*/
        return true;
    }
);

//Hooks Submit
hooks.register(
    'hookSubmit',
    function (args) {
        "use strict";
        $submit.unbind("click");
        $submit.find('span').html('<strong>Please wait...</strong>');
        var formData = new FormData(), $fields  = $(':input').not('[type="file"], [type="button"], button');
        $fields.each(function (i, val) {
            var name = $(val).attr('name'), value = $(val).val();
            formData.append(name, value);
        });
    //formData.append("lenders", multiLender());

        $.ajax({
            type: "post",
            //url: "https://digitaloyster.co.uk/dev/sigform_taylor/API-Stage-1.php",
            url: "https://digitaloyster.co.uk/dev/sigform_taylor/test_page.php",
            data: formData,
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            crossDomain : true
        })
            .done(function (data) {
                if (data === "email exists") {
                    alert("Thank you, We have received your application.");
                    console.log(data);
                    return false;
                }
                console.log("Ajax Done");
                console.log(data);
                $('#reference').val(data);
                setCookie(data);
                //alert("Submitted");
                return true;
            })
            .fail(function () {
                var d = new Date(), message = "Fail: " + $('#ckm_request_id').val() + " - " + d.toUTCString();
                $.get("https://digitaloyster.co.uk/dev/sigform_taylor/error_logging.php", { msg: message});
                alert("ajax error");
                var event = new Event('submitActive');
                document.dispatchEvent(event);
                $submit.find('span').html(submit_text);
                return false;
            });
    }
);

//--------------- EVENTS/HOOKS
