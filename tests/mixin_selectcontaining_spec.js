"use strict";

describeMixin('mixin-selectcontaining', function() {
	describe('#selectContaining', function() {
		it("should return the set of elements matching the selector attribute and containing the given selector", function() {
			setupComponent('<div class="arbitrary one"><span></span></div><div class="arbitrary two"><span class="interesting"></span></div>', {
				"selectorAttr": ".arbitrary"
			});

			expect(this.component.selectContaining('selectorAttr', '.interesting').length).toBe(1);
			expect(this.component.selectContaining('selectorAttr', '.interesting')[0]).toBe(this.component.$node.find('.two')[0]);
		});
	});
});
