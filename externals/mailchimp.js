/**
 * Created by drago.jeremic on 9/23/14.
 */
https    = require('https')

exports.addSubscriber = function(email){
    var jsonObject = JSON.stringify({
        "apikey": "4ee3246400b3f4a2159f8a1b38c6b0a6",
        "id": 'ad628b0eb0',
        'email': {'email': email},
        'double_optin': false
    });

    console.log(jsonObject)

    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
    };

    var options = {
        hostname : "us9.api.mailchimp.com",
        path: '/2.0/lists/subscribe.json',
        port: 443,
        method: 'POST',
        headers : postheaders
    }

    var request = https.request(options, function(response){
        console.log("statusCode: ", response.statusCode);
        response.on('data', function(data) {
            //console.log(data);
        });
        response.on('end', function() {

        });
    });
    request.write(jsonObject);
    request.end();
    request.on('error', function(e) {
        console.log('Problem with request: ' + e.message);
    });
    request.end();
}