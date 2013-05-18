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

		it("should emit 'addFeed' events when initialized with stored data", function() {
			// add feeds to the storage
			this.component.trigger('addFeed', {feedUrl: 'http://feeds.com/rss1'});
			this.component.trigger('addFeed', {feedUrl: 'http://feeds.com/rss2'});

			// then tear it down
			this.component.teardown();
			// and spy on 'addFeed'
			var spy = spyOnEvent(document, 'addFeed');
			this.Component.attachTo(document);

			expect(spy.calls.map(function(call) { return call.args[1].feedUrl; }).sort()).
				toEqual(['http://feeds.com/rss1', 'http://feeds.com/rss2'].sort());
		});
	});
});
