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


/*var script = document.createElement('script');
script.setAttribute('src', 'https://cdn.jsdelivr.net/gh/fengyuanchen/datepicker@latest/dist/datepicker.min.js');
script.setAttribute('id', 'date-picker-script');
document.head.appendChild(script);*/
if ("display" in val && val.display == "datepicker") {
    var jquiStyle = document.createElement('link');
    jquiStyle.setAttribute('href', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');
    jquiStyle.setAttribute('rel', 'stylesheet');
    document.head.appendChild(jquiStyle);

    var jquiScript = document.createElement('script');
    jquiScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js');
    document.head.appendChild(jquiScript);
}
/*<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>*/
