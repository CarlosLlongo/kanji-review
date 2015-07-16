(function(){
    'use strict';

    angular
        .module('kanjireview', [
            'kanjireview.drawing',
            'kanjireview.jander',
            'ionic',
            'pw.canvas-painter'
        ]);

    angular.module('kanjireview.drawing', []);
    angular.module('kanjireview.jander', []);

})();