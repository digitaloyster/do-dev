window.onload = function(){
    var txt = document.getElementById('postcode');
    new data8.predictiveaddressui(txt, {
      ajaxKey: 'TJYU-SWL8-DN53-XQF4',
      fields: [
        { element: 'add1', field: 'line1' },
        { element: 'add2', field: 'line2' },
        { element: 'add3', field: 'town' },
        { element: 'add4', field: 'county' },
        { element: 'postcode', field: 'postcode' }
      ],
      allowedCountries: ["GB"],
      selectAddress: function(pa, results) {
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
