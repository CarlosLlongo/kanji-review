(function(){
    'use strict';

    angular
        .module('kanjireview.menu')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['ReviewService'];

    function MenuController(ReviewService){

        var vm = this;

        vm.endReview = endReview;

        // PUBLIC //////////////////////////////////////////////////////////////

        function endReview(){
            ReviewService.endReview();
        }

        // PRIVATE /////////////////////////////////////////////////////////////
    }

})();