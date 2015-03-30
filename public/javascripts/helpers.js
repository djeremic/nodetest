(function() {
    var register = function(Handlebars) {

        /************* BEGIN HELPERS *************/
        var helpers = {
            isSame: function(lvalue, rvalue, options) {
                if (arguments.length < 3)
                    throw new Error("Handlebars Helper equal needs 2 parameters");
                if ( lvalue==rvalue ) {
                    return 'checked';
                } else {
                    return '';
                }
            },
            equals: function(lvalue, rvalue, options) {
                if (arguments.length < 3)
                    throw new Error("Handlebars Helper equal needs 2 parameters");
                if ( lvalue==rvalue ) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            },
            isInArray: function(lvalue, rvalue, options){
                if (arguments.length < 3)
                    throw new Error("Handlebars Helper equal needs 2 parameters");
                if(lvalue != null && lvalue.length > 0){
                    for(var i = 0; i < lvalue.length; i++){
                        if(lvalue[i] == rvalue){
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            }
        };
        /************* END HELPERS *************/

        if (Handlebars && typeof Handlebars.registerHelper === "function") {
            // register helpers
            for (var prop in helpers) {
                Handlebars.registerHelper(prop, helpers[prop]);
            }
        } else {
            // just return helpers object if we can't register helpers here
            return helpers;
        }
    };

    // client
    if (typeof window !== "undefined") {
        register(Handlebars);
    }
    // server
    else {
        module.exports.register = register;
        module.exports.helpers = register(null);
    }
})();