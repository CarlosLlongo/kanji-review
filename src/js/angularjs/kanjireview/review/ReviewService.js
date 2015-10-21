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
        
        function endReview(){
            $state.go('app.results');
        }

        function getCorrectCount(){
            return nCorrectWritings;
        }

        function getCurrentKanji(){
            return oService.oCurrentKanji.getCharacter();
        }

        function getCurrentKanjiId(){
            return oService.oCurrentKanji.getId();
        }

        function getCurrentKanjiKeyword(){
            return oService.oCurrentKanji.getKeyword();
        }

        function getReviewedKanji(){
            return nReviewedKanji;
        }

        function getWrongCount(){
            return nWrongWritings;
        }

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