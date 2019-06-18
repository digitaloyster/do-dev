//LP BB
// DONE : Integrate with PCA Settings

// Show/Hide Address fields

function showhideFields() {
  if ($("#postcode").val() == "" ) {
    $("#container_add1").hide();
    $("#container_add2").hide();
    $("#container_add3").hide();
    $("#container_add4").hide();
  } else {
    $("#container_add1").show();
    $("#container_add2").show();
    $("#container_add3").show();
    $("#container_add4").show();
  }
}

$(document).ready(function () {
  if (typeof document.cdnParameters.postcode_autocomplete !== "undefined") {
    if (document.cdnParameters.postcode_autocomplete == "Y") {
      showhideFields();
      $("#postcode").change(function () {
        showhideFields();
      });
    }
  }
});
