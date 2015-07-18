(function(){
    'use strict';

    angular
        .module('kanjireview.menu')
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['ReviewService'];

    function ResultsController(ReviewService){

        var vm = this;

        vm.getReviewedKanji = getReviewedKanji;
        vm.getCorrectCount = getCorrectCount;
        vm.getWrongCount = getWrongCount;

        // PUBLIC //////////////////////////////////////////////////////////////

        function getReviewedKanji(){
            return ReviewService.getReviewedKanji();
        }

        function getCorrectCount(){
            return ReviewService.getCorrectCount();
        }

        function getWrongCount(){
            return ReviewService.getWrongCount();
        }

        // PRIVATE /////////////////////////////////////////////////////////////
    }

})();