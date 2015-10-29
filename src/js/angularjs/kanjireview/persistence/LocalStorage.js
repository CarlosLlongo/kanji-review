(function (){
    'use strict';

    angular
        .module('kanjireview.persistence')
        .factory('LocalStorage', LocalStorage);

    LocalStorage.$inject = ['$window'];

    function LocalStorage($window){

        var oService = {
            setString: setString,
            getString: getString,
            setObject: setObject,
            getObject: getObject
        };

        return oService;

        // PUBLIC //

        /**
         * Stores a string to local storage.
         * @param sKey The key for the string.
         * @param sValue The string to store.
         */
        function setString(sKey, sValue){
            $window.localStorage[sKey] = sValue;
        }

        /**
         * Retrieves a string from local storage.
         * @param sKey The key to search.
         * @param sDefaultValue A default value to use if the key is not found.
         * @returns {String} The retrieved string or the default value is the key is not found.
         */
        function getString(sKey, sDefaultValue){
            return $window.localStorage[sKey] || sDefaultValue;
        }

        /**
         * Stores an object to the local storage. The object is serialized as a JSON string.
         * @param sKey The key for the object.
         * @param oObject The object to store.
         */
        function setObject(sKey, oObject){
            $window.localStorage[sKey] = JSON.stringify(oObject);
        }

        /**
         * Retrieves an object from local storage.
         * @param sKey The key to search.
         * @returns {Object} The retrieved object. If the key is not found, an empty object is returned.
         */
        function getObject(sKey){
            return JSON.parse($window.localStorage[sKey] || '{}');
        }
    }
})();