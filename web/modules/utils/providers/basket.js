(function () {
    'use strict';

    angular.module('utils')
        .provider('basketProvider', function () {
            this.$get = [
                '$http',

                '$q',

                'REST_API',

                function ($http, $q, REST_API) {
                    const req = {
                        dataType: 'json',

                        headers: {
                            'X-Oc-Merchant-Id': REST_API.X_OC_MERCHANT_ID
                        }
                    };

                    return {
                        addItem: function (product) {
                            
                        }
                    };
                }
            ];
        });
})();