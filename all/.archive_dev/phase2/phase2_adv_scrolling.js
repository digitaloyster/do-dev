// ADV BB
// Fixed Header v1.

var boxToAppend = document.cdnParameters.scrolling_banner_box_id;
if (boxToAppend != '') {
  var boxParent = $(boxToAppend).parent();
  $(boxToAppend).css({"position":"fixed", "left":"auto", "top":"200 px", "width":"280px", "z-index":"999", "border-style":"none none none none", "border-width":"0px", "background":"none"});
}
