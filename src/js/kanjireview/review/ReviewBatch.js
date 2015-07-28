function ReviewBatch(nLearnedKanji, nNewLearnedKanji, oOptions){

    var oReviewBatch = this;

    oReviewBatch.nLearnedKanji = nLearnedKanji;
    oReviewBatch.nNewLearnedKanji = nNewLearnedKanji;
    oReviewBatch.aStorage = [];
    oReviewBatch.nMaxReviewBatchSize = 100;
    oReviewBatch.oKanjiDifficultyManager = null;

    oReviewBatch.populate = populate;
    oReviewBatch.getBatch = getBatch;
    oReviewBatch.getSize = getSize;
    oReviewBatch.remaining = remaining;

    initOptions(oOptions);

    function getSize(){
        return oReviewBatch.aStorage.length;
    }

    function getBatch(){
        return oReviewBatch.aStorage;
    }

    function populate(){
        if(nNewLearnedKanji <= oReviewBatch.nMaxReviewBatchSize){
            for(var i = oReviewBatch.nLearnedKanji; i > nLearnedKanji - nNewLearnedKanji; i--){
                oReviewBatch.aStorage.push(String(i));
            }
        }
        else{
            var aLearnedIds = fillArray(nLearnedKanji - nNewLearnedKanji + 1, nNewLearnedKanji);

            var nKanjiId;
            for(var i = 0; i < oReviewBatch.nMaxReviewBatchSize; i++){
                nKanjiId = getAndRemoveRandomValue(aLearnedIds);
                oReviewBatch.aStorage.push(String(nKanjiId));
            }

            oReviewBatch.oKanjiDifficultyManager.addAllToHard(aLearnedIds);
        }

        if(oReviewBatch.oKanjiDifficultyManager.getHardStorageSize() > 0){
            if(oReviewBatch.oKanjiDifficultyManager.getHardStorageSize() > remaining()){
                var aHardStorage = oReviewBatch.oKanjiDifficultyManager.getHardStorage();


            }
        }

        if(oReviewBatch.aStorage.length === 100){
            return;
        }

        var nReviewBatchSize = Math.min(oReviewBatch.nLearnedKanji, oReviewBatch.nMaxReviewBatchSize);

        for(var i = 1; i <= nReviewBatchSize; i++){
            oReviewBatch.aStorage.push(String(i));
        }
    }

    function remaining(){
        return oReviewBatch.nMaxReviewBatchSize - oReviewBatch.aStorage.length;
    }

    function initOptions(oOptions){
        if(oOptions instanceof Object){
            if(oOptions.kanjiDifficultyManager){
                oReviewBatch.oKanjiDifficultyManager = oOptions.kanjiDifficultyManager;
            }
        }
    }
}