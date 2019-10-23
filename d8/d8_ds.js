 window.onload = function(){
      $( '#address_search' ).after( '<div id="address"></div> ');
      var txt = document.getElementById('address_search');
      new data8.predictiveaddressui(txt, {
        // Change this to your own API Key
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
          // Clear current results
          console.log( pa );
          $('#label_address_search').hide();
          $('#address_search').val( pa.Address.Lines[5] ).hide();
          let this_add = pa.Address.Lines.filter( function( x ){ if( x != ''){ return x; } })
          $("#address").html( this_add.join('<br/>') );
          $("#address").after("<button id='address-edit'>&#9998;</button>");
          $(document).trigger('clearErrors');
        },
        showResults: function( pa, results ){
          console.log( pa );   
           if (!results.Count) {
            $('#container_postcode .error-message').remove();
            $('#address_search').addClass('error').after("<label for='address_search' generated='true' class='error-message' style=''>Please enter a valid address or postcode</label>");
            return true;
           }
           else{
           $('#container_postcode .error-message').remove();
            $('#container_address_search .error-message').remove();
           }
        }
      });
    }
