/**
 * Created by drago.jeremic on 8/28/14.
 */
$(function() {
    var ms = $('#magicsuggest').magicSuggest({
        name: 'tags'
        ,data: '/tags/find'
    });

    var selection = ms.getSelection().slice();

    $(ms).on(
        'selectionchange', function(e, cb, s){
            if(selection.length < cb.getValue().length) {
                var tag = cb.getValue().pop();
                if (isNaN(tag)){
                    $.ajax({
                        url: "/tags/add",
                        dataType: "json",
                        type: 'POST', //I want a type as POST
                        data: {
                            tag: {
                                name: cb.getValue().pop()
                            }
                        },
                        success: function (data) {
                            ms.removeFromSelection(ms.getSelection().slice().pop(), true);
                            ms.addToSelection([data.tag]);
                        }
                    });
                }
            }
            selection = this.getSelection().slice();
        }
    );
});
