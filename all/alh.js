// All Pages Scripts Header CDN-v1.3

//CSS CDN FILE
var styles=document.createElement("link");
styles.setAttribute("rel", "stylesheet");
styles.setAttribute("type", "text/css");
styles.setAttribute("href", "//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/lp.css");
document.getElementsByTagName('head')[0].appendChild(styles);

// FullStory
function getSum(total, num) {
    return parseInt(total) + parseInt(num);
}

var guid = function() {
   var d = new Date();
   var nav = window.navigator;
   var screen = window.screen;
   var guid = nav.userAgent.replace(/\D+/g, '').match(/.{1}/g).reduce(getSum,0);
   guid += parseInt(nav.mimeTypes.length);
   guid += parseInt(nav.plugins.length);
   guid += parseInt(screen.pixelDepth) || 1;
   guid += parseInt(d.getDate());
   return guid;
};

let mod1 = 0;
document.cdnParameters.full_story ? mod1 = document.cdnParameters.full_story :  mod1 = 6;
if( typeof mod1 === 'string' ) { mod1 = mod1.toLowerCase(); }
if ( mod1 != 'off' && guid() % parseInt( mod1 ) === 0 ) {
  window['_fs_debug'] = false;
  window['_fs_host'] = 'fullstory.com';
  window['_fs_org'] = 'F14BY';
  window['_fs_namespace'] = 'FS';
  (function(m,n,e,t,l,o,g,y){
    if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
    g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
    o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
    y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
    g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};g.event=function(i,v){g('event',{n:i,p:v})};
    g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
    g.consent=function(a){g("consent",!arguments.length||a)};
    g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
    g.clearUserCookie=function(){};
  })(window,document,window['_fs_namespace'],'script','user');
}

// Unbounce Convertibles
$('head').append('<script src="https://73943c0bf6144760a33cc02ec368be53.js.ubembed.com" async></script>');

// Favicon
if (document.cdnParameters.favicon_url != '' && typeof document.cdnParameters.favicon_url !== 'undefined') {
  $('head').append('<link rel="icon" type="image/x-icon" href="'+document.cdnParameters.favicon_url+'" />');
}
