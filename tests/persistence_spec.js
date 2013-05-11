"use strict";

describeComponent('persistence', function() {
	describe("while the app is running", function() {
		beforeEach(setupComponent);
		afterEach(function() {
			$.storage.removeItem('feeds', 'localStorage');
		});

		it("should respond to the 'addFeed' event by storing the feed", function() {
			this.component.trigger('addFeed', {feedUrl: 'http://feeds.com/rss'});

			expect(this.component.getStoredFeeds()).toEqual(['http://feeds.com/rss']);
		});

		it("should respond to the 'removeFeed' event by removing the feed from storage", function() {
			this.component.trigger('addFeed', {feedUrl: 'http://feeds.com/rss1'});
			this.component.trigger('addFeed', {feedUrl: 'http://feeds.com/rss2'});

			expect(this.component.getStoredFeeds().length).toBe(2);

			this.component.trigger('removeFeed', {feedUrl: 'http://feeds.com/rss2'});
			expect(this.component.getStoredFeeds()).toEqual(['http://feeds.com/rss1']);
		});
	});
});
