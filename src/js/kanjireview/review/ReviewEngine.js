/**
 * This class is the upper layer of the review process. It will manage the rest of the object so that it can return the
 * full Kanji in each step of the review.
 *
 * @param oOptions Contains the dependencies with other objects
 * @constructor
 */
function ReviewEngine(oOptions){

    var oReviewEngine = this;

    /**
     * The batch with the IDs of the kanjis to review.
     * @type {Array}
     */
    oReviewEngine.aBatch = null;
    /**
     * The current position of the review in the batch array.
     * @type {number}
     */
    oReviewEngine.nCursor = 0;

    /**
     * The user review data (learned kanjis, kanji difficulty, etc)
     * @type {ReviewData}
     */
    oReviewEngine.oReviewData = null;
    /**
     * The review batch for the current review.
     * @type {ReviewBatch}
     */
    oReviewEngine.oReviewBatch = null;
    /**
     * The kanji collection with all the information about each kanji
     * @type {KanjiCollection}
     */
    oReviewEngine.oKanjiCollection = null;
    /**
     * The Kanji difficulty manager where we can update the status of each kanji.
     * @type {KanjiDifficultyManager}
     */
    oReviewEngine.oKanjiDifficultyManager = null;

    oReviewEngine.getLearnedKanji = getLearnedKanji;
    oReviewEngine.setLearnedKanji = setLearnedKanji;
    oReviewEngine.getNextKanji = getNextKanji;
    oReviewEngine.addResult = addResult;
    oReviewEngine.endReview = endReview;
    oReviewEngine.clearStatistics = clearStatistics;

    initOptions(oOptions);
    populateBatch();

    /**
     * Returns the number of learned Kanji
     *
     * @returns {Integer} The number of learned kanji.
     */
    function getLearnedKanji(){
        return oReviewEngine.oReviewData.getLearnedKanji();
    }

    /**
     * Sets the number of learned Kanji
     * @param nLearnedKanji The number of learned kanji.
     */
    function setLearnedKanji(nLearnedKanji){
        oReviewEngine.oReviewData.setLearnedKanji(nLearnedKanji);
    }

    /**
     * Moves the cursor to the next position in the batch, obtaining the next kanji ID. This Kanji is then obtained
     * from the KanjiCollection and returned. If the end of the batch is reached, the batch is repopulated and the
     * cursor is reset.
     *
     * @returns {Kanji} The next Kanji to review.
     */
    function getNextKanji(){
        var nNextKanjiId = oReviewEngine.aBatch[oReviewEngine.nCursor];
        var oNextKanji = oReviewEngine.oKanjiCollection.getKanji(nNextKanjiId.toString());

        oReviewEngine.nCursor++;

        if(isEndOfBatch()){
            populateBatch();
        }

        return oNextKanji;
    }

    /**
     * Adds a new result to the statistics of the Kanji and updates its difficulty.
     * @param {String} sKanjiId The ID of the kanji
     * @param {Integer} nResult The result of the review of the kanji (1: correct; 0: incorrect)
     */
    function addResult(sKanjiId, nResult){
        oReviewEngine.oKanjiDifficultyManager.addResult(sKanjiId, nResult);
    }

    /**
     * Executes the required operations when the review is ended. At the moment the only requirement is to save the
     * statistics.
     */
    function endReview(){
        oReviewEngine.oKanjiDifficultyManager.saveStatistics();
    }

    /**
     * Instructs the Kanji Difficulty manager to clear the Kanji Statistics.
     */
    function clearStatistics(){
        oReviewEngine.oKanjiDifficultyManager.clearStatistics();
    }

    // PRIVATE //

    /**
     * Gets the elements in the Option object and assigns them to object properties so then can be used in the class
     * methods.
     * @param oOptions The object containing the class dependencies.
     */
    function initOptions(oOptions){
        if(oOptions instanceof Object){
            if(oOptions.reviewData){
                oReviewEngine.oReviewData = oOptions.reviewData;
            }
            if(oOptions.reviewBatch){
                oReviewEngine.oReviewBatch = oOptions.reviewBatch;
            }
            if(oOptions.kanjiCollection){
                oReviewEngine.oKanjiCollection = oOptions.kanjiCollection;
            }
            if(oOptions.kanjiDifficultyManager){
                oReviewEngine.oKanjiDifficultyManager = oOptions.kanjiDifficultyManager;
            }
        }
    }

    /**
     * Checks if the end of the batch has been reached.
     *
     * @returns {boolean} True if the end has been reached, false otherwise.
     */
    function isEndOfBatch(){
        return oReviewEngine.nCursor >= oReviewEngine.aBatch.length;
    }

    /**
     * Populates the batch object and resets the cursor to 0.
     */
    function populateBatch(){
        oReviewEngine.oReviewBatch.populate();
        oReviewEngine.aBatch = oReviewEngine.oReviewBatch.getBatch();
        oReviewEngine.nCursor = 0;
    }
}