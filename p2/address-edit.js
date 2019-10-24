  $(document).on("click", "#address-edit", function() {
    if ($('#address_search').val() != '') {
      $('#postcode-switch').text('#container_postcode .error-message {display:block !important;}');
    } else {
      $('#postcode-switch').text('#container_postcode .error-message {display:none !important;}');
    }
    $('#label_address_search').show();
    $('#address_search').show();
    $('#start-search').show();
    $('#address-select').remove();
    $("#address").html('');
    $("#address-edit").remove();
    if( document.cdnParameters.postcode == "S" ){
      $(postcode).val('').trigger('change').hide();
    }
    else{
      $('#AddressCapture_FindButton').show();
      $(postcode).val('');
    }
    $(add1).val('');
    $(add2).val('');
    $(add3).val('');
    $(add4).val('');
    $(add5).val('');
    $(document).trigger('revalidate');
    $(document).trigger('clearErrors');
  });
