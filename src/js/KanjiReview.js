(function(){
    'use strict';

    angular
        .module('kanjireview', [
            'kanjireview.drawing',
            'kanjireview.menu',
            'kanjireview.review',
            'kanjireview.start',
            'ionic',
            'pw.canvas-painter'
        ]);

    angular.module('kanjireview.drawing', []);
    angular.module('kanjireview.menu', []);
    angular.module('kanjireview.review', []);
    angular.module('kanjireview.start', []);
})();