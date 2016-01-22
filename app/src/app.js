(function() {
	'use strict';
	
	/*
	 * @desc Injecting the sub module into main module
	 */
	var app = angular.module('myProject', ['ui.router', 'ui.bootstrap',
		'header', 'footer', 'home', 'questionAnswer', 'updateQusAns', 'searchResult', 'textAngular'
	]);
	/*
	 * @desc Define the constant value which access through the application
	 */
	app.constant('BASE_CONFIG', {
		API_HOST : 'https://qxLl5Rl0U6Z0Iw0UFYqxgPhVVFuynSkS:@jamesmj.east-us.azr.facetflow.io/qus_ans/',
        APP_MENU : ['HTML', 'CSS', 'JS', 'JQuery', 'AngularJS', 'BackboneJS', 'Java', 'GWT', 'Others']
	});
	/*
	 * @desc Invoke the function before launch the application.
	 */
	app.run(['$state', '$http', function($state, $http) {
		// Go to default page
        $http.defaults.headers.common.Authorization = 'Basic cXhMbDVSbDBVNlowSXcwVUZZcXhnUGhWVkZ1eW5Ta1M6'
		$state.go('app.home');
	}]);
	/*
	 * @desc Define state level configuration.
	 */
	app.config(['$stateProvider', '$httpProvider', stateConfig]);
	
	function stateConfig($stateProvider, $httpProvider) {
		$stateProvider.state('app', {
			url : '',
			abstract : true,
			resolve : {
				appEvent: function() {
					return {
					  spinnerVisible: false,
					  spinnerShow: function() {
						this.spinnerVisible = true;
					  },
					  spinnerHide: function() {
						this.spinnerVisible = false;
					  }
					};
				}
			},
			views : {
				'header@' : {
					templateUrl : 'components/HeaderWidget/HeaderWidget.html',
					controller : 'headerCtrl',
					controllerAs : 'headerVm'
				},
				'footer@' : {
					templateUrl : 'components/FooterWidget/FooterWidget.html',
					controller : 'footerCtrl',
					controllerAs : 'footerVm'
				}
			}
		}).state('app.getData', {
            url : '/getData',
            views : {
                '@' : {
                    template : '<div>{{getDataVm.qalist}}</div>',
                    controller : ['questionAnswerService', function(questionAnswerService) {
                        var getDataVm = this;
                        getDataVm.qalist = 'loading...';
                        questionAnswerService.getAllQAList().success(function(data){
                            var hitList = data.hits.hits;
                            var response = {};
                            angular.forEach(hitList, function(hit){
                                if(!response[hit._type]){
                                    response[hit._type] = [];
                                }
                                response[hit._type].push(hit._source);
                            });
                            getDataVm.qalist = response;
                        }).error(function(data){
                            getDataVm.qalist = data;
                        });
                    }],
                    controllerAs : 'getDataVm'
                }
            }
        });
	}
})();