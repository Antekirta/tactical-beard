(function () {
    'use strict';

    angular.module('utils')
        .directive('emailValidation', [
            '$q',

            'REGEXP',

            'EVENTS',

            'MAX_EMAIL_LENGTH',

            function ($q, REGEXP, EVENTS, MAX_EMAIL_LENGTH) {
                return {
                    restrict: 'A',

                    require: 'ngModel',

                    link: function (scope, element, attrs, ctrl) {
                        // declare validators

                        /**
                         * This method checks matching of email to a regular expression
                         * @param {String} modelValue email for check
                         * @returns {Boolean} true, if email matches to a regular expression
                         */

                        ctrl.$validators.emailPatternCorrect = function (modelValue) {
                             if ( !_.isString(modelValue) ) {
                                return false;
                            }

                            return REGEXP.EMAIL.test(modelValue);
                        };

                        /**
                         * This method checks, whether email does not exceed maximum length
                         * @param {String} modelValue email for check
                         * @returns {Boolean} true, if email matches to a regular expression
                         */

                        ctrl.$validators.emailLengthCorrect = function (modelValue) {
                            if ( !_.isString(modelValue) ) {
                                return false;
                            }

                            return modelValue.length <= MAX_EMAIL_LENGTH;
                        };
                    }
                };
            }
        ]);
})();