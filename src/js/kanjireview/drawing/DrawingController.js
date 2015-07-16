(function(){
    'use strict';

    angular
        .module('kanjireview.drawing')
        .controller('DrawingController', DrawingController);

    DrawingController.$inject = ['$scope'];

    function DrawingController($scope){

        var vm = this;

        vm.bDrawingBoardExists = false;
        vm.oDrawingBoard = null;
        vm.oVersion;

        vm.clearDrawingBoard = clearDrawingBoard;

        // PUBLIC //////////////////////////////////////////////////////////////

        function clearDrawingBoard(){
            vm.oVersion = 0;
        }


        // PRIVATE /////////////////////////////////////////////////////////////
    }

})();