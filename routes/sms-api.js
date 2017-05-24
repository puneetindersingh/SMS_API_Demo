var express = require('express');
var request = require('request');

var router = express.Router();

/* 
    Node.js code for accessing the SMS API using the request library
*/

// get the token
router.post('/', function(req, res, next) {
    // empty variable for storing the access_token which we'll return to the server.
    var access_token;
    // build the request using request. 
    request({
        url: 'https://beta-sapi.telstra.com/v1/oauth/token',
        method: 'POST',
        form: {
            grant_type: 'client_credentials',
            client_id: req.body.client_id,
            client_secret: req.body.client_secret,
            scope: 'NSMS'
        },
    }, function(err, result) {
        // request callback
        var json = JSON.parse(result.body);
        access_token = json.access_token;

        if(!access_token) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Please check to make sure your client_id and client_secret are correct'}
            });
        }
        res.status(200).json({
            title: 'Success!',
            obj: json,
            token: access_token
        });
    });
});

// send the SMS
router.post('/send', function(req, res, next) {
    // json is our raw json data body and auth: 'bearer' is required for oAuth2.
    // the from field is optional
    request({
        url: 'https://beta-sapi.telstra.com/v2/messages/sms',
        method: 'POST',
        auth: {
            'bearer': req.body.token
        },
        json: {
            to: req.body.phoneNumber,
            //from: '+61400000000',
            body: req.body.message
        }
    }, function(err, result) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured!',
                error: {message: JSON.stringify(err)}
            });
        }
        res.status(200).json({
            title: 'Success!',
            obj: result.body
        });
    });
});

// poll the latest message
router.get('/:messageID/:token', function(req, res, next) {
    request({
        url: 'https://beta-sapi.telstra.com/v2/messages/sms/' + req.params.messageID,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        auth: {
           'bearer': req.params.token 
        }
    }, function(err, result) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured!',
                error: {message: JSON.stringify(err)}
            });
        }
        res.status(200).json({
            title: 'Success!',
            obj: result.body
        });
    });
});

module.exports = router;