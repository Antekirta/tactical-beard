(function () {
    'use strict';
    
    var utils = angular.module('utils');
    
    utils.factory('dateFactory', ['DATE', function (DATE) {
        return {
            substractPeriodFromCurrentDate: function (dayCount) {
                var currentDate = new Date();

                var substracted = currentDate.getTime() - DATE.DATE_TRANSFER.MS_IN_SEC * DATE.DATE_TRANSFER.SEC_IN_MIN * DATE.DATE_TRANSFER.MIN_IN_HOUR * DATE.DATE_TRANSFER.HOUR_IN_DAY * dayCount;

                return new Date(substracted);
            },
            
            dateToFormat: function (date) {
                var day = date.getDate(),
                    month = date.getMonth(),
                    year = date.getFullYear();

                if ( day < 10 ) {
                    day = '0' + day;
                }

                if ( month < 10 ) {
                    month = '0' + month;
                }

                return year.toString() + '-' + month.toString() + '-' + day.toString();
            }
        };
    }]);
})();