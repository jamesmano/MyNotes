(function() {
	'use strict';
	
	angular.module('searchResult').service('searchResultSevice',['$http', 'BASE_CONFIG', searchResultSevice]);
    
    function searchResultSevice($http, BASE_CONFIG) {
        var results = [];
        return {
            getResult : getResult,
            setResult : setResult,
            fetchResult : fetchResult
        }
        
        function getResult(searchTerm){
            var query = { "query": { "match": { "question": { "query": searchTerm, "operator": "and" } } } };
            return $http.post(BASE_CONFIG.API_HOST+"_search?size=1000", query);
        }

        function fetchResult(){
            return results;
        }
        
        function setResult(list){
            results = [];
            angular.forEach(list, function(item, index){
                var qusInfo = item._source;
                qusInfo.qno = index + 1;
                qusInfo.id = item._id;
                results.push(item._source);
            })
        }
        
        function getQusCount(){
            return results.length;
        }
    }
})();
