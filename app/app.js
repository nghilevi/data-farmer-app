var dtfApp = angular.module('dtfApp', [
  'ngRoute','ngAnimate','angularBootstrapNavTree'
])

dtfApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/organizations_tree.html'
    })
    .when('/Intergration Jobs', {
      redirectTo: '/'
    })    
    .otherwise({
      templateUrl: 'views/404.html'
      //redirectTo: '/'
    });
});





