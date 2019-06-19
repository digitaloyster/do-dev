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

    console.log(lenders);
    console.log(customBanksArr);

    var allLenders = lenders;
    allLenders.extend(customBanksArr);

    console.log(allLenders);

    lenderTypeWrapper = '';
    isOK = true;

    //var allLenders = $(':input:checked, select', '#step-1');
    //var checkedID = 0;

    for (var j = 0; j < allLenders.length; j++) {
        //var $l = $(allLenders[j]);
        lenderTypeWrapper += lenderTypeTpl.format(j, allLenders[j]);
        //selected.push($l.val());
    }
    /*
    if (isArrayEqual(selectedLenders, selected)) {
        return true;
    }

    $('#lender_types').remove();

    var fields = $('[type="hidden"][id^="acctype"]');
    for (var i = 0; i < fields.length; i++) {
        $(fields[i]).val('');
    }
    var lenders = $('[type="hidden"][id^="lender"]');
    for (var i = 0; i < lenders.length; i++) {
        $(lenders[i]).val('');
    }
    for (var n = 0; n < selected.length; n++) {
        var id = n + 1;
        $('#lender_' + id).val(selected[n]);
    }
    */
    $('#step-' + page).append('<div id="lender_types">' + lenderTypeWrapper + '</div>');
    /*
    selectedLenders = selected;*/
};
/*
var fillCustomBanks = function(n, selected) {
for (var k = 0; k < customBanksArr.length; k++) {
  $('[type="hidden"][id="lender_' + (n+1) + '"]').val(customBanksArr[k]);
  selected.push(customBanksArr[k]);
  lenderTypeWrapper += lenderTypeTpl.format((n+1), customBanksArr[k]);
  n++;
}
};*/

/*
var fillLenderTypes = function() {
var checked = $('[name^=lender_type-]:checked');
var all = $('[name^=lender_type-]');
var $selectedLender = $('.selected-lender');
$selectedLender.removeClass('invalid');
for (var h = 0; h < all.length; h++) {
  var idx = h + 1;
  var $el = $('[name^=lender_type-' + idx + ']');
  if (!$el.is(':checked')) {
    $el.parents('.selected-lender').addClass('invalid');
  }
}
if (checked.length != $selectedLender.length) {
  isOK = false;
} else {
  for (var k = 0; k < checked.length; k++) {
    var id = $(checked[k]).attr('name').split('-');
    var v = $(checked[k]).val();
    $('#acctype' + id[1]).val(v);
  }
  isOK = true;
}
};*/

// Utilities
var isArrayEqual = function(arr1, arr2) {
    return arr1.toString() === arr2.toString()
};

Array.prototype.extend = function (other_array) {
    /* You should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);
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
