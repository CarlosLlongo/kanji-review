(function (){
    'use strict';

    angular
        .module('kanjireview.review')
        .factory('ReviewService', ReviewService);

    ReviewService.$inject = ['$http', '$state'];

    function ReviewService($http, $state){

        var aKanjiData;
        var aReviewArray;
        var nLearnedKanji = 50;
        var nReviewedKanji = 0;
        var nReviewArrayIndex = 0;
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
                return oService.aKanjiData[aReviewArray[nReviewArrayIndex]].kanji;
            }

            return '';
        }

        function getCurrentKanjiId(){
            return aReviewArray[nReviewArrayIndex];
        }

        function getCurrentKanjiKeyword(){
            if(oService.aKanjiData){
                return oService.aKanjiData[aReviewArray[nReviewArrayIndex]].keyword;
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

            aReviewArray = createReviewArray();

            nReviewArrayIndex = 0;
            nReviewedKanji = 0;
            nCorrectWritings = 0;
            nWrongWritings = 0;

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
            nReviewedKanji++;

            nReviewArrayIndex++;

            if(nReviewArrayIndex >= aReviewArray.length){
                nReviewArrayIndex = 0;
                shuffle(aReviewArray);
            }
        }

        function createReviewArray(){
            var aReviewArray = [];

            for(var i = 1; i <= oService.nLearnedKanji; i++){
                aReviewArray.push(String(i));
            }

            console.log(aReviewArray);

            shuffle(aReviewArray);

            console.log(aReviewArray);

            return aReviewArray;
        }

        function shuffle(aOriginal){
            var n;
            var aux;

            for(var i = aOriginal.length - 1; i > 0; i--){
                n = Math.floor(Math.random() * aOriginal.length);

                aux = aOriginal[i];
                aOriginal[i] = aOriginal[n];
                aOriginal[n] = aux;
            }
        }
    }
})();