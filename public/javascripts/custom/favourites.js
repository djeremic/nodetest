/**
 * Created by drago.jeremic on 9/2/14.
 */
$(function() {
    var add_link      = $(".add-restaurant"); //Add button class
    var remove_link      = $(".remove-restaurant"); //Add button class
    var delete_link = $(".delete-link");

    $(add_link).click(function(e){
        e.preventDefault();
        $.ajax({
            url: "/restaurants/favourites/add",
            dataType: "json",
            type: 'POST',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (data) {
                //alert('success');
            }
        });
    });

    $(remove_link).click(function(e){
        e.preventDefault();
        var link = $(this);
        $.ajax({
            url: "/restaurants/favourites/remove",
            dataType: "json",
            type: 'DELETE',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (data) {
                link.parents('tr').first().remove();
            }
        });
    });

    delete_link.click(function(e){
        e.preventDefault();
        var link = $(this);
        var url = link.attr('data-url');
        link.parents('tr').first().remove();
        $.ajax({
            url: url,
            dataType: "json",
            type: 'DELETE',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (datas) {
                link.parents('tr').first().remove();
            }
        });
    });
});
