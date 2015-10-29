(function(){
    'use strict';

    angular
        .module('kanjireview.start')
        .controller('StatsController', StatsController);

    StatsController.$inject = ['$state', 'ReviewDataService', 'KanjiStatisticsDataService', 'KanjiDataService'];

    function StatsController($state, ReviewDataService, KanjiStatisticsDataService, KanjiDataService){

        var vm = this;

        /**
         * The data needed to paint the pie chart.
         * @type {{label: string, value: number, color: string}[]}
         */
        vm.aPieChartData = [
            {label: 'hard', value: 0, color: 'red'},
            {label: 'medium', value: 0, color: 'orange'},
            {label: 'easy', value: 0, color: 'green'}
        ];

        /**
         * Options for the pie chart.
         * @type {{thickness: number}}
         */
        vm.oPieChartOptions = {thickness: 20};

        /**
         * The kanji characters in each of the storages.
         * @type {{hard: Array, medium: Array, easy: Array}}
         */
        vm.oKanjisPerStore = {
            hard: [],
            medium: [],
            easy: []
        }

        vm.goBack = goBack;

        prepareStatistics();

        // PUBLIC //

        /**
         * Goes back to the start screen.
         */
        function goBack(){
            $state.go('app.start');
        }

        /**
         * Prepares all data needed to show in the statistics page.
         */
        function prepareStatistics(){
            var oKanjiCollection = new KanjiCollection();
            oKanjiCollection.populateFromJsonObject(KanjiDataService.getKanjiData());

            var oReviewData = new ReviewData({reviewDataPersistence: ReviewDataService});
            vm.aData[0].value = oReviewData.getHardStorage().length;
            vm.aData[1].value = oReviewData.getMediumStorage().length;
            vm.aData[2].value = oReviewData.getEasyStorage().length;

            vm.oKanjisPerStore.hard = kanjiIdsToChars(oReviewData.getHardStorage(), oKanjiCollection);
            vm.oKanjisPerStore.medium = kanjiIdsToChars(oReviewData.getMediumStorage(), oKanjiCollection);
            vm.oKanjisPerStore.easy = kanjiIdsToChars(oReviewData.getEasyStorage(), oKanjiCollection);
        }

        // PRIVATE //

        /**
         * From an array with kanji IDs, a new array is created with the kanji characters for each of the
         * kanji IDs.
         * @param aKanjiIds An array with the kanji IDs.
         * @param oKanjiCollection The KanjiCollection with the Kanji data.
         * @returns {Array} An array with the Kanji characters.
         */
        function kanjiIdsToChars(aKanjiIds, oKanjiCollection){
            aKanjiIds.sort(function(a,b){
                return parseInt(a) - parseInt(b);
            });

            var aKanjiChars = [];
            var oKanji;
            for(var i = 0; i < aKanjiIds.length; i++){
                oKanji = oKanjiCollection.getKanji(aKanjiIds[i]);
                aKanjiChars.push(oKanji.getCharacter());
            }

            return aKanjiChars;
        }
    }

})();