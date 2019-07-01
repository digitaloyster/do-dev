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


if (document.cdnMultiStep.steps != '') {
    var steps = document.cdnMultiStep.steps;
} else alert('steps not found');


/*var script = document.createElement('script');
script.setAttribute('src', 'https://cdn.jsdelivr.net/gh/fengyuanchen/datepicker@latest/dist/datepicker.min.js');
script.setAttribute('id', 'date-picker-script');
document.head.appendChild(script);*/

$.each(steps, function(i, val) {
    if ("fields" in steps[i] && steps[i].fields != '') {
        $.each(steps[i].fields, function(k, val) {
            if ("display" in val && val.display == "datepicker" && !$('#jqui').length) {
                var jquiStyle = document.createElement('link');
                jquiStyle.setAttribute('href', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');
                jquiStyle.setAttribute('rel', 'stylesheet');
                document.head.appendChild(jquiStyle);

                var jquiScript = document.createElement('script');
                jquiScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js');
                jquiScript.setAttribute('id', 'jqui');
                document.head.appendChild(jquiScript);
            }
        });
    }
});
/*<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>*/

function loadMSB() {
    if (typeof document.body != 'undefined' && typeof jQuery.ui != 'undefined') {
        var msbScript = document.createElement('script');
        msbScript.setAttribute('src', 'https://digitaloyster.github.io/do-dev/ms/msb.js');
        msbScript.setAttribute('id', 'msbScript');
        document.body.appendChild(msbScript);
    }
    else { window.setTimeout( loadMSB, 100 ); }
}

loadMSB();
