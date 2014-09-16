/**
 * Created by Drago on 16.9.2014.
 */
$(function(){
    var template = '<div class="popover" role="tooltip">' +
        '<button type="button" class="close" data-dismiss="alert" style="padding:5px"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
        '<div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    $('.img-wrapper a').popover({placement : 'top', template: template, html: true});
    $("[data-toggle='tooltip']").tooltip();
    $('[data-toggle="popover"]').popover({trigger: 'hover','placement': 'top'});
})
