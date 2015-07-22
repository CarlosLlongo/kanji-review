(function(){
    'use strict';

    angular
        .module('kanjireview.drawing')
        .controller('DrawingController', DrawingController);

    DrawingController.$inject = ['ReviewService'];

    function DrawingController(ReviewService){

        var vm = this;

        vm.oVersion;
        vm.sState = 'writing';

        vm.checkKanji = checkKanji;
        vm.clearDrawingBoard = clearDrawingBoard;
        vm.getCurrentKanji = getCurrentKanji;
        vm.getCurrentKanjiId = getCurrentKanjiId;
        vm.getCurrentKanjiKeyword = getCurrentKanjiKeyword;
        vm.getReviewedKanji = getReviewedKanji;
        vm.isCheckingState = isCheckingState;
        vm.successfulWriting = successfulWriting;
        vm.wrongWriting = wrongWriting;

        // PUBLIC //////////////////////////////////////////////////////////////

        function checkKanji(){
            vm.sState = 'checking';
        }

        function clearDrawingBoard(){
            vm.oVersion = 0;
        }

        function getCurrentKanji(){
            return ReviewService.getCurrentKanji();
        }

        function getCurrentKanjiId(){
            return ReviewService.getCurrentKanjiId();
        }

        function getCurrentKanjiKeyword(){
            return ReviewService.getCurrentKanjiKeyword();
        }

        function getReviewedKanji(){
            return ReviewService.getReviewedKanji();
        }

        function isCheckingState(){
            return vm.sState === 'checking';
        }

        function successfulWriting(){
            ReviewService.successfulWriting();

            clearDrawingBoard();

            vm.sState = 'writing';
        }

        function wrongWriting(){
            ReviewService.wrongWriting();

            clearDrawingBoard();

            vm.sState = 'writing';
        }

        // PRIVATE /////////////////////////////////////////////////////////////
    }

})();