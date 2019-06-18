// All Pages Scripts Before Body CDN-v1.1
// Fix Styling Issues
window.ub.page.disableTextAdjustments = true;

// Add OS as class to body
var OSName="unknown";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="macos";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="unix";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
document.body.className += ' ' + OSName;

// Facebook Pixels (expects csv of ID)
if (document.cdnParameters.FB_pixel_ids != '' && typeof document.cdnParameters.FB_pixel_ids !== 'undefined') {
  var idstring = document.cdnParameters.FB_pixel_ids;
  var ids = idstring.split(',');
  for (i in ids) {
    !function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ids[i]);
      fbq('track', 'PageView');
  }
}
// Facebook Pixels (expects csv of ID)

//Twitter View
if (document.cdnParameters.TW_site_visit_ids != '' && typeof document.cdnParameters.TW_site_visit_ids !== "undefined") {
  var idstring = document.cdnParameters.TW_site_visit_ids;
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
//Twitter View
