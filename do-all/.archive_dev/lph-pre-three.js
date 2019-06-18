// All Landing Pages header CDN-v1.0

//CSS CDN FILE
var styles=document.createElement("link");
styles.setAttribute("rel", "stylesheet");
styles.setAttribute("type", "text/css");
styles.setAttribute("href", "//cdn.jsdelivr.net/gh/digitaloyster/do-all@latest/lp.css");
document.getElementsByTagName('head')[0].appendChild(styles);
//CSS CDN FILE

// PCA
if (typeof document.cdnParameters.postcode_autocomplete !== "undefined") {
  if (document.cdnParameters.postcode_autocomplete == "Y") {
    (function(n,t,i,r){var u,f;n[i]=n[i]||{},n[i].initial={accountCode:"DIGIT11191",host:"DIGIT11191.pcapredict.com"},n[i].on=n[i].on||function(){(n[i].onq=n[i].onq||[]).push(arguments)},u=t.createElement("script"),u.async=!0,u.src=r,f=t.getElementsByTagName("script")[0],f.parentNode.insertBefore(u,f)})(window,document,"pca","//DIGIT11191.pcapredict.com/js/sensor.js")
  }
}
// PCA

//Taboola Pixels
if (typeof document.cdnParameters !== "undefined") {
  if (document.cdnParameters.TB_pixel_ids != "") {
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
}
//Taboola Pixels
