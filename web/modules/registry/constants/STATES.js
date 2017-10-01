(function() {
	'use strict';

	const registry = angular.module('registry');

	let pathToPartial = function(moduleName){
		return 'modules/' + moduleName + '/partials/' + moduleName + '.html';
	};

    let pathToInnerPage = function pathToPartial(page) {
        return 'modules/inner-pages/partials/' + page + '.html';
    };

    let pathToController = function(moduleName) {
		return 'modules/' + moduleName + '/controllers/' + moduleName + '.html';
	};

	registry.constant('STATE_NAMES', {
		'HOME': 'home',
		'CATEGORIES': 'categories',
		'SEARCH': 'search',
		'PROMO': 'promo',
		'CATEGORY': 'category',
		'PRODUCT': 'product',
		'MAKE_ORDER': 'make-order',
		'ORDER_DONE': 'order-done',
		'BASKET': 'basket',
		'INFO_LIST_PAGE': 'info-list-page',
		'INFO_PAGE': 'info-page',
		'BOOKMARKS_PAGE': 'bookmarks-page',
		'PERSONAL_ACCOUNT_PAGE': 'personal-account-page'
	});

	registry.constant('STATES', [
		{
            name: 'home',
            url: '/',
            templateUrl: pathToPartial('main-page'),
            data: {
                pageTitle: 'Тактическая борода - продажа, аренда и ремотнт страйкбольного оборудования, организация игр'
            }
        },

        {
            name: 'register',
            url: '/register',
            templateUrl: 'modules/auth/partials/register.html'
        },

		{
			name: 'categories',
			url: '/categories/',
			controller: 'categoriesPageCtrl',
			templateUrl: pathToPartial('categories-page'),
            data: {
                pageTitle: 'Категории'
            }
		},

        {
            name: 'search',
            url: '/categories/search/?{search}',
            params: {
                search: null
            },
            templateUrl: pathToPartial('products-list-page'),
            data: {
                pageTitle: 'Поиск товара'
            }
        },

        {
            name: 'promo',
            url: '/categories/promo/',
            params: {
                search: null
            },
            templateUrl: pathToPartial('products-list-page'),
            data: {
                pageTitle: 'Товары по акции'
            }
        },

		{
			name: 'category',
			url: '/categories/{categoryName}/',
			params: {
                categoryId: null,

				categoryName: null
			},
			templateUrl: pathToPartial('products-list-page'),
            data: {
                pageTitle: 'Страница категории'
            }
		},

		{
			name: 'product',
            url: '/categories/{categoryNameForUrl}/{productName}/?{productId}',
			params: {
				productId: null,

				productName: null,

				categoryName: null,

                categoryNameForUrl: null
			},
			controller: 'productPageCtrl',
			templateUrl: pathToPartial('product-page'),
            data: {
                pageTitle: 'Страница товара'
            }
		},

		{
			name: 'make-order',
			url: '/make-order/',
			templateUrl: pathToPartial('make-order-page'),
            data: {
                pageTitle: 'Оформление заказа'
            }
		},

		{
			name: 'order-done',
			url: '/order-done/',
			templateUrl: pathToPartial('order-done-page'),
            data: {
                pageTitle: 'Спасибо за покупку!'
            }
		},

		{
			name: 'basket',
			url: '/basket/',
			templateUrl: pathToPartial('basket-page'),
            data: {
                pageTitle: 'Корзина'
            }
		},

		{
			name: 'info-list-page',
			url: '/info/:infoType/', //news or articles or something else
			templateUrl: pathToPartial('info-list-page')
		},

		{
			name: 'info-page',
			url: '/info/:infoType/:pageName/',
			templateUrl: pathToPartial('info-page'),
            data: {
                pageTitle: 'Информационная страница'
            }
		},

        {
            name: 'about',
            url: '/about/',
            templateUrl: pathToInnerPage('about'),
            data: {
                pageTitle: 'О магазине'
            }
        },

		{
            name: 'delivery-and-payment',
            url: '/delivery-and-payment/',
            templateUrl: pathToInnerPage('delivery-and-payment'),
            data: {
                pageTitle: 'Оплата и доставка'
            }
        },

		{
            name: 'wholesale',
            url: '/wholesale/',
            templateUrl: pathToInnerPage('wholesale'),
            data: {
                pageTitle: 'Оптовым покупателям'
            }
        },

        {
            name: 'contacts',
            url: '/contacts/',
            templateUrl: pathToInnerPage('contacts'),
            data: {
                pageTitle: 'Контакты'
            }
        },

        {
            name: 'repair',
            url: '/repair/',
            templateUrl: pathToInnerPage('repair'),
            data: {
                pageTitle: 'Ремонт страйкбольного оборудования'
            }
        },

        {
            name: 'rent',
            url: '/rent/',
            templateUrl: pathToInnerPage('rent'),
            data: {
                pageTitle: 'Прокат страйкбольного оборудования'
            }
        },

        {
            name: 'arrange-game',
            url: '/arrange-game/',
            templateUrl: pathToInnerPage('arrange-game'),
            data: {
                pageTitle: 'Организация игр'
            }
        },

        {
            name: 'juridical-info',
            url: '/juridical-info/',
            templateUrl: pathToInnerPage('juridical-info'),
            data: {
                pageTitle: 'Юридическая информация'
            }
        },

		{
			name: 'bookmarks-page',
			url: '/bookmarks/',
			templateUrl: pathToPartial('bookmarks-page'),
            data: {
                pageTitle: 'Закладки'
            }
		},

		{
			name: 'personal-account-page',
			url: '/account/',
			templateUrl: pathToPartial('personal-account-page'),
            data: {
                pageTitle: 'Профиль пользователя'
            }
		}
	]);
})();