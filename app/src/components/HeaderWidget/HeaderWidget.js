(function() {
	'use strict';
	
	var header = angular.module('header', []);
	
	header.controller('headerCtrl', ['$scope', '$state', 'BASE_CONFIG', function($scope, $state, BASE_CONFIG) {
		var headerVm = this;
        headerVm.menu = BASE_CONFIG.APP_MENU;
        
        $scope.$on('changeQType', function(event, data){
            headerVm.activeType = data.type;
        });
        headerVm.doSearch = function(){
            if(headerVm.searchTerm && headerVm.searchTerm != ''){
                $('button.navbar-toggle:visible').click();
                $state.go('app.searchResult', { 'q':headerVm.searchTerm});
            }
        }
	}]);
})();