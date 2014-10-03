/**
 * Created by drago.jeremic on 10/3/14.
 */
$(function(){
    var form = $('form#landmarks')

    var landmarks = $('form div.landmarks-wr a');
    var arrondisements = $('form div.arrondisements-wr a');

    landmarks.click(function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            var id = $(this).attr('data-id');
            form.find('input#landmark-'+id).remove();
        } else {
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            form.prepend('<input type="hidden" name="landmarks[]" value="'+id+'" id="landmark-'+id+'"/>');
        }
    })

    arrondisements.click(function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            var id = $(this).attr('data-id');
            form.find('input#arrondisement-'+id).remove();
        } else {
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            form.prepend('<input type="hidden" name="arrondisements[]" value="'+id+'" id="arrondisement-'+id+'"/>');
        }
    })
});