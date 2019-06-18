

var focusOnLoad = true; //By default, first form field is focused automatically on page load. Change this value to 'False' to disable this.
var scrollButton = "#lp-pom-button-199"; //Replace this with the ID of your button. To target all buttons, replace ID with: "a[href^=#]"

$(':input, .lp-pom-form .lp-pom-button').focus(function(){
    $(this).addClass('focusGlow');
  });

  $(':input, .lp-pom-form .lp-pom-button').blur(function(){
    $(this).removeClass('focusGlow');
  });

if (focusOnLoad){
    $('input:not([type=hidden]):first').focus().addClass('focusGlow');
}

lp.jQuery(function($) {

  // The speed of the scroll in milliseconds
  var speed = 1000;

  // Find links that are #anchors and scroll to them
  $(scrollButton)
    .not('.lp-pom-form .lp-pom-button')
    .unbind('click.smoothScroll')
    .bind('click.smoothScroll', function(event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top }, speed, function(){
        $('input:not([type=hidden]):first').focus().addClass('focusGlow').select();
      });
    });
});
