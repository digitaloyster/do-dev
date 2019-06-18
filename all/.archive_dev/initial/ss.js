// Smooth Scroll CDN-v1.0
lp.jQuery(function($) {
  // The speed of the scroll in milliseconds
  var speed = 1000;

  // Find links that are #anchors and scroll to them
  $('a[href^=#]').not('.lp-pom-form .lp-pom-button').unbind('click.smoothScroll').bind('click.smoothScroll', function(event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top }, speed);
  });
});
