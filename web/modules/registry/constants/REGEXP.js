(function () {
    'use strict';

    angular.module('registry').constant('REGEXP', {
        EMAIL: /^[a-zA-Z0-9](?:[a-zA-Z0-9]?(?:[\+\-\\'\._](?![\+\\'\.@]))??){0,63}@(?:[ёа-яА-Яa-zA-Z0-9](?:(?:[ёа-яА-Яa-zA-Z0-9\-](?!-\.))??){1,}?\.){1,2}?[ёа-яА-Яa-zA-Z0]{2,6}?$/i,

        'PHONE_NUMBER': /^[\d-+\s]+$/
    });
})();
