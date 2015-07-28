'use strict';

function ReviewEngine(nLearnedKanji, oKanjiCollection){

    var oReviewEngine = this;

    oReviewEngine.nLearnedKanji = nLearnedKanji;
    oReviewEngine.oKanjiCollection = oKanjiCollection;

    oReviewEngine.getLearnedKanji = getLearnedKanji;
    oReviewEngine.getNextKanji = getNextKanji;

    function getLearnedKanji(){
        return oReviewEngine.nLearnedKanji;
    }

    function getNextKanji(){
        return new Kanji('3', 'N', 'water');
    }
}