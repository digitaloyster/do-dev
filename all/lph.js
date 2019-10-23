// All Landing Pages header CDN-v1.1

//CSS CDN FILE
var styles=document.createElement("link");
styles.setAttribute("rel", "stylesheet");
styles.setAttribute("type", "text/css");
styles.setAttribute("href", "//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/lp.css");
document.getElementsByTagName('head')[0].appendChild(styles);
//CSS CDN FILE

// PCA & Data8
if (document.cdnParameters.postcode == "A" && typeof document.cdnParameters.postcode !== "undefined") {
    (function(n,t,i,r){var u,f;n[i]=n[i]||{},n[i].initial={accountCode:"DIGIT11191",host:"DIGIT11191.pcapredict.com"},n[i].on=n[i].on||function(){(n[i].onq=n[i].onq||[]).push(arguments)},u=t.createElement("script"),u.async=!0,u.src=r,f=t.getElementsByTagName("script")[0],f.parentNode.insertBefore(u,f)})(window,document,"pca","//DIGIT11191.pcapredict.com/js/sensor.js")
} 
else if (document.cdnParameters.postcode == "S" && typeof document.cdnParameters.postcode !== "undefined") {
    var p2Script = document.createElement('script');
    p2Script.setAttribute('src','https://digitaloyster.github.io/do-dev/p2/p2.js');
    document.head.appendChild(p2Script);
    var p2Style = document.createElement('link');
    p2Style.setAttribute('rel','stylesheet');
    p2Style.setAttribute('type','text/css');
    p2Style.setAttribute('href','https://digitaloyster.github.io/do-dev/p2/p2.css');
    document.head.appendChild(p2Style);
}
else if (document.cdnParameters.postcode == "DP" && typeof document.cdnParameters.postcode !== "undefined") {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "https://webservices.data-8.co.uk/javascript/address_min.js";
  head.appendChild(script);
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
    $( '#AddressCapture_FindButton' ).after( a );
    var a = $('select.data8-postcodelookup-list');
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
  }
}
else if (document.cdnParameters.postcode == "DS" && typeof document.cdnParameters.postcode !== "undefined") {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "https://webservices.data-8.co.uk/javascript/predictiveaddress.js";
  head.appendChild(script);

  window.onload = function(){
    var p2Style = document.createElement('link');
    p2Style.setAttribute('rel','stylesheet');
    p2Style.setAttribute('type','text/css');
    p2Style.setAttribute('href','https://digitaloyster.github.io/do-dev/p2/p2.css');
    document.head.appendChild(p2Style);
    var d8style = document.createElement('link');
    d8style.setAttribute('rel','stylesheet');
    d8style.setAttribute('type','text/css');
    d8style.setAttribute('href','https://webservices.data-8.co.uk/content/predictiveaddress.css');
    document.head.appendChild(d8style);
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
}

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

  $('#AddressCapture_FindButton').show();

  $(postcode).val('');
  $(add1).val('');
  $(add2).val('');
  $(add3).val('');
  $(add4).val('');
  $(add5).val('');
  $(document).trigger('revalidate');
  $(document).trigger('clearErrors');
});

//Taboola Pixels
if (document.cdnParameters.TB_pixel_ids != "" && typeof document.cdnParameters.TB_pixel_ids !== "undefined") {
  var idstring = document.cdnParameters.TB_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        window._tfa = window._tfa || [];
        window._tfa.push({notify: 'event', name: 'page_view', id: ids[i]});
        !function (t, f, a, x) {
          if (!document.getElementById(x)) {
            t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
          }
        }(document.createElement('script'),
        document.getElementsByTagName('script')[0],
        '//cdn.taboola.com/libtrc/unip/'+ids[i]+'/tfa.js',
        'tb_tfa_script');
      }
    }
}
//Taboola Pixels

//Load PolyFill
var polyfill = document.createElement('script');
polyfill.setAttribute('src','https://polyfill.io/v3/polyfill.min.js');
polyfill.setAttribute('crossorigin','anonymous');
document.head.appendChild(polyfill);
//Load PolyFill
