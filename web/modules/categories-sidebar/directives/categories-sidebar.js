(function() {
	'use strict';

	var categoriesSidebar = angular.module('categoriesSidebar');

	categoriesSidebar.directive('categoriesSidebar', ['$rootScope', 'EVENTS', function($rootScope, EVENTS) {
		return {
			restrict: 'A',

			controller: 'categoriesSidebarCtrl',

			templateUrl: 'modules/categories-sidebar/partials/categories-sidebar.html',

			link: function(scope, element, attrs) {
				const $toggle = element.find('.categories-sidebar__toggle');

                $toggle.on(EVENTS.ELEMENT.CLICK, function () {
					element.toggleClass('categories-sidebar--opened');
                });

                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('categories-sidebar--opened');
                });
			}
		};
	}]);
})();