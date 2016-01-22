(function() {
	'use strict';
	
	angular.module('questionAnswer').service('updateQusAnsSevice',['$http', 'BASE_CONFIG', questionAnswerService]);
    
    function questionAnswerService($http, BASE_CONFIG) {
        var qList = [];
        return {
            getListOfQus : getListOfQus,
            setQusList : setQusList,
            getQusInfo : getQusInfo,
            getQusCount : getQusCount,
            getFetchedQus : getFetchedQus,
            saveQustionInfo : saveQustionInfo,
            deleteQuestion : deleteQuestion
        }
        
        function getListOfQus(qtype){
            var query = {"sort":[{"_id":{"order":"asc"}}]};
            //return $http.post("https://qxLl5Rl0U6Z0Iw0UFYqxgPhVVFuynSkS:@jamesmj.east-us.azr.facetflow.io/test/_search");
            return $http.post(BASE_CONFIG.API_HOST+qtype.toLowerCase()+"/_search?size=1000", query);
        }
        
        function saveQustionInfo(qustionInfo){
            var qtype = qustionInfo.qtype;
            var id = qustionInfo.id ? qustionInfo.id : '';
            var request = {
                qtype : qustionInfo.qtype,
                question : qustionInfo.question,
                answer : qustionInfo.answer
            }
            return $http.post(BASE_CONFIG.API_HOST+qtype.toLowerCase()+"/"+id, request);
        }
        
        function deleteQuestion(item){
            return $http.delete(BASE_CONFIG.API_HOST+item.qtype.toLowerCase()+"/"+item.id);
        }
        
        function getFetchedQus(){
            return qList;
        }
        
        function setQusList(list){
            qList = [];
            angular.forEach(list, function(item, index){
                var qusInfo = item._source;
                qusInfo.qno = index + 1;
                qusInfo.id = item._id;
                qList.push(item._source);
            })
        }
        
        function getQusInfo(index){
            var qusInfo = qList[index-1];
            if(qusInfo){
                return {};
            }
            return qusInfo;
        }
        
        function getQusCount(){
            return qList.length;
        }
    }
})();
