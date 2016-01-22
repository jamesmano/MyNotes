(function() {
	'use strict';
	
	angular.module('questionAnswer').service('questionAnswerService',['$http', 'BASE_CONFIG', questionAnswerService]);
    
    function questionAnswerService($http, BASE_CONFIG) {
        var contentList = [];
        return {
            getListOfQuestions : getListOfQuestions,
            setContentList : setContentList,
            getContent : getContent,
            getContentCount : getContentCount,
            getAllQAList : getAllQAList
        }
        
        function getListOfQuestions(qtype){
           var query = {"sort":[{"_id":{"order":"asc"}}]};
           return $http.post(BASE_CONFIG.API_HOST+qtype.toLowerCase()+"/_search?size=1000", query);
        }
        
        function setContentList(contents){
            contentList = [];
            angular.forEach(contents, function(item, index){
                var qusInfo = item._source;
                qusInfo.qno = index + 1;
                contentList.push(qusInfo);
            })
        }
        
        function getContent(index){
            var content = contentList[index-1];
            if(!content) { 
                return {};
            }
            return contentList[index-1];
        }
        
        function getContentCount(){
            return contentList.length;
        }
        
        function getAllQAList(){
            return $http.post(BASE_CONFIG.API_HOST+"/_search?1000");
        }
    }
})();
