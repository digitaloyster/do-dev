/*------------------------------------------------
Output:
multilender hidden csv
multitype hidden csv
--------------------------------------------------*/

//--------------- VARIABLES
var hooks = document.cdnMultiStep.hooks;

var selectedLenders = [];
var lenderTypeWrapper = '';
var lenderTypeTpl =
    '<div class="selected-lender" >' +
    '<div class="lender_name">{1}</div>' +
    '<div class="lender_type">' +
    '<input type="radio" name="lender_type-{0}" id="loan-{0}" value="Loan" checked/><label for="loan-{0}">Loan</label>' +
    '</div>' +
    '<div class="lender_type">' +
    '<input type="radio" name="lender_type-{0}" id="cc_card-{0}" value="Credit Card" /><label for="cc_card-{0}">Credit Card</label>' +
    '</div>' +
    '<div class="lender_type">' +
    '<input type="radio" name="lender_type-{0}" id="mortgage-{0}" value="Mortgage" /><label for="mortgage-{0}">Mortgage</label>' +
    '</div>' +
    '</div>';
var customBanks = 0;
var lenders = [];
var customBanksArr = [];
var maxCustomBanks = 3;
//--------------- VARIABLES

//--------------- FUNCTIONS

function autocomplete() {
    var selector = '#other_1';
    $(selector).attr('multiple', true);
    $(selector).selectize({
        plugins: ['remove_button'],
        dropdownParent: 'body',
        maxItems: maxCustomBanks,
        openOnFocus: false,
        hideSelected: true,
        closeAfterSelect: true,
        onItemAdd: function(value, $item) {
            //customBanks++;
            customBanksArr.push(value);
            $('body').addClass('hide-dropdown');
            console.log(customBanksArr);
        },
        onItemRemove: function(value) {
            //customBanks--;
            customBanksArr.removeByValue(value);
            $('body').addClass('hide-dropdown');
            console.log(customBanksArr);
        },
        onType: function(str) {
            if (str && str.trim().length) {
                $('body').removeClass('hide-dropdown');
            }
        }
    });
    $('body').addClass('hide-dropdown');
}


var fillLenderFields = function(page) {
    var all = [];
    all.extend(lenders);
    all.extend(customBanksArr);
    lenderTypeWrapper = '';

    for (var j = 0; j < all.length; j++) {
        lenderTypeWrapper += lenderTypeTpl.format(j, all[j]);
    }

    console.log(all);

    $('#multilender').val(all.join(','));
    $('#lender_types').remove();
    $('#step-' + page).append('<div id="lender_types">' + lenderTypeWrapper + '</div>');

};

var fillTypeField = function () {
    var allTypes = [];
    var all = [];
    all.extend(lenders);
    all.extend(customBanksArr);
    for ( i = 0; i < all.length ; i += 1 ) {
        allTypes.push( $('input[name=lender_type-' + i + ']:checked')[0].value );
    }
    console.log("types");
    console.log(allTypes);
    $('#multitype').val(allTypes.join(','));
};

// Utilities
var isArrayEqual = function(arr1, arr2) {
    return arr1.toString() === arr2.toString()
};

if (!Array.prototype.extend) {
    Array.prototype.extend = function (other_array) {
        other_array.forEach(function(v) {this.push(v)}, this);
    };
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

//--------------- FUNCTIONS

//--------------- EVENTS/HOOKS
//Hooks Page Init
hooks.register(
    'hookPageInit',
    function(args) {
        $('#lender_other').load(autocomplete());

        $('input[name=lender]').change(function() {
            lenders = [];
            var $checked = $('input[name=lender]:checked');
            var other = false;
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
    });

//Hooks New Step
hooks.register(
    'hookNewStep',
    function(args) {
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
            console.log($('#multitype'));
        }
        return true;
    }
);

//Hooks Next Check
hooks.register(
    'hookNextCheck',
    function(args) {
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

//--------------- EVENTS/HOOKS
