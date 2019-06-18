function removeElementsByClass(className, element){
    var elements = element.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function doErrors(form) {
  	var invalidFields = form.querySelectorAll(":invalid"),
    	errorMessages = form.querySelectorAll(".error-message"),
    	parent;

  		// Remove any existing messages
  		for (var i = 0; i < errorMessages.length; i++) {
    		errorMessages[i].parentNode.removeChild(errorMessages[i]);
  		}

  		for (var i = 0; i < invalidFields.length; i++) {
    		var field = invalidFields[i];
    		if (field.nodeName == "SELECT") {
      			parent = invalidFields[i].parentNode;
              	if (!parent.querySelectorAll(".error-message").length) {
      				invalidFields[i].insertAdjacentHTML("beforebegin", "<div class='error-message'>" +
        				invalidFields[i].validationMessage +
        				"</div>");
    			}
    		} else {
          // TODO: Sort out this attributes section... not sure why it's looping for attributes.
      			for (j = 0; j < field.attributes.length; j++) {
        			if (field.attributes[j].name == "type") {
          				if (field.attributes[j].value == "radio" || field.attributes[j].value == "checkbox") {
                          	//console.log("Test");
                      		parent = invalidFields[i].parentNode.parentNode.parentNode;
                          	if (!parent.querySelectorAll(".error-message").length) {
      							invalidFields[i].parentNode.parentNode.insertAdjacentHTML("afterend", "<div class='error-message'>" +
        							invalidFields[i].validationMessage +
        							"</div>");
                            }
    					} else {
                          	parent = invalidFields[i].parentNode;
                          	if (!parent.querySelectorAll(".error-message").length) {
      							invalidFields[i].insertAdjacentHTML("beforebegin", "<div class='error-message'>" +
	        						invalidFields[i].validationMessage +
			        				"</div>");
    						}
                        }
        			}
      			}
    		}
  		}

  	// If there are errors, give focus to the first invalid field
  	if (invalidFields.length > 0) {
    	invalidFields[0].focus();
  	}
}

function doError(id) {
  	//console.log("doError");
  	var container = document.getElementById('container_'+id);
  	var field = container.querySelector(':invalid');
  	var parent = "";
  	if (field == null) {
     	var element = container.getElementsByClassName('error-message');
      	if (element.length) removeElementsByClass('error-message', container)
    } else {
      if (field.nodeName == "SELECT") {
          parent = field.parentNode;
          if (!parent.querySelectorAll(".error-message").length) {
              field.insertAdjacentHTML("beforebegin", "<div class='error-message'>" +
                  field.validationMessage +
                  "</div>");
          }
      } else {
          for (j = 0; j < field.attributes.length; j++) {
              if (field.attributes[j].name == "type") {
                  if (field.attributes[j].value == "radio" || field.attributes[j].value == "checkbox") {
                      parent = field.parentNode.parentNode.parentNode;
                      if (!parent.querySelectorAll(".error-message").length) {
                          field.parentNode.parentNode.insertAdjacentHTML("afterend", "<div class='error-message'>" +
                              field.validationMessage +
                              "</div>");
                      }
                  } else {
                      parent = field.parentNode;
                      if (!parent.querySelectorAll(".error-message").length) {
                          field.insertAdjacentHTML("beforebegin", "<div class='error-message'>" +
                              field.validationMessage +
                              "</div>");
                      }
                  }
              }
          }
      }
	}
}


function replaceValidationUI(form) {
	// Suppress the default bubbles
  	form.addEventListener("invalid", function(event) {
    	event.preventDefault();
  	}, true);

  	// Support Safari, iOS Safari, and the Android browser—each of which do not prevent
  	// form submissions by default
  	form.addEventListener("submit", function(event) {
    	if (!this.checkValidity()) {
      		//console.log("prevented");
      		event.preventDefault();
    	}
  	});

  	form.addEventListener("change", function(event) {
  		//doErrors(form);
  	});

  	document.addEventListener("doErrors", function(event) {
    	doErrors(form);
  	});
  	document.addEventListener("doError", function(event) {
      	//console.log(event);
    	doError(event.detail.id);
  	});
}

// Replace the validation UI for all forms
var forms = document.querySelectorAll("form");
for (var i = 0; i < forms.length; i++) {
	replaceValidationUI(forms[i]);
}
