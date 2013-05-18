"use strict";

define(function(require) {
	// ensure the library is loaded & ready
	require('jstorage');

	var defineComponent = require('flight/lib/component');
	var storageKey  = 'feeds';
	var storageMode = 'localStorage';

	function PersistenceComponent() {
		this.storeFeeds = function(feeds) {
			$.storage.setItem(storageKey, JSON.stringify(feeds), storageMode);
		};

		this.getStoredFeeds = function() {
			return JSON.parse($.storage.getItem(storageKey, storageMode)) || [];
		};

		this.storeFeed = function(event, data) {
			var currentFeeds = this.getStoredFeeds();
			if (currentFeeds.indexOf(data.feedUrl) === -1) {
				this.storeFeeds(currentFeeds.concat(data.feedUrl));
			}
		};

		this.removeFeed = function(event, data) {
			var currentFeeds = this.getStoredFeeds();
			var feedIndex = currentFeeds.indexOf(data.feedUrl);
			if (feedIndex > -1) {
				currentFeeds.splice(feedIndex, 1);
				this.storeFeeds(currentFeeds);
			}
		};

		this.after('initialize', function() {
			// for each stored feed, emit an 'addFeed' event
			this.getStoredFeeds().forEach(function(feed) {
				this.trigger('addFeed', {feedUrl: feed});
			}, this);
			this.on(document, 'addFeed', this.storeFeed);
			this.on(document, 'removeFeed', this.removeFeed);
		});
	}

	return defineComponent(PersistenceComponent);
});
