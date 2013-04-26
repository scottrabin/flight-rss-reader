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

			feed.
				// format it
				find('.url').text(feedData.feedUrl).end().
				// and insert it into the list
				appendTo(this.select('feedList'));


			// clear out the form
			this.select('addForm').get(0).reset();
		};

		/**
		 * Remove a feed from the list of watched feeds
		 */
		this.removeFeed = function(event, feed) {
			var feedRow = this.select('feedItem').filter(function() {
				return $(this).find('.url').text() == feed.feedUrl;
			});
			feedRow.remove();
		};

		/**
		 * Event listener for removing the feed
		 */
		this.sendRemoveFeed = function(event) {
			var feedRow = $(event.target).closest(this.attr.feedItem);
			var feed = {
				feedUrl: feedRow.find('.url').text()
			};
			this.trigger('removeFeed', feed);
		};

		this.after('initialize', function() {
			// insert the feed manager template into the component node
			this.$node.html(feedManagerTemplate);

			this.on('submit', {
				"addForm": this.submitFeed
			});

			this.on('click', {
				"removeFeed": this.sendRemoveFeed
			});

			// handle synthetic events
			this.on(document, 'addFeed', this.addFeed);
			this.on(document, 'removeFeed', this.removeFeed);
		});
	}

	return defineComponent(FeedManager);
});
