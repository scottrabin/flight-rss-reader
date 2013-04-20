"use strict";

define(function(require) {
	var defineComponent = require('flight/lib/component');
	var template = require('text!tmpl/feed-item.html');

	function FeedItems() {
		this.defaultAttrs({
			"feedItem": ".feed"
		});

		this.updateFeeds = function(event, feedData) {
			if (feedData.entries) {
				feedData.entries.forEach(this.insertEntry, this);
			}
		};

		this.insertEntry = function(entry) {
			$(template).
				find('.title').text(entry.title).end().
				find('.link').attr('href', entry.link).end().
				find('.snippet').text(entry.contentSnippet).end().
				appendTo(this.$node);
		};

		this.after('initialize', function() {
			this.on(document, 'dataFeedInfo', this.updateFeeds);
		});
	}

	return defineComponent(FeedItems);
});
