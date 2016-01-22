(function() {
	'use strict';
	
	/*
	 * @desc Injecting the home sub module into home main module
	 */
	var questionAnswer = angular.module('updateQusAns', ['ui.router', 'updateQusAnsList']);
	/*
	 * @desc Define home state level configuration.
	 */
	questionAnswer.config(['$stateProvider', stateConfig]);
    questionAnswer.controller('updateQusAnsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$uibModal',
                                                   'BASE_CONFIG', 'updateQusAnsSevice', 'questionList', controller]);
    questionAnswer.controller('updateQusAnsPopupCtrl', ['$scope', '$modalInstance', 'question', 'updateQusAnsSevice', updateQusAnsPopupCtrl]);
	
	function stateConfig($stateProvider) {
		$stateProvider.state('app.updateQusAns', {
			url : '/updateQusAns?qtype',
            resolve : {
                questionList : ['$stateParams', '$rootScope', 'BASE_CONFIG', 'updateQusAnsSevice', qusAnsResolve]
            },
			views : {
				'@' : {
					templateUrl : 'pages/UpdateQusAnsPage/UpdateQusAnsPage.html',
					controller : 'updateQusAnsCtrl',
					controllerAs : 'updateQusAnsVM'
				}
			}
		}).state('app.updateQusAns.list', {
            url : '/list',
            templateUrl : 'components/QusAnsListWidget/QusAnsListWidget.html',
            controller : 'qusAnsListWidgetCtrl',
            controllerAs : 'qusAnsListWidgetVM'
        });
	}
    
    function qusAnsResolve($stateParams, $rootScope, BASE_CONFIG, updateQusAnsSevice){
        var qtype = $stateParams.qtype ? $stateParams.qtype : BASE_CONFIG.APP_MENU[0];
        var qusAnsResolve = this;
        var init = function(){
            updateQusAnsSevice.getListOfQus($stateParams.qtype).success(function(successRes){
                updateQusAnsSevice.setQusList(successRes.hits.hits);
                $rootScope.$broadcast('qusAnsUpdated', {});
            }).error(function(errorRes){ 
                console.log('Error...', errorRes);
            });
        }
        qusAnsResolve.init = init;
        init();
        return qusAnsResolve;
    }
    
    function controller($scope, $rootScope, $state, $stateParams, $timeout, $uibModal, BASE_CONFIG, updateQusAnsSevice, questionList) {
        var updateQusAnsVM = this;
        updateQusAnsVM.qtype = $stateParams.qtype ? $stateParams.qtype : BASE_CONFIG.APP_MENU[0];
        $rootScope.$broadcast('changeQType', { 'type' : 'List All'});
        updateQusAnsVM.tlist = BASE_CONFIG.APP_MENU;
        
        $scope.$on('editQuestionInfo', function(event, data){
            updateQusAnsVM.doEdit(data);
        });
        
        updateQusAnsVM.doAdd = function(){
            updateQusAnsVM.doEdit({ "qtype" : updateQusAnsVM.qtype});
        }
        
        updateQusAnsVM.doEdit = function(question){
            updateQusAnsVM.errorRes = null;
            updateQusAnsVM.question = question;
            var modalInstance = $uibModal.open({
              templateUrl: 'pages/UpdateQusAnsPage/UpdateQusAnsPopup.html',
              controller: 'updateQusAnsPopupCtrl',
              controllerAs : 'updateQusAnsPopupVM',
              backdrop  : 'static',
              resolve: {
                question: function () {
                  return question;
                }
              }
            });
            
            modalInstance.result.then(function () {
                refreshList();
            }, function () {
               //TODO handle error callaback
            });
        }
        
        function refreshList(){
            $timeout(function(){
                questionList.init();
            }, 1000);
        }
    }
    
    function updateQusAnsPopupCtrl($scope, $modalInstance, question, updateQusAnsSevice){
          var updateQusAnsPopupVM = this;
          updateQusAnsPopupVM.question = question;
          updateQusAnsPopupVM.doSave = function () {
              if(!updateQusAnsPopupVM.question.question || !updateQusAnsPopupVM.question.answer ||
                 updateQusAnsPopupVM.question.question == "" || updateQusAnsPopupVM.question.answer == ""){
                    updateQusAnsPopupVM.errorRes = 'Please give question and answer';
                    return;
                }
                updateQusAnsSevice.saveQustionInfo(updateQusAnsPopupVM.question).success(function(successRes){
                    updateQusAnsPopupVM.errorRes = null;
                    $modalInstance.close();
                }).error(function(errorRes){
                    updateQusAnsPopupVM.errorRes = errorRes;
                });
          };
        
          updateQusAnsPopupVM.doCancel = function () {
            $modalInstance.dismiss('cancel');
          };
    }
    
})();
