"use strict";

define(function(require) {
	require('feed-service').attachTo(document);
	require('feed-manager').attachTo('#feed-manager');
});
