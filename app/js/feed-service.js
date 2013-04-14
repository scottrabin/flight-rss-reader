"use strict";

define(function(require) {
	var defineComponent = require('flight/lib/component');

	function FeedService() {

		this.fetchFeedInfo = function(event, feed) {
			this.executeRequest(feed.feedUrl, this.requestCallback.bind(this));
		};

		this.executeRequest = function(feedUrl, callback) {
			callback({
				feedUrl: feedUrl,
				title: "Dummy Title"
			});
		};

		this.requestCallback = function(feed) {
			this.trigger('dataFeedInfo', feed);
		};

		this.after('initialize', function() {
			this.on('needsFeedInfo', this.fetchFeedInfo);
		});
	}

	return defineComponent(FeedService);
});
