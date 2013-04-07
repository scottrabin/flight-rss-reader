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

			// simulate entering a feed and submitting the form
			$input.val(FEED_URL);
			$submitButton.click();

			// now there should be a feed with the specified url in the component
			feed = $component.find('.feed');
			expect(feed).toHaveNElements(1);
			expect(feed.find('.url').text()).toEqual(FEED_URL);
		});
	});
});
