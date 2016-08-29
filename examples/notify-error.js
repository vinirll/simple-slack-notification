console.log('--- Running ---');

var mSlack = require('../slackEnvelop');

mSlack.error("Testing error 1!","#test-channel").exec();

mSlack
	.error("Testing error 2!","#test-channel")
	.setAttributes({
		attr1: "attr1 value"
	})
	.exec();