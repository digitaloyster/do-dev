// LP BB
/*
cake_offer_id: "792",
cake_lp_event_id: "248",
lp_tracking_prefix: "B",
*/
//DONE: Need to refactor GetParameters with hide elements.
/*function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}*/




//LP Pixel
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


$(document).ready(function(){
  if (typeof document.cdnParameters.cake_offer_id !== "undefined") {
    if (document.cdnParameters.cake_offer_id == "Y") {
      var image = new Image(1,1);
      image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_lp_event_id+"&f=img&r=" + getUrlParameter('ckm_request_id') + '&t='+document.cdnParameters.lp_tracking_prefix+'_'+ window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight + '|' + getUrlParameter('link_click');
    }
  }
});
