//set up input styling
 var newStyle;
 getInputStyle();

 //Use the setType function to update the input type. First parameter is input name, second is the input type.
 setType("email_address","email");
 setType("telephone","tel");


 function getInputStyle(){
   var formId = '#'+$('.lp-pom-form').attr("id");
   var styleClass1 = '.lp-pom-form-field input[type="text"]';
   var styleClass2 = ".lp-pom-form-field input.text";
   var legacyStyle = 'position: absolute; left: 0; margin-bottom: 12px;';
   //Get basic field styling
   var stylesheet = document.styleSheets[0];
   newStyle = "";
   for(var i=0;i<stylesheet.cssRules.length;i++){
     if(stylesheet.cssRules[i].selectorText == formId+" "+styleClass1){
       newStyle += document.styleSheets[0].cssRules[i].style.cssText;
     }
     if(stylesheet.cssRules[i].selectorText == formId+" "+styleClass2){
       newStyle += document.styleSheets[0].cssRules[i].style.cssText;
     }
   }
   newStyle += legacyStyle;
 }
 function setType(id, newType){
   if(document.getElementById(id)){
     document.getElementById(id).type = newType;
     document.getElementById(id).style.cssText = newStyle;
   }else{
     console.log("ID not found");
   }
 }
