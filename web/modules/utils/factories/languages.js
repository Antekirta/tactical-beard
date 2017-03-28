(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.factory('languages', function() {
		var languages = [
			{
				fullName: 'English',

				short: 'en',

				order: 0,

				active: false
			},

			{
				fullName: 'Русский',

				short: 'ru',

				order: 1,

				active: true
			},

			{
				fullName: 'Polish',

				short: 'pl',

				order: 2,

				active: false
			}
		];

		return {
			getLanguages: function() {
				return languages;
			},

			setCurrentLanguage: function(num) {
				languages.forEach(function(element) {
					languages[element.order].active = element.order === num;
				});
			}
		};
	});
})();