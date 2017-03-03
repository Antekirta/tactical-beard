(function() {
	'use strict';

	var fs = require('fs');

	var _ = require('lodash');

	var extensions = {
		js: '.js',

		sass: '.sass',

		html: '.html'
	};

	var root = 'web/modules/';

	var modulename = process.argv[2];

	var camelCaseModuleName = _.camelCase(modulename);

	var content = {
		module: [
			"(function() {",

			"\t'use strict';\n",

			"\tangular.module('" + camelCaseModuleName + "', []);",

			"})();"
		].join("\n"),

		controller: [
			"(function() {",

			"\t'use strict';\n",

			"\tvar " +  camelCaseModuleName + " = angular.module('" + camelCaseModuleName + "');\n",

			"\t" + camelCaseModuleName + ".controller('" + camelCaseModuleName + "Ctrl', ['$scope', function($scope) {\n",

			"\t}]);",

			"})();"
		].join("\n")
	};

	var messages = {
		moduleCreated: modulename + '.js has been created in: ' + root + modulename,

		controllerCreated: modulename + '.js has been created in: ' + root + modulename + '/controllers',

		sassCreated: modulename + '.sass has been created in: ' + root + modulename + '/sass',

		partialCreated: modulename + '.html has been created in: ' + root + modulename + '/partials'
	};

	// В папке root создать папку modulename
	fs.mkdirSync(root + modulename);

	// 2) В этой папке создать файл modulename.js
	fs.writeFileSync([root + modulename, modulename].join('/') + extensions.js, content.module);

	// 3) В этой папке создать папку controllers
	fs.mkdirSync([root + modulename, 'controllers'].join('/'));

	// 4) В папке controllers создать файл modulename.js
	fs.writeFileSync([root + modulename, 'controllers', modulename].join('/') + extensions.js, content.controller);

	// 5) В папке root создать папку sass
	fs.mkdirSync([root + modulename, 'sass'].join('/'));

	// 6) В этой папке создать файл modulename.sass
	fs.writeFileSync([root + modulename, 'sass', modulename].join('/') + extensions.sass, '');

	// 7) В папке root создать папку partials
	fs.mkdirSync([root + modulename, 'partials'].join('/'));

	// 8) В этой папке создать файл modulename.html
	fs.writeFileSync([root + modulename, 'partials', modulename].join('/') + extensions.html, '');

	console.log(messages.moduleCreated);
	console.log(messages.controllerCreated);
	console.log(messages.sassCreated);
	console.log(messages.partialCreated);
})();