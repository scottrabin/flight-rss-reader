"use strict";

describeMixin('mixin-template', function() {
	var fixture = '<div></div>';

	describe("#template", function() {
		it("should format the named template with the supplied object", function() {
			setupComponent(fixture, {
				"nameOfTemplate": '<div class="test {className}">{contents}</div>'
			});
			var templateReturn = this.component.template('nameOfTemplate', {
				className: "arbitrary-class",
				contents:  "random content"
			});

			expect(templateReturn).toBe('<div class="test arbitrary-class">random content</div>');
		});
	});
});
