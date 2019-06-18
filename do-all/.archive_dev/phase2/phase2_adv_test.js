var idstring = document.cdnParameters.FB_pixel_ids;
var ids = idstring.split(',');
for (i in ids) {
  console.log(i+":"+ids[i]);
}
