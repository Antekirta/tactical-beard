(function () {
    'use strict';

    var mainMenu = angular.module('mainMenu');

    mainMenu.directive('mainMenu', [
        'EVENTS',

        function (EVENTS) {
            return {
                restrict: 'A',

                controller: 'mainMenuCtrl',

                templateUrl: 'modules/main-menu/partials/main-menu.html',

                link: function (scope, element, attrs) {
                    const classes = {
                        toggler: 'main-menu__toggler',

                        link: 'main-menu__link',

                        opened: 'main-menu--opened'
                    };

                    const toggler = element.find('.' + classes.toggler);

                    const link = element.find('.' + classes.link);

                    const handlers = {
                        togglemenu: function () {
                            $(element).toggleClass(classes.opened);
                        },

                        removeMenu: function () {
                            $(element).removeClass(classes.opened);
                        }
                    };

                    toggler.on(EVENTS.ELEMENT.CLICK, handlers.togglemenu);
                    link.on(EVENTS.ELEMENT.CLICK, handlers.removeMenu);
                }
            };
        }]);
})();