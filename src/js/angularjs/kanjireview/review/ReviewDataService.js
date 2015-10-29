(function (){
    'use strict';

    angular
        .module('kanjireview.review')
        .factory('ReviewDataService', ReviewDataService);

    ReviewDataService.$inject = [];

    function ReviewDataService(){

        var oService = {
            /**
             * The Review data.
             */
            oReviewData: {},
            /**
             * The local storage service.
             */
            oLocalStorage: null,

            getReviewData: getReviewData,
            saveReviewData: saveReviewData,
            getLearnedKanji: getLearnedKanji,
            setLearnedKanji: setLearnedKanji,
            clearData: clearData,
            init: init
        };

        return oService;

        // PUBLIC //

        /**
         * Obtains the review data.
         * @returns {Object} The review data.
         */
        function getReviewData(){
            return oService.oReviewData;
        }

        /**
         * Saves the Review data to the local storage.
         * @param oJsonObject The JSON representation of the review data.
         */
        function saveReviewData(oJsonObject){
            console.log('Saving data...');
            console.log(oJsonObject);
            oService.oLocalStorage.setObject('review-data', oJsonObject);
        }

        /**
         * Obtains the number of learned kanji.
         * @returns {*|oService.oReviewData.learnedKanji|number} The number of learned kansji.
         */
        function getLearnedKanji(){
            return oService.oReviewData.learnedKanji || 0;
        }

        /**
         * Sets the number of learned kanji.
         * @param nLearnedKanji The number of learned kanji.
         */
        function setLearnedKanji(nLearnedKanji){
            oService.oReviewData.learnedKanji = nLearnedKanji;
        }

        /**
         * Clears the review data both from the service and from the local storage.
         */
        function clearData(){
            oService.oReviewData = {};
            oService.oLocalStorage.setObject('review-data', {});
        }

        /**
         * Loads the review data from the local storage.
         * @param oLocalStorage The local storage service.
         */
        function init(oLocalStorage){
            oService.oLocalStorage = oLocalStorage;
            oService.oReviewData = oLocalStorage.getObject('review-data');
            console.log('Loading data...');
            console.log(oService.oReviewData);
        }
    }
})();