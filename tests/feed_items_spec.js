"use strict";

describeComponent('feed-items', function() {

	var FEED_ITEMS = [
		{
			title: "Item One",
			link:  "http://localhost/item-1",
			content: '<span>Item 1 Content</span>',
			contentSnippet: "Item 1 Content",
			publishedDate: "Mon, 15 Apr 2013 06:15:00 -0700",
			categories: []
		},
		{
			title: "Item Two",
			link:  "http://localhost/item-2",
			content: '<span>Item 2 Content</span>',
			contentSnippet: "Item 2 Content",
			publishedDate: "Wed, 17 Apr 2013 06:15:00 -0700",
			categories: []
		},
		{
			title: "Item Three",
			link:  "http://localhost/item-3",
			content: '<span>Item 3 Content</span>',
			contentSnippet: "Item 3 Content",
			publishedDate: "Fri, 19 Apr 2013 06:15:00 -0700",
			categories: []
		}
	];

	var FEED_DATA = {
			title: "Test RSS Feed",
			link:  "http://localhost/",
			description: "This is a description of the RSS feed",
			author: "Author's Name",
			entries: FEED_ITEMS
		};

	beforeEach(setupComponent);

	it("should have no feed items when it is created", function() {
		expect(this.component.select('feedItem').length).toBe(0);
	});

	it("should listen for the 'dataFeedInfo' event and insert entries into the component", function() {
		this.component.trigger('dataFeedInfo', FEED_DATA);
		expect(this.component.select('feedItem').length).toBe(3);
	});
});
