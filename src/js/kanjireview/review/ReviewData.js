/**
 * This class will contain all the data that needs to be persisted. It will call to the persistency interface to init
 * all the data, and then the rest of the Class can query this class to obtain the needed data.
 *
 * @param oReviewDataPersistence Interface for the persistence service.
 * @constructor
 */
function ReviewData(oReviewDataPersistence){

    var oReviewData = this;

    /**
     * The kanji IDs in the easy store.
     * @type {Array} Array containing the kanji IDs in the easy store.
     */
    oReviewData.aEasyStore = [];
    oReviewData.aMediumStore = [];
    oReviewData.aHardStore = [];
    oReviewData.aEasyCycle = [];
    oReviewData.aMediumCycle = [];
    oReviewData.aHardCycle = [];
    oReviewData.nLearnedKanji = 0;

    oReviewData.getHardStorage = getHardStorage;
    oReviewData.getMediumStorage = getMediumStorage;
    oReviewData.getEasyStorage = getEasyStorage;
    oReviewData.getHardCycle = getHardCycle;
    oReviewData.getMediumCycle = getMediumCycle;
    oReviewData.getEasyCycle = getEasyCycle;
    oReviewData.getLearnedKanji = getLearnedKanji;
    oReviewData.setLearnedKanji = setLearnedKanji;

    initReviewData();

    /**
     * Returns the hard storage.
     * @returns {Array} The hard storage.
     */
    function getHardStorage(){
        return oReviewData.aHardStore;
    }

    /**
     * Returns the medium storage.
     * @returns {Array} The medium storage.
     */
    function getMediumStorage(){
        return oReviewData.aMediumStore;
    }

    /**
     * Returns the easy storage.
     * @returns {Array} The easy storage.
     */
    function getEasyStorage(){
        return oReviewData.aEasyStore;
    }

    /**
     * Returns the hard cycle.
     * @returns {Array} Array with the kanji IDs of the hard cycle.
     */
    function getHardCycle(){
        return oReviewData.aHardCycle;
    }

    /**
     * Returns the medium cycle.
     * @returns {Array} Array with the kanji IDs of the medium cycle.
     */
    function getMediumCycle(){
        return oReviewData.aMediumCycle;
    }

    /**
     * Returns the easy cycle.
     * @returns {Array} Array with the kanji IDs of the easy cycle.
     */
    function getEasyCycle(){
        return oReviewData.aEasyCycle;
    }

    /**
     * Returns the number of learned kanji.
     * @returns {number} The number of learned kanji.
     */
    function getLearnedKanji(){
        return oReviewData.nLearnedKanji;
    }

    /**
     * Set the number of learned kanji.
     * @param nLearnedKanji The number of learned kanji.
     */
    function setLearnedKanji(nLearnedKanji){
        oReviewData.nLearnedKanji = nLearnedKanji;
    }

    /**
     * Initialize the review data by retrieving the data from the persistence interface.
     */
    function initReviewData(){
        oReviewData.aEasyStore = oReviewDataPersistence.getEasyStorage();
        oReviewData.aMediumStore = oReviewDataPersistence.getMediumStorage();
        oReviewData.aHardStore = oReviewDataPersistence.getHardStorage();
        oReviewData.aEasyCycle = oReviewDataPersistence.getEasyCycle();
        oReviewData.aMediumCycle = oReviewDataPersistence.getMediumCycle();
        oReviewData.aHardCycle = oReviewDataPersistence.getHardCycle();
        oReviewData.nLearnedKanji = oReviewDataPersistence.getLearnedKanji();
    }
}