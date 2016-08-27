module.exports = {
    getSlackEnvelop: function() {
  		return createSlackEnvelop();
    }
};

var createSlackEnvelop = function() {
	// Build Pattern
	return (function() {
        var title = null;
        var description = null;
        var attrs = {};
        var channel = "#default";

        return {
            setChannel: function(channelParam) {
                this.channel = channelParam
                return this;
            },
            setDescription: function(descriptionParam) {
                this.description = descriptionParam;
                return this;
            },
            setTitle: function(titleParam) {
                this.title = titleParam;
                return this;
            },
            setAttributes: function(attrsParam) {
            	this.attrs = attrsParam;
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

            	var msg = "*"+this.title+"*\n";
            	msg += ">"+this.description+"\n";

            	Object.keys(this.attrs).forEach(function(key) {
				  msg += "*"+key + ":* " + that.attrs[key] + "\n";
				});

            	return msg;
            },

            build: function() {
                var slack = require('./slack.js');
                // Observer Pattern
                return slack.getObservable(this);
            },
            exec: function() {
            	// TODO
            }
        };
    })();
};