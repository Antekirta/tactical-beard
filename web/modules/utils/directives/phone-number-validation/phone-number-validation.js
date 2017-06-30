(function () {
    'use strict';

    angular.module('utils')
        .directive('phoneNumberValidation', [
            '$q',

            'REGEXP',

            'EVENTS',

            'MAX_PHONE_NUMBER_LENGTH',

            function ($q, REGEXP, EVENTS, MAX_PHONE_NUMBER_LENGTH) {
                return {
                    restrict: 'A',

                    require: 'ngModel',

                    link: function (scope, element, attrs, ctrl) {
                        // declare validators

                        /**
                         * This method checks matching of phone number to a regular expression
                         * @param {String} modelValue phone number for check
                         * @returns {Boolean} true, if phone number matches to a regular expression
                         */

                        ctrl.$validators.phoneNumberPatternCorrect = function (modelValue) {
                            if ( !_.isString(modelValue) ) {
                                return false;
                            }

                            return REGEXP.PHONE_NUMBER.test(modelValue);
                        };

                        /**
                         * This method checks, whether phone number does not exceed maximum length
                         * @param {String} modelValue phone number for check
                         * @returns {Boolean} true, if phone number matches to a regular expression
                         */

                        ctrl.$validators.phoneNumberLengthCorrect = function (modelValue) {
                            if ( !_.isString(modelValue) ) {
                                return false;
                            }

                            return modelValue.length <= MAX_PHONE_NUMBER_LENGTH;
                        };
                    }
                };
            }
        ]);
})();