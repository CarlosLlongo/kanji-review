(function(){
    'use strict';

    angular
        .module('kanjireview.start')
        .controller('StartController', StartController);

    StartController.$inject = ['$scope', 'ReviewService', 'ReviewDataService', 'KanjiDataService',
        'KanjiStatisticsDataService', 'LocalStorage'];

    function StartController($scope, ReviewService, ReviewDataService, KanjiDataService,
            KanjiStatisticsDataService, LocalStorage){

        var vm = this;

        /**
         * The number or learned kanjis.
         * @type {number}
         */
        vm.nLearnedKanji = 0;
        /**
         * The number of asynchronous services that have to end before the review can start.
         * @type {number}
         */
        vm.nWaitingForServices = 1;
        /**
         * Indicates if the review can start.
         * @type {boolean}
         */
        vm.bReadyToStart = false;

        vm.getLearnedKanji = getLearnedKanji;
        vm.startReview = startReview;
        vm.clearData = clearData;

        $scope.$on('KanjiDataService_init_end', function(){
            vm.nWaitingForServices--;

            checkIfReady();
        });

        initDataServices();

        // PUBLIC //

        /**
         * Obtains the number of learned kanji.
         * @returns {number} The number of learned kanji.
         */
        function getLearnedKanji(){
            return vm.nLearnedKanji;
        }

        /**
         * Instructs the review service to start the review.
         */
        function startReview(){
            ReviewService.startReview(vm.nLearnedKanji);
        }

        /**
         * Clears all locally stored data.
         */
        function clearData(){
            KanjiStatisticsDataService.clearStatistics();
            ReviewDataService.clearData();
        }

        // PRIVATE //

        /**
         * Initializes the data services and updates the number of learned kanji.
         */
        function initDataServices(){
            KanjiDataService.init();
            KanjiStatisticsDataService.init(LocalStorage);
            ReviewDataService.init(LocalStorage);
            vm.nLearnedKanji = ReviewDataService.getLearnedKanji();
        }

        /**
         * Checks if the review can start depending on the number of asynchronous services that have not finished.
         */
        function checkIfReady(){
            if(vm.nWaitingForServices === 0){
                vm.bReadyToStart = true;
            }
        }
    }

})();