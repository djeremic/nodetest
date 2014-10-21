/**
 * Created by drago.jeremic on 9/9/14.
 */
$(function(){
    var form = $('form#add-restaurant');

    if(form && form != undefined) {
        var button = form.find('button#btn-submit-add-restaurant');
        console.log(window.$operationTime);
        if(window.$operationTime != undefined && window.$operationTime.length > 0) {
            var businessHoursManager = $("#businessHoursContainer").businessHours({
                operationTime: window.$operationTime
            });
        } else {
            var businessHoursManager = $("#businessHoursContainer").businessHours();
        }
        button.click(function (e) {
            e.preventDefault();
            $('#business-hours').val(JSON.stringify(businessHoursManager.serialize()));
            form.submit();
        });
    }
});