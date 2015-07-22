(function(){
    'use strict';

    angular
        .module('kanjireview.start')
        .controller('StartController', StartController);

    StartController.$inject = ['ReviewService'];

    function StartController(ReviewService){

        var vm = this;

        vm.nLearnedKanji = 0;

        vm.startReview = startReview;

        initServices();

        // PUBLIC //////////////////////////////////////////////////////////////

        function startReview(){
            console.log(vm.nLearnedKanji);

            ReviewService.startReview(vm.nLearnedKanji);
        }

        // PRIVATE /////////////////////////////////////////////////////////////

        function initServices(){
            ReviewService.init();
        }
    }

})();