"use strict";

describeComponent('feed-service', function() {
	var FEED_URL = 'http://not.a.feed.com/feed.rss';

	beforeEach(setupComponent);

	it("should respond to 'needsFeedInfo' events with 'dataFeedInfo'", function() {
		var eventData = spyOnEvent(document, 'dataFeedInfo');

		// intercept the 'executeRequest' method and just call through
		spyOn(this.component, 'executeRequest').andCallFake(function(url, callback) {
			callback.call(this, {
				feedUrl: url,
				title: "The Feed Name"
			});
		});

		this.component.trigger('needsFeedInfo', { feedUrl: FEED_URL });
		expect(eventData).toHaveBeenTriggeredOn(document);
		expect(eventData.mostRecentCall.data).toEqual({
			feedUrl: FEED_URL,
			title: "The Feed Name"
		});
	});
});
