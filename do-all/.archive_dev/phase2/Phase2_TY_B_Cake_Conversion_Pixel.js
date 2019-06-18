//TY BB

// Cake Conversion Pixel
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.cake_offer_id != '') {
    setTimeout(function(){
      var image = new Image(1,1);
      image.src = "https://digitaloyster.jrnytag.com/p.ashx?o="+document.cdnParameters.cake_offer_id+"&e=ld&t="+document.cdnParameters.ty_tracking_prefix+"_"+window.ub.page.variantId;
    },4000);
  }
}
// Cake Conversion Pixel
