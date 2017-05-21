(function() {
    'use strict';

    var utils = angular.module('utils');

    utils.factory('dataStorage', function() {
        return {
            /**
             * Stores data either in localStorage or in localStorage
             * @param {String} name Name of parameter
             * @param {String} data The data to store
             * @param {Boolean} [storePerSession=undefined] Boolean flag indicating necessity of using localStorage in
             * favor of
             * localStorage
             */

            setData: function(name, data, storePerSession) {
                (storePerSession ? localStorage : localStorage).setItem(name, data);
            },

            /**
             * Extracts data either from localStorage or from localStorage
             * @param {String} name Name of parameter
             * @param {Boolean} storePerSession Boolean flag indicating necessity of using localStorage in favor of localStorage
             * @returns {String} data Result of querying storage
             */

            getData: function(name, storePerSession) {
                var storage = storePerSession ? localStorage : localStorage;

                return storage.getItem(name);
            },

            /**
             * Deletes data either from localStorage or from localStorage
             * @param {String} name name of parameter
             * @param {Boolean} storePerSession Boolean flag indicating necessity of using localStorage in favor of localStorage
             */

            removeData: function(name, storePerSession) {
                var storage = storePerSession ? localStorage : localStorage;

                return storage.removeItem(name);
            }
        };
    });
})();
