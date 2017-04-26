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

                // controlCheckboxes();

                function controlPriceRange() {
                    var classes = {
                        inputMin: 'filters-input__number--min',

                        inputMax: 'filters-input__number--max'
                    };

                    var inputs = {
                        min: angular.element(element[0].querySelectorAll('.' + classes.inputMin)[0]),

                        max: angular.element(element[0].querySelectorAll('.' + classes.inputMax)[0])
                    };

                    inputs.min.bind(EVENTS.ELEMENT.CHANGE, function () {
                        if ( parseInt(inputs.max[0].value) <  parseInt(inputs.min[0].value) ) {
                            inputs.max[0].value = inputs.min[0].value;
                        }
                    });
                }
                
                // function controlCheckboxes() {
                //     var classes = {
                //         checkbox: 'filters-input__checkbox--without-mark',
                //
                //         checked: 'filters__label--checked',
                //
                //         cheaper: 'filters-input--order-price-cheaper',
                //
                //         expensive: 'filters-input--order-price-expensive',
                //
                //         discount: 'filters-input--discounted-products',
                //
                //         novelties: 'filters-input--novelties',
                //
                //         stock: 'filters-input--in-stock'
                //     };
                //
                //     var checkboxes = {
                //         checkbox: angular.element(element[0].querySelectorAll('.' + classes.checkbox)),
                //
                //         cheaper: angular.element(element[0].querySelectorAll('.' + classes.cheaper)[0]),
                //
                //         expensive: angular.element(element[0].querySelectorAll('.' + classes.expensive)[0]),
                //
                //         discount: angular.element(element[0].querySelectorAll('.' + classes.discount)[0]),
                //
                //         novelties: angular.element(element[0].querySelectorAll('.' + classes.novelties)[0]),
                //
                //         stock: angular.element(element[0].querySelectorAll('.' + classes.stock)[0])
                //     };
                //
                //     checkboxes.checkbox.bind(EVENTS.ELEMENT.CLICK, function () {
                //         console.log(checkboxes.cheaper);
                //     });
                // }
            }
        };
    }]);
})();