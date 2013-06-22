"use strict";

define(function(require) {
	require('feed-service').attachTo(document);
	require('feed-aggregator').attachTo('#feed-items');
	require('feed-manager').attachTo('#feed-manager');
	require('persistence').attachTo(document);

	$(document).trigger('initializeApp');
});
