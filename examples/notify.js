console.log('--- Running ---');

var mSlack = require('../slackEnvelop');

// construct an slack notification envelop and wait for subscription
var notification = mSlack
					.getDefaultSlackEnvelop()
					.setChannel("test-channel")
					.setTitle("My First Notification Title")
					.setDescription("This is just the description that stands behind the title")
					.setAttributes({
						Nome:  "Vinicius Lima",
						idade: 28
					})
					.exec();

// keep notifying
notification
	.setTitle("My Second Notification Title")
	.setDescription("Inherit attributes from last notification")
	.exec();
