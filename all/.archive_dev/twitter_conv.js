//TY BD

//Twitter conversion
if (typeof document.cdnParameters !== "undefined") {
  if (document.cdnParameters.TW_lead_ids != '') {
    $.getScript('//platform.twitter.com/oct.js');
    var idstring = document.cdnParameters.TW_lead_ids;
    var ids = idstring.split(',');
    for (i in ids) {
      twttr.conversion.trackPid(ids[i], { tw_sale_amount: 0, tw_order_quantity: 0 });
    }
  }
}
//Twitter conversion
