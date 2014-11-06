describe("MyController", function() {
  var $rootScope,
      $scope,
      controller;

  beforeEach(function() {
    module('crowdefine');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')("MyDictionaryCtrl", {$scope: $scope});
    });
  });

  describe("Initialization", function() {
    it("should instantiate", function() {
      expect($scope.testTesting).toEqual("hi jared");
    });
  });

});
