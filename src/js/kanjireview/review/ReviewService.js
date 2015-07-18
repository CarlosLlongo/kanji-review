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


        var oService = {
            nLearnedKanji: nLearnedKanji,
            aKanjiData: aKanjiData,

            getCurrentKanji: getCurrentKanji,
            getCurrentKanjiId: getCurrentKanjiId,
            getCurrentKanjiKeyword: getCurrentKanjiKeyword,
            getReviewedKanji: getReviewedKanji,
            init: init,
            startReview: startReview,
            successfulWriting: successfulWriting,
            wrongWriting: wrongWriting
        };

        return oService;

        // PUBLIC //////////////////////////////////////////////////////////////

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

        function init(){
            return $http.get(
                'data/kanji-data.json')
                .then(initComplete);

            function initComplete(aKanjiData){
                oService.aKanjiData = aKanjiData.data;

                nCurrentKanjiId = Math.floor(Math.random() * (oService.nLearnedKanji)) + 1;
            }
        }

        function startReview(nLearnedKanji){
            oService.nLearnedKanji = nLearnedKanji;

            console.log(nLearnedKanji);

            $state.go('drawing');
        }

        function successfulWriting(){
            var nNextKanjiId = Math.floor(Math.random() * (oService.nLearnedKanji)) + 1;

            nCurrentKanjiId = nNextKanjiId;

            nReviewedKanji++;
        }

        function wrongWriting(){
            var nNextKanjiId = Math.floor(Math.random() * (oService.nLearnedKanji)) + 1;

            nCurrentKanjiId = nNextKanjiId;

            nReviewedKanji++;
        }

        // PRIVATE /////////////////////////////////////////////////////////////

    }
})();