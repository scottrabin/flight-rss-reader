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

	var OTHER_FEED_ITEMS = [
		{
			title: "Other Item One",
			link:  "http://127.0.0.1/item-1",
			content: '<span>Item 1 Content</span>',
			contentSnippet: "Item 1 Content",
			publishedDate: "Mon, 15 Apr 2012 06:15:00 -0700",
			categories: []
		},
		{
			title: "Other Item Two",
			link:  "http://127.0.0.1/item-2",
			content: '<span>Item 2 Content</span>',
			contentSnippet: "Item 2 Content",
			publishedDate: "Wed, 17 Apr 2012 06:15:00 -0700",
			categories: []
		},
		{
			title: "Other Item Three",
			link:  "http://127.0.0.1/item-3",
			content: '<span>Item 3 Content</span>',
			contentSnippet: "Item 3 Content",
			publishedDate: "Fri, 19 Apr 2012 06:15:00 -0700",
			categories: []
		}
	];

	var OTHER_FEED_DATA = {
		title: "Some other RSS feed",
		link: "http://127.0.0.1/",
		description: "This is an RSS feed that is not the other RSS feed",
		author: "Me, Myself, and I",
		entries: OTHER_FEED_ITEMS
	};

	beforeEach(setupComponent);

	it("should have no feed items when it is created", function() {
		expect(this.component.select('feedItem').length).toBe(0);
	});

	it("should listen for the 'dataFeedInfo' event and insert entries into the component", function() {
		this.component.trigger('dataFeedInfo', FEED_DATA);
		expect(this.component.select('feedItem').length).toBe(3);
	});

	it("should insert a feed item that display the relevant entry information", function() {
		this.component.trigger('dataFeedInfo', FEED_DATA);

		expect(this.component.select('feedItem').length).toBe(3);
		this.component.select('feedItem').each(function(index) {
			var feedItem = $(this);
			expect(feedItem.find('.title').text()).toBe(FEED_ITEMS[index].title);
			expect(feedItem.find('.link').attr('href')).toBe(FEED_ITEMS[index].link);
			expect(feedItem.find('.snippet').text()).toBe(FEED_ITEMS[index].contentSnippet);
		});
	});

	it("should not insert duplicate entries into the list of displayed feeds", function() {
		this.component.trigger('dataFeedInfo', FEED_DATA);
		expect(this.component.select('feedItem').length).toBe(3);
		this.component.trigger('dataFeedInfo', FEED_DATA);
		expect(this.component.select('feedItem').length).toBe(3);
	});

	it("should present the user with a way to filter the displayed entries by source", function() {
		var options;

		expect(this.component.select('filterSelector').length).toBeGreaterThan(0);

		options = this.component.select('filterSelector').find('option').filter(function() {
			return $(this).attr('value').length > 0;
		});
		expect(options.length).toBe(0);

		this.component.trigger('dataFeedInfo', FEED_DATA);
		options = this.component.select('filterSelector').find('option').filter(function() {
			return $(this).val().length > 0;
		});
		expect(options.length).toBe(1);
	});

	it("should only display feed entries from a specific source when the filter has a value selected", function() {
		this.component.trigger('dataFeedInfo', FEED_DATA);
		this.component.trigger('dataFeedInfo', OTHER_FEED_DATA);

		expect(this.component.select('feedItem').length).toBe(6);

		var selector = this.component.select('filterSelector');
		selector.val(selector.find('option:last').val());
		selector.trigger('change');

		this.component.select('feedItem').each(function() {
			expect($(this).data('source')).toBeDefined();
			if ($(this).data('source') == FEED_DATA.link) {
				expect($(this)).not.toBeVisible();
			} else {
				expect($(this)).toBeVisible();
			}
		});
	});
});
