(function () {
    'use strict';

    angular.module('auth')
        .provider('authProvider', function () {
            this.$get = [
                '$http',

                'REST_API',

                function ($http, REST_API) {
                    const req = {
                        dataType: 'json',

                        headers: {
                            'X-Oc-Merchant-Id': REST_API.X_OC_MERCHANT_ID,

                            'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
                        }
                    };

                    function getUserByEmail(email) {
                        const url = REST_API.CUSTOMERS.GET_CUSTOMER_BY_EMAIL + '/'  + email;

                        console.log(url);
                        console.log('http://tacbeard.com/backend/api/rest_admin/customers/email/nash1@vipmail.hu');

                        return $http.get(url, req)
                            .then(function (response) {
                                console.log('auth provides getUserByEmail response: ', response);

                                return response;
                            });
                    }

                    function createUser(email) {
                        const url = REST_API.CUSTOMERS.GET_CUSTOMER_BY_EMAIL + '/'  + email;

                        console.log(url);
                        console.log('http://tacbeard.com/backend/api/rest_admin/customers/email/nash1@vipmail.hu');

                        return $http.get(url, req)
                            .then(function (response) {
                                console.log('auth provides getUserByEmail response: ', response);

                                return response;
                            });
                    }

                    return {
                        getUserByEmail: getUserByEmail
                    };
                }
            ];
        });
})();