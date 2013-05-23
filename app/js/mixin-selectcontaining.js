"use strict";

define(function(require) {
	function withSelectContaining() {
		this.selectContaining = function(selectorAttr, containedSelector) {
			return this.select(selectorAttr).filter(function() {
				return $(this).find(containedSelector).length > 0;
			});
		};
	}

	return withSelectContaining;
});
