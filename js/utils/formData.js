"use strict";

define(function() {
	return function(event) {
		var $form = $(event.target).closest('form');

		return $form.serializeArray().reduce(function(memo, datum) {
			memo[datum.name] = datum.value;
			return memo;
		}, {});
	};
});
