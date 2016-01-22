(function() {
 angular.module("myProject").directive('enterKeyDirective', enterKeyDirective);

  function enterKeyDirective() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind("keypress", function(event) {
          var keyCode = event.which || event.keyCode;
          if (keyCode == 13) {
            $scope.$apply(function() {
              $scope.$eval($attrs.enterKeyDirective, {$event: event});
            });
          }
        });
      }
    };
  }
})();