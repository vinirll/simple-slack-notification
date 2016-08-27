var querystring = require('querystring');
var https = require('https');

var TOKEN = "";
var CHANNEL = null;
var EMOJI = null;

module.exports = {

	getObservable: function(envelop) {
		var mEnvelop = envelop;
		var that = this;
		return (function(){
			return {
				subscribe: function(lambdaParam) {
					that.notify(mEnvelop,lambdaParam);
				}
			};
		})();
	},

	notify: function(envelop,callback) {
		var postData = querystring.stringify({
		  'token' : process.env.SLACK_TOKEN,
		  'channel':  envelop.getChannel(),
		  'text': envelop.getText(),
		  'username': 'WeggoBot',
		  'icon_emoji': ':minibus:'
		});

		var options = {
	        host : "slack.com",
	        port : 443,
	        path : "/api/chat.postMessage",
	        method : 'POST',
	        headers: {
          		'Content-Type': 'application/x-www-form-urlencoded',
          		'Content-Length': Buffer.byteLength(postData)
     		}
    	};

    	var webservice_request = https.request(options, function(webservice_response) {
			webservice_response.setEncoding('utf8');
			webservice_response.on('data', function (chunk) {
			  console.log('Response: ' + chunk);
			});
			webservice_response.on('end', function () {
	            console.log('end');
	        });
	    });

		webservice_request.on('error', function(e) {
			console.log('error = ',e);
		});

	    // write data to request body
		webservice_request.write(postData);
		webservice_request.end();
	}
};