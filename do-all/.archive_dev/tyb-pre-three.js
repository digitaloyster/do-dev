// All Thank You Pages Before Body CDN-v1.0

// Cake Conversion Pixel
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.cake_offer_id != '') {
    setTimeout(function(){
      var image = new Image(1,1);
      image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e=ld&t="+document.cdnParameters.ty_tracking_prefix+"_"+window.ub.page.variantId;
    },4000);
  }
}
// Cake Conversion Pixel

// Facebook Lead tracking
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.FB_pixel_ids != '') {
    fbq('track', 'Lead', {
      value: 10.00,
      currency: 'GBP'
    });
  }
}
// Facebook Lead tracking

//Taboola Pixels
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.TB_pixel_ids != '') {
    var idstring = document.cdnParameters.TB_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        _tfa.push({notify: 'event', name: 'lead', id: ids[i]});
      }
    }
  }
}
//Taboola Pixels
//Twitter Pixel
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.TW_pixel_ids != '') {
    var idstring = document.cdnParameters.TW_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
        // Insert Twitter Pixel ID and Standard Event data below
        twq('init',ids[i]);
        twq('track','PageView');
      }
    }
  }
}
//Twitter Pixel

//Yahoo Pixel
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.YG_pixel_ids != '') {
    var idstring = document.cdnParameters.YG_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        (function(w,d,t,r,u){w[u]=w[u]||[];w[u].push({'projectId':'10000','properties':{'pixelId':ids[i]}});var s=d.createElement(t);s.src=r;s.async=true;s.onload=s.onreadystatechange=function(){var y,rs=this.readyState,c=w[u];if(rs&&rs!="complete"&&rs!="loaded"){return}try{y=YAHOO.ywa.I13N.fireBeacon;w[u]=[];w[u].push=function(p){y([p])};y(c)}catch(e){}};var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;par.insertBefore(s,scr)})(window,document,"script","https://s.yimg.com/wi/ytc.js","dotq");
      }
    }
  }
}
//Yahoo Pixel
