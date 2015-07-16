(function(){
    'use strict';

    angular
        .module('kanjireview')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider){

        var oStart = /*@ngInject*/ {
            name: 'home',
            url: '/home',
            templateUrl: 'html/jander/templates/jander-template.html'
        };

        var oDrawing = /*@ngInject*/ {
            name: 'drawing',
            url: '/drawing',
            templateUrl: 'html/drawing/templates/drawing-template.html'
        };

        $stateProvider
            .state(oStart)
            .state(oDrawing);
    }
})();