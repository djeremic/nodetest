/**
 * Created by drago.jeremic on 9/2/14.
 */
$(function() {
    var remove_link      = $(".remove-restaurant"); //Add button class
    var delete_link = $(".delete-link");
    var freeze_link = $(".freeze_link");

    $('body').on("click",".add-restaurant", function(e){
        e.preventDefault();
        var link = $(this);
        $.ajax({
            url: "/restaurants/favourites/add",
            dataType: "json",
            type: 'POST',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (data, textStatus, jqXHR) {
                link.text('Added to list');
                link.removeClass("add-restaurant")
                link.addClass("delete-restaurant")
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('.img-wrapper a[data-toggle="popover"]').popover('hide');
            }
        });
    });

    $('body').on("click",".delete-restaurant", function(e){
        e.preventDefault();
        var link = $(this);
        $.ajax({
            url: "/restaurants/favourites/remove",
            dataType: "json",
            type: 'DELETE',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (data, textStatus, jqXHR) {
                link.text('Add to your list');
                link.removeClass("delete-restaurant")
                link.addClass("add-restaurant")
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('.img-wrapper a[data-toggle="popover"]').popover('hide');
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
    freeze_link.click(function(e){
        e.preventDefault();
        var link = $(this);
        var url = link.attr('data-url');
        link.parents('tr').first().remove();
        $.ajax({
            url: url,
            dataType: "json",
            type: 'POST',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (datas) {
                var td = link.closest('td');
                link.remove();
                td.text("Paused");
            }
        });
    });
});
