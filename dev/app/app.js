var dtfApp = angular.module('dtfApp', [
  'ngRoute','ngAnimate','angularBootstrapNavTree'
])

dtfApp.config(['$routeProvider',function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'dev/views/home.html'
    })
    .when('/Intergration Jobs', {
      templateUrl: 'dev/views/organizations_tree.html'
    })    
    .otherwise({
      templateUrl: 'dev/views/404.html'
    });
}]);
