/**
 * Created by drago.jeremic on 9/4/14.
 */
$(function(){
    var modal = $('#photo-modal');
    var form = modal.find('form#upload-photo');
    var submitButton = $('#submit-photo');
    var files;

    function prepareUpload(event)
    {
        files = event.target.files;
    }

    $('input[type=file]').on('change', prepareUpload);

    submitButton.click(function(e){
        e.preventDefault();
        modal.find('div.alert').hide();

        var data = new FormData();
        $.each(files, function(key, value)
        {
            data.append(key, value);
        });
        var formURL = form.attr("action");
        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : data,
                processData: false,
                contentType: false,
                success:function(data, textStatus, jqXHR)
                {
                    success(data, textStatus, jqXHR);
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    $('div.modal-body').prepend('<div class="alert alert-danger alert-dismissible" role="alert">'
                        + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                        + ' <strong>Error!</strong> error occuered, please try again'
                        + '</div>');
                }
            });
    });

    var success = function(data, textStatus, jqXHR) {
        form.find('input').val('');
        for (var i = 0; i < data.photos.length; i++){
            var photo = data.photos[i];
            $('#photo-wr table > tbody:last').append('<tr>' +
                '<td width="50%"><img src="/uploads/'+ photo.name + '" width="150"/></td>' +
                '<td width="35%">'+ photo.originalname + '<input type="hidden" name="photos[]" value="'+ photo.id + '"/></td>' +
                '<td width="10%"><a href="#" id="remove-photo"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>' +
                '</tr>');
        }
        modal.modal('hide');
    }


    $('div#photo-wr').on("click","a#add-photo", function(e) { //user click on remove text
        e.preventDefault();
        modal.modal('show');
        form.find('input#desc-id').val('');
        form.find('input#title').val('');
        form.find('textarea#desc_en').jqteVal('');
    });



});
/**
 * Created by drago.jeremic on 2/27/15.
 */
