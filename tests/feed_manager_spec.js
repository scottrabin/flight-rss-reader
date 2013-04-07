define([
	'feed-manager'
], function(FeedManager) {

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
	});
});
