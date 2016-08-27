var slack = require('./slack.js');

module.exports = {
    getSlackEnvelop: function() {
    	if ( typeof process.env.SLACK_TOKEN === 'undefined' )
    	{
    		console.log('**** ADD SLACK_TOKEN VALUE IN YOUR ENV VARIABLE ****');
    	}
  		return createSlackEnvelop();
    }
};

var createSlackEnvelop = function() {
	// Build Pattern
	return (function() {
        var title = null;
        var description = null;
        var attrs = {};

        var channel = "C0MRV8SBF";

        return {
            setChannel: function(channelParam) {
                channel = channelParam
                return this;
            },
            setDescription: function(descriptionParam) {
                description = descriptionParam;
                return this;
            },
            setTitle: function(titleParam) {
                title = titleParam;
                return this;
            },
            setAttributes: function(attrsParam) {
            	attrs = attrsParam;
            	return this;
            },

            getChannel: function() {
                return channel;
            },
            getDescription: function() {
                return description;
            },
            getTitle: function() {
                return title;
            },
            getText: function() {
            	var that = this;

            	var msg = "*"+title+"*\n";
            	msg += ">"+description+"\n";

            	Object.keys(attrs).forEach(function(key) {
				  msg += "*"+key + ":* " + attrs[key] + "\n";
				});

            	return msg;
            },

            build: function() {
                // Observer Pattern
                return slack.getObservable(this);
            },
            exec: function() {
				slack.notify(this);
            }
        };
    })();
};