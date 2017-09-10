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

                        return $http.get(url, req)
                            .then(function (response) {
                                return response;
                            });
                    }

                    function createUser(userParams) {
                        const userData = {
                            "firstname": userParams.firstName,
                            "lastname": userParams.lastName,
                            "email": userParams.email,
                            "password": userParams.password,
                            "confirm": userParams.password,
                            "telephone": userParams.tel,
                            "fax": userParams.fax,
                            "newsletter": userParams.newsletter || 1,
                            "status": userParams.status || 1,
                            "approved": userParams.approved || 1,
                            "safe": userParams.safe || 1,
                            "customer_group_id": userParams.customerGroup || 1,
                            "custom_field": {
                                "password": userParams.password
                            },
                            "address": [
                                {
                                    "firstname": userParams.firstName,
                                    "lastname": userParams.lastName,
                                    "company": userParams.company,
                                    "city": userParams.city,
                                    "address_1": userParams.address,
                                    "country_id": userParams.countryId,
                                    "postcode": userParams.postCode,
                                    "zone_id": userParams.zoneId,
                                    "address_2": userParams.address,
                                    "address_id": userParams.addressId,
                                    "default": userParams.default
                                }
                            ]
                        };

                        console.log('auth-provider userData: ', userData);

                        return $http.post(REST_API.CUSTOMERS.CUSTOMERS, userData, req)
                            .then(function (response) {
                                console.log('auth provides createUser response: ', response);

                                return response;
                            });
                    }

                    return {
                        getUserByEmail: getUserByEmail,

                        createUser: createUser
                    };
                }
            ];
        });
})();