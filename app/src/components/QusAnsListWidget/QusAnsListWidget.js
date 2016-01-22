(function() {
	'use strict';
	
	var qusAnsWidget = angular.module('updateQusAnsList', []);
	
	qusAnsWidget.controller('qusAnsListWidgetCtrl', ['$scope', '$rootScope', '$stateParams', '$uibModal', 'updateQusAnsSevice',
                                                     'BASE_CONFIG', 'questionList', '$timeout', qusAnsListWidgetCtrl]);
    qusAnsWidget.controller('deleteQusAnsConfirmCtrl',['$modalInstance', 'question', 'updateQusAnsSevice',
                            deleteQusAnsCtrl]);
    function qusAnsListWidgetCtrl($scope, $rootScope, $stateParams, $uibModal, updateQusAnsSevice, BASE_CONFIG, questionList, $timeout) {
        var qusAnsListWidgetVM = this;
        var qtype = $stateParams.qtype;
        $scope.$on('qusAnsUpdated', function(event, data){
            qusAnsListWidgetVM.qlist = updateQusAnsSevice.getFetchedQus();
        });
        qusAnsListWidgetVM.qlist = updateQusAnsSevice.getFetchedQus();
        qusAnsListWidgetVM.tlist = BASE_CONFIG.APP_MENU;
        
        qusAnsListWidgetVM.doEdit = function(question){
            $rootScope.$broadcast('editQuestionInfo', question);
        }
        
        qusAnsListWidgetVM.doDelete = function(item){
            var modalInstance = $uibModal.open({
              templateUrl: 'components/QusAnsListWidget/DeleteQusAnsConfirm.html',
              controller: 'deleteQusAnsConfirmCtrl',
              controllerAs : 'deleteQusAnsConfirmVM',
              backdrop  : 'static',
              resolve: {
                question: function () {
                  return item;
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
    
    function deleteQusAnsCtrl($modalInstance, question, updateQusAnsSevice){
          var deleteQusAnsConfirmVM = this;
        
          deleteQusAnsConfirmVM.doDelete = function(){
            updateQusAnsSevice.deleteQuestion(question).success(function(succssRes){
                 deleteQusAnsConfirmVM.errorRes = null;
                 $modalInstance.close();
            }).error(function(errorRes){
                deleteQusAnsConfirmVM.errorRes = errorRes;
                console.log('errorRes', errorRes);
            });
          }

          deleteQusAnsConfirmVM.doCancel = function () {
            deleteQusAnsConfirmVM.errorRes = null;
            $modalInstance.dismiss('cancel');
          };
    }
})();