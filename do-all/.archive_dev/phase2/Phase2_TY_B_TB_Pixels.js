//TY Head

//Taboola Pixels
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.TB_pixel_ids != '') {
    var idstring = document.cdnParameters.TB_pixel_ids;
    if (idstring != '') {
      var ids = idstring.split(',');
      for (i in ids) {
        _tfa.push({notify: 'event', name: 'lead', id: ids[i]});
      }
    }
  }
}
//Taboola Pixels
