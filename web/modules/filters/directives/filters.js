(function() {
    'use strict';

    var filters = angular.module('filters');

    filters.directive('filters', ['EVENTS', function(EVENTS) {
        return {
            restrict: 'A',

            controller: 'filtersCtrl',

            templateUrl: 'modules/filters/partials/filters.html',

            link: function(scope, element, attrs) {
                controlPriceRange();

                function controlPriceRange() {
                    var classes = {
                        inputMin: 'filters-input__number--min',

                        inputMax: 'filters-input__number--max'
                    };

                    var inputs = {
                        min: angular.element(element[0].querySelectorAll('.' + classes.inputMin)[0]),

                        max: angular.element(element[0].querySelectorAll('.' + classes.inputMax)[0])
                    };

                    inputs.min.bind(EVENTS.ELEMENT.INPUT, function () {
                        if ( parseInt(inputs.max[0].value) <  parseInt(inputs.min[0].value) ) {
                            inputs.max[0].value = inputs.min[0].value;
                        }
                    });

                    inputs.max.bind(EVENTS.ELEMENT.INPUT, function () {
                        if ( parseInt(inputs.max[0].value) <  parseInt(inputs.min[0].value) ) {
                            inputs.min[0].value = inputs.max[0].value;
                        }
                    });
                }
            }
        };
    }]);
})();