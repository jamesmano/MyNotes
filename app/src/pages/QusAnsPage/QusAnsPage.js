(function() {
	'use strict';
	
	/*
	 * @desc Injecting the home sub module into home main module
	 */
	var questionAnswer = angular.module('questionAnswer', ['ui.router', 'qusAnsWidget']);
	/*
	 * @desc Define home state level configuration.
	 */
	questionAnswer.config(['$stateProvider', stateConfig]);
    questionAnswer.controller('questionAnserCtrl', ['$scope', '$rootScope', '$state', '$stateParams','questionAnswerService', controller]);
	
	function stateConfig($stateProvider) {
		$stateProvider.state('app.qusAns', {
			url : '/qustion?qtype',
            resolve : ['$rootScope', '$stateParams', 'questionAnswerService', qusAnsResolve],
			views : {
				'@' : {
					templateUrl : 'pages/QusAnsPage/QusAnsPage.html',
					controller : 'questionAnserCtrl',
					controllerAs : 'questionAnserVM'
				}
			}
		}).state('app.qusAns.qno', {
            url : '/qno?qno',
            templateUrl : 'components/QusAnsViewWidget/QusAnsViewWidget.html',
            controller : 'qusAnsWidgetCtrl',
            controllerAs : 'qusAnsWidgetVM'
        });
	}
    
    function qusAnsResolve($rootScope, $stateParams, questionAnswerService){
        questionAnswerService.getListOfQuestions($stateParams.qtype).success(function(successRes){
            questionAnswerService.setContentList(successRes.hits.hits);
            $rootScope.$broadcast('qusAnsUpdated', {});
        }).error(function(errorRes){ 
            console.log('Error...', errorRes);
        });
        return{};
    }
    
    function controller($scope, $rootScope, $state, $stateParams, questionAnswerService) {
        var questionAnserVM = this;
        questionAnserVM.qtype = $stateParams.qtype;
        //TODO check $scope and $rootScope need or not
        $rootScope.$broadcast('changeQType', { 'type' : questionAnserVM.qtype});
        $scope.$on('changeQno', function(event, data){
            questionAnserVM.qno = data.qno;
        });
        questionAnserVM.goToQuestion = function() {
            if(questionAnserVM.qno != ""){
                $state.go('app.qusAns.qno', {'qtype': questionAnserVM.qtype, 'qno' : questionAnserVM.qno});
            }
        }
        
        questionAnserVM.goToNext = function(flag) {
            var maxQno = questionAnswerService.getContentCount();
            flag ? questionAnserVM.qno++ : questionAnserVM.qno--;
            if(questionAnserVM.qno > maxQno){
                questionAnserVM.qno = maxQno;
            }
            if(questionAnserVM.qno < 1){
                questionAnserVM.qno = 1;
            }
            questionAnserVM.goToQuestion();
        }
        
    }
})();
