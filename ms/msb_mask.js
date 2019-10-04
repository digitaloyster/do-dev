var msb_mask = function () {
    
  var masks = { 'money decimal': { mask: '000,000,000', frontChar: '£', reverse: true, escChar: [ '.' ]  }, 
                'money': { mask: '000,000,000', frontChar: '£', reverse: true },
                'date': { mask: '00/00/00' }, 
                'percent': { mask: '000', rearChar: '%' },
                'sort code': { mask: '00-00-00' },
                'credit card': { mask: '0000 0000 0000 0000'}
              }
  this.mask = '';
  this.maskEv;

  return {
    getMask: function( this_mask ) {
      return this.mask;
    },
    setMask: function( mask, el ){
    	this.mask = masks[ mask ];
      this.maskEv = true;
    	this.el = el;
      this.byPassKeys = [8, 9, 16, 17, 18, 36, 37, 38, 39, 40, 46, 91];
      this.unmaskArr = [];
      this.maskCharArr = [];
    	this.translation = {
            '0': {pattern: /\d/},
            '9': {pattern: /\d/, optional: true},
            '#': {pattern: /\d/, recursive: true},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/}
        }
    },
    checkMask: function( ev ){
      if ($.inArray( ev.keyCode, this.byPassKeys ) === -1) {
        ev.preventDefault()
      	var a = this.mask;
      	let inputVal = a.frontChar == $( '#' + this.el ).val().slice( 0, 1 ) ? $( '#' + this.el ).val().slice( 1 ) : $( '#' + this.el ).val();
        inputVal = a.rearChar  == inputVal.slice( -1 ) ? inputVal.slice( 0, -1 ) : inputVal;
        this.unmaskArr = [];
        if( inputVal.length === a.mask.length ){ return; }
        if( ev.keyCode ){
          let caretPos = a.frontChar ? $( '#' + this.el )[ 0 ].selectionStart -1 : $( '#' + this.el )[ 0 ].selectionStart;
          inputVal = inputVal.slice( 0, caretPos ) + ev.key + inputVal.slice( caretPos, inputVal.length );
        }
        for (let i = 0; i < inputVal.length; i++) {
          if( $.inArray( inputVal.charAt(i), this.maskCharArr ) === -1 ){
            this.unmaskArr.push( inputVal.charAt(i) );
          }
        }
  	    let buf = [];
        let i = 0;
        if( a.reverse ){
          let arrMethod = 'unshift';
          let caret = a.mask.length -1;
          let arrPos = this.unmaskArr.length - 1;
          while( arrPos >= 0 ){
            let maskVal = a.mask.charAt( caret );
            if( caret >= 0 ){
              let retVar = this.calcMask( caret, arrPos, maskVal, a );
              if( retVar[ 'retchar'] ){
                buf[ arrMethod ]( retVar[ 'retchar' ] );
              }
              arrPos = retVar[ 'arrPos' ];
              caret = retVar[ 'caret' ];
            }
            else{
              this.unmaskArr.pop();
              break;
            }
    			  caret --;
            arrPos --; 
    	    }
        }

        if( !a.reverse ){
          let arrMethod = 'push';
          let caret = 0;
          let arrPos = 0;
          while( arrPos < this.unmaskArr.length ){
            let maskVal = a.mask.charAt( caret );
            if( caret < a.mask.length ){
              let retVar = this.calcMask( caret, arrPos, maskVal, a );
              if( retVar[ 'retchar'] ){
                buf[ arrMethod ]( retVar[ 'retchar' ] );
              }
              arrPos = retVar[ 'arrPos' ];
              caret = retVar[ 'caret' ];
            }
            else{
              this.unmaskArr.pop();
              break;
            }
            caret ++;
            arrPos ++; 
          }
        }

        if( buf.length && a.frontChar ){
    			buf.unshift( a.frontChar );
    		}
        if( buf.length && a.rearChar ){
          buf.push( a.rearChar );
        }
        let final_val = buf.join('');
        $( '#' + this.el ).val( final_val );
        if( a.rearChar ){
          this.setCaretPos( $('#' + this.el )[0], $('#' + this.el )[0].value.length - 1 );
        }
      }
    },
    calcMask: function( caret, arrPos, maskVal, a) {
      let retChar;
      if( $.inArray( this.unmaskArr[ arrPos ], a.escChar ) !== -1 ){
        retChar = this.unmaskArr[ arrPos ];
        escCharPos = $.inArray( a.escChar[0], this.unmaskArr );
        setPos = this.unmaskArr.length - escCharPos;
        caret += setPos; 
      }      
      else if( this.translation[ maskVal ] ){ 
        if( this.unmaskArr[ arrPos ].match( this.translation[ maskVal ].pattern ) ){
          retChar = this.unmaskArr[ arrPos ];
        }
        else{
          a.reverse ?  caret++ : caret -- ;
        }

      }
      else {
        if( $.inArray( a.mask.charAt( caret ) , this.maskCharArr ) === -1 ) {  this.maskCharArr.push( a.mask.charAt( caret ) ); }
        a.reverse ?  arrPos++ : arrPos -- ;
        retChar = a.mask.charAt( caret );
      }
      return { 'retchar': retChar, 'arrPos': arrPos, 'caret': caret }
    },
    unMask: function(){

      $( '#' + this.el ).val( this.unmaskArr.join('') );

    },
    setCaretPos: function( input, caretPos ){
       input.focus();
       input.setSelectionRange( caretPos, caretPos); 
    }
  }
}
var masks = {};
$.fn.mask = function( mask ) {      
  this.each( function(){
    let id = this.id;
    masks[ id ] = new msb_mask;
    masks[ id ].setMask( mask, id );
    $( '#' + id  ).on('keydown', function( ev ){
        if( ev.keyCode === 8 || ev.keyCode === 46  ){
          $( '#' + id ).keyup();
        }
        if( masks[ id ].maskEv === true ){
            masks[ id ].maskEv = false;
            masks[ id ].checkMask( ev );
        }
        else {
          return false;
        }
        
    });
    $( '#' + id ).on('keyup', function( ev ){
        masks[ id ].maskEv = true;
        if( ev.keyCode === 8 || ev.keyCode === 46  ){
          ev.keyCode = 0;
          masks[ id ].checkMask( ev );
        }
    });
  });     
}
$.fn.unMask = function(){
  this.each( function() {
    let id = this.id;
    masks[ id ].unMask();
  });
}
