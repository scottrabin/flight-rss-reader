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
	});
});
