"use strict";

define(function(require) {

	function withMarkup() {
		this.before('initialize', function() {
			this.$node.html(this.attr.template);
		});
	}

	return withMarkup;
});
