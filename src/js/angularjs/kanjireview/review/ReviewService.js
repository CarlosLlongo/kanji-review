(function (){
    'use strict';

    angular
        .module('kanjireview.review')
        .factory('ReviewService', ReviewService);

    ReviewService.$inject = ['$state', 'ReviewDataService', 'KanjiDataService'];

    function ReviewService($state, ReviewDataService, KanjiDataService){

        var nReviewedKanji = 0;
        var nCorrectWritings = 0;
        var nWrongWritings = 0;

        var oService = {
            /**
             * The ReviewEngine responsible for the review.
             */
            oReviewEngine: {},
            /**
             * The current kanji being reviewed.
             */
            oCurrentKanji: {},

            endReview: endReview,
            getCorrectCount: getCorrectCount,
            getCurrentKanji: getCurrentKanji,
            getCurrentKanjiId: getCurrentKanjiId,
            getCurrentKanjiKeyword: getCurrentKanjiKeyword,
            getReviewedKanji: getReviewedKanji,
            getWrongCount: getWrongCount,
            init: init,
            startReview: startReview,
            successfulWriting: successfulWriting,
            wrongWriting: wrongWriting
        };

        return oService;

        // PUBLIC //////////////////////////////////////////////////////////////

        /**
         * Goes to the results screen.
         */
        function endReview(){
            $state.go('app.results');
        }

        /**
         * Gets the number of Kanjis written correctly during the review.
         * @returns {number}
         */
        function getCorrectCount(){
            return nCorrectWritings;
        }

        /**
         * Gets the current Kanji character.
         * @returns {String} The current kanji character.
         */
        function getCurrentKanji(){
            return oService.oCurrentKanji.getCharacter();
        }

        /**
         * Gets the current Kanji ID.
         * @returns {String} The current kanji ID.
         */
        function getCurrentKanjiId(){
            return oService.oCurrentKanji.getId();
        }

        /**
         * Gets the current Kanji keyword.
         * @returns {String} The current kanji keyword.
         */
        function getCurrentKanjiKeyword(){
            return oService.oCurrentKanji.getKeyword();
        }

        /**
         * Gets the count of Kanjis reviewed in this review.
         * @returns {number}
         */
        function getReviewedKanji(){
            return nReviewedKanji;
        }

        /**
         * Gets the number of kanjis written incorrectly during the review.
         * @returns {number}
         */
        function getWrongCount(){
            return nWrongWritings;
        }

        /**
         * Initializes all objects needed for the review engine to work.
         * @param nLearnedKanji The number of learned kanjis.
         */
        function init(nLearnedKanji){
            var oReviewDataPersistence = new ReviewDataPersistence(ReviewDataService);
            var oReviewData = new ReviewData(oReviewDataPersistence);
            var oKanjiCollection = new KanjiCollection();
            oKanjiCollection.populateFromJsonObject(KanjiDataService.getKanjiData());
            var oHardStorage = new KanjiDifficultyStorage({
                store: oReviewData.getHardStorage(),
                cycle: oReviewData.getHardCycle()
            });
            var oMediumStorage = new KanjiDifficultyStorage({
                store: oReviewData.getMediumStorage(),
                cycle: oReviewData.getMediumCycle()
            });
            var oEasyStorage = new KanjiDifficultyStorage({
                store: oReviewData.getEasyStorage(),
                cycle: oReviewData.getEasyCycle()
            });
            var oKanjiDifficultyManager = new KanjiDifficultyManager({
                hardStorage: oHardStorage,
                mediumStorage: oMediumStorage,
                easyStorage: oEasyStorage
            });
            var oReviewBatch = new ReviewBatch(nLearnedKanji, nLearnedKanji, {
                kanjiDifficultyManager: oKanjiDifficultyManager
            });

            oService.oReviewEngine = new ReviewEngine({
                reviewData: oReviewData,
                kanjiCollection: oKanjiCollection,
                reviewBatch: oReviewBatch
            });
        }

        /**
         * Initializes the ReviewEngine, resets the counters, obtains the next kanji and goes to the drawing screen.
         * @param nLearnedKanji The number of learned kanji.
         */
        function startReview(nLearnedKanji){
            init(nLearnedKanji);

            nReviewedKanji = 0;
            nCorrectWritings = 0;
            nWrongWritings = 0;

            oService.oCurrentKanji = oService.oReviewEngine.getNextKanji();

            $state.go('app.drawing');
        }

        function successfulWriting(){
            nCorrectWritings++;

            goToNextKanji();
        }

        function wrongWriting(){
            nWrongWritings++;

            goToNextKanji();
        }

        // PRIVATE /////////////////////////////////////////////////////////////

        function goToNextKanji(){
            oService.oCurrentKanji = oService.oReviewEngine.getNextKanji();

            nReviewedKanji++;
        }
    }
})();