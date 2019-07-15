// All Thank You Pages Header CDN-v1.0

//CSS CDN FILE
var styles=document.createElement("link");
styles.setAttribute("rel", "stylesheet");
styles.setAttribute("type", "text/css");
styles.setAttribute("href", "//cdn.jsdelivr.net/gh/digitaloyster/do-all/all/ty.css");
document.getElementsByTagName('head')[0].appendChild(styles);
//CSS CDN FILE

//Outbrain Pixels
  if (document.cdnParameters.OB_pixel_ids != '' && typeof document.cdnParameters.OB_pixel_ids !== "undefined") {
    var idstring = document.cdnParameters.OB_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        !function(_window, _document) {
          var OB_ADV_ID=ids[i];
          if (_window.obApi) {var toArray = function(object) {return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];};_window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));return;}
          var api = _window.obApi = function() {api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);};api.version = '1.1';api.loaded = true;api.marketerId = OB_ADV_ID;api.queue = [];var tag = _document.createElement('script');tag.async = true;tag.src = '//amplify.outbrain.com/cp/obtp.js';tag.type = 'text/javascript';var script = _document.getElementsByTagName('script')[0];script.parentNode.insertBefore(tag, script);}(window, document);
          obApi('track', 'PAGE_VIEW');
      }
    }
  }
//Outbrain Pixels

//Taboola Pixels
  if (document.cdnParameters.TB_pixel_ids != '' && typeof document.cdnParameters.TB_pixel_ids !== "undefined") {
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
