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
document.getElementById( document.cdnParameters.progress_bar ).innerHTML = '<div class="progress-bar">' +
                                                                               '<div class="bar-container">' +
                                                                                  '<div class="bar" id="pgBar"></div>' +
                                                                               '</div>' + 
                                                                           '</div>' + 
                                                                           '<div class="progress-bar-percent" id="perVal"></div>';
document.getElementById('pgBar').style.background = 'linear-gradient( to right, ' + document.cdnParameters.progress_bar_color1 + ' 0%, ' + document.cdnParameters.progress_bar_color2 + ' 0% 100%';
document.getElementById('perVal').innerHTML = '0%';
var setProgress = function( nextPrev ) {
    var step = $( '.active' ).attr( 'data-id' );
    nextPrev == 'prev' ? step -=2 : step === step;
    var progress = ( ( step ) / Object.keys( document.cdnMultiStep.steps ).length);
    pg_per = Math.abs(progress) * 100;
    document.getElementById('perVal').innerHTML = pg_per + '%';
    document.getElementById('pgBar').style.background = 'linear-gradient( to right, ' + document.cdnParameters.progress_bar_color1 + ' ' + pg_per +  '%, ' + document.cdnParameters.progress_bar_color2 + ' ' + pg_per + '% 100%';
    var getProgressWrapWidth = $('.progress-wrap').width();
    var progressTotal = progress * getProgressWrapWidth;
    var animationLength = 500;
    $('.progress-bar').stop().animate({
      left: progressTotal
    }, animationLength);
    return true;
};
