"use strict";

define(function(require) {
	var defineComponent = require('flight/lib/component');

	function FeedService() {

		this.fetchFeedInfo = function(event, feed) {
			this.executeRequest(feed.feedUrl, this.requestCallback.bind(this));
		};

		this.executeRequest = function(feedUrl, callback) {
			new google.feeds.Feed(feedUrl).load(callback);
		};

		this.requestCallback = function(feed) {
			this.trigger('dataFeedInfo', feed.feed);
		};

		this.after('initialize', function() {
			this.on('uiNeedsFeedInfo', this.fetchFeedInfo);
		});
	}

	return defineComponent(FeedService);
});
