var slack = require('./slack.js');

var errorEnvelop = null;

module.exports = {

    getDefaultSlackEnvelop: function() {
    	if ( typeof process.env.SLACK_TOKEN === 'undefined' )
    	{
    		console.log('**** ADD SLACK_TOKEN VALUE IN YOUR ENV VARIABLE ****');
    	}
  		return createSlackEnvelop();
    },

    error: function(text,channel) {
        var envelop = createErrorEnvelop().setDescription(text);
        if (typeof channel !== 'undefined')
            envelop.setChannel(channel)

        return envelop;
    },

};

var createErrorEnvelop = function() {
    if (errorEnvelop)
        return errorEnvelop;

    errorEnvelop = (function() {
        var title = null;
        var description = null;
        var attrs = {};

        var channel = "errors-channel";

        return {
            setChannel: function(channelParam) {
                console.log(channelParam);
                channel = channelParam
                return this;
            },
            setDescription: function(descriptionParam) {
                console.log(descriptionParam);
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
                var msg = ">*[ERRORS]* "+description+"\n";
                Object.keys(attrs).forEach(function(key) {
                  msg += ">*"+key + ":* " + attrs[key] + "\n";
                });
                return msg;
            },

            build: function() {
                return slack.getObservable(this);
            },
            exec: function() {
                slack.notify(this);
                return this;
            }
        };
    })();

    return errorEnvelop;
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
                return slack.getObservable(this);
            },
            exec: function() {
				slack.notify(this);
                return this;
            }
        };
    })();
};