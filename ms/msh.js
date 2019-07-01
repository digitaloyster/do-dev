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
