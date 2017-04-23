'use strict';

angular.module('bingoApp')
    .controller('BingoController',['$scope', '$rootScope', '$routeParams', '$location', '$localStorage', 'DataFactory', BingoController]);

function BingoController($scope, $rootScope, $routeParams, $location, $localStorage, DataFactory) {
    //console.log('Hello from the BingoController');
    $rootScope.pageTitle = "Let's Play";
    $scope.winningRowCol       = [];
    var squares             = [];
    var winningCombos       = [];
    $scope.randomSquares    = [];
    $scope.selectedSquares  = [12];
    $scope.$storage         = $localStorage;
    //$scope.$storage.randomSquares   = '';
    $scope.$storage.selectedSquares = '';




    toastr.options = {
        "positionClass": "toast-top-center"
    };

    $scope.getBingoSquares = function (type) {
        if(type === 'new'){delete $scope.$storage.randomSquares;}
        $scope.winningRowCol   = [];
        $scope.selectedSquares = [12];
        toastr.clear();
        DataFactory.getBingoSquares().then(getSquaresListSuccess).catch(getSquaresListError);
    };

    //CHECK TO SEE IF CARD IN LOCAL STORAGE
    if(!$scope.$storage.randomSquares){
        $scope.getBingoSquares();
    }else{
        $scope.randomSquares = JSON.parse($scope.$storage.randomSquares);
    }

    function getSquaresListSuccess(response) {
        //console.log('getSquaresListSuccess');
        squares = response.data;
        $scope.randomSquares = squares.sort(function () {
            return .5 - Math.random();
        });
        //SETS SQUARES IN LOCAL STOREAGE
        $scope.$storage.randomSquares = JSON.stringify($scope.randomSquares);
    }
    function getSquaresListError(response) {
        //console.log('getSquaresListError');
        //console.log(response);
        openDialog('error',response.status);
    }

    DataFactory.getWinningCombos().then(getWinningCombosListSuccess).catch(getWinningCombosListError);
    function getWinningCombosListSuccess(response) {
        //console.log('getWinningCombosListSuccess');
        //console.log(response.data);
        winningCombos = response.data;
    }
    function getWinningCombosListError(response) {
        //console.log('getWinningCombosListError');
        //console.log(response);
        openDialog('error',response.status);
    }

    $scope.selected = function(square) {
        //console.log('Clicked: $scope.selected = function(square) ', square);
        if(!isInArray($scope.selectedSquares, square)){
            $scope.selectedSquares.push(square);
        }

        isThereAWinner($scope.selectedSquares.sort(sortNumbers));

        if($scope.winningRowCol.length === 1){
            //alert('Winner');
            toastr.success('You Are A Winner!!!')
        }
    };

    $scope.printBingoCard = function() {
        window.print();
    };

    function isThereAWinner(selected) {
        var counter = 0;

        winningCombos.map(function (combos, index) {
            if(selected.length >= 5){
                selected.map(function (selected, sindex) {
                    if(isInArray(combos.combo,selected)){
                        counter++;
                    }
                });
            }

            if(counter === 5){
                $scope.winningRowCol.push(winningCombos.combo)
            }
            counter = 0;
        });


    }

    function isInArray(arr,obj){
        return (arr.indexOf(obj) >= 0);
    }

    function sortNumbers(a,b){
        return a - b;
    }

}