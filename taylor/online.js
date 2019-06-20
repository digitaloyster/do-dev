// Variables
  /*var $submit = $('#lp-pom-button-1231');
  var submit_text = $submit.find('span').html();*/

  //Functions
  /*function setCookie(ref) {
    var d = new Date();
    var setTime = new Date();
    //setTime.setTime(setTime.getTime());
    d.setTime(d.getTime() + (30*60*1000));
    var expires = "expires="+ d.toUTCString();
    //var timeout = "timeout="+ setTime.getTime();
    var timeout = "timeout="+ Math.round((new Date()).getTime() / 1000);
    document.cookie = "reference=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "reference=" + ref + ";"+expires + ";path=/";
    document.cookie = timeout+";"+expires + ";path=/";
    //console.log("setCookie");
}*/

  /*function multiLender() {
    return $('input[name="multilender"]:checked').map(function(){
      return $(this).val();
    }).get().join(',');
}*/

  function checkValid() {
    $submit.unbind("click");
    $submit.find('span').html('<strong>Please wait...</strong>');
    var event = new Event('checkValid');
    document.dispatchEvent(event);
  }

  function resetSubmit() {
    $submit.on("click", checkValid);
    document.addEventListener("Validated", submitHandle);
    $submit.find('span').html(submit_text);
  }

  function submitHandle() {

    var formData = new FormData();
    var $fields  = $(':input').not('[type="file"], [type="button"], button');
    $fields.each(function(i, val) {
      var name = $(val).attr('name');
      var value = $(val).val();
      formData.append(name, value);
    });
    formData.append("lenders", multiLender());
    console.log(formData);
    $.ajax({
      type: "post",
      //url: "https://digitaloyster.co.uk/dev/sigform_taylor/API-Stage-1.php",
      url: "https://digitaloyster.co.uk/dev/sigform_taylor/test_page.php",
      data: formData,
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      crossDomain : true
    })
    .done(function( data ) {
      if (data == "email exists") {
        alert("Thank you, We have received your application.");
        console.log(data);
      } else {
        console.log("Ajax Done");
        console.log(data);
        $('#reference').val(data);
        setCookie(data);
        //alert("Submitted");
        lp.jQuery('form', '.lp-pom-form').submit();
      }
    })
    .fail(function() {
      var d = new Date();
      var message = "Fail: " + $('#ckm_request_id').val() +" - "+ d.toUTCString();
      $.get( "https://digitaloyster.co.uk/dev/sigform/error_logging.php", { msg: message} );
      $submit.on("click", submitHandle);
      $submit.find('span').html(submit_text);
      alert( "ajax error" );
    });
  }

  /*$( document ).ready(function() {
    $submit.on("click", checkValid);

    document.addEventListener("Validated", submitHandle);
    document.addEventListener("inValidated", resetSubmit);
    $('input').bind('keypress', function(e) {
      if(e.keyCode == 13) {
        e.preventDefault();
        return false;
      }
    });
});*/
