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
  if (typeof document.cdnParameters !== 'undefined') {
    if (document.cdnParameters.adv_replace_urls_to != '') {
      $('a:not(#link-no-replace, #ubpoverlay-close,'+document.cdnParameters.adv_not_replace_url_on+' )').attr('href',document.cdnParameters.adv_replace_urls_to+'?ckm_request_id='+getParameterByName('ckm_request_id')+'&aff='+getParameterByName('aff'));
	    $("area").attr("href", document.cdnParameters.adv_replace_urls_to+'?ckm_request_id='+getParameterByName('ckm_request_id')+'&aff='+getParameterByName('aff'));
    }
  }
  // replace URL

  // Adv pixel
  if (typeof document.cdnParameters !== 'undefined') {
    if (document.cdnParameters.cake_offer_id != '') {
      var image = new Image(1,1);
      image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_adv_event_id+"&f=img&r=" + getParameterByName('ckm_request_id') + '&t='+document.cdnParameters.adv_tracking_prefix+'-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
    }
  }
  // Adv Pixel

  // 10sec pixel
  if (typeof document.cdnParameters !== 'undefined') {
    if (document.cdnParameters.cake_offer_id != '') {
      setTimeout(function(){
        var image = new Image(1,1);
        image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e="+document.cdnParameters.cake_10s_event_id+"&f=img&r=" + getParameterByName('ckm_request_id');
	    },10000);
    }
  }
  // 10sec pixel

  // ADV Replace URLS
  if (typeof document.cdnParameters !== 'undefined') {
    if (document.cdnParameters.adv_replace_urls_to != '') {
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
  }
  // ADV Replace URLS


  // Fixed Header v1.
  if (typeof document.cdnParameters !== 'undefined') {
    if (document.cdnParameters.scrolling_banner_box_id != '') {
      var boxToAppend = document.cdnParameters.scrolling_banner_box_id;
      if (boxToAppend != '') {
        var boxParent = $(boxToAppend).parent();
        $(boxToAppend).css({"position":"fixed", "left":"auto", "top":"200 px", "width":"280px", "z-index":"999", "border-style":"none none none none", "border-width":"0px", "background":"none"});
      }
    }
  }
  // Fixed Header v1.

  // Taboola Widgets
  if (typeof document.cdnParameters !== 'undefined') {
    if (document.cdnParameters.TB_widget == "Y") {
      window._taboola = window._taboola || [];
      _taboola.push({flush: true});
    }
  }
  // Taboola Widgets
});
