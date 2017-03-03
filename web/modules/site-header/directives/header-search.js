(function() {
	'use strict';

	var siteHeader = angular.module('siteHeader');

	siteHeader.directive('headerSearch', ['EVENTS', function(EVENTS) {
		return {
			restrict: 'A',

			link: function(scope, element, attrs) {
				var classes = {
					active: 'active'
				};

				var elems = {
					input: element.find('input')
				};

				scope.toggleSearchView = function (event) {
					element.toggleClass(classes.active);
					elems.input.attr('placeholder', 'Что будем искать?');
				};

				scope.removeSearchView = function (event) {
					element.removeClass(classes.active);
					elems.input.attr('placeholder', '');
					elems.input.val('');
				};

				elems.input.on(EVENTS.ELEMENT.FOCUS, scope.toggleSearchView);

				elems.input.on(EVENTS.ELEMENT.BLUR, scope.removeSearchView);

				var scopeDestroyer = scope.$on('destroy', function () {
					elems.input.off(EVENTS.ELEMENT.FOCUS, scope.toggleSearchView);

					elems.input.off(EVENTS.ELEMENT.BLUR, scope.removeSearchView);

					scopeDestroyer();
				});
			}
		};
	}]);
})();