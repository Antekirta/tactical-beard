(function () {
    'use strict';
    
    var utils = angular.module('utils');
    
    utils.directive('dropDownList', ['EVENTS', function (EVENTS) {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {
               $(function () {
                   $(element).on(EVENTS.ELEMENT.CLICK, function (event) {
                       if ( $(event.target).attr('data-drop-down') === 'true' ) {
                           event.preventDefault();

                           $(element).children('ul').slideToggle();
                       }
                    });
                });
            }
        }
    }]);
})();