    window.onload = function(){
      (function(proxied) {
          window.alert = function() {
            if( arguments[0].toLowerCase().includes( 'postcode' ) ){
               $('#AddressCapture_FindButton').parent().find('.error-message').remove();
               $('#AddressCapture_FindButton').parent().append( '<div class="error-message">' + arguments[0] + '</div>' );
            }
            else {
              return proxied.apply(this, arguments);
            }
          };
      })(window.alert);
      $('body').after('<style id="postcode-switch">#container_postcode .error-message {display:none !important;}</style>');
      new data8.postcodeLookupButton(
        [
          { element: 'add1', field: 'line1' },
          { element: 'add2', field: 'line2' },
          { element: 'add3', field: 'line3' },
          { element: 'add4', field: 'town' },
          { element: 'add5', field: 'county' },
          { element: 'address_search', field: 'postcode' }
        ],
        {
          ajaxKey: 'TJYU-SWL8-DN53-XQF4',
          license: 'WebClickFull',
          findLabel: 'SEARCH LABEL'
        }
      ).show();
      $( '#address_search' ).after( '<div id="address"></div> ');
      $( '.data8-postcodelookup-list' ).on("click", "option", function (event) {
        $('.data8-postcodelookup-dropdown').hide();
        $('#AddressCapture_FindButton').hide();
        $('#label_address_search').hide();
        $('#address_search').hide();
        var address = this.innerHTML.replace(new RegExp(',', 'g'), '<br/>');
        $("#address").html( address );
        $("#address").after("<button id='address-edit'>&#9998;</button>");
        $(document).trigger('clearErrors');
      });
      var sel_el = document.getElementsByClassName('data8-postcodelookup-list');
      document.addEventListener("focus", 
        function(e){ 
          let op = $('.data8-postcodelookup-dropdown').css("opacity")
          if( e.target.className == 'data8-postcodelookup-list' && parseInt( op ) === 0 ){
            $('.data8-postcodelookup-list').blur();
            s = function() {
              $('.data8-postcodelookup-dropdown').fadeTo(150, 1); 
            }
            ,
            setTimeout(s, 200);
          }
          else {
             s = function() {
              $('.data8-postcodelookup-dropdown').fadeTo("fast", 0); 
            }
            ,
            setTimeout(s, 200);
          }
         }, true);
    }
