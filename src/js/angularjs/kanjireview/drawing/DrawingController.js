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

        /**
         * Changes the view to the 'checking' state where the written kanji con be compared.
         */
        function checkKanji(){
            vm.sState = 'checking';
        }

        /**
         * Clears all lines drawn in the drawing board.
         */
        function clearDrawingBoard(){
            vm.oVersion = 0;
        }

        /**
         * Obtains the current kanji character.
         * @returns {String} The current kanji character.
         */
        function getCurrentKanji(){
            return ReviewService.getCurrentKanji();
        }

        /**
         * Obtains the current kanji ID.
         * @returns {String} The current kanji ID.
         */
        function getCurrentKanjiId(){
            return ReviewService.getCurrentKanjiId();
        }

        /**
         * Obtains the current kanji keyword.
         * @returns {String} The current kanji keyword.
         */
        function getCurrentKanjiKeyword(){
            return ReviewService.getCurrentKanjiKeyword();
        }

        /**
         * Obtains the count of the kanjins reviewed in this review.
         * @returns {Integer} The number of kanjis reviewed.
         */
        function getReviewedKanji(){
            return ReviewService.getReviewedKanji();
        }

        /**
         * Checks if the current state is the 'checking' state.
         * @returns {boolean} True if we are in the 'checking' state, false otherwise.
         */
        function isCheckingState(){
            return vm.sState === 'checking';
        }

        /**
         * Notifies the ReviewService that the kanji was written successfully.
         */
        function successfulWriting(){
            ReviewService.successfulWriting();

            clearDrawingBoard();

            vm.sState = 'writing';
        }

        /**
         * Notifies the ReviewService that the kanji was written incorrectly.
         */
        function wrongWriting(){
            ReviewService.wrongWriting();

            clearDrawingBoard();

            vm.sState = 'writing';
        }

        // PRIVATE /////////////////////////////////////////////////////////////
    }

})();