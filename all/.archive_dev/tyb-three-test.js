// All Thank You Pages Before Body CDN-v1.0

//Functions
function getParameterByName(name) { //Review: Added for the UKM Fix
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//Functions

// Cake Conversion Pixel
  if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== "undefined" && document.cdnParameters.ty_tracking_prefix != '' && typeof document.cdnParameters.ty_tracking_prefix !== "undefined") { //REVIEW: Checking cake_offer_id AND ty_tracking_prefix
    setTimeout(function(){
      var image = new Image(1,1);
      if (getParameterByName('lead_id') !== null) { //Review: Added for the UKM Fix
        console.log("37");
        image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e=37&t=" + getParameterByName('lead_id') + "&r=" + getParameterByName('ckm_request_id');
      } else {
        console.log("ld");
        image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e=ld&t="+document.cdnParameters.ty_tracking_prefix+"-"+window.ub.page.variantId;
      }
    },4000);
  }
// Cake Conversion Pixel

// Facebook Lead tracking
    if (document.cdnParameters.FB_pixel_ids != '' && typeof document.cdnParameters.FB_pixel_ids !== "undefined") {
    fbq('track', 'Lead', {
      value: 10.00,
      currency: 'GBP'
    });
  }
// Facebook Lead tracking

//Taboola Pixels
    if (document.cdnParameters.TB_pixel_ids != '' && typeof document.cdnParameters.TB_pixel_ids !== "undefined") {
    var idstring = document.cdnParameters.TB_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        _tfa.push({notify: 'event', name: 'lead', id: ids[i]});
      }
    }
  }
//Taboola Pixels

//Twitter conversion
if (document.cdnParameters.TW_lead_ids != '' && typeof document.cdnParameters.TW_lead_ids !== "undefined") {
  $.getScript('//platform.twitter.com/oct.js', function() {
    var idstring = document.cdnParameters.TW_lead_ids;
    var ids = idstring.split(',');
    for (i in ids) {
      twttr.conversion.trackPid(ids[i], { tw_sale_amount: 0, tw_order_quantity: 0 });
    }
  });
}
//Twitter conversion

//Yahoo Pixel
    if (document.cdnParameters.YG_pixel_ids != '' && typeof document.cdnParameters.YG_pixel_ids !== "undefined") {
    var idstring = document.cdnParameters.YG_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        (function(w,d,t,r,u){w[u]=w[u]||[];w[u].push({'projectId':'10000','properties':{'pixelId':ids[i]}});var s=d.createElement(t);s.src=r;s.async=true;s.onload=s.onreadystatechange=function(){var y,rs=this.readyState,c=w[u];if(rs&&rs!="complete"&&rs!="loaded"){return}try{y=YAHOO.ywa.I13N.fireBeacon;w[u]=[];w[u].push=function(p){y([p])};y(c)}catch(e){}};var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;par.insertBefore(s,scr)})(window,document,"script","https://s.yimg.com/wi/ytc.js","dotq");
      }
    }
  }
//Yahoo Pixel
