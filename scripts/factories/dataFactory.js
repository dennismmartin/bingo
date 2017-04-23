'use strict';

angular.module('bingoApp.services', [])
	.factory('DataFactory', ['$http', DataFactory]);

function DataFactory($http) {

	var url = '/data/';
	var exports = {
        getBingoSquares	 : getBingoSquares,
        getWinningCombos : getWinningCombos
	};

    function getBingoSquares(id) {
        // console.log(url + 'data_product_'+id);
        return $http.get(url + 'bingoSquares.json');
    }

    function getWinningCombos() {
        // console.log(url + 'data_product_'+id);
        return $http.get(url + 'bingoWinningComobs.json');
    }

    return exports;
}
