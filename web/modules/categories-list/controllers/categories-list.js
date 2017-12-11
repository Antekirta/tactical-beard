(function () {
    'use strict';

    angular.module('categoriesList').controller('categoriesListCtrl', [
        '$scope',
        '$log',
        '$sce',
        '$state',
        'categoriesProvider',
        'translitFactory',
        'STATE_NAMES',

        function ($scope, $log, $sce, $state, categoriesProvider, translitFactory, STATE_NAMES) {
            $scope.categories = [];

            $scope.goToUICategoryState = function (state, promo) {
                if ( promo ) {
                    $state.go(STATE_NAMES.PROMO);
                } else {
                    $state.go(STATE_NAMES.CATEGORY, {
                        categoryId: state.params.categoryId,

                        categoryName: translitFactory.rusTolat(state.params.categoryName)
                    });
                }
            };

            $scope.helpers = {
                sortByOrder: function (a, b) {
                    const orderProp = 'sort_order';

                    try {
                        if ( !a.hasOwnProperty(orderProp) || !b.hasOwnProperty(orderProp) ) {
                            throw new SyntaxError('Wrong parameters in helpers.sortByOrder');
                        }

                        return a[orderProp] - b[orderProp];
                    } catch (err) {
                        $log.error(err);
                    }
                }
            };

            categoriesProvider.getCategories().then(
                function (response) {
                    let categories = _.toArray(response.data.data);

                    categories = _.sortBy(categories, [function (obj) {
                        return parseInt(obj.sort_order);
                    }]);

                    _.remove(categories, function (obj) {
                        // Sorry for that, I have no time:(
                        return obj.meta_title === '' || obj.category_id === '155';
                    });

                    categories.forEach(function (category,) {
                        category.image = '../img/categories/' + category.meta_alias + '.svg';
                    });

                    $scope.categories = setCategoriesImages(categories);
                },

                function (error) {
                    $log.error(error);
                }
            );

            function setCategoriesImages(categories) {
                const map = {
                    "АВТОМАТЫ": '../img/categories/auto.svg',
                    "АККУМУЛЯТОРЫ\\ЗАРЯДНЫЕ УСТРОЙСТВА и АКСЕССУАРЫ": "../img/categories/accums.svg",
                    "БРОНЕЖИЛЕТЫ и РАЗГРУЗКИ": "../img/categories/flac-ackets.svg",
                    "ЗАПЧАСТИ ВНЕШНИЕ": "../img/categories/outside-spare-parts.svg",
                    "ЗАПЧАСТИ ВНУТРЕННИЕ": '../img/categories/spare-parts.svg',
                    "МАГАЗИНЫ и АКСЕССУАРЫ": '../img/categories/accessories.svg',
                    "НОЖИ и МУЛЬТИТУЛЫ": '../img/categories/knifes.svg',
                    "ОДЕЖДА и ОБУВЬ": '../img/categories/clothes.svg',
                    "ОПТИЧЕСКИЕ и КОЛЛИМАТОРНЫЕ ПРИЦЕЛЫ, ЛЦУ, КРЕПЛЕНИЯ": '../img/categories/aims.svg',
                    "ОЧКИ И МАСКИ": '../img/categories/glasses.svg',
                    "ПЕРЧАТКИ\\НАКОЛЕННИКИ и НАЛОКОТНИКИ": '../img/categories/gloves.svg',
                    "ПИСТОЛЕТЫ": '../img/categories/pistols.svg',
                    "ПОДСУМКИ И КОБУРЫ": '../img/categories/holsters.svg',
                    "ПУЛЕМЕТЫ\\СНАЙПЕРСКИЕ ВИНТОВКИ\\ГРАНАТОМЕТЫ\\ДРОБОВИКИ": '../img/categories/other-weapons.svg',
                    "РАДИОСТАНЦИИ И ГАРНИТУРЫ, ФОНАРИ": '../img/categories/radios.svg',
                    "РЕМНИ ОРУЖЕЙНЫЕ и ПОЯСНЫЕ": '../img/categories/belts.svg',
                    "РЮКЗАКИ\\ЧЕХЛЫ\\ГИДРАТОРЫ": '../img/categories/backpacks.svg',
                    "СУВЕНИРЫ И ПАТЧИ": '../img/categories/patches.svg',
                    "ШАРЫ\\ГРАНАТЫ\\ГАЗ\\ТАГИ": '../img/categories/grenades.svg',
                    "ШЛЕМЫ\\МАСКИ\\БАЛАКЛАВЫ\\ПЛАТКИ": '../img/categories/helmets.svg'
                };

                categories.forEach(function (category) {
                    category.image = $sce.trustAsHtml(map[category.name]);
                });

                return categories;
            }
        }]);
})();