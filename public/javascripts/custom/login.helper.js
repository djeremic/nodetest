/**
 * Created by Drago on 14.9.2014.
 */
$(function(){
    var loginModal = $('#login-modal');
    var loginForm = loginModal.find('form');

    $('body').on("click",".login-modal", function(e){ //user click on remove text
        e.preventDefault();
        loginForm.find('input').val('');
        loginModal.find('.alert').remove();
        loginModal.modal();
    })

    $('body').on("click","button#submit-modal", function(sb){
        sb.preventDefault;
        loginModal.find('div.alert').hide();

        var postData = loginForm.serializeArray();
        var formURL = loginForm.attr("action");
        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data, textStatus, jqXHR)
                {
                    if(data.user != undefined) {
                        location.reload()
                    } else {
                        loginModal.find('div.modal-body').prepend('<div class="alert alert-danger alert-dismissible" role="alert">'
                            + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                            + ' User is nor found, please try again'
                            + '</div>');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    $('div.modal-body').prepend('<div class="alert alert-danger alert-dismissible" role="alert">'
                        + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                        + ' User is nor found, please try again'
                        + '</div>');
                }
            });
    });
});

function windowpop(url, width, height) {
    var leftPosition, topPosition;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
}
