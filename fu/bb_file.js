var   fileLabel = 'Upload Recent Photo',
      tooltipText = 'Upload a single clear front facing photo. Make sure we can see your face clearly. No group or blurry photos.',
      fileContainer = '<div class="lp-pom-form-field legacy clearfix" id="container_file">' +
      '<label for="file" id="label_file">' +
      fileLabel +
      '</label>' +
      '<span id="name_file"></span>' +
      '<label for="file" class="main lp-form-label label_field" id="wrapper_file">' +
      '&nbsp' +
      '<input type="file" id="file" name="file" class="file form_elem_file" />' +
      '</label>' +
      '<div id="tooltip_file">' +
      '<span>' + tooltipText +  '</span>' +
      '</div>' +
      '</div>';
var tempImg = 0,
    fileLabel = '#label_file',
    fileField = '#file',
    fileName = '#name_file',
    fileTooltip = '#tooltip_file';
  //  	sent = false;// Submit issues fi

 // $('.fields', '.lp-pom-form').append(fileContainer);
  $(document.fileUploadParameter.form_container).append(fileContainer);

  var showErrorMsgFileUpload = function( serverVal ){
      if( serverVal ) {
       var button_text = $('span', document.fileUploadParameter.submit_button).text();
       $('span', document.fileUploadParameter.submit_button).text(button_text).removeClass('submitted'); // Submit issues fix
       $(document.fileUploadParameter.submit_button).bind("click tap touchstart", function() {clickHandle();}); // Submit issues fix
      }
      $(document.fileUploadParameter.errorMsg).show();
  }
  // Submit issues fix
  var clickHandle = function () {
      if (document.getElementsByTagName('form')[0].reportValidity() && tempImg ) {
        $(document.fileUploadParameter.submit_button).unbind("click tap touchstart");
        getLeadId();
      }
        if( !tempImg ) { showErrorMsgFileUpload(0); }
  }
  var getLeadId = function() {
     // $('span', document.fileUploadParameter.submit_button).text('Uploading, please wait').addClass('submitted');
      $(document.fileUploadParameter.errorMsg).hide();

      var formData = new FormData();
      var $fields  = $(':input').not('[type="file"], [type="button"], button');
      $fields.each(function(i, val) {
        var name = $(val).attr('name');
        var value = $(val).val();
        formData.append(name, value);
      });
      if( tempImg ){
        formData.append('file', tempImg, tempImg.name.toLowerCase());
        $.ajax({
              url: document.fileUploadParameter.ajaxURL,
              dataType: 'json',
              cache: false,
              contentType: false,
              processData: false,
              data: formData,
              type: 'post',
              complete: function(res) {
                console.log(res);
                var id = res && res.responseJSON && res.responseJSON.ID;
                if (typeof id == 'number') {
                  console.log(id);
                  $('#lead_id').val(id);
                  document.cookie = "lead_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  document.cookie = "lead_id=" + id + ";path=/;";
                  $(document.fileUploadParameter.old_submit).trigger("click");
                } else {
                  showErrorMsgFileUpload(1);
                }
              }
        });
      }
      else {
         showErrorMsgFileUpload(0);   
      }
    };
    $('#file').fileupload({
        url: '//jquery-file-upload.appspot.com/',
        dataType: 'json',
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator && navigator.userAgent),
        loadImageMaxFileSize: 4294967296,
        imageMaxWidth: 600,
        imageMaxHeight: 400,
        add: function (e, data) {
            tempImg = 0;
            // data.context = $('<p/>').text('Uploading '+data.files[0].name+'...').appendTo("#file-upload-progress");
            var $this = $(this);
            if( (/^image\/(jpe?g|png)$/).test( data.files[0].type ) ){
              data.process(function () {
                  return $this.fileupload('process', data);
              }).done(function() {
                  $(document.fileUploadParameter.errorMsg).hide();
                  tempImg = data.files[0];      
              });
            }
            else {
              showErrorMsgFileUpload(0);
            }
        }
     });
  $(function() {
    $('form', '.lp-pom-form').unbind('keypress').bind('keypress.formSubmit', function(e) {
      if (e.which == 13) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
    // var button_text = $('span', document.fileUploadParameter.submit_button).text();
    $(document.fileUploadParameter.old_submit).hide();
    $(document.fileUploadParameter.submit_button).bind("click tap touchstart", function() {clickHandle();});

    $(fileField).change(function(e) {
      var path = e.target.value,
          name  = path.length ? path.match(/([^\\]+)\.[^\\]+$/)[0] : '';
      if (name.length) {
          $(fileLabel).addClass('label-active');
      } else {
          $(fileLabel).removeClass('label-active');
      }
      $(fileName).html(name);
    });

    $(fileTooltip).hover(function() {
        $('span', this).stop().fadeIn(600);
    }, function() {
        $('span', this).stop().fadeOut(600);
    });
  });