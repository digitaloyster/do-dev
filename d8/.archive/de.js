// Global config for Data8 validation
var d8Validation = {
  apiKey: "rfnKtgZucH06_phS5t-JkikWwilhviNaHzgHQ6zD72jZMolh17opNw",
  email: {
    enabled: false,
    level: "Address",
    msg: "Email address is invalid"
  },
  phone: {
    enabled: true,
    useLineValidation: true,
    useMobileValidation: true,
    defaultCountryCode: 44,
    msg: "Please enter a valid telephone number."
  }
};

// Runs on form submission
function startData8Validation(e, $) {
  e.preventDefault();

  // Build an array of validation callbacks
  var promises = [];

  // Find the form and all the phone & email fields in it
  var form = lp.jQuery('.lp-pom-form form');

  if (d8Validation.phone.enabled) {
    var phoneFields = lp.jQuery('input[type=tel]', form);

    phoneFields.each(function(idx, el) {
      promises.push(validatePhoneAsync(el).then(reportValidationResult));
    });
  }

  if (d8Validation.email.enabled) {
    var emailFields = lp.jQuery('input[type=email]', form);

    emailFields.each(function(idx, el) {
      promises.push(validateEmailAsync(el).then(reportValidationResult));
    });
  }

  // Wait for all the callbacks to complete. If the form is then valid, submit it
  Promise.all(promises).then(function(values) {
    var event = new Event('doErrors');
    document.dispatchEvent(event);
    if (form.valid())
      form.submit();
  });
}

function validateEmailAsync(field, valid) {
  return new Promise(function(resolve, reject) {
    var params = {
      email: field.value,
      level: d8Validation.email.level
    }

    var req = new XMLHttpRequest();
    req.open("POST", "https://webservices.data-8.co.uk/EmailValidation/IsValid.json?key=" + d8Validation.apiKey);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function() {
      if (this.readyState === 4) {
        req.onreadystatechange = null;

        if (this.status === 200) {

          var result = JSON.parse(this.response);
          if (!result.Status.Success)
            resolve({
              field: field,
              valid: true
            });
          else if (result.Result !== "Invalid")
            resolve({
              field: field,
              valid: true
            });
          else
            resolve({
              field: field,
              valid: false,
              msg: d8Validation.email.msg
            });
        } else {
          resolve({
            field: field,
            valid: true
          });
        }
      }
    };

    req.send(window.JSON.stringify(params));
  });
}

function validatePhoneAsync(field, valid) {
  return new Promise(function(resolve, reject) {
    var params = {
      telephoneNumber: field.value,
      defaultCountry: d8Validation.phone.defaultCountryCode,
      options: {
        UseLineValidation: d8Validation.phone.useLineValidation,
        UseMobileValidation: d8Validation.phone.useMobileValidation
      }
    }

    var req = new XMLHttpRequest();
    req.open("POST", "https://webservices.data-8.co.uk/InternationalTelephoneValidation/IsValid.json?key=" + d8Validation.apiKey);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function() {
      if (this.readyState === 4) {
        req.onreadystatechange = null;

        if (this.status === 200) {
          var result = JSON.parse(this.response);
          if (!result.Status.Success) {
            resolve({
              field: field,
              valid: true
            });
          } else if (result.Result.ValidationResult !== "Invalid") {
            resolve({
              field: field,
              valid: true
            });
          } else {
            resolve({
              field: field,
              valid: false,
              msg: d8Validation.phone.msg
            });
          }
        } else {
          resolve({
            field: field,
            valid: true
          });
        }
      }
    };
    req.send(window.JSON.stringify(params));
  });
}

function reportValidationResult(result) {
  if (result.valid) {
    result.field.setCustomValidity("");
  } else {
    result.field.setCustomValidity(result.msg);
  }

  return result;
}

// Waits until window load to initialize
lp.jQuery(window).load(function() {
  lp.jQuery(function($) {
    //$('#telephone').removeAttr('pattern');
    //document.getElementById('telephone').type = "tel";

    //$('input[type=tel]').bind('change', function(e) {
    //  setTimeout(function() {
    //    startData8Validation(e, $);
    //  }, 500);
    //});

    $('.lp-pom-form .lp-pom-button').unbind('click tap touchstart').bind('click.formSubmit tap.formSubmit touchstart.formSubmit', function(e) {
      startData8Validation(e, $);
    });
    $('form').unbind('keypress').bind('keypress.formSubmit', function(e) {
      if (e.which === 13 && e.target.nodeName.toLowerCase() !== 'textarea')
        startData8Validation(e, $);
    });
  });
});
