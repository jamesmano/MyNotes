(function() {
	'use strict';
	
	/*
	 * @desc Injecting the home sub module into home main module
	 */
	var questionAnswer = angular.module('searchResult', ['ui.router']);
	/*
	 * @desc Define home state level configuration.
	 */
	questionAnswer.config(['$stateProvider', stateConfig]);
    questionAnswer.controller('searchResultCtrl', ['$stateParams', '$scope', 'searchResultSevice', controller]);
	
	function stateConfig($stateProvider) {
		$stateProvider.state('app.searchResult', {
			url : '/searchResult?q',
            resolve : {
                questionList : ['$stateParams', '$rootScope', 'searchResultSevice', searchResultResolve]
            },
			views : {
				'@' : {
					templateUrl : 'pages/SearchResultPage/SearchResultPage.html',
					controller : 'searchResultCtrl',
					controllerAs : 'searchResultVM'
				}
			}
		})
	}
    
    function searchResultResolve($stateParams, $rootScope, updateQusAnsSevice){
        var query = $stateParams.q ? $stateParams.q : '';
        updateQusAnsSevice.getResult(query).success(function(successRes){
            updateQusAnsSevice.setResult(successRes.hits.hits);
            $rootScope.$broadcast('searchResultUpdated', {});
        }).error(function(errorRes){ 
            console.log('Error...', errorRes);
        });
        return{};
    }
    
    function controller($stateParams, $scope, searchResultSevice) {
        var searchResultVM = this;
        $scope.$on('searchResultUpdated', function(event, data){
            searchResultVM.searchResults = searchResultSevice.fetchResult();
        });
        searchResultVM.query = $stateParams.q ? $stateParams.q : '';
        searchResultVM.searchResults = searchResultSevice.fetchResult();
    }
})();
