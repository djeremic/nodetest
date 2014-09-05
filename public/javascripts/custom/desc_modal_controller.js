/**
 * Created by drago.jeremic on 9/4/14.
 */
$(function(){
    var modal = $('#modal');
    var form = $('form#save-desc');
    var submiButton = $('#submit-button');

    submiButton.click(function(e){
        e.preventDefault();
        modal.find('div.alert').hide();

        var postData = form.serializeArray();
        var formURL = form.attr("action");
        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data, textStatus, jqXHR)
                {
                    success(data, textStatus, jqXHR);node./b
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

    var success = function(data, textStatus, jqXHR){
        form.find('input').val('');
        form.find('textarea').val('');
        $('a#add-desc').before('<div class="alert alert-success alert-dismissible row" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            '<div class="row"><span class="col-lg-2">' + data.description.title +'</span><span class="col-lg-9 ellipsis">' + data.description.desc_en + '</span></div>' +
            '<input type="hidden" name="descriptions[]" value="' + data.description.id + '"/>' +
            '</div>');
        modal.modal('hide');
    }

});
