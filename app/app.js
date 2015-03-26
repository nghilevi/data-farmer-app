angular.module('dtfApp', [
  'ngRoute','ngAnimate','angularBootstrapNavTree'
]).config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/organizations_tree.html',
      controller: 'MainController'
    })
    .otherwise({
      templateUrl: 'views/404.html'
      //redirectTo: '/'
    });
});





