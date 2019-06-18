// Data8 CDN-V1.0
function defer(method) {
  if (lp.jQuery.validator) { method(); }
  else {setTimeout(function() { defer(method) }, 50); }
}

$(document).ready(function () {
        defer(function () {
              window.jQuery = lp.jQuery;
          $.holdReady( true );
          $.getScript( "https://webservices.data-8.co.uk/javascript/loader.ashx?key=rfnKtgZucH06_phS5t-JkikWwilhviNaHzgHQ6zD72jZMolh17opNw&load=InternationalTelephoneValidation,EmailValidation", function() {
                  $.getScript( "https://webservices.data-8.co.uk/javascript/jqueryvalidation_min.js", function() {
                      $.holdReady( false );
             window.module.lp.form.data.validationRules.telephone.d8val_inttelephone_mobile_line_opt = [ { name: 'AllowedPrefixes', value: '+441,+442,+447'}, {name: 'TreatUnavailableMobileAsInvalid', value: 'true' } ];
                  $('#telephone').change(function() { window.jQuery(this).removeClass("valid"); });
              window.module.lp.form.data.validationMessages.telephone.d8val_inttelephone = "Please enter a valid telephone number.";
              window.module.lp.form.data.validationMessages.d8val_telephone_mobile_line_opt = "Invalid telephone number";
              $(document).on('keyup', '#telephone', function() {
                      var curNum = $(this).val();
                  var newNum = curNum.replace(/[^\d]/g, '');
                  $(this).val(newNum)
                              });
          });
              });
      });
});
window.jQuery = $;
