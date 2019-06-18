// Example of the Inline Errors from Unbounce.


function clearErrors() {
  var e = document.querySelectorAll(".errorSpan");
  if (e.length > 0)
    for (t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t]);
  for (t = 0; t < textInputs.length; t++) textInputs[t].classList.remove("hasError");
  for (var t = 0; t < dropdowns.length; t++) dropdowns[t].classList.remove("hasError")
}

function gaForm(e) {
  var t, r, o;
  if (e.preventDefault(), e.stopPropagation(), r = lp.jQuery(e.currentTarget).closest(".lp-pom-form"), (t = r.children("form")).valid()) return "undefined" != typeof eventTracker && eventTracker._isGaLoaded() ? (o = lp.jQuery.extend({
    category: "Form",
    action: "Submit",
    label: "#" + r.attr("id")
  }, r.data("ubGAParams")), eventTracker._logEvent(o), ga("send", "event", o.category, o.action, o.label, {
    hitCallback: function() {
      return t.submit()
    }
  })) : t.submit()
}

function yourSubmitFunction(e, t) {
  e.preventDefault(), lp.jQuery(".lp-pom-form form").validate().form() ? (gaForm(e), lp.jQuery(".lp-pom-form form").submit()) : (clearErrors(), validateForm())
}
var errorSpan = document.createElement("span");
errorSpan.classList.add("hide"), errorSpan.classList.add("errorSpan");
for (var textInputs = document.querySelectorAll("input[type=text], textarea"), optionList = document.querySelectorAll("input[type=checkbox], input[type=radio]"), dropdowns = document.querySelectorAll("select"), focusField, validateField = function() {
    var e = !0;
    lp.jQuery(".lp-pom-form form").validate().form();
    for (var t, r, o = focusField.id, n = lp.jQuery(".lp-pom-form form").validate().errorList, i = 0; i < n.length; i++) o == n[i].element.id && (e = !1, t = n[i].element.parentNode.id, "checkbox" != n[i].element.type && "radio" != n[i].element.type || (t = document.getElementById(fieldId).parentNode.parentNode.parentNode.id), r = n[i].message);
    clearError(focusField), e || showError(o, t, r)
  }, validateForm = function() {
    lp.jQuery(".lp-pom-form form").validate().form();
    for (var e = lp.jQuery(".lp-pom-form form").validate().errorList, t = 0; t < e.length; t++) {
      var r = e[t].element.id,
        o = e[t].element.parentNode.id;
      "checkbox" != e[t].element.type && "radio" != e[t].element.type || (o = document.getElementById(r).parentNode.parentNode.parentNode.id);
      var n = e[t].message;
      showError(r, o, n)
    }
  }, showError = function(e, t, r) {
    var o = errorSpan.cloneNode(!0);
    o.textContent = r, o.classList.remove("hide"), document.getElementById(t).appendChild(o), document.getElementById(e).classList.add("hasError")
  }, clearError = function(e) {
    var t = e.parentNode.id;
    "checkbox" != e.type && "radio" != e.type || (t = e.parentNode.parentNode.parentNode.id);
    var r = document.getElementById(t).querySelector(".errorSpan");
    r && r.parentNode.removeChild(r), e.classList.remove("hasError")
  }, i = 0; i < textInputs.length; i++) textInputs[i].addEventListener("blur", function() {
  validateField()
});
for (var i = 0; i < textInputs.length; i++) textInputs[i].addEventListener("focus", function() {
  focusField = this
});
for (var i = 0; i < optionList.length; i++) optionList[i].addEventListener("click", function() {
  focusField = this
});
for (var i = 0; i < dropdowns.length; i++) dropdowns[i].addEventListener("click", function() {
  focusField = this
});
for (var i = 0; i < optionList.length; i++) optionList[i].addEventListener("change", function() {
  validateField()
});
for (var i = 0; i < dropdowns.length; i++) dropdowns[i].addEventListener("change", function() {
  validateField()
});
lp.jQuery(function(e) {
  e(".lp-pom-form .lp-pom-button").unbind("click tap touchstart").bind("click.formSubmit", function(t) {
    yourSubmitFunction(t, e)
  }), e("form").unbind("keypress").bind("keypress.formSubmit", function(t) {
    13 === t.which && "textarea" !== t.target.nodeName.toLowerCase() && yourSubmitFunction(t, e)
  })
});
/**
 * Do not remove this section; it allows our team to troubleshoot and track feature adoption.
 * TS:0002-03-080
 */
