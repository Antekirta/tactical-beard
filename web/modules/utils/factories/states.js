(function () {
    'use strict';
    
    var utils = angular.module('utils');
    
    utils.factory('statesFactory', [
        '$state',
        '$stateParams',
        
        function ($state, $stateParams) {
            return {
                getCurrentState: function () {
                    return $state.current;
                },

                changeState: function (state, shouldGo) {
                    if ( !shouldGo ) {
                        $state.go('category', {categoryName: state.params.categoryName});
                    }
                }
            };
    }]);
})();