//LP BB

// Taboola Remove Elements
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


$( document ).ready(function() {
  if (typeof document.cdnParameters.hide_elements !== "undefined") {
    var idstring = document.cdnParameters.hide_elements;
    var affString = document.cdnParameters.hide_elements_affs;
    var affs = affString.split(',');
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
});
