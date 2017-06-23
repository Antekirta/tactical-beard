(function () {
    'use strict';

    angular.module('utils')
        .service('session', [
            '$http',

            '$q',

            '$log',

            'REST_API',

            'LOCAL_STORAGE',

            function ($http, $q, $log, REST_API, LOCAL_STORAGE) {
                const req = {
                    dataType: 'json',

                    headers: {
                        'X-Oc-Merchant-Id': REST_API.X_OC_MERCHANT_ID,
                    }
                };

                return {
                    getCurrentSession: function () {
                        let session = localStorage.getItem(LOCAL_STORAGE.SESSION);

                        if ( session ) {
                            let deferred = $q.defer();

                            deferred.resolve(session);

                            return deferred.promise;
                        }

                        return $http.get(REST_API.SESSION, req)
                            .then(
                                function (response) {
                                    session = response.data.data.session;

                                    localStorage.setItem(LOCAL_STORAGE.SESSION, response.data.data.session);

                                    return session;
                                }
                            );
                    },

                    finishCurrentSession: function () {
                        localStorage.removeItem(LOCAL_STORAGE.SESSION);
                    }
                };
            }]);
})();