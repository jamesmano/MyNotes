(function() {
	'use strict';
	
	var qusAnsWidget = angular.module('qusAnsWidget', []);
	
	qusAnsWidget.controller('qusAnsWidgetCtrl', ['$scope', '$rootScope', '$stateParams', 'questionAnswerService',
                                                 function($scope, $rootScope, $stateParams, questionAnswerService) {
        var qusAnsWidgetVM = this;
        var qno = $stateParams.qno;                                           
        $scope.$on('qusAnsUpdated', function(event, data){
            qusAnsWidgetVM.content = questionAnswerService.getContent(qno);
        })
        qusAnsWidgetVM.content = questionAnswerService.getContent(qno);
        $rootScope.$broadcast('changeQno', { 'qno' : qno});
	}]);
})();