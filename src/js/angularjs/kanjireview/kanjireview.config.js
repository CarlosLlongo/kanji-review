(function(){
    'use strict';

    angular
        .module('kanjireview')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

    function configure($stateProvider, $urlRouterProvider, $ionicConfigProvider){

        $ionicConfigProvider.views.maxCache(0);

        var oApp = /*@ngInject*/ {
            name: 'app',
            url: '/app',
            abstract: true,
            templateUrl: 'html/menu/templates/side-menu-template.html'
        };

        var oStart = /*@ngInject*/ {
            name: 'app.start',
            url: '/start',
            views: {
                'menuContent': {
                    templateUrl: 'html/start/templates/start-template.html'
                }
            }
        };

        var oDrawing = /*@ngInject*/ {
            name: 'app.drawing',
            url: '/drawing',
            views: {
                'menuContent': {
                    templateUrl: 'html/drawing/templates/drawing-template.html'
                }
            }
        };

        var oResults = /*@ngInject*/ {
            name: 'app.results',
            url: '/results',
            views: {
                'menuContent': {
                    templateUrl: 'html/results/templates/results-template.html'
                }
            }
        };

        var oStats = /*@ngInject*/ {
            name: 'app.stats',
            url: '/stats',
            views: {
                'menuContent': {
                    templateUrl: 'html/stats/templates/stats-template.html'
                }
            }
        };

        $stateProvider
            .state(oApp)
            .state(oStart)
            .state(oDrawing)
            .state(oResults)
            .state(oStats);

        $urlRouterProvider.otherwise('/app/start');
    }
})();