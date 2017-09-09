(function () {
    'use strict';

    angular.module('auth')
        .directive('authModal', ['$document', 'EVENTS', function ($document, EVENTS) {
            return {
                restrict: 'E',

                templateUrl: 'modules/auth/partials/auth-modal.html',

                link: function (scope, element, attrs) {
                    $document.on(EVENTS.ELEMENT.MOUSEDOWN, onOuterClick);

                    function onOuterClick(event) {
                        const isOuterClick = !$.contains(element[0], event.target);

                        if ( isOuterClick ) {
                            scope.$authCtrl.modalIsOpen = false;
                        }
                    }
                }
            };
        }]);
})();