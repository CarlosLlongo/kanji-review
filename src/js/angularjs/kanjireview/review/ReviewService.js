(function (){
    'use strict';

    angular
        .module('kanjireview.review')
        .factory('ReviewService', ReviewService);

    ReviewService.$inject = ['$state', 'ReviewDataService', 'KanjiDataService', 'KanjiStatisticsDataService'];

    function ReviewService($state, ReviewDataService, KanjiDataService, KanjiStatisticsDataService){

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

        // PUBLIC //

        /**
         * Goes to the results screen.
         */
        function endReview(){
            oService.oReviewEngine.endReview();

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
            var oReviewData = new ReviewData({reviewDataPersistence: ReviewDataService});
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
            var oKanjiStatisticsCollection = new KanjiStatisticsCollection({
                kanjiStatisticsDataPersistence: KanjiStatisticsDataService
            });

            var oKanjiDifficultyManager = new KanjiDifficultyManager({
                hardStorage: oHardStorage,
                mediumStorage: oMediumStorage,
                easyStorage: oEasyStorage,
                kanjiStatisticsCollection: oKanjiStatisticsCollection
            });

            oKanjiDifficultyManager.storeNewLearnedKanji(oReviewData.getLearnedKanji(), nLearnedKanji);
            oReviewData.setLearnedKanji(nLearnedKanji);

            var oReviewBatch = new ReviewBatch({
                kanjiDifficultyManager: oKanjiDifficultyManager
            });

            oService.oReviewEngine = new ReviewEngine({
                reviewData: oReviewData,
                kanjiCollection: oKanjiCollection,
                reviewBatch: oReviewBatch,
                kanjiDifficultyManager: oKanjiDifficultyManager
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

        /**
         * Increments the correct writings counter, adds the result to the statistics and goes to the next kanji.
         */
        function successfulWriting(){
            nCorrectWritings++;

            oService.oReviewEngine.addResult(oService.oCurrentKanji.getId(), 1);

            goToNextKanji();
        }

        /**
         * Increments the wrong writings counter, adds the result to the statistics and goes to the next kanji.
         */
        function wrongWriting(){
            nWrongWritings++;

            oService.oReviewEngine.addResult(oService.oCurrentKanji.getId(), 0);

            goToNextKanji();
        }

        // PRIVATE //

        /**
         * Obtains the next kanji from the review engine and increments the reviewed kanji counter.
         */
        function goToNextKanji(){
            oService.oCurrentKanji = oService.oReviewEngine.getNextKanji();

            nReviewedKanji++;
        }
    }
})();