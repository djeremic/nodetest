/**
 * Created by drago.jeremic on 12/19/14.
 */
$(function() {
    $('form#subscribe').submit(function(sb){
        sb.preventDefault();
        $('div.alert-danger').remove();

        if($('form#subscribe').parsley().validate()) {
            var postData = $('form#subscribe').serializeArray();
            var formURL = $('form#subscribe').attr("action");
            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data, textStatus, jqXHR) {
                        $('form#subscribe').hide();
                        $('div#submit-wr').prepend('<div class="alert alert-success alert-dismissible" role="alert">'
                            + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                            + ' You\'ve successfully subscribed to our mailing list.'
                            + '</div>');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $('div#submit-wr').prepend('<div class="alert alert-danger alert-dismissible" role="alert">'
                            + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                            + ' There has been an error, please try again.'
                            + '</div>');
                    }
                });
        }
    });
});