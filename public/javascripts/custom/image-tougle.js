/**
 * Created by drago.jeremic on 12/19/14.
 */
$(function(){
    var authorLink = $('.top a.author');
    var mapLink = $('.top a.map');
    var headerSection = $('.top .head-wrapper');

    authorLink.hide();

    authorLink.click(function(e){
        e.preventDefault();
        $(this).hide();
        mapLink.show();
        headerSection.show();
        $('div.top').css('background-image', 'url(' + authorLink.attr('data-img') + ')');
    });

    mapLink.click(function(e){
        e.preventDefault();
        $(this).hide();
        authorLink.show();
        headerSection.hide();
        $('div.top').css('background-image', 'url(' + mapLink.attr('data-img') + ')');
    });

    var link = $('a.emerge');
    link.animate({
        'margin-top': '-=60px',
        opacity: '1'
    }, 1000, function(){
    });
});