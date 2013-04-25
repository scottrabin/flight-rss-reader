"use strict";

define(function(require) {
	var defineComponent = require('flight/lib/component');
	var aggregatorTemplate = require('text!tmpl/feed-aggregator.html');
	var template = require('text!tmpl/feed-item.html');

	function FeedItems() {
		this.defaultAttrs({
			"filterSelector": "select",
			"feedList": ".feed-list",
			"feedItem": ".feed-list .feed"
		});

		this.updateFeeds = function(event, feedData) {
			// insert a new option into our select element, if it doesn't already exist
			this.insertOption(feedData);

			if (feedData.entries) {
				this.entries[feedData.link] = feedData.entries;
				this.render();
			}
		};

		this.insertOption = function(feed) {
			var exists = (this.select('filterSelector').
						  find('option[value="' + feed.link + '"]').length > 0);
			if (!exists) {
				$(document.createElement('option')).
					text(feed.title).
					val(feed.link).
					appendTo(this.select('filterSelector'));
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
					appendTo(this.select('feedList'));
			}
		};

		this.render = function() {
			// blank out the feed list
			this.select('feedList').empty();
			var source = this.select('filterSelector').val();
			if (source) {
				// if a source is chosen, only render the entries in that feed
				this.entries[source].forEach(this.insertEntry, this);
			} else {
				// if no source chosen, render all
				$.each(this.entries, function(src, entries) {
					entries.forEach(this.insertEntry, this);
				}.bind(this));
			}
		};

		this.after('initialize', function() {
			this.$node.html(aggregatorTemplate);
			this.on('change', {
				'filterSelector': this.render
			});
			this.on(document, 'dataFeedInfo', this.updateFeeds);

			// internal store of entries
			this.entries = {};
		});
	}

	return defineComponent(FeedItems);
});
