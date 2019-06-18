//LP Head

//Taboola Pixels
var idstring = document.cdnParameters.TB_pixel_id;
if (idstring != '') {
  var ids = idstring.split(',');
  for (i in ids) {
    _tfa.push({notify: 'event', name: 'lead', id: ids[i]});
   }
 }
