var app = angular.module('crowdefine.directives', []);

app.directive('sidebar', function() {
  return {
    restrict: 'E',
    templateUrl: "views/partials/sidebar.html"
  };
});

app.directive('dictionary', function() {
  return {
    restrict: 'E',
    templateUrl: "views/partials/dictionary.html"
  }
});



module.exports = app;
