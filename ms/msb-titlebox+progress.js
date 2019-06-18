$(document).ready(function() {
  // XXX: Variables/Objects
  if (document.cdnMultiStep.debugMode) var d = true;
  else var d = false;

  if (document.cdnMultiStep.steps != '' ) { var steps = document.cdnMultiStep.steps; }
  else alert('steps not found');
  //var buttons = document.cdnMultiStep.buttons;
  if (document.cdnMultiStep.settings != '' ) { var settings = document.cdnMultiStep.settings; }
  else alert('settings not found');

  if (document.cdnMultiStep.hooks != '' ) { var hooks = document.cdnMultiStep.hooks; }
  else alert('hooks not found');

  // Variables/Objects
  /*--------------------------------------------------------------------------*/
  // XXX: Functions
  // Initialise Step Structre
  var initialise = function() {
    hooks.call('hookPreInit',[]); // Hook

    $.each(steps, function(i, val) {
      var page = [];
      $.each(steps[i].fields, function(k, val) { page.push("#container_"+k); });
      if (objSize(page)==0) $('#step-'+(i-1)).after('<div id="step-' + i + '" data-id="' + i + '" class="step"></div>');
      else $(page.join(',')).wrapAll('<div id="step-' + i + '" data-id="' + i + '" class="step"></div>');
    });
    //Progressbar

    if ("progressBar" in settings && settings.progressBar != "") {
      $('#'+settings.progressBar).html('<div class="progress-wrap progress" data-progress-percent="0"><div class="progress-bar progress"></div></div>');
    }


    // Add custom aspects
    $.each(steps, function(i, val) {
      if ("fields" in steps[i] && steps[i].fields != '') {
        $.each(steps[i].fields, function(k, val){
          // Buttons
          if ("display" in val && val.display == "buttons") {
            if (!$('#'+k).length) {
              $("[name='"+k+"']").parent().addClass('select-button');
              if ( objSize(steps[i].fields) == 1 ) {
                $("[name='"+k+"']").parent().addClass('single-field');
                $("[name='"+k+"']").bind('change', function() {
                  $("#container_"+k+" .selected").removeClass('selected');
                  var $update = $(this).parent('div');
                  $update.addClass('selected');
                  nextStep();
                });
              }
            }
          }
          // DONE: Test Custom Error events
          if ("error" in val && val.error != '') {
            if ($('#'+i).length) {
              document.getElementById(k).setAttribute("oninvalid", "this.setCustomValidity('"+val.error+"');")
              document.getElementById(k).setAttribute("onchange","this.setCustomValidity('');");
            } else if ($('[name="'+k+'"]').length) {
              document.getElementsByName(k).forEach(function(value,key,map) {
                value.setAttribute("oninvalid", "this.setCustomValidity('"+val.error+"');");
                value.setAttribute("onchange","this.setCustomValidity('');");
              });
            }
          }

          if ("numeric" in val && val.numeric == "Y") {
            var field = document.getElementById(id);
            field.type = "number";
            field.setAttribute('onkeyup', 'return isNumberKey(event)');
          }

      });
      }
    });

    var styles = document.createElement('link');
    styles.setAttribute('href','https://cdn.jsdelivr.net/gh/digitaloyster/do-ms@latest/msb.js');
    styles.setAttribute('rel','stylesheet');
    styles.setAttribute('type','text/css');
    document.head.appendChild(styles);

    hooks.call('hookPageInit',[]); // HOOK
  }

  // D8 Validation
  var d8Validate = function() {
    if (d) console.log("d8Validate()");
    document.getElementById('telephone').setCustomValidity("Please enter a valid telephone number.");
    var event = new Event('d8Validate');
    document.dispatchEvent(event);
  }

  // Validate current page
  var isValid = function(step) {
    var valid = true;
    var event = new Event('doErrors');
    $.each(steps[step].fields, function(i,v) {

      i = i.trim();
      // NOTE: Potentially need a hook for custom validation here. Post i and return true/false.
      if ((i=="add1" || i=="postcode") && $("#"+i).val() != '') {
        if (d) console.log("setting add1/PC");
        var poke = new Event('change', { bubbles: true });
        document.getElementById(i).dispatchEvent(poke);
        document.getElementById(i).validity['valid'];
      }
      if ($('#'+i).length && !document.getElementById(i).checkValidity()) {
        valid = false;
        if (d) console.log("failed");
      } else if ($('[name="'+i+'"]').length) {
        var ele = document.getElementsByName(i);
        if (!ele[0].checkValidity()) {
          valid = false;
          if (d) console.log("failed");
        }
      }
    });

    if (!valid) document.dispatchEvent(event);
    return valid;
  };

  // Clear all error messages
  var clearErrors = function() {
    $('.error-message').remove();
  };

  // Get all Elements
  var getElements = function() {
      // TODO: Need contingency for blank/non-existant field
      var allElements = [];
      $.each(steps, function(index, value) {
        if ("elements" in steps[index] && steps[index].elements != "") {
          var elements = steps[index].elements.split(',');
          $.each(elements, function(ind, val) { allElements.push('#'+val.trim());})
        }
      });
      return allElements.join();
    };

  // Show current pages elements
  var showElements = function(step) {
    // XXX: Need contingency for blank/non-existant field
    // XXX: Need contingency for no results

    $(getElements()).fadeOut(400);
    if ("elements" in steps[step] && steps[step].elements != "") {
      var elements = steps[step].elements.split(',');
      $.each(elements, function(index, value){$('#'+value.trim()).fadeIn(1000)});
    }
  };

  // titleBox Mod show titles
  var showTitles  = function(step) {
      if ("titleBox" in settings && settings.titleBox != "") {
        var titles = "<div class='titles'>";
        if ("title" in steps[step] && steps[step].title != "") {
          titles += "<span class='title'>"+steps[step].title+"</span>";
        }
        if ("showPercentage" in steps[step] && steps[step].showPercentage == "Y") {
          titles += "<span class='percentage'>";
          var progress = ((step - 1) / objSize(steps)) * 100;
          progress = Math.ceil(progress);

          titles += progress+"% complete";
          titles +="</span>";
        }
        if ("subtitle" in steps[step] && steps[step].subtitle != "") {
          titles += "<span class='subtitle'>"+steps[step].subtitle+"</span>";
        }

        titles += "</div>";
        $("#"+settings.titleBox).html(titles);
      }
  }

  //Goto specific step
  var gotoStep = function(step) {
    $('.active').removeClass('active');
    $('#step-' + step).addClass('active');
    $('body').attr('data-current-page', step);   // Add function to add class to body for moving buttons. (SetCurrent Page)
    clearErrors();
    showStep();
    showElements(step);
    showTitles(step);
    if (step!=1) refocusForm();
    if ("progressBar" in settings && settings.progressBar != "") { setProgress(); }
    hooks.call('hookNewStep',[]); //HOOK
    $('#'+settings.nextButton + ' span strong').text(steps[step].nextButtonText);
    if (step == 1) {
      $('#'+settings.prevButton).hide();
    } else {
      $('#'+settings.prevButton).show();
    }
    if (step == objSize(steps)) {
      $('#'+settings.nextButton).hide();
      $('#'+settings.submitButton).show();
    } else {
      $('#'+settings.nextButton).show();
      $('#'+settings.submitButton).hide();
    }
  };

  //Fade between steps
  var showStep = function() {
    $('fieldset > div').fadeOut(400);
    $('.active').fadeIn(1000);
  };

  //Detect and return current step
  var getStep = function() {
    return $('.active').attr('data-id');
  };

  //progressBar Mode Set the current progress
  var setProgress = function() {
      var progress = ((getStep() - 1) / objSize(steps));
      progress = Math.abs(progress);
      $('#'+settings.progressBar).data('progress-percent', progress * 100);
      var getProgressWrapWidth = $('.progress-wrap').width();
      var progressTotal = progress * getProgressWrapWidth;
      var animationLength = 500;
      $('.progress-bar').stop().animate({
        left: progressTotal
      }, animationLength);
  };


  // Utility Functions

  // Return size of object
  var objSize = function(obj) {
    return Object.keys(obj).length;
  };

  //Scroll to top of form
  var refocusForm = function() {
    $('html, body').animate({
      scrollTop: $(".lp-pom-form").parent().offset().top
    }, 500);
  };

  // Add function for limiting keyboard entry to numbers
  var isNumberKey = function(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  };

  // Utility functions

  // Functions
  /*--------------------------------------------------------------------------*/
  // XXX: Click Handlers

  // Goto prev step
  var prevStep = function() {
    refocusForm();
    if ('hookPrevCheck' in hooks.hooks && !hooks.call('hookPrevCheck',[])) return; // HOOK
    var step = getStep();
    gotoStep(--step);
  };

  // Goto next step
  var nextStep = function() {
    var step = getStep();
    if (step != 1) refocusForm();
    if ('hookNextCheck' in hooks.hooks && !hooks.call('hookNextCheck',[step])) return; // HOOK
    if (isValid(step)) {
      gotoStep(++step);
    } else console.log('validation fail going to step ' + getStep());
  };

  // Submit functions
  var submit = function() {
      if ('hookSubmit' in hooks.hooks && !hooks.call('hookSubmit',[])) return; // HOOK
      if (isValid(getStep())) {
        if (d) console.log("Submitted");
        else {
          // NOTE: Still in communication with Unbounce over the best methodology over this
          //$('.lp-pom-form form').submit();
          //var x = document.getElementsByTagName("form");
          //x[0].submit(); //form submission
          lp.jQuery('.lp-pom-form form').submit();
        }
      }
  }


  // Event Handlers
  /*--------------------------------------------------------------------------*/
  // XXX: Events
  $('#'+settings.nextButton).click(nextStep);
  $('#'+settings.prevButton).click(prevStep);
  $('#'+settings.submitButton).click(function(e) {
    console.log("submitbutton specific");
    e.preventDefault();
    if ("data8" in document.cdnParameters && document.cdnParameters.data8=="Y") d8Validate();
    else submit();
  });
  $('.select-button.single-field label').click(function() {
    console.log("single button click");
  });
  document.addEventListener("d8Complete", function() {
    if (isValid(getStep())) { submit(); }
  });

  // Custom Event listeners for page control.
  document.addEventListener("nextStep", function() {
    nextStep();
    console.log("nextStep heard");
  });
  document.addEventListener("prevStep", function() {
    prevStep();
  });

  // Prevent enter key functionality
  $(window).keydown(function(event){
  if(event.keyCode == 13 || event.keyCode == 169) {
    event.preventDefault();
    return false;
  }
});


  // Events
  /*--------------------------------------------------------------------------*/

  // Initialise
  initialise();
  gotoStep(1);
  // Initialise
});
