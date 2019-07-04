// Version 1.1
document.cdnMultiStep.hooks = {
  hooks: [],
  register: function ( name, callback ) {
    if( 'undefined' == typeof( document.cdnMultiStep.hooks[name] ) )
      document.cdnMultiStep.hooks[name] = []
      document.cdnMultiStep.hooks[name].push( callback )
    },

    call: function ( name, arguments ) {
      if( 'undefined' != typeof( document.cdnMultiStep.hooks[name] ) ) {
        var returns;
        for( i = 0; i < document.cdnMultiStep.hooks[name].length; ++i ) {
          var data = document.cdnMultiStep.hooks[name][i]( arguments );
          if( data ){
            if( returns === undefined ){
              returns = [];
            }
            returns.push(data);
          }

        }
        return returns;
      }
    }
};

var styles = document.createElement('link');
//styles.setAttribute('href', 'https://cdn.jsdelivr.net/gh/digitaloyster/do-live/ms/ms.css');
styles.setAttribute('href', 'https://digitaloyster.github.io/do-dev/ms/ms.css');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('type', 'text/css');
document.head.appendChild(styles);

var increment = 0;
function loadMSB() {
    if (typeof document.body != 'undefined') {
        var msbScript = document.createElement('script');
        msbScript.setAttribute('src', 'https://digitaloyster.github.io/do-dev/ms/msb-pika2.js');
        msbScript.setAttribute('id', 'msbScript');
        document.body.appendChild(msbScript);
        console.log("msb increment[" + increment + "]");
    }
    else {
        increment += 1;
        window.setTimeout( loadMSB, 100 );
    }
}
$( document ).ready(function() {
    loadMSB();
});
