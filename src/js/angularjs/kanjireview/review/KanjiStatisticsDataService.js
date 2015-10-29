(function (){
    'use strict';

    angular
        .module('kanjireview.review')
        .factory('KanjiStatisticsDataService', KanjiStatisticsDataService);

    KanjiStatisticsDataService.$inject = [];

    function KanjiStatisticsDataService(){

        var oService = {
            /**
             * The Kanji statistics data.
             */
            oKanjiStatisticsData: {},
            /**
             * The local storage service.
             */
            oLocalStorage: null,

            getKanjiStatisticsData: getKanjiStatisticsData,
            saveKanjiStatisticsData: saveKanjiStatisticsData,
            clearStatistics: clearStatistics,
            init: init
        };

        return oService;

        // PUBLIC //

        /**
         * Obtains the Kanji statistics data.
         * @returns {Object} The Kanji statistics data in a JSON object.
         */
        function getKanjiStatisticsData(){
            return oService.oKanjiStatisticsData;
        }

        /**
         * Saves the Kanji statistics to local storage
         * @param oJsonObject The JSON object representation of the kanji statistics.
         */
        function saveKanjiStatisticsData(oJsonObject){
            oService.oLocalStorage.setObject('kanji-statistics-data', oJsonObject);
        }

        /**
         * Clears the kanji statistics data from the service and from local storage.
         */
        function clearStatistics(){
            oService.oKanjiStatisticsData = {};
            oService.oLocalStorage.setObject('kanji-statistics-data', {});
        }

        /**
         * Loads the Kanji statistics from the local storage.
         * @param oLocalStorage
         */
        function init(oLocalStorage){
            oService.oLocalStorage = oLocalStorage;
            oService.oKanjiStatisticsData = oLocalStorage.getObject('kanji-statistics-data');
            console.log('Loading statistics...');
            console.log(oService.oKanjiStatisticsData);
        }
    }
})();