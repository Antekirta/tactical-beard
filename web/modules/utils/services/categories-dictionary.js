(function () {
    'use strict';

    angular.module('utils')
        .service('categoriesDictionary', [
            '$log',

            'categoriesProvider',

            'translitFactory',

            function ($log, categoriesProvider, translitFactory) {
                return categoriesProvider.getCategoriesForLevel()
                    .then(
                        function (response) {
                            let dictionary = {};

                            let categories = _.toArray(response.data.data);

                            // Create object, where keys are transliterated category names and values are id of these categories

                            categories.forEach(function (category) {
                                let transliterated = translitFactory.rusTolat(category.name);

                                dictionary[transliterated] = category.category_id;

                                if ( category.categories ) {
                                    _.toArray(category.categories).forEach(function (subCategory) {
                                        transliterated = translitFactory.rusTolat(subCategory.name);

                                        dictionary[transliterated] = subCategory.category_id;
                                    });
                                }
                            });

                            return dictionary;
                        }
                    );
            }]);
})();