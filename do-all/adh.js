// All Advertorials Header CDN-v1.2

//CSS CDN FILE
var styles=document.createElement("link");
styles.setAttribute("rel", "stylesheet");
styles.setAttribute("type", "text/css");
styles.setAttribute("href", "//cdn.jsdelivr.net/gh/digitaloyster/do-all@latest/ad.css");
document.getElementsByTagName('head')[0].appendChild(styles);


// Cookie consent
  if (document.cdnParameters.cookie_footer_url != '' && typeof document.cdnParameters.cookie_footer_url !== 'undefined') {
    var styles=document.createElement("link");
    styles.setAttribute("rel", "stylesheet");
    styles.setAttribute("type", "text/css");
    styles.setAttribute("href", "//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css");
    document.getElementsByTagName('head')[0].appendChild(styles);

    $.getScript('//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js');

    window.addEventListener("load", function(){
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#000"
        },
        "button": {
          "background": "#f1d600"
        }
      },
      "content": {
        "href": document.cdnParameters.cookie_footer_url
      }
    })});
  }
//Cookie consent

// Taboola Widgets
  if (document.cdnParameters.TB_widget == "Y" && typeof document.cdnParameters.TB_widget !== 'undefined') {
    window._taboola = window._taboola || [];
    _taboola.push({article:'auto'});
    !function (e, f, u, i) {
      if (!document.getElementById(i)){
        e.async = 1;
        e.src = u;
        e.id = i;
        f.parentNode.insertBefore(e, f);
      }
    }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      '//cdn.taboola.com/libtrc/oyster-brunelfranklin/loader.js',
      'tb_loader_script');
    if(window.performance && typeof window.performance.mark == 'function')
      {window.performance.mark('tbl_ic');}
  }
// Taboola Widgets
