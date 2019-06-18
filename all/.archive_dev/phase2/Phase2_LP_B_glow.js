//LP BB


//Glow
$(document).ready(function () {
  var focusOnLoad = true; //By default, first form field is focused automatically on page load. Change this value to 'False' to disable this.
  $(':input, .lp-pom-form .lp-pom-button').focus(function(){
    $(this).addClass('focusGlow');
  });

  $(':input, .lp-pom-form .lp-pom-button').blur(function(){
    $(this).removeClass('focusGlow');
  });

  if (focusOnLoad){
    $('input:not([type=hidden]):first').focus().addClass('focusGlow');
  }
});
