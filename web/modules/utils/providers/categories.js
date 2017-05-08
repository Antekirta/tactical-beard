(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('categoriesProvider', function() {
		this.$get = [
			'$http',

			'$q',

			'REST_API',

			'dataStorage',

			function($http, $q, REST_API, dataStorage) {
				var req = {
					method: 'GET',

					dataType: 'jsonp',

					headers: {
						'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
					}
				};

				return {
					getCategories: function() {
						req.url = REST_API.CATEGORIES;

						return $http(req).then(
							function(response) {
								response = {"data":{"success":true,"data":{"categories":{"59":[{"category_id":"59","name":"АВТОМАТЫ","description":"&lt;p&gt;fdsfsdfsd&lt;/p&gt;","sort_order":"1","meta_title":"Страйкбольные автоматы","meta_alias":"auto","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"60":[{"category_id":"60","name":"АККУМУЛЯТОРЫ\\ЗАРЯДНЫЕ УСТРОЙСТВА и АКСЕССУАРЫ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"5","meta_title":"Аккумуляторы и зарядные устройства","meta_alias":"accums","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"61":[{"category_id":"61","name":"БРОНЕЖИЛЕТЫ и РАЗГРУЗКИ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"13","meta_title":"Бронежилеты и разгрузки","meta_alias":"flac-ackets","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"62":[{"category_id":"62","name":"ЗАПЧАСТИ ВНЕШНИЕ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"8","meta_title":"Внешние запчасти","meta_alias":"outside-spare-parts","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"71":[{"category_id":"71","name":"ЗАПЧАСТИ ВНУТРЕННИЕ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"7","meta_title":"Внутренние запчасти","meta_alias":"spare-parts","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"72":[{"category_id":"72","name":"МАГАЗИНЫ и АКСЕССУАРЫ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"6","meta_title":"Магазины и аксессуары","meta_alias":"accessories","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"73":[{"category_id":"73","name":"НОЖИ и МУЛЬТИТУЛЫ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"17","meta_title":"Ножи и мультитулы","meta_alias":"knifes","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"74":[{"category_id":"74","name":"ОДЕЖДА","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"19","meta_title":"Одежда","meta_alias":"clothes","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"77":[{"category_id":"77","name":"ОПТИЧЕСКИЕ и КОЛЛИМАТОРНЫЕ ПРИЦЕЛЫ, ЛЦУ, КРЕПЛЕНИЯ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"9","meta_title":"Прицельные приспособления","meta_alias":"aims","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"78":[{"category_id":"78","name":"ОЧКИ И МАСКИ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"10","meta_title":"Очки и защита глаз","meta_alias":"glasses","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"79":[{"category_id":"79","name":"ПЕРЧАТКИ\\НАКОЛЕННИКИ и НАЛОКОТНИКИ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"12","meta_title":"Перчатки, наколенники и налокотники","meta_alias":"gloves","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"80":[{"category_id":"80","name":"ПИСТОЛЕТЫ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"2","meta_title":"Страйкбольные пистолеты","meta_alias":"pistols","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"81":[{"category_id":"81","name":"ПОДСУМКИ И КОБУРЫ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"14","meta_title":"Подсумки и кобуры","meta_alias":"holsters","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"82":[{"category_id":"82","name":"ПУЛЕМЕТЫ\\СНАЙПЕРСКИЕ ВИНТОВКИ\\ГРАНАТОМЕТЫ\\ДРОБОВИКИ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"3","meta_title":"Другое страйкбольное оружие","meta_alias":"other-weapons","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"83":[{"category_id":"83","name":"РАДИОСТАНЦИИ И ГАРНИТУРЫ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"18","meta_title":"Радиостанции и гарнитуры","meta_alias":"radios","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"87":[{"category_id":"87","name":"РЕМНИ ОРУЖЕЙНЫЕ и ПОЯСНЫЕ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"16","meta_title":"Ремни оружейные и поясные","meta_alias":"belts","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"88":[{"category_id":"88","name":"РЮКЗАКИ\\ЧЕХЛЫ\\ГИДРАТОРЫ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"15","meta_title":"Рюкзаки / Чехлы Гидраторы","meta_alias":"backpacks","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"89":[{"category_id":"89","name":"Снаряжение","description":"","sort_order":"0","meta_title":"","meta_alias":"","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"90":[{"category_id":"90","name":"СУВЕНИРЫ И ПАТЧИ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"20","meta_title":"Сувениры и патчи","meta_alias":"patches","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"91":[{"category_id":"91","name":"ШАРЫ\\ГРАНАТЫ\\ГАЗ\\ТАГИ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"4","meta_title":"Шары/Гранаты/Газ","meta_alias":"grenades","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}],"92":[{"category_id":"92","name":"ШЛЕМЫ\\МАСКИ\\БАЛАКЛАВЫ\\ПЛАТКИ","description":"&lt;p&gt;&lt;br&gt;&lt;/p&gt;","sort_order":"11","meta_title":"Шлемы / Маски / Платки","meta_alias":"helmets","meta_description":"","meta_keyword":"","language_id":"1","image":null,"categories":null}]}}},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","dataType":"jsonp","headers":{"X-Oc-Restadmin-Id":"4562314431343","Accept":"application/json, text/plain, */*"},"url":"http://tacticalbeard39.com/api/rest_admin/categories"},"statusText":"OK"}
								// console.log('response: ', JSON.stringify(response));
								return response;
                                // var categories = JSON.parse(dataStorage.getData('categories', true)) || {};
                                //
                                // if ( !_.isEmpty(categories) ) {
                                //     return categories;
                                // } else {
                                //     categories = response;
                                //
                                //     dataStorage.setData('categories', JSON.stringify(categories), true);
                                // }
                                //
                                // return categories;
							},

							function(error) {
								return $q.reject(error);
							}
						);
					},

					getSubCategories: function (id) {
                        req.url = REST_API.CATEGORIES + '/parent/' + id + '/';

                        return $http(req).then(
                            function(response) {
                                return response;
                            },

                            function(error) {
                                return $q.reject(error);
                            }
                        );
                    }
				};
			}
		];
	});
})();
