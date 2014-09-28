var app = angular.module('crowdefine.directives', []);

app.directive('sidebar', function() {
  return {
    restrict: 'E',
    templateUrl: "views/partials/sidebar.html"
  };
});

app.directive('search', function() {
  return {
    restrict: 'E',
    templateUrl: "views/partials/search.html"
  }
});


module.exports = app;
