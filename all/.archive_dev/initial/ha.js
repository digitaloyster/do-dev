$(document).ready(function () {
    showhideFields();
    $("#postcode").change(function () {
        showhideFields();
    });

});
//this toggles th visibility of our company field based on our Income field value
function showhideFields() {
    if ($("#postcode").val() == "" )
        $("#container_add1").hide(),
        $("#container_add2").hide(),
        $("#container_add3").hide(),
        $("#container_add4").hide();
    else
        $("#container_add1").show(),
        $("#container_add2").show(),
        $("#container_add3").show(),
        $("#container_add4").show();
}
