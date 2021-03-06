/**
 * This class will generate a batch of kanji IDs for a review session. The review batch will contain as many difficult
 * Kanjis as available, and the rest will be divided equally between medium and easy kanjis.
 * @param oOptions Contains the dependencies with other objects
 * @constructor
 */
function ReviewBatch(oOptions){

    var oReviewBatch = this;
    /**
     * The maximum size of the review batch.
     * @type {Integer}
     */
    var nMaxReviewBatchSize = 100;

    /**
     * The array containing the kanji IDs for this batch.
     * @type {Array}
     */
    oReviewBatch.aStorage = [];
    /**
     * Object from which to obtain the kanji of different difficulties.
     * @type {KanjiDifficultyManager}
     */
    oReviewBatch.oKanjiDifficultyManager = null;

    oReviewBatch.populate = populate;
    oReviewBatch.getBatch = getBatch;
    oReviewBatch.getSize = getSize;
    oReviewBatch.remaining = remaining;

    initOptions(oOptions);

    /**
     * Returns the size of the batch.
     * @returns {Array.length|*} The size of the batch.
     */
    function getSize(){
        return oReviewBatch.aStorage.length;
    }

    /**
     * Returns the batch.
     * @returns {Array} The array with the kanji IDs that compose this batch.
     */
    function getBatch(){
        return oReviewBatch.aStorage;
    }

    /**
     * Fills the batch by adding the new learned kanji and kanjis of the 3 difficulties, until the maximum size is
     * reached or there are no more kanjis left.
     */
    function populate(){
        oReviewBatch.aStorage = [];

        oReviewBatch.aStorage = oReviewBatch.aStorage.concat(
            oReviewBatch.oKanjiDifficultyManager.getFromHardCycle(remaining()));

        if(remaining() > 0){
            oReviewBatch.aStorage = oReviewBatch.aStorage.concat(
                oReviewBatch.oKanjiDifficultyManager.getFromMediumCycle(Math.ceil(remaining() / 2)));

            oReviewBatch.aStorage = oReviewBatch.aStorage.concat(
                oReviewBatch.oKanjiDifficultyManager.getFromEasyCycle(remaining()));
        }

        oReviewBatch.aStorage = shuffle(oReviewBatch.aStorage);
    }

    /**
     * Returns the available space in the batch until the maximum size will be reached.
     * @returns {number} The difference between the maximum size and the batch current size.
     */
    function remaining(){
        return nMaxReviewBatchSize - oReviewBatch.aStorage.length;
    }

    /**
     * Gets the elements in the Option object and assigns them to object properties so then can be used in the class
     * methods.
     * @param oOptions The object containing the class dependencies.
     */
    function initOptions(oOptions){
        if(oOptions instanceof Object){
            if(oOptions.kanjiDifficultyManager){
                oReviewBatch.oKanjiDifficultyManager = oOptions.kanjiDifficultyManager;
            }
        }
    }
}