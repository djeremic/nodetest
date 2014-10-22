/**
 * Created by drago.jeremic on 9/4/14.
 */
$(function(){
    $('textarea').jqte();
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

    var success = function(data, textStatus, jqXHR){
        form.find('input').val('');
        form.find('textarea').jqteVal('');
        var dataId = + data.description.id;
        var editMode = false;
        $('#desc-wr a.edit-desc').each(function( index ){
            console.log(dataId);
            console.log($(this).attr('data-id'))
            if($(this).attr('data-id') == dataId){
                $(this).empty();
                $(this).append('<span class="col-lg-2">' + data.description.title +'</span><span class="col-lg-9 ellipsis">' + data.description.desc_en + '</span>');
                editMode = true;
            }
        });

        if(editMode == false) {
            $('a#add-desc').before('<div class="alert alert-success alert-dismissible row" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                '<div class="row"><a href="#" class="edit-desc" data-id="' + data.description.id + '"><span class="col-lg-2">' + data.description.title + '</span><span class="col-lg-9 ellipsis">' + data.description.desc_en + '</span></a></div>' +
                '<input type="hidden" name="descriptions[]" value="' + data.description.id + '"/>' +
                '</div>');
        }
        modal.modal('hide');
    }

    $('div#desc-wr').on("click","a.edit-desc", function(e){ //user click on remove text
        e.preventDefault();
        modal.find('.alert-danger').remove();
        $.ajax(
            {
                url : '/descriptions/find/'+$(this).attr('data-id'),
                type: "get",
                success:function(data, textStatus, jqXHR)
                {
                    modal.modal('show');
                    form.find('input#desc-id').val(data.description.id);
                    form.find('input#title').val(data.description.title);
                    form.find('textarea#desc_en').jqteVal(data.description.desc_en);
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    modal.modal('show');
                    form.find('input#desc-id').val('');
                    form.find('input#title').val('');
                    form.find('textarea#desc_en').jqteVal('');
                    $('div.modal-body').prepend('<div class="alert alert-danger alert-dismissible" role="alert">'
                        + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                        + ' <strong>Error!</strong> error occuered, please try again'
                        + '</div>');
                }
            });


    })

    $('div#desc-wr').on("click","a#add-desc", function(e) { //user click on remove text
        e.preventDefault();
        modal.modal('show');
        form.find('input#desc-id').val('');
        form.find('input#title').val('');
        form.find('textarea#desc_en').jqteVal('');
    });



});
