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
$("#address_search").attr("autocomplete", "postal-code");
$(searchField).after(extraHTML);
invalidPC(false);
$("#start-search").on("click",function(e) {
  e.preventDefault();
  invalidPC(false);
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
                if( t.Status.Success === false ) { invalidPC( true, t.Status.ErrorMessage ); return; }
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
    else{
      invalidPC( true );
    }
});

function invalidPC(state, m ) {
  $('.error-message').remove();
  if (state) {
    $(searchField).addClass('error')
    let error_txt = ''
    m !== undefined ? error_txt = m : error_txt = 'Postcode is required for address lookup.';
    document.getElementById('postcode').insertAdjacentHTML("afterend", '<div class="error-message">' + error_txt + '</div>'); 
  } else {
    $(searchField).removeClass('error').css("border-color","black");
  }
}

