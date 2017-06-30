(function () {
    'use strict';
    
    var utils = angular.module('utils');
    
    utils.directive('dropdownSelect', ['$timeout', 'EVENTS', function ($timeout, EVENTS) {
        return {
            restrict: 'EA',

            scope: {
                itemsList: '=',
                placeholder: '@',
                model: '='
            },

            templateUrl: 'modules/utils/directives/dropdown-select/dropdown-select.html',

            link: function(scope, element, attrs){
                console.log('scope.model: ', scope.model);
                const classes = {
                    container: 'dropdown-select__list-container',

                    show: 'dropdown-select__list-container--show'
                };

                const listContainer = angular.element( element[0].querySelectorAll('.' + classes.container)[0] );

                element.find('input').bind(EVENTS.ELEMENT.FOCUS, function(){
                    listContainer.addClass(classes.show);
                });

                element.find('input').bind(EVENTS.ELEMENT.BLUR, function(){
                    /*
                     * 'blur' реагирует быстрее чем ng-click,
                     * поэтому без $timeout chooseItem не успеет поймать item до того, как лист исчезнет
                     */
                    $timeout(function(){
                        listContainer.removeClass(classes.show)
                    }, 150);
                });

                scope.dropdownSelect = {
                    search: scope.model,

                    selectItem: function(item){
                        scope.dropdownSelect.search = item.name;

                        scope.model = scope.dropdownSelect.search;

                        scope.$emit('dropdownSelectItemSelected', scope.dropdownSelect.search);

                        listContainer.removeClass(classes.show);
                    }
                };
            }
        };
    }]);
})();