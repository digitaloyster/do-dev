//QUESTION: Snapchat?

(function(win, doc, sdk_url){
if(win.snaptr) return;
var tr=win.snaptr=function(){
tr.handleRequest? tr.handleRequest.apply(tr, arguments):tr.queue.push(arguments);
};
tr.queue = [];
var s='script';
var new_script_section=doc.createElement(s);
new_script_section.async=!0;
new_script_section.src=sdk_url;
var insert_pos=doc.getElementsByTagName(s)[0];
insert_pos.parentNode.insertBefore(new_script_section, insert_pos);
})(window, document, 'https://sc-static.net/scevent.min.js');

snaptr('init','7b38ad8f-2402-4abe-9090-2cbfd3253258',{
'user_email':'<USER-EMAIL>'
})
snaptr('track','PAGE_VIEW')
