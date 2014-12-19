/**
 * Created by drago.jeremic on 12/19/14.
 */
$(function(){
    var authorLink = $('.top a.author');
    var mapLink = $('.top a.map');

    authorLink.hide();

    authorLink.click(function(e){
        e.preventDefault();
        $(this).hide();
        mapLink.show();

        $('div.top').css('background-image', 'url(' + authorLink.attr('data-img') + ')');
    });

    mapLink.click(function(e){
        e.preventDefault();
        $(this).hide();
        authorLink.show();
        console.log(mapLink.attr('data-img'));
        $('div.top').css('background-image', 'url(' + mapLink.attr('data-img') + ')');
    });
});