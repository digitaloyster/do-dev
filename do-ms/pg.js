  var hooks = document.cdnMultiStep.hooks;

  hooks.register(
    'hookPrevCheck',
    function (args) {
      console.log('prev');
    }   
  );
    hooks.register(
    'hookNextCheck',
    function (args) {
      console.log('next');
    }   
  );

document.getElementById( document.cdnParameters.progress_bar ).innerHTML = '<div class="progress-bar"></div><div class="progress-bar-percent" id="perVal"></div>';

var setProgress = function() {
    var progress = ( ( $( '.active' ).attr( 'data-id' ) ) / Object.keys( document.cdnMultiStep.steps ).length);
    progress = Math.abs(progress);
    $( '#' + document.cdnMultiStep.progressBar + ' > div').data('progresspercent', progress * 100);
    var getProgressWrapWidth = $('.progress-wrap').width();
    var progressTotal = progress * getProgressWrapWidth;
    var animationLength = 500;
    $('.progress-bar').stop().animate({
      left: progressTotal
    }, animationLength);
    return true;
};
