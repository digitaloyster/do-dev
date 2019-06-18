// Adv BB
function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function(){
	// replace URL
  $('a:not(#link-no-replace, #ubpoverlay-close,'+document.cdnParameters.adv_not_replace_url_on+' )').attr('href',document.cdnParameters.adv_replace_urls_to+'?ckm_request_id='+getParameterByName('ckm_request_id')+'&aff='+getParameterByName('aff'));
	$("area").attr("href", document.cdnParameters.adv_replace_urls_to+'?ckm_request_id='+getParameterByName('ckm_request_id')+'&aff='+getParameterByName('aff'));
  // Adv pixel

  var image = new Image(1,1);
  image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_adv_event_id+"&f=img&r=" + getParameterByName('ckm_request_id') + '&t='+document.cdnParameters.adv_tracking_prefix+'-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;

  // 10sec pixel
  setTimeout(function(){
    var image = new Image(1,1);
    image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_10s_event_id+"&f=img&r=" + getParameterByName('ckm_request_id');
	},10000);

  (function setURLRef(lpURL) {
    var separator = '&';
    var urls = $('[href^="' + lpURL + '"]');

    $.each(urls, function(i, val) {
      i++;
      var href = $(val).attr('href');
      href += separator + 'link_click=' + i;
      $(val).attr('href', href);
    });
  })(document.cdnParameters.adv_replace_urls_to);
});
