var app = angular.module('lingo.directives', []);

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
app.directive('addMode', function() {
  return {
    restrict: 'E',
    templateUrl: "views/partials/add-mode.html"
  }
});



module.exports = app;
