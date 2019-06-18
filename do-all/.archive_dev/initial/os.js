// Add OS Type as class to body. CDN-v1.0
var OSName="unknown";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="macos";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="unix";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
document.body.className += ' ' + OSName;
