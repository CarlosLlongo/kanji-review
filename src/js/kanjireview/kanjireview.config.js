(function(){
    'use strict';

    angular
        .module('kanjireview')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider){

        var oStart = /*@ngInject*/ {
            name: 'start',
            url: '/start',
            templateUrl: 'html/start/templates/start-template.html'
        };

        var oDrawing = /*@ngInject*/ {
            name: 'drawing',
            url: '/drawing',
            templateUrl: 'html/drawing/templates/drawing-template.html'
        };

        $stateProvider
            .state(oStart)
            .state(oDrawing);

        $urlRouterProvider.otherwise('/start');
    }
})();