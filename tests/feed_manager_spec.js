define([
	'feed-manager'
], function(FeedManager) {

	var FEED_URL = 'http://localhost/not-a-real-feed.rss';

	describe('component/feedManager', function() {
		var $component, $form, $input, $submitButton;
		var validSubmitButtons = [
			// buttons default to `type="submit"` when `type` is absent
			'button:not([type])',
			// include buttons with an explicit `type="submit"`
			'button[type="submit"]',
			// inputs of type "submit"
			'input[type="submit"]'
		];

		function submitFeed(feedUrl) {
			// simulate entering a feed and submitting the form
			$input.val(feedUrl);
			$submitButton.click();
		}

		beforeEach(function() {
			this.addMatchers({
				toExist: function(expected) {
					return this.actual && this.actual.length > 0;
				},
				toHaveNElements: function(expected) {
					return this.actual && this.actual.length == expected;
				}
			});

			$component = $(document.createElement('div')).appendTo(document.body);
			FeedManager.attachTo($component);

			$form = $component.find('form');
			$input = $form.find('[type="url"]');
			$submitButton = $form.find(validSubmitButtons.join(', '));
		});
		afterEach(function() {
			$component.remove();
		});

		it("should present the user with a way to enter a new feed", function() {
			expect($component).toExist();
			expect($form).toExist();
			expect($input).toExist();
			expect($submitButton).toExist();
		});

		it("should add a new feed to the list when the user submits the form", function() {
			var feed = $component.find('.feed');
			// there should be no feeds to start
			expect(feed).not.toExist();

			// add a feed
			submitFeed(FEED_URL);

			// now there should be a feed with the specified url in the component
			feed = $component.find('.feed');
			expect(feed).toHaveNElements(1);
			expect(feed.find('.url').text()).toEqual(FEED_URL);
		});

		it("should remove a feed from the list when the 'remove' button is clicked", function() {
			var feed;
			// add a feed
			submitFeed(FEED_URL);

			feed = $component.find('.feed');
			expect(feed).toHaveNElements(1);
			feed.find('.remove').click();

			feed = $component.find('.feed');
			expect(feed).not.toExist();
		});

		it("should clear the form when a new feed is submitted", function() {
			expect($input.val()).toBe('');
			// go through the add feed process
			submitFeed(FEED_URL);
			expect($input.val()).toBe('');
		});

		it("should emit a 'addFeed' event when a feed is added", function() {
			// Create an event listener and attach it to the
			// document object to listen for our custom event
			var eventListener = jasmine.createSpy();
			$(document).on('addFeed', eventListener);

			// Add the feed
			submitFeed(FEED_URL);

			// verify our event listener was called and the
			// correct data was given
			expect(eventListener).toHaveBeenCalled();
			expect(eventListener.mostRecentCall.args[1]).toEqual({
				url: FEED_URL
			});
			$(document).off('addFeed', eventListener);
		});
	});
});
