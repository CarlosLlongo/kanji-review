(function(){
    'use strict';

    angular
        .module('kanjireview.start')
        .controller('StartController', StartController);

    StartController.$inject = ['$scope', 'ReviewService', 'ReviewDataService', 'KanjiDataService', '$rootScope'];

    function StartController($scope, ReviewService, ReviewDataService, KanjiDataService, $rootScope){

        var vm = this;

        vm.nLearnedKanji = 0;
        vm.nWaitingForServices = 2;
        vm.bReadyToStart = false;

        vm.getLearnedKanji = getLearnedKanji;
        vm.startReview = startReview;

        $scope.$on('ReviewDataService_init_end', function(){
            vm.nLearnedKanji = ReviewDataService.getLearnedKanji();
            vm.nWaitingForServices--;

            checkIfReady();
        });

        $scope.$on('KanjiDataService_init_end', function(){
            vm.nWaitingForServices--;

            checkIfReady();
        });

        initDataServices();

        // PUBLIC //////////////////////////////////////////////////////////////

        function getLearnedKanji(){
            return vm.nLearnedKanji;
        }

        function startReview(){
            ReviewService.startReview(vm.nLearnedKanji);
        }

        // PRIVATE /////////////////////////////////////////////////////////////

        function initDataServices(){
            KanjiDataService.init();
            ReviewDataService.init();
        }

        function checkIfReady(){
            if(vm.nWaitingForServices === 0){
                vm.bReadyToStart = true;
            }
        }
    }

})();