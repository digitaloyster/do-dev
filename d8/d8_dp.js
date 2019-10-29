var searchContext = "",
  key = "DR57-GA39-BW92-AA78",
  searchField = "#address_search",
  postcode = "#postcode",
  add1 = "#add1",
  add2 = "#add2",
  add3 = "#add3",
  add4 = "#add4",
  add5 = "#add5",
  extraHTML = '<button id="start-search">SEARCH ADDRESS</button><br /><div id="address"></div>';
$(searchField).after(extraHTML);
invalidPC(false);
$("#start-search").on("click",function(e) {
e.preventDefault();
//invalidPC(false);
if ($(searchField).val() != "") {
    $('#address-select').empty().remove();
    $('#address').empty();
    var i;
    var e = JSON.stringify({
                  licence: "WebClickFull",
                  postcode: $(searchField).val(),
                  building: "",
                  options: {
                      MaxLines: 5,
                      FixTownCounty: true,
                      Formatter: "DefaultFormatter",
                      IncludeNYB: "false",
                      IncludeMR:  "false",
                      ApplicationName: "address.js"
                  }
              })
    var t = "https://webservices.data-8.co.uk/AddressCapture/GetFullAddress.json?key=TJYU-SWL8-DN53-XQF4";
    i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    var n = !1
      , d = t.split("/")[4].replace(".json", "");
    i.onreadystatechange = function() {
        if (4 == i.readyState)
            if (200 == i.status) {
                var t = JSON.parse(i.responseText);
                $('#address-select').empty().remove();
                var radios = "<div id='address-select'><span>Please select your address:</span><ul>";
                t = t.Results;
                for( var add = 0; add < t.length; add++){
                    var address = t[add].Address.Lines;
                    address = address.filter( function( x ){ if( x != ''){ return x; } })
                    address = address.join(', ');
                    radios += '<li class="li_add" name="address-select">' + address + '</li>';   
                }
                radios += "</ul></div>";
                $('#start-search').after(radios);
                $(document).on('click', '[name="address-select"]', function () {
                    $('#address-edit').remove();
                    $('#address-select').hide();
                    $('#address_search').hide();
                    $('#start-search').hide();
                    let add_arr = this.innerHTML.split(',');
                    for( let i = 0; i < add_arr.length; i++ ){
                      if( i !== add_arr.length -1 ){
                          $('#add' + ( i + 1 ) ).val( add_arr[i] ); 
                      }
                      else {
                          $('#postcode').val( add_arr[i] );
                      }

                    }

                    let address = this.innerHTML.replace(new RegExp(',', 'g'), '<br/>');
                    $("#address").html( address );
                    $("#address").after("<button id='address-edit'>&#9998;</button>");
                    $('.error-message').remove();

                });
            } else {
                  console.log( i );
                  invalidPC(true);
            }
    }
    ,
    i.open("POST", t, !0),
    n && i.setRequestHeader("Authorization", "Bearer " + this.options.jwt),
    i.send(e);
}


//     window.onload = function(){
//       (function(proxied) {
//           window.alert = function() {
//             if( arguments[0].toLowerCase().includes( 'postcode' ) ){
//                $('.error-message').remove();
//                $('#AddressCapture_FindButton').parent().append( '<div class="error-message">' + arguments[0] + '</div>' );
//             }
//             else {
//               return proxied.apply(this, arguments);
//             }
//           };
//       })(window.alert);
//       $('body').after('<style id="postcode-switch">#container_postcode .error-message {display:none !important;}</style>');
//       $('#address_search').change(function() {
//         if ($('#address_search').val() != '' && $('#postcode').val() == '') {
//           $('#container_address_search .error-message').remove();
//           $('#postcode-switch').text('#container_postcode .error-message {display:block !important;}');
//         } else {

//           $('#postcode-switch').text('#container_postcode .error-message {display:none !important;}');
//         }
//       });
//       new data8.postcodeLookupButton(
//         [
//           { element: 'add1', field: 'line1' },
//           { element: 'add2', field: 'line2' },
//           { element: 'add3', field: 'line3' },
//           { element: 'add4', field: 'town' },
//           { element: 'add5', field: 'county' },
//           { element: 'address_search', field: 'postcode' }
//         ],
//         {
//           ajaxKey: 'TJYU-SWL8-DN53-XQF4',
//           license: 'WebClickFull',
//           findLabel: 'Address Search'
//         }
//       ).show();
//       $( '#address_search' ).after( '<div id="address"></div> ');
//       $( '.data8-postcodelookup-list' ).on("click", "option", function (event) {
//         if( $("#address").html() != '' ){ return; }
//         $('#address-edit').remove();
//         $('.data8-postcodelookup-dropdown').hide();
//         $('#AddressCapture_FindButton').hide();
//         $('#label_address_search').hide();
//         $('#address_search').hide();
//         let add_arr = this.innerHTML.split(',');
//         for( let i = 0; i < add_arr.length; i++ ){
//               if( i !== add_arr.length -1 ){
//                   $('#add' + ( i + 1 ) ).val( add_arr[i] ); 
//               }
//               else {
//                   $('#postcode').val( add_arr[i] );
//               }
              
//         }
//         let address = this.innerHTML.replace(new RegExp(',', 'g'), '<br/>');
//         $("#address").html( address );
//         $("#address").after("<button id='address-edit'>&#9998;</button>");
//         $(document).trigger('clearErrors');
//       });
//       document.addEventListener("focus", 
//         function(e){ 
//           let op = $('.data8-postcodelookup-dropdown').css("opacity")
//           if( e.target.className == 'data8-postcodelookup-list' && parseInt( op ) === 0 ){
//             $('.data8-postcodelookup-list').blur();
//             s = function() {
//               let dis = $('#address_search').css('display');
//               if( dis == 'block'){
//                   $('.data8-postcodelookup-list option').css('cursor', 'pointer');
//                   $('.data8-postcodelookup-dropdown').fadeTo("fast", 1);    
//               }
              
//             }
//             ,
//             setTimeout(s, 350);
//           }
//           else {
//              s = function() {
//               $('.data8-postcodelookup-list option').css('cursor', 'default');
//               $('.data8-postcodelookup-dropdown').fadeTo("fast", 0); 
//             }
//             ,
//             setTimeout(s, 200);
//           }
//          }, true);
//     }

