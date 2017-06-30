(function() {
    'use strict';

    angular.module('utils').provider('regionsProvider', function() {
        this.$get = [
            '$http',

            '$q',

            'REST_API',

            'REGIONS',

            function($http, $q, REST_API, REGIONS) {
                const regions = REGIONS;

                return {
                    getRegions: function () {
                        return regions;
                    },

                    getCitiesInRegion: function (region) {
                        const req = {};

                        const url = REST_API.GEO_NAMES.SEARCH + 'user=' + REST_API.GEO_NAMES_USER + '&q=Moscow';

                        $http.get(url)
                            .then(
                                function (response) {
                                    console.log('GEO NAMES response', response);
                                }
                            );

                        return [
                            {name: 'Калининград'},
                            {name: 'Санкт-Петербург'}
                        ];
                    }
                };
            }
        ];
    });
})();
