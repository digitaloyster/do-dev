// All Landing Pages header CDN-v1.1

//CSS CDN FILE
var styles=document.createElement("link");
styles.setAttribute("rel", "stylesheet");
styles.setAttribute("type", "text/css");
styles.setAttribute("href", "//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/lp.css");
document.getElementsByTagName('head')[0].appendChild(styles);
//CSS CDN FILE

// PCA & Data8
if( typeof document.cdnParameters.postcode !== "undefined" ){
  if (document.cdnParameters.postcode == "A") {
      (function(n,t,i,r){var u,f;n[i]=n[i]||{},n[i].initial={accountCode:"DIGIT11191",host:"DIGIT11191.pcapredict.com"},n[i].on=n[i].on||function(){(n[i].onq=n[i].onq||[]).push(arguments)},u=t.createElement("script"),u.async=!0,u.src=r,f=t.getElementsByTagName("script")[0],f.parentNode.insertBefore(u,f)})(window,document,"pca","//DIGIT11191.pcapredict.com/js/sensor.js")
  } 
  else if (document.cdnParameters.postcode == "S") {
      var p2Style = document.createElement('link');
      p2Style.setAttribute('rel','stylesheet');
      p2Style.setAttribute('type','text/css');
      p2Style.setAttribute('href','https://digitaloyster.github.io/do-live/p2/p2.css');
      document.head.appendChild(p2Style);
      var p2Script = document.createElement('script');
      p2Script.setAttribute('src','https://digitaloyster.github.io/do-live/p2/p2.js');
      document.head.appendChild(p2Script);
  }
  else if (document.cdnParameters.postcode == "DP") {
    var d8css = document.createElement('link');
    d8css.setAttribute('rel','stylesheet');
    d8css.setAttribute('type','text/css');
    d8css.setAttribute('href','https://digitaloyster.github.io/do-dev/d8/d8_add_complete.css');
    document.head.appendChild(d8css);
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://webservices.data-8.co.uk/javascript/address_min.js";
    head.appendChild(script);
    var script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = "https://digitaloyster.github.io/do-dev/d8/d8_dp.js";
    head.appendChild(script1);
  }
  else if (document.cdnParameters.postcode == "DS") {
    var d8style = document.createElement('link');
    d8style.setAttribute('rel','stylesheet');
    d8style.setAttribute('type','text/css');
    d8style.setAttribute('href','https://webservices.data-8.co.uk/content/predictiveaddress.css');
    document.head.appendChild(d8style);
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://webservices.data-8.co.uk/javascript/predictiveaddress.js";
    head.appendChild(script);
    var script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = "https://digitaloyster.github.io/do-dev/d8/d8_ds.js";
    head.appendChild(script1);
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
}

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
