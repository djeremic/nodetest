/**
 * Created by drago.jeremic on 9/9/14.
 */
$(function(){
    var form = $('form#register');

    if(form && form != undefined) {
        var button = form.find('button#btn-submit');
        var businessHoursManager = $("#businessHoursContainer").businessHours();
        button.click(function (e) {
            e.preventDefault();
            $('#business-hours').val(JSON.stringify(businessHoursManager.serialize()));
            form.submit();
        });
    }
});