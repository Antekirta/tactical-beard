(function() {
	'use strict';

	var registry = angular.module('registry');

	registry.constant('EVENTS', {
		'ELEMENT': {
			'CLICK': 'click',

			'MOUSEDOWN': 'mousedown',

			'HOVER': 'hover',

			'MOUSEENTER': 'mouseenter',

			'MOUSELEAVE': 'mouseleave',

			'KEYDOWN': 'keydown',

			'KEYUP': 'keyup',

			'KEYPRESS': 'keypress',

			'FOCUS': 'focus',

			'BLUR': 'blur'
		}
	});
})();