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
		 * Intercept the form submit event and synthesize it into
		 * a "addFeed" event
		 */
		this.submitFeed = function(event) {
			// first, cancel the event; don't want to
			// unintentionally submit the form
			event.preventDefault();

			// get the form data as a key/value pair
			var formData = extractFormData(event);

			// trigger the synthetic event
			this.trigger('addFeed', formData);
		};

		/**
		 * Add a specified feed to the list of watched feeds
		 */
		this.addFeed = function(event, feedData) {
			// create a new feed row
			var feed = $(feedListItemTemplate);
			// format it
			feed.find('.url').text(feedData.url);
			// and insert it into the list
			this.select('feedList').append(feed);

			// clear out the form
			this.select('addForm').get(0).reset();
		};

		/**
		 * Remove a feed from the list of watched feeds
		 */
		this.removeFeed = function(event) {
			var feedRow = $(event.target).closest(this.attr.feedItem).remove();
			var feedData = {
				url: feedRow.find('.url').text()
			};

			this.trigger('removeFeed', feedData);
		};

		this.after('initialize', function() {
			// insert the feed manager template into the component node
			this.$node.html(feedManagerTemplate);

			this.on('submit', {
				"addForm": this.submitFeed
			});

			this.on('click', {
				"removeFeed": this.removeFeed
			});

			// handle synthetic events
			this.on(document, 'addFeed', this.addFeed);
		});
	}

	return defineComponent(FeedManager);
});
