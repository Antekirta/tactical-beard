(function () {
    'use strict';

    angular.module('utils')
        .factory('countriesFactory', [
            '$http',
            
            'REST_API',

            function ($http, REST_API) {
                const req = {
                    dataType: 'json',

                    headers: {
                        'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
                    }
                };

                return {
                    getCountries: function () {
                        return $http.get(REST_API.COUNTRIES, req)
                            .then(
                                function (response) {
                                    console.log('getCountries response: ', response);
                                }
                            );
                    },

                    getCountryById: function (id) {
                        const url = REST_API.COUNTRIES + '&id=' + id ;

                        return $http.get(url, req)
                            .then(
                                function (response) {
                                    console.log('getCountryById response: ', response);

                                    return response.data.data.zone;
                                }
                            );
                    }
                };
            }
        ]);
})();