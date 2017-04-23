'use strict';

angular.module('bingoApp', ['ngRoute', 'bingoApp.services','ngStorage']);
angular.module('bingoApp').config(['$routeProvider', Routes]);

function Routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'BingoController'
        })
    .otherwise({redirectTo: '/'})
}