/**
 * This class contains a collection of Kanji, and offers methods to add Kanji to the collection and get Kanji from the
 * collection. Also offers methods to obtain the size and keySet of the collection.
 * @constructor
 */
function KanjiCollection(){

    var oKanjiCollection = this;

    /**
     * A set where the Kanji are stored.
     * @type {Object}
     */
    oKanjiCollection.oStorage = {};

    oKanjiCollection.putKanji = putKanji;
    oKanjiCollection.getKanji = getKanji;
    oKanjiCollection.getKeyset = getKeyset;
    oKanjiCollection.getSize = getSize;
    oKanjiCollection.populateFromJsonObject = populateFromJsonObject;

    // PUBLIC ///////////////////////////////////////////////////////////////////////

    /**
     * Adds a Kanji to the collection.
     * @param oKanji The Kanji to add to the collection.
     */
    function putKanji(oKanji){
        oKanjiCollection.oStorage[oKanji.getId()] = oKanji;
    }

    /**
     * Gets a Kanji from the collection.
     * @param sId The Id of the Kanji to get.
     * @returns {Kanji} The Kanji from the collection.
     */
    function getKanji(sId){
        return oKanjiCollection.oStorage[sId];
    }

    /**
     * Gets the size of the collection.
     * @returns {Array.length|*} The size of the collection.
     */
    function getSize(){
        return Object.keys(oKanjiCollection.oStorage).length;
    }

    /**
     * Gets a sorted array with all the Kanji IDs in the collection.
     * @returns {*|Array} The array with the sorted Kanji IDs.
     */
    function getKeyset(){
        var oKeyset = Object.keys(oKanjiCollection.oStorage);
        oKeyset.sort(function(a, b){
            if(parseInt(a) > parseInt(b)) return 1;
            else return -1;
        });

        return oKeyset;
    }

    /**
     * Adds all Kanji described in the JSON object.
     * @param oJsonObject An object with JSON structure that contains kanji information.
     */
    function populateFromJsonObject(oJsonObject){
        for(var sKey in oJsonObject){
            putKanji(new Kanji(sKey, oJsonObject[sKey].kanji, oJsonObject[sKey].keyword));
        }
    }
}