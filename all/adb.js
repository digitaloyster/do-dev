// All Advertorials Before Body CDN-v1.1

// Link Builder (Doc Ready)
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
    if (document.cdnParameters.adv_replace_urls_to != '' && typeof document.cdnParameters.adv_replace_urls_to !== 'undefined' && document.cdnParameters.adv_not_replace_url_on != '' && typeof document.cdnParameters.adv_not_replace_url_on !== 'undefined') { //REVIEW: Add check for adv_not_replace_url_on
      var url = document.cdnParameters.adv_replace_urls_to;
      if (url.indexOf('?') !== -1) {
          url += '&ckm_request_id='+getParameterByName('ckm_request_id')+'&aff='+getParameterByName('aff');
      } else {
          url += '?ckm_request_id='+getParameterByName('ckm_request_id')+'&aff='+getParameterByName('aff');
      }
      $('a:not(#link-no-replace, #ubpoverlay-close,'+document.cdnParameters.adv_not_replace_url_on+' )').attr('href', url);
	    $("area").attr("href", url);
    }
  // replace URL 

  // ADV Replace URLS
    if (document.cdnParameters.adv_replace_urls_to != '' && typeof document.cdnParameters.adv_replace_urls_to !== 'undefined') {
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
    }
  // ADV Replace URLS

  // Adv pixel
    if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && document.cdnParameters.cake_adv_event_id != '' && typeof document.cdnParameters.cake_adv_event_id !== 'undefined' && document.cdnParameters.adv_tracking_prefix != ''  && typeof document.cdnParameters.adv_tracking_prefix !== 'undefined'  ) { //REVIEW: Add check for cake_offer_id AND cake_adv_event_id AND adv_tracking_prefix
      var image = new Image(1,1);
      image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_adv_event_id+"&f=img&r=" + getParameterByName('ckm_request_id') + '&t='+document.cdnParameters.adv_tracking_prefix+'-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
    }
  // Adv Pixel

  // 10sec pixel
    if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && document.cdnParameters.cake_10s_event_id != '' && typeof document.cdnParameters.cake_10s_event_id !== 'undefined') { //REVIEW: Add check for cake_offer_id AND cake_10s_event_id
      setTimeout(function(){
        var image = new Image(1,1);
        image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_10s_event_id+"&f=img&r=" + getParameterByName('ckm_request_id');
	    },10000);
    }
  // 10sec pixel




  // Fixed Header v1.
    if (document.cdnParameters.scrolling_banner_box_id != '' && typeof document.cdnParameters.scrolling_banner_box_id !== 'undefined') {
      var boxToAppend = document.cdnParameters.scrolling_banner_box_id;
      if (boxToAppend != '') {
        var boxParent = $(boxToAppend).parent();
        $(boxToAppend).css({"position":"fixed", "left":"auto", "top":"200 px", "width":"280px", "z-index":"999", "border-style":"none none none none", "border-width":"0px", "background":"none"});
      }
    }
  // Fixed Header v1.

  // Taboola Widgets
    if (document.cdnParameters.TB_widget == "Y" && typeof document.cdnParameters.TB_widget !== 'undefined') {
      window._taboola = window._taboola || [];
      _taboola.push({flush: true});
    }
  // Taboola Widgets
});
