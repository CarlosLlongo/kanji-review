'use strict';

function KanjiCollection(){

    var oKanjiCollection = this;

    oKanjiCollection.oStorage = {};

    oKanjiCollection.putKanji = putKanji;
    oKanjiCollection.getKanji = getKanji;
    oKanjiCollection.getKeyset = getKeyset;
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

    function getKeyset(){
        var oKeyset = Object.keys(oKanjiCollection.oStorage);
        oKeyset.sort(function(a, b){
            if(parseInt(a) > parseInt(b)) return 1;
            else return -1;
        });

        return oKeyset;
    }
}