// All Landing Pages Before Body CDN-v1.0

// Functions
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

// Show/Hide Address fields
function showhideFields() {
  if ($("#postcode").val() == "" ) {
    $("#container_add1").hide();
    $("#container_add2").hide();
    $("#container_add3").hide();
    $("#container_add4").hide();
  } else {
    $("#container_add1").show();
    $("#container_add2").show();
    $("#container_add3").show();
    $("#container_add4").show();
  }
}
// Show/Hide Address fields

// Functions

$( document ).ready(function() {
  // Add submit class to submit buttons
  $('form + .lp-pom-button').addClass('submit');
  // Add submit class to submit buttons

  // Taboola Remove Elements
  if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.hide_elements != '') {
      var idstring = document.cdnParameters.hide_elements;
      var affString = document.cdnParameters.hide_elements_affs;
      var aff = affString.split(',');
      if (affString != '') {
        for (j in aff) {
          if (getUrlParameter('aff') == aff[j]) {
            if (idstring != '') {
              var ids = idstring.split(',');
              for (i in ids) {
                $(ids[i]).remove();
              }
            }
          }
        }
      }
    }
  }
  // Taboola Remove Elements

  // Smooth Scroll
  if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.smooth_scroll == "Y") {
      // The speed of the scroll in milliseconds
      var speed = 1000;
      // Find links that are #anchors and scroll to them
      $('a[href^=\\#]').not('.lp-pom-form .lp-pom-button').unbind('click.smoothScroll').bind('click.smoothScroll', function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top }, speed);
      });
    }
  }
  // Smooth Scroll

  //LP Pixel
  if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.cake_offer_id != '') {
      var image = new Image(1,1);
      image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_lp_event_id+"&f=img&r=" + getUrlParameter('ckm_request_id') + '&t='+document.cdnParameters.lp_tracking_prefix+'-'+ window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight + '|' + getUrlParameter('link_click');
    }
  }
  //LP Pixel

  //Glow
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
  //Glow

  //PCA
  if (typeof document.cdnParameters.postcode_autocomplete !== "undefined") {
    if (document.cdnParameters.postcode_autocomplete == "Y") {
      showhideFields();
      $("#postcode").change(function () {
        showhideFields();
      });
    }
  }
  //PCA
});
