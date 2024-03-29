/*------------------------------------------------
Need to end with a csv of lenders and lender types
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
    customBanks++;
    customBanksArr.push(value);
    $('body').addClass('hide-dropdown');
  },
  onItemRemove: function(value) {
    customBanks--;
    customBanksArr.removeByValue(value);
    $('body').addClass('hide-dropdown');
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
var selected = [];
lenderTypeWrapper = '';
isOK = true;

var allLenders = $(':input:checked, select', '#step-1');
var checkedID =  0;

for (var j = 0; j < allLenders.length; j++) {
  var $l = $(allLenders[j]);
  if (/*$l.is(':visible') &&*/ $l.val() != 'Select Lender' && $l.val() != 'Other') {
    lenderTypeWrapper += lenderTypeTpl.format(j, $l.val());
    selected.push($l.val());
  } else if ($l.val() == 'Other') {
    fillCustomBanks(j, selected);
  }
}

// TODO : Do custom errors..

/*if (!selected.length || selected.length > 8) {
  isOK = false;
  $('#lp-pom-text-1048').show();
} else {
  $('#lp-pom-text-1048').hide();
}*/

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

$('#step-' + page).append('<div id="lender_types">' + lenderTypeWrapper + '</div>');
selectedLenders = selected;
};

var fillCustomBanks = function(n, selected) {
for (var k = 0; k < customBanksArr.length; k++) {
  $('[type="hidden"][id="lender_' + (n+1) + '"]').val(customBanksArr[k]);
  selected.push(customBanksArr[k]);
  lenderTypeWrapper += lenderTypeTpl.format((n+1), customBanksArr[k]);
  n++;
}
};

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
};

// Utilities
var isArrayEqual = function(arr1, arr2) {
return arr1.toString() === arr2.toString()
};

//--------------- FUNCTIONS

//--------------- EVENTS/HOOKS

hooks.register(
'hookPageInit',
function(args) {
  //Selectize
  $('#lender_other').change(function() {
    if ($('#lender_other:checked').val() == 'Other' ) $('#container_other_1, #container_other_2').show();
    else $('#container_other_1, #container_other_2').hide();
  });
  $('#lender_other').load(autocomplete());

  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    };
  }
  //Selectize
  return true;

}
);

hooks.register(
'hookNewStep',
function(args) {
  if ($('body[data-current-page="1"]').length) {
    if ($('#lender_other:checked').val() === "Other") {
    	$('#container_other_1, #container_other_2').show();
    } else { $('#container_other_1, #container_other_2').hide();  }
  } else if ($('body[data-current-page="2"]').length) {
    $('#container_other_1, #container_other_2').toggle();
    fillLenderFields(2);
  } else if ($('body[data-current-page="3"]').length) {

  }
  return true;
}
);

hooks.register(
'hookNextCheck',
function(args) {
  var selected = $(':input:checked, select', '#step-1');
  if (selected.length === 1) {
    if (selected.val() === "Other" && customBanksArr.length === 0) {
      document.getElementById('lender_abbey_national').setCustomValidity('Please choose your other bank/lender below');
      return false;
    }

  } else if (selected.length > 8) {
    document.getElementById('lender_abbey_national').setCustomValidity('Please select 8 or less banks/lenders');
    return false;
  }
  return true;
}
);

//--------------- EVENTS/HOOKS
