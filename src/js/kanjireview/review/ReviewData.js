/**
 * This class will contain all the data that needs to be persisted. It will call to the persistence interface to init
 * all the data, and then the rest of the classes can query this class to obtain the needed data.
 *
 * @param oOptions The dependencies for this class
 * @constructor
 */
function ReviewData(oOptions){

    var oReviewData = this;

    /**
     * Object containing all storages, cycles and learnedKanji.
     * @type {{hardStorage: Array, mediumStorage: Array, easyStorage: Array, hardCycle: Array, mediumCycle: Array, easyCycle: Array, learnedKanji: number}}
     */
    oReviewData.oData = {
        hardStorage: [],
        mediumStorage: [],
        easyStorage: [],
        hardCycle: [],
        mediumCycle: [],
        easyCycle: [],
        learnedKanji: 0
    };

    /**
     * The persistence class.
     * @type {}
     */
    oReviewData.oReviewDataPersistence = null;

    oReviewData.getHardStorage = getHardStorage;
    oReviewData.setHardStorage = setHardStorage;
    oReviewData.getMediumStorage = getMediumStorage;
    oReviewData.setMediumStorage = setMediumStorage;
    oReviewData.getEasyStorage = getEasyStorage;
    oReviewData.setEasyStorage = setEasyStorage;
    oReviewData.getHardCycle = getHardCycle;
    oReviewData.setHardCycle = setHardCycle;
    oReviewData.getMediumCycle = getMediumCycle;
    oReviewData.setMediumCycle = setMediumCycle;
    oReviewData.getEasyCycle = getEasyCycle;
    oReviewData.setEasyCycle = setEasyCycle;
    oReviewData.getLearnedKanji = getLearnedKanji;
    oReviewData.setLearnedKanji = setLearnedKanji;
    oReviewData.saveReviewData = saveReviewData;


    initOptions(oOptions);

    // PUBLIC //

    /**
     * Returns the hard storage.
     * @returns {Array} The hard storage.
     */
    function getHardStorage(){
        return oReviewData.oData.hardStorage || [];
    }

    /**
     * Sets the hard storage.
     * @param {Array} aHardStorage The hard storage.
     */
    function setHardStorage(aHardStorage){
        oReviewData.oData.hardStorage = aHardStorage;
    }

    /**
     * Returns the medium storage.
     * @returns {Array} The medium storage.
     */
    function getMediumStorage(){
        return oReviewData.oData.mediumStorage || [];
    }

    /**
     * Sets the medium storage.
     * @param {Array} aMediumStorage The medium storage.
     */
    function setMediumStorage(aMediumStorage){
        oReviewData.oData.mediumStorage = aMediumStorage;
    }

    /**
     * Returns the easy storage.
     * @returns {Array} The easy storage.
     */
    function getEasyStorage(){
        return oReviewData.oData.easyStorage || [];
    }

    /**
     * Sets the easy storage.
     * @param {Array} aEasyStorage The easy storage.
     */
    function setEasyStorage(aEasyStorage){
        oReviewData.oData.easyStorage = aEasyStorage;
    }

    /**
     * Returns the hard cycle.
     * @returns {Array} Array with the kanji IDs of the hard cycle.
     */
    function getHardCycle(){
        return oReviewData.oData.hardCycle || [];
    }

    /**
     * Sets the hard cycle.
     * @param {Array} aHardCycle The hard cycle.
     */
    function setHardCycle(aHardCycle){
        oReviewData.oData.hardCycle = aHardCycle;
    }

    /**
     * Returns the medium cycle.
     * @returns {Array} Array with the kanji IDs of the medium cycle.
     */
    function getMediumCycle(){
        return oReviewData.oData.mediumCycle || [];
    }

    /**
     * Sets the medium cycle.
     * @param {Array} aMediumCycle The medium cycle.
     */
    function setMediumCycle(aMediumCycle){
        oReviewData.oData.mediumCycle = aMediumCycle;
    }

    /**
     * Returns the easy cycle.
     * @returns {Array} Array with the kanji IDs of the easy cycle.
     */
    function getEasyCycle(){
        return oReviewData.oData.easyCycle || [];
    }

    /**
     * Sets the easy cycle.
     * @param {Array} aEasyCycle The easy cycle.
     */
    function setEasyCycle(aEasyCycle){
        oReviewData.oData.easyCycle = aEasyCycle;
    }

    /**
     * Returns the number of learned kanji.
     * @returns {number} The number of learned kanji.
     */
    function getLearnedKanji(){
        return oReviewData.oData.learnedKanji || [];
    }

    /**
     * Set the number of learned kanji.
     * @param nLearnedKanji The number of learned kanji.
     */
    function setLearnedKanji(nLearnedKanji){
        oReviewData.oData.learnedKanji = nLearnedKanji;
    }

    /**
     * Instructs the ReviewData persistence to save the review data.
     */
    function saveReviewData(){
        oReviewData.oReviewDataPersistence.saveReviewData(oReviewData.oData);
    }

    // PRIVATE //

    /**
     * Gets the elements in the Option object and assigns them to object properties so then can be used in the class
     * methods.
     * @param oOptions The object containing the class dependencies.
     */
    function initOptions(oOptions){
        if(oOptions instanceof Object){
            if(oOptions.reviewDataPersistence){
                oReviewData.oReviewDataPersistence = oOptions.reviewDataPersistence;
                oReviewData.oData = oReviewData.oReviewDataPersistence.getReviewData();
            }
        }
    }
}