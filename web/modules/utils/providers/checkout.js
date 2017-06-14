(function () {
    'use strict';

    angular.module('utils')
        .provider('checkoutProvider', function () {
            this.$get = [
                '$http',

                '$q',

                'REST_API',

                function ($http, $q, REST_API) {
                    var req = {
                        method: 'POST',

                        dataType: 'jsonp',

                        headers: {
                            'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID,

                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };

                    return {
                        createGuest: function () {
                            req.url = REST_API.GUEST;

                            return $http(req)
                                .then(
                                    function (response) {
                                        console.log('response: ', response);
                                    }
                                );
                        }
                    };
                }];
        });
})();