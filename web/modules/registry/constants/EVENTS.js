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

			'BLUR': 'blur',

			'CHANGE': 'change',

			'INPUT': 'input'
		},

		'LOAD': {
			'LOAD': 'load',

			'ERROR': 'error'
		},

		'BASKET_EVENTS': {
			'BASKET_UPDATED': 'basketUpdated'
		},

		'SCOPE': {
			'DESTROY': 'destroy'
		}
	});
})();