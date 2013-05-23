"use strict";

define(function(require) {

	function withTemplating() {
		this.template = function(templateName, obj) {
			return this.attr[templateName].replace(/(?:\{([^}]+)\})/g, function(_, property) {
				return obj[property] || '';
			});
		};
	}

	return withTemplating;
});
