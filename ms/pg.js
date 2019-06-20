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
$( document.cdnParameters.progress_bar ).html( '<div class="progress-bar" style="height: 100%;float: left;width: 85%;">' +
						   '<div class="bar-container" style="display: flex;height: 100%;width: 100%;justify-content: center;align-items: center;">' +
						      '<div class="progress_bar_background progress_bar_border_color" id="pgBar" style="width: 80%;height: 78%;background-color: #FFA500;border: solid 1px;border-color:#000;border-radius: 8px;">' +
							'<div class="progress_bar_color" id="progress" style="height: 100%;background-color: #FF0000;width: 0%;"></div>' +
						      '</div>' +
						   '</div>' + 
						'</div>');
	                                              // '<div class="progress_bar_font_color" id="percent_value" style="font-size: 12px;width: 15%;height: 100%;float: left; display: flex;justify-content: center;align-items: center;"></div>');
var setProgress = function( nextPrev ) {
    var num_steps = Object.keys( document.cdnMultiStep.steps ).length;
    var step = $( '.active' ).attr( 'data-id' );
    nextPrev == 'prev' ? step -- : step ++;
    nextPrev === 1 ? step = nextPrev : step == step;
    var progress = Math.floor( ( Math.round( ( step / num_steps ) * 100 ) / 100 ) * 100 ) + '%';
    //document.getElementById('percent_value').innerHTML = progress;
    document.getElementById('progress').innerHTML = progress;
    $('#progress').stop().animate({
      width: progress
    }, 500);
    return true;
};
setProgress( 1 );
