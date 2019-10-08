var msb_mask = function () {
    
  var masks = { 'money decimal': { mask: '000,000,000', regex: RegExp(/^[£0-9,.]*$/), frontChar: '£', reverse: true, escChar: { num: 1, key: '.' }  }, 
                'money': { mask: '000,000,000', regex: RegExp(/^[£0-9,]*$/), frontChar: '£', reverse: true },
                'date': { mask: '00/00/00', regex: RegExp(/^[£0-9/]*$/) }, 
                'percent': { mask: '000', regex: RegExp(/^[£0-9%]*$/), rearChar: '%' },
                'sort code': { mask: '00-00-00', regex: RegExp(/^[£0-9-]*$/) },
                'acc no': { mask: '00000000', regex: RegExp(/^[0-9]*$/) },
                'mobile': { mask: '00000 000000', regex: RegExp(/^[0-9 ]*$/) },
                'credit card': { mask: '0000 0000 0000 0000', regex: RegExp(/^[£0-9 ]*$/) }
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
      this.escCharNum = 0;
      this.oldValue = '';
      this.oldSelectionStart = 0;
      this.oldSelectionEnd = 0;
    	this.translation = {
            '0': {pattern: /\d/},
            '9': {pattern: /\d/, optional: true},
            '#': {pattern: /\d/, recursive: true},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/}
        }
    },
    checkMask: function( inputVal ){
      	var a = this.mask;
      	inputVal = a.frontChar == $( '#' + this.el ).val().slice( 0, 1 ) ? $( '#' + this.el ).val().slice( 1 ) : $( '#' + this.el ).val();
        inputVal = a.rearChar  == inputVal.slice( -1 ) ? inputVal.slice( 0, -1 ) : inputVal;
        this.unmaskArr = [];
        if( inputVal.length > a.mask.length ){
          inputVal = inputVal.slice( 0, -1 );
        }
        for (let i = 0; i < inputVal.length; i++) {
          let isEscChar = 0;
          if( a.escChar ){
            inputVal.charAt(i) == a.escChar.key ? isEscChar = 1 : isEscChar = 0;
          }
          if( $.inArray( inputVal.charAt(i) , this.maskCharArr ) !== -1 || isEscChar ) {  
            this.oldSelectionStart -- ; 
          }
          this.unmaskArr.push( inputVal.charAt(i) );
        }
        if( a.frontChar && inputVal.length === 1 ){
          this.oldSelectionStart ++;
        }
  	    let buf = [];
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
        this.escCharNum = 0;
        if( buf.length && a.frontChar ){
    			buf.unshift( a.frontChar );
    		}
        if( buf.length && a.rearChar ){
          buf.push( a.rearChar );
        }
        let final_val = buf.join('');
        this.oldValue = final_val;
        $( '#' + this.el ).val( final_val );
        this.oldSelectionEnd = this.oldSelectionStart;
        if( a.rearChar ){
          this.setCaretPos( $('#' + this.el )[0], $('#' + this.el )[0].value.length - 1, $('#' + this.el )[0].value.length - 1  );
        }
        else {
          this.setCaretPos( $('#' + this.el )[0], this.oldSelectionEnd, this.oldSelectionStart );
        }
    },
    calcMask: function( caret, arrPos, maskVal, a) {
      let retChar;
      if( a.escChar && this.unmaskArr[ arrPos ] == a.escChar.key && this.escCharNum < a.escChar.num){
        retChar = this.unmaskArr[ arrPos ];
        escCharPos = $.inArray( a.escChar[0], this.unmaskArr );
        setPos = this.unmaskArr.length - escCharPos;
        caret += setPos;
        this.escCharNum ++;
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
        this.oldSelectionStart ++;
      }
      return { 'retchar': retChar, 'arrPos': arrPos, 'caret': caret }
    },
    unMask: function(){

      $( '#' + this.el ).val( this.unmaskArr.join('') );

    },
    setCaretPos: function( input, start, end ){
       input.focus();
       input.setSelectionRange( start, end); 
    }
  }
}
var masks = {};
$.fn.mask = function( mask ) {      
  this.each( function(){
    let id = this.id;
    masks[ id ] = new msb_mask;
    masks[ id ].setMask( mask, id );

    function setInputFilter(textbox, inputFilter) {
        textbox.addEventListener('input', function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            if( window.event.key ){
              var key = window.event.key;
            }
            else { 
              var key = window.event.data; 
            }
            masks[ id ].oldSelectionStart = this.selectionStart;
            masks[ id ].oldSelectionEnd = this.selectionEnd;
            masks[ id ].checkMask( key, this.value, this.selectionStart, this.selectionEnd );
          } 
          else if (this.hasOwnProperty("oldValue")) {
            this.value = masks[ id ].oldValue;
            this.setSelectionRange( masks[ id ].oldSelectionStart, masks[ id ].oldSelectionEnd);
          }
          else {
            this.value = '';
          }
        });
    }
    setInputFilter(document.getElementById( id ), function(value) { return masks[ id ].mask.regex.test(value); });
  });     
}
$.fn.unMask = function(){
  this.each( function() {
    let id = this.id;
    masks[ id ].unMask();
  });
}
