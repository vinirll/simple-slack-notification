# Wrapper for Slack Notification

##### Required:

- Set up value for SLACK_TOKEN environment variable

```sh
$ vim ~/.bash_profile
```
- Then, add the following line
```sh
export SLACK_TOKEN="<your slack token>"
```
Restart your terminal.
##### Usage:

```sh
var notification1 = mSlack
					.getSlackEnvelop()
					.setTitle("My First Notification Title")
					.setDescription("This is just the description that stands under the title")
					.setAttributes({
						Nome:  "Vinicius Lima",
						idade: 28
					})
					.exec();
```