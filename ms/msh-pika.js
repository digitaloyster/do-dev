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

$.each(steps, function(i, val) {
    if ("fields" in steps[i] && steps[i].fields != '') {
        $.each(steps[i].fields, function(k, val) {
            if ("display" in val && val.display == "datepicker" && !$('#jqui').length) {
                var jquiStyle = document.createElement('link');
                jquiStyle.setAttribute('href', 'https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css');
                jquiStyle.setAttribute('rel', 'stylesheet');
                document.head.appendChild(jquiStyle);

                var jquiScript = document.createElement('script');
                jquiScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/pikaday/pikaday.js');
                jquiScript.setAttribute('id', 'jqui');
                document.head.appendChild(jquiScript);
            }
        });
    }
});
