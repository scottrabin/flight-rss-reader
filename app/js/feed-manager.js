"use strict";

define(function(require) {
	var defineComponent = require('flight/lib/component');
	var extractFormData = require('utils/formData');

	function FeedManager() {
		this.defaultAttrs({
			"feedItem": ".feed",
			"removeFeed": ".feed .remove",
			"addForm": "form",
			"feedList": ".feed-list tbody",

			"template": require('text!tmpl/feed-manager.html'),
			"feedListItemTemplate": require('text!tmpl/feed-manager-feed.html')
		});

		/**
		 * Intercept the form submit event and synthesize it into
		 * a "addFeed" event
		 */
		this.submitFeed = function(event) {
			// get the form data as a key/value pair
			var formData = extractFormData(event);

			// trigger the synthetic event
			this.trigger('addFeed', formData);
		};

		/**
		 * Add a specified feed to the list of watched feeds
		 */
		this.addFeed = function(event, feedData) {
			// insert a new feed into the list
			this.select('feedList').
				append(this.template('feedListItemTemplate', feedData));

			// request additional feed data
			this.trigger('uiNeedsFeedInfo', feedData);

			// clear out the form
			this.select('addForm').get(0).reset();
		};

		/**
		 * Remove a feed from the list of watched feeds
		 */
		this.removeFeed = function(event, feed) {
			var feedRow = this.select('feedItem').filter(function() {
				return $(this).find('.url').text() === feed.feedUrl;
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

		/**
		 * Event listener for updating feed data after request fulfillment
		 */
		this.updateFeed = function(event, feedData) {
			this.select('feedItem').filter(function() {
				return $(this).find('.url').text() === feedData.feedUrl;
			}).replaceWith(this.template('feedListItemTemplate', feedData));
		};

		this.after('initialize', function() {
			this.on('submit', {
				"addForm": this.submitFeed
			});

			this.on('click', {
				"removeFeed": this.sendRemoveFeed
			});

			// handle synthetic events
			this.on(document, 'addFeed', this.addFeed);
			this.on(document, 'removeFeed', this.removeFeed);
			this.on(document, 'dataFeedInfo', this.updateFeed);
		});
	}

	return defineComponent(FeedManager,
						   require('mixin-markup'),
						   require('mixin-template'));
});
