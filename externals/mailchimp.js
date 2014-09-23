/**
 * Created by drago.jeremic on 9/23/14.
 */
https    = require('https')

exports.addSubscriber = function(email){

    var params = 'apikey=4ee3246400b3f4a2159f8a1b38c6b0a6&'+
        'id=ad628b0eb0&'+
        'email.email='+email;

    var options = {
        hostname : "us9.api.mailchimp.com",
        path: '/2.0/lists/subscribe/?' + params,
        method: 'POST'
    }

    var request = https.request(options, function(response){
        response.on('data', function(data) {
            console.log(data);
        });
        response.on('end', function() {

        });
    });
    request.on('error', function(e) {
        console.log('Problem with request: ' + e.message);
    });
    request.end();
}