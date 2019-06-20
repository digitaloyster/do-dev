"use strict";
var hooks = document.cdnMultiStep.hooks;
hooks.register(
  'hookPrevCheck',
  function (args) {
    setProgress('prev');
    return true;
  }
);
hooks.register(
  'hookNextCheck',
  function (args) {
    setProgress();
    return true;
  }
);
var progHeight = $( document.cdnParameters.progress_bar ).height(); 
var fontSize =  progHeight / 2 ;
if( fontSize < 8 ){ fontSize = 8; }
if( fontSize > 18 ){ fontSize = 18; }
$( document.cdnParameters.progress_bar ).html('<div class="bar-container" style="display: flex;height: 100%;width: 100%;justify-content: center;align-items: center;">' +
                                                  '<div class="progress_bar_background progress_bar_border_color" id="pgBar" style="width: 96.5%;height: 78%;background-color: #FFA500;border: solid 2px;border-color:#000;border-radius: 8px;">' +
                                                     '<div class="progress_bar_color progress_bar_font_color" id="progress" style="font-size:' + fontSize + 'px;height: 100%;background-color: #FF0000;width: 0%;display: flex;justify-content: center;align-items: center;border-radius: 8px 0px 0px 8px;"></div>' +
                                                  '</div>' +
                                               '</div>');
var setProgress = function( nextPrev ) {
    var num_steps = Object.keys( document.cdnMultiStep.steps ).length;
    var step = $( '.active' ).attr( 'data-id' );
    nextPrev == 'prev' ? step -- : step ++;
    nextPrev === 1 ? step = nextPrev : step == step;
    var progress = Math.floor( ( Math.round( ( step / num_steps ) * 100 ) / 100 ) * 100 ) + '%';
    //document.getElementById('percent_value').innerHTML = progress;
    document.getElementById('progress').innerHTML = progress;
    if( step == num_steps){ 
      $('#progress').stop().animate({
        width: progress,
        borderRadius: 8
      }, 500);
    }
    else{
      $('#progress').stop().animate({
        width: progress,
        borderTopRightRadius: 0, 
        borderBottomRightRadius: 0
      }, 500);
    }
    return true;
};
setProgress( 1 );
