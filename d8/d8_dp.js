    window.onload = function(){
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
      $('select.data8-postcodelookup-list').css('border-width','0px');
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
      // document.addEventListener("focus", 
      sel_el[0].addEventListener("focus", 
        function(e){ 
          let h = $('.data8-postcodelookup-list').height();
          if( e.target.className == 'data8-postcodelookup-list' && h != 150 ){
            console.log( this );
            $('.data8-postcodelookup-list').blur();
            s = function() {
              $('select.data8-postcodelookup-list').css('border-width','1px');
              var el = 
              $('.data8-postcodelookup-list').height( 150 );
            }
            ,
            setTimeout(s, 200);
          }
          else {
             s = function() {
              $('select.data8-postcodelookup-list').css('border-width','0px');
              $('.data8-postcodelookup-list').height( 0 );
            }
            ,
            setTimeout(s, 200);
          }
         }, true);
    }
