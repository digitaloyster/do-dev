"use strict"; 
var hooks = document.cdnMultiStep.hooks;

  hooks.register(
    'hookPrevCheck',
    function (args) {
      console.log('prev');
      setProgress('prev');
      return true;
    }   
  );
  hooks.register(
    'hookNextCheck',
    function (args) {
      console.log('next');
      setProgress();
      return true;
    }   
  );
document.getElementById( document.cdnParameters.progress_bar ).innerHTML = '<div class="progress-bar" style="height: 100%;float: left;width: 85%;">' +
                                                                               '<div class="bar-container" style="display: flex;height: 100%;width: 100%;justify-content: center;align-items: center;">' +
                                                                                  '<div class="progress_bar" id="pgBar" style="width: 80%;height: 78%;background-color: #FFA500;">' +
                                                                                    '<div class="progress" id="progress" style="height: 100%;background-color: #FF0000;width: 0%;"></div>' +
                                                                                  '</div>' +
                                                                               '</div>' + 
                                                                           '</div>' + 
                                                                           '<div class="progress-bar-percent" id="percent_value" style="width: 15%;height: 100%;float: left; display: flex;justify-content: center;align-items: center;"></div>';
document.getElementById('percent_value').innerHTML = '0%';
var setProgress = function( nextPrev ) {
    var step = $( '.active' ).attr( 'data-id' );
    nextPrev == 'prev' ? step -=2 : step === step;
    var progress = ( Math.round( ( step / Object.keys( document.cdnMultiStep.steps ).length ) * 100 ) / 100 ) * 100 + '%';
    document.getElementById('percent_value').innerHTML = progress;
    $('.progress').stop().animate({
      width: progress
    }, 500);
    return true;
};
