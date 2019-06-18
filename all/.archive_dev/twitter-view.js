//ALL BB

//Twitter View
if (typeof document.cdnParameters !== "undefined") {
  if (document.cdnParameters.TW_site_visit_ids != '') {
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
}
//Twitter View
