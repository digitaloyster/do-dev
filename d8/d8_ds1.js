// add another input for this ds1, called address_search
// postcode input then needs its label to be hidden and address_search need its label to be 'Postcode'
// both fields are required
window.onload = function(){
    $('body').after('<style id="postcode-switch">#container_postcode .error-message {display:none !important;}</style>');
    $('#address_search').change(function() {
      if ($('#address_search').val() != '' && $('#postcode').val() == '') {
        $('#container_address_search .error-message').remove();
        $('#postcode-switch').text('#container_postcode .error-message {display:block !important;}');
      } 
      else {
        $('#postcode-switch').text('#container_postcode .error-message {display:none !important;}');
      }
    });
    $( '#address_search' ).after( '<div id="address"></div> ');
    var txt = document.getElementById('address_search');
    new data8.predictiveaddressui(txt, {
      ajaxKey: 'TJYU-SWL8-DN53-XQF4',
      fields: [
        { element: 'add1', field: 'line1' },
        { element: 'add2', field: 'line2' },
        { element: 'add3', field: 'line3' },
        { element: 'add4', field: 'town' },
        { element: 'add5', field: 'county' },
        { element: 'postcode', field: 'postcode' }
      ],
      allowedCountries: ["GB"],
      selectAddress: function(pa, results) {
        $('#label_address_search').hide();
        $('#address_search').val( pa.Address.Lines[5] ).hide();
        let this_add = pa.Address.Lines.filter( function( x ){ if( x != ''){ return x; } })
        $("#address").html( this_add.join('<br/>') );
        $("#address").after("<button id='address-edit'>&#9998;</button>");
        $('.error-message').remove();
      },
      showResults: function( pa, results ){  
         if (!results.Count) {
          $('#' + pa.elements.textbox.id ).parent().find('.error-message').remove();
          $('#container_postcode').find('.error-message').remove();
          $('#address_search').addClass('error').after("<label for='address_search' generated='true' class='error-message' style=''>Please enter a valid address or postcode</label>");
          return true;
         }
         else{
           $('.error-message').remove();
         }
      }
    });
}

