// LP BB
// DONE : Implement Y/N Setting
// Smooth Scroll
$(document).ready(function () {
  if (typeof document.cdnParameters.smooth_scroll !== "undefined") {
    if (document.cdnParameters.smooth_scroll == "Y") {
      // The speed of the scroll in milliseconds
      var speed = 1000;
      // Find links that are #anchors and scroll to them
      $('a[href^=#]').not('.lp-pom-form .lp-pom-button').unbind('click.smoothScroll').bind('click.smoothScroll', function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top }, speed);
      });
    }
  }
});
//DONE: Convert to standard Doc Ready
