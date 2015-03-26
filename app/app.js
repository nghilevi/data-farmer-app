var dtfApp = angular.module('dtfApp', [
  'ngRoute','ngAnimate','angularBootstrapNavTree'
])

dtfApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/Intergration Jobs', {
      templateUrl: 'views/organizations_tree.html'
    })    
    .otherwise({
      templateUrl: 'views/404.html'
    });
});
