$(function () {

  var searchContext = "",
      key = "DR57-GA39-BW92-AA78",
      searchField = "#address_search",
      postcode = "#postcode",
      add1 = "#add1",
      add2 = "#add2",
      add3 = "#add3",
      add4 = "#add4",
      add5 = "#add5",
      extraHTML = '<button id="start-search">SEARCH ADDRESS</button><br /><div id="address"></div>';
  $(searchField).after(extraHTML);
  invalidPC(false);
  $("#start-search").on("click",function(e) {
    e.preventDefault();
    invalidPC(false);
    if ($(searchField).val() != "") {
      $('#address-select').empty().remove();
      $('#address').empty();
      $.ajax({
        url: "//services.postcodeanywhere.co.uk/capture/Interactive/Find/v1.00/json3.ws",
        dataType: "jsonp",
        data: {
          key: key,
          countries: "GB",
          text: $(searchField).val(),
          container: searchContext
        },
        success: function(data) {
          var term = $(searchField).val().toLowerCase().replace(/\s/g, '');
          // Test Valid Postcode
          var valid = false;
          var single = '';
          $.each(data.Items, function(index, value) {
            if (value.Text.toLowerCase().replace(/\s/g,'') == term) {
              valid = true;
              single = false;
            }
            if (value.Description.toLowerCase().replace(/\s/g,'').includes(term)) {
              valid = true;
              single = true;
            }
          });
          // Test Valid Postcode
          if (!valid){
            invalidPC(true);
          } else if (data.Items.length == 1) {

            if (single) {
              $('#address-select').empty().remove();
              var radios = "<div id='address-select'><span>Please select your address:</span><ul>";
              $.each(data.Items, function(index, value) {
                radios += "<li><input type='radio' name='address-select' value='"+value.Id+"' id='"+value.Id+"' data-type='"+value.Type+"' data-text='"+value.Text+"'></input><label for='"+value.Id+"'>"+value.Text +", "+ value.Description+"</label></li>";
              });
              radios += "</ul></div>";
              $('#start-search').after(radios);
              $(document).on('click', '[name="address-select"]', function () {
                $('#address-select').hide();
                retrieveAddress($(this).val());
              });

            } else {
              $.each(data.Items, function(index, value) {
                secondSearch(value.Text,value.Id);
              });
            }
          } else {
              console.log("unknown");
          }
        }
      });
    } else {invalidPC(true);}
  });

  function secondSearch(text, container) {
    $.ajax({
      url: "//services.postcodeanywhere.co.uk/capture/Interactive/Find/v1.00/json3.ws",
      dataType: "jsonp",
      data: {
        key: key,
        id: text,
        container: container
      },
      success: function(data) {
        $('#address-select').empty().remove();
        var radios = "<div id='address-select'><span>Please select your address:</span><ul>";
        $.each(data.Items, function(index, value) {
          radios += "<li><input type='radio' name='address-select' value='"+value.Id+"' id='"+value.Id+"' data-type='"+value.Type+"' data-text='"+value.Text+"'></input><label for='"+value.Id+"'>"+value.Text +", "+ value.Description+"</label></li>";
        });
        radios += "</ul></div>";
        $('#start-search').after(radios);
        $(document).on('click', '[name="address-select"]', function () {
          $('#address-select').hide();
          retrieveAddress($(this).val());
        });
      }
    });
  }

  function retrieveAddress(id) {
    $.ajax({
      url: "//services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws",
      dataType: "jsonp",
      data: {
        key: key,
        id: id
      },
      success: function (data) {
        if (data.Items.length)
          populateAddress(data.Items[0]);
      }
    });
  }

  function populateAddress(address) {
    console.log("pop ad");
    $('#label_address_search').hide();
    $('#address_search').val(address.PostalCode).hide();
    $('#start-search').hide();
    $('#address-select').remove();
    $("#address").html(address.Label.replace(/\n/g, '<br/>'));
    if ($('#address-edit').size() == 0) {
      $("#address").after("<button id='address-edit'>&#9998;</button>");
    }

    $(postcode).val(address.PostalCode).trigger("change").hide();
    $(add1).val(address.Line1).hide();
    $(add2).val(address.Line2).hide();
    $(add3).val(address.City).hide();
    $(add4).val(address.Province).hide();
    $(add5).val(address.PostalCode).hide();
    // JQ DEP
    var inputElement = document.getElementById('add1');
    inputElement.dispatchEvent(new Event('input', {
      view: window,
      bubbles: true,
      cancelable: true
    }));
    inputElement = document.getElementById('address_search');
    inputElement.dispatchEvent(new Event('input', {
      view: window,
      bubbles: true,
      cancelable: true
    }));
    $(document).trigger('clearErrors');
    //JQ DEP
    $(document).trigger('revalidate');

  }



  function invalidPC(state) {
    console.log("invPC");
    $('#postcode-switch').text('#container_postcode .error-message {display:none !important;}');
    if (state) {
      $('#container_postcode label.error').remove();
      $(searchField).addClass('error').after("<label for='address_search' generated='true' class='error-message' style=''>Please enter a valid postcode</label>");
    } else {
      $(searchField).removeClass('error').css("border-color","black");
      $('#container_address_search .error-message').remove();
    }
  }

  $('#address_search').change(function() {
    console.log("ad change");
    if ($('#address_search').val() != '' && $('#postcode').val() == '') {
      $('#container_address_search .error-message').remove();
      $('#postcode-switch').text('#container_postcode .error-message {display:block !important;}');
    } else {

      $('#postcode-switch').text('#container_postcode .error-message {display:none !important;}');
    }
  });

  $( document ).ready(function() {
    $(postcode).val('').hide();
    $(add1).val('').hide();
    $(add2).val('').hide();
    $(add3).val('').hide();
    $(add4).val('').hide();
    $(add5).val('').hide();
    $('body').after('<style id="postcode-switch">#container_postcode .error-message {display:none !important;}</style>');
  });

});
