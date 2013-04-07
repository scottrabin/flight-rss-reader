"use strict";

define(function(require) {
	var defineComponent = require('flight/lib/component');
	var extractFormData = require('utils/formData');
	var feedManagerTemplate = require('text!tmpl/feed-manager.html');
	var feedListItemTemplate = require('text!tmpl/feed-manager-feed.html');

	function FeedManager() {
		this.defaultAttrs({
			"feedItem": ".feed",
			"removeFeed": ".feed .remove",
			"addForm": "form",
			"feedList": ".feed-list tbody"
		});

		/**
		 * Add a specified feed to the list of watched feeds
		 */
		this.addFeed = function(event) {
			// first, cancel the event; don't want to
			// unintentionally submit the form
			event.preventDefault();

			// get the form data as a key/value pair
			var formData = extractFormData(event);
			// create a new feed row
			var feed = $(feedListItemTemplate);
			// format it
			feed.find('.url').text(formData.feedUrl);
			// and insert it into the list
			this.select('feedList').append(feed);
		};

		/**
		 * Remove a feed from the list of watched feeds
		 */
		this.removeFeed = function(event) {
			$(event.target).closest(this.attr.feedItem).remove();
		};

		this.after('initialize', function() {
			// insert the feed manager template into the component node
			this.$node.html(feedManagerTemplate);

			this.on('submit', {
				"addForm": this.addFeed
			});

			this.on('click', {
				"removeFeed": this.removeFeed
			});
		});
	}

	return defineComponent(FeedManager);
});
