'use strict';

function KanjiCollection(){

    var oKanjiCollection = this;

    oKanjiCollection.oStorage = {};

    oKanjiCollection.putKanji = putKanji;
    oKanjiCollection.getKanji = getKanji;
    oKanjiCollection.getSize = getSize;

    // PUBLIC ///////////////////////////////////////////////////////////////////////

    function putKanji(oKanji){
        oKanjiCollection.oStorage[oKanji.getId()] = oKanji;
    }

    function getKanji(sId){
        return oKanjiCollection.oStorage[sId];
    }

    function getSize(){
        return Object.keys(oKanjiCollection.oStorage).length;
    }

}