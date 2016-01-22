(function() {
	'use strict';
	
	/*
	 * @desc Injecting the home sub module into home main module
	 */
	var home = angular.module('home', ['ui.router']);
	/*
	 * @desc Define home state level configuration.
	 */
	home.config(['$stateProvider', stateConfig]);
    home.controller('homeCtrl', ['$rootScope', controller]);
	
	function stateConfig($stateProvider) {
		$stateProvider.state('app.home', {
			url : '/',
			views : {
				'@' : {
					templateUrl : 'pages/HomePage/HomePage.html',
					controller : 'homeCtrl',
					controllerAs : 'homeVm'
				}
			}
		});
	}
    
    function controller($rootScope) {
        $rootScope.$broadcast('changeQType', { 'type' :''});
        var homeVm = this;
    }
})();
