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
if (typeof document.cdnParameters !== 'undefined') {
  if (document.cdnParameters.FB_pixel_ids != '') {
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
}
// Facebook Pixels (expects csv of ID)
