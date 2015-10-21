(function (){
    'use strict';

    angular
        .module('kanjireview.review')
        .factory('KanjiDataService', KanjiDataService);

    KanjiDataService.$inject = ['$http', '$rootScope'];

    function KanjiDataService($http, $rootScope){

        var oService = {
            oKanjiData: {},

            getKanjiData: getKanjiData,
            init: init
        };

        return oService;

        // PUBLIC //////////////////////////////////////////////////////////////

        function getKanjiData(){
            return oService.oKanjiData;
        }

        function init(){

            return $http.get(
                'data/kanji-data.json')
                .then(initComplete);

            function initComplete(oJsonData){
                oService.oKanjiData = oJsonData.data;

                $rootScope.$broadcast('KanjiDataService_init_end');
            }
        }

        // PRIVATE /////////////////////////////////////////////////////////////


    }
})();