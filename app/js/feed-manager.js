"use strict";

define(function(require) {
	var defineComponent = require('flight/lib/component');
	var feedManagerTemplate = require('text!tmpl/feed-manager.html');

	function FeedManager() {
		this.after('initialize', function() {
			// insert the feed manager template into the component node
			this.$node.html(feedManagerTemplate);
		});
	}

	return defineComponent(FeedManager);
});
