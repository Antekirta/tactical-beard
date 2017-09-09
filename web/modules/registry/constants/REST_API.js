(function() {
	'use strict';

	const registry = angular.module('registry');

    const site = 'http://tacbeard.com/backend';

	registry.constant('REST_API', {
		'X_OC_RESTADMIN_ID': '4562314431343',

		'X_OC_MERCHANT_ID': '874567456465746',

		'GEO_NAMES_USER': 'kirill.murashkin',

		'COUNTRIES': site + '/index.php?route=rest/helpers/countries',

		'BASKET': site + '/api/rest/cart',

		'CATEGORIES': site + '/api/rest_admin/categories',

		'PRODUCTS': site + '/api/rest_admin/products',

		'SEARCH_PRODUCTS': site + '/index.php?route=rest/product_admin/products&',

		'SEARCH_PRODUCTS_BY_NAME': site + '/index.php?route=rest/product_admin/products&search=',

		'MANUFACTURERS': site + '/api/rest_admin/manufacturers',

		'SESSION': site + '/index.php?route=feed/rest_api/session',

		'CART': site + '/index.php?route=rest/cart/cart',

		'BULK_CART': site + '/index.php?route=rest/cart/bulkcart',

		'EMPTY_CART': site + '/index.php?route=rest/cart/emptycart',

		'GUEST': site + '/index.php?route=rest/guest/guest',

		'GUEST_SHIPPING': site + '/index.php?route=rest/guest_shipping/guestshipping',

		'GET_SHIPPING_METHODS': site + '/index.php?route=rest/shipping_method/shippingmethods',

		'SET_SHIPPING_METHOD': site + '/index.php?route=rest/shipping_method/shippingmethods',

		'GET_PAYMENT_METHODS': site + '/index.php?route=rest/payment_method/payments',

		'SET_PAYMENT_METHOD': site + '/index.php?route=rest/payment_method/payments',

		'CONFIRM_ORDER': site + '/index.php?route=rest/confirm/confirm',

		'PAY_ORDER': site + '/index.php?route=rest/confirm/confirm&page=pay',

		'GEO_NAMES': {
			'SEARCH': 'http://api.geonames.org/searchJSON?'
		},

		CUSTOMERS: {
			GET_CUSTOMER_BY_EMAIL: 'http://tacbeard.com/backend/api/rest_admin/customers/email'
		}
	});
})();