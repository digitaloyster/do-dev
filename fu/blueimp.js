var cdn_array = ['JavaScript-Load-Image/js/load-image.all.min.js'
				,'JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js'
				,'jQuery-File-Upload/js/vendor/jquery.ui.widget.js'
				,'jQuery-File-Upload/js/jquery.iframe-transport.js'
				,'jQuery-File-Upload/js/jquery.fileupload.js'
				,'jQuery-File-Upload/js/jquery.fileupload-process.js'
				,'jQuery-File-Upload/js/jquery.fileupload-image.js'
		 		,'do-live/fu/bb_file.js'
				,'JavaScript-Load-Image/js/load-image.js'
				,'JavaScript-Load-Image/js/load-image-scale.js'
				,'JavaScript-Load-Image/js/load-image-orientation.js'
				,'JavaScript-Load-Image/js/load-image-meta.js'
				,'JavaScript-Load-Image/js/load-image-iptc.js'
				,'JavaScript-Load-Image/js/load-image-iptc-map.js'
				,'JavaScript-Load-Image/js/load-image-fetch.js'
				,'JavaScript-Load-Image/js/load-image-exif.js'
				,'JavaScript-Load-Image/js/load-image-exif-map.js'];

function createScriptTag() {
  // gets the first script in the list
  let script = cdn_array.shift();
  if (!script) return;
  script = 'https://cdn.jsdelivr.net/gh/digitaloyster/' + script;
  //script = 'https://digitaloyster.github.io/' + script;
  // all scripts were loaded
  let js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = script;
  js.onload = (event) => {
    createScriptTag();
  };
  document.head.appendChild(js);
}

document.onload = createScriptTag();