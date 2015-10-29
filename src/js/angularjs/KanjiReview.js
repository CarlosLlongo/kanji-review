(function(){
    'use strict';

    angular
        .module('kanjireview', [
            'kanjireview.drawing',
            'kanjireview.menu',
            'kanjireview.persistence',
            'kanjireview.review',
            'kanjireview.start',
            'ionic',
            'pw.canvas-painter',
            'n3-pie-chart'
        ]);

    angular.module('kanjireview.drawing', []);
    angular.module('kanjireview.menu', []);
    angular.module('kanjireview.persistence', []);
    angular.module('kanjireview.review', []);
    angular.module('kanjireview.start', []);

})();