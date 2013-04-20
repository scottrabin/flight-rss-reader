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
			// detect an entry's existence by looking for a feed item
			// with a link that points to the same place
			var exists = (this.select('feedItem').
				find('.link[href="' + entry.link + '"]').length > 0);
			if (!exists) {
				$(template).
					find('.title').text(entry.title).end().
					find('.link').attr('href', entry.link).end().
					find('.snippet').text(entry.contentSnippet).end().
					appendTo(this.$node);
			}
		};

		this.after('initialize', function() {
			this.on(document, 'dataFeedInfo', this.updateFeeds);
		});
	}

	return defineComponent(FeedItems);
});
