(function (){
    'use strict';

    angular
        .module('kanjireview.review')
        .factory('ReviewService', ReviewService);

    ReviewService.$inject = ['$http', '$state'];

    function ReviewService($http, $state){

        var aKanjiData;
        var nCurrentKanjiId = 1;
        var nLearnedKanji = 50;
        var nReviewedKanji = 0;
        var nCorrectWritings = 0;
        var nWrongWritings = 0;


        var oService = {
            nLearnedKanji: nLearnedKanji,
            aKanjiData: aKanjiData,

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
            if(oService.aKanjiData){
                return oService.aKanjiData[String(nCurrentKanjiId)].kanji;
            }

            return '';
        }

        function getCurrentKanjiId(){
            return nCurrentKanjiId;
        }

        function getCurrentKanjiKeyword(){
            if(oService.aKanjiData){
                return oService.aKanjiData[String(nCurrentKanjiId)].keyword;
            }

            return '';
        }

        function getReviewedKanji(){
            return nReviewedKanji;
        }

        function getWrongCount(){
            return nWrongWritings;
        }

        function init(){
            return $http.get(
                'data/kanji-data.json')
                .then(initComplete);

            function initComplete(aKanjiData){
                oService.aKanjiData = aKanjiData.data;
            }
        }

        function startReview(nLearnedKanji){
            oService.nLearnedKanji = nLearnedKanji;

            nReviewedKanji = 0;
            nCorrectWritings = 0;
            nWrongWritings = 0;
            nCurrentKanjiId = Math.floor(Math.random() * (oService.nLearnedKanji)) + 1;

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
            var nNextKanjiId = Math.floor(Math.random() * (oService.nLearnedKanji)) + 1;

            nCurrentKanjiId = nNextKanjiId;

            nReviewedKanji++;
        }
    }
})();