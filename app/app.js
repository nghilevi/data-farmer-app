var dtfApp = angular.module('dtfApp', [
  'ngRoute','ngAnimate','angularBootstrapNavTree'
])

dtfApp.config(['$routeProvider',function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html'
    })
    .when('/Intergration Jobs', {
      templateUrl: 'organizations_tree.html'
    })    
    .otherwise({
      templateUrl: '404.html'
    });
}]);
