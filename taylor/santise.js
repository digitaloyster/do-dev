/*function escapeQuote() {
    var inputs = $(':input', 'form');
    var escapeRegExp = /'/g;
    $.each(inputs, function(i, val) {
        var inputVal = $(inputs[i]).val() || '';
        if (inputVal.indexOf('\'') > -1) {
            var newVal = inputVal.replace(escapeRegExp, ' ');
            $(inputs[i]).val(newVal);
        };
    });
}*/

function fillEmptyData(fields, value) {
    $.each(fields, function(i, val) {
        var $field = $(fields[i]);
        if (!$field.val().trim().length) {
            $field.val(value);
        }
    });
}

function reformatFields() {
    var capitalize = function(str) {
        var str = str.toLowerCase();
        return str.replace(/\b\w/g, function(l) {
            return l.toUpperCase()
        });
    };
    var valFN = $('#first_name').val();
    var valLN = $('#last_name').val();
    var valPC = $('#postcode').val();
    $('#first_name').val(capitalize(valFN));
    $('#last_name').val(capitalize(valLN));
    $('#postcode').val(valPC.toUpperCase());
}
$(function() {
    lp.jQuery('.lp-pom-button', '.lp-pom-form').unbind("click tap touchstart").bind('click.formSubmit', function(e) {
        if (lp.jQuery('form', '.lp-pom-form').valid()) {
            escapeQuote();
            reformatFields();
            lp.jQuery('form', '.lp-pom-form').submit();
        }
    });
});
