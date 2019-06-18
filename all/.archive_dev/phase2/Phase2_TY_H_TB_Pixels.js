//TY Head

//Taboola Pixels
if (typeof document.cdnParameters !== "undefined") {
  if (document.cdnParameters.TB_pixel_ids != '') {
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
