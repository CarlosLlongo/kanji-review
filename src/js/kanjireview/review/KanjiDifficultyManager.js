/**
 * This class manages the three difficulty storages. It can do operations over this storages like add an element, get
 * element, get the size of a storage or clear the storage.
 * @param oOptions The storages to be injected.
 * @constructor
 */
function KanjiDifficultyManager(oOptions){

    var oKanjiDifficultyManager = this;

    /**
     * An object containing the three difficulty storages.
     * @type {{hard: DifficultyStorage, medium: DifficultyStorage, easy: DifficultyStorage}}
     */
    oKanjiDifficultyManager.oStorages = {
        hard: null,
        medium: null,
        easy: null
    };
    /**
     * The collection of all kanji statistics.
     * @type {KanjiStatisticsCollection}
     */
    oKanjiDifficultyManager.oKanjiStatisticsCollection = null;

    oKanjiDifficultyManager.initOptions = initOptions;
    oKanjiDifficultyManager.addHard = addHard;
    oKanjiDifficultyManager.addMedium = addMedium;
    oKanjiDifficultyManager.addEasy = addEasy;
    oKanjiDifficultyManager.addAllToHard = addAllToHard;
    oKanjiDifficultyManager.addAllToMedium = addAllToMedium;
    oKanjiDifficultyManager.addAllToEasy = addAllToEasy;
    oKanjiDifficultyManager.getHardStorage = getHardStorage;
    oKanjiDifficultyManager.getMediumStorage = getMediumStorage;
    oKanjiDifficultyManager.getEasyStorage = getEasyStorage;
    oKanjiDifficultyManager.getHardStorageSize = getHardStorageSize;
    oKanjiDifficultyManager.getMediumStorageSize = getMediumStorageSize;
    oKanjiDifficultyManager.getEasyStorageSize = getEasyStorageSize;
    oKanjiDifficultyManager.getFromHardCycle = getFromHardCycle;
    oKanjiDifficultyManager.getFromMediumCycle = getFromMediumCycle;
    oKanjiDifficultyManager.getFromEasyCycle = getFromEasyCycle;
    oKanjiDifficultyManager.clearHardStorage = clearHardStorage;
    oKanjiDifficultyManager.clearMediumStorage = clearMediumStorage;
    oKanjiDifficultyManager.clearEasyStorage = clearEasyStorage;
    oKanjiDifficultyManager.addResult = addResult;
    oKanjiDifficultyManager.saveStatistics = saveStatistics;
    oKanjiDifficultyManager.updateReviewData = updateReviewData;
    oKanjiDifficultyManager.storeNewLearnedKanji = storeNewLearnedKanji;

    initOptions(oOptions);

    /**
     * Adds an ID to the hard storage.
     * @param sId The ID of the Kanji.
     */
    function addHard(sId){
        oKanjiDifficultyManager.oStorages.hard.store(sId);
    }

    /**
     * Adds all Kanji IDs in the input array to the hard storage.
     * @param aIds An array with Kanji IDs.
     */
    function addAllToHard(aIds){
        oKanjiDifficultyManager.oStorages.hard.storeAll(aIds);
    }

    /**
     * Return the array with the IDs of the kanjis in the hard storage.
     * @returns {Array} Array with all the hard kanji IDs
     */
    function getHardStorage(){
        return oKanjiDifficultyManager.oStorages.hard.getStorage();
    }

    /**
     * Returns the size of the hard storage.
     * @returns {Integer} The size of the hard storage.
     */
    function getHardStorageSize(){
        return oKanjiDifficultyManager.oStorages.hard.getStorage().length;
    }

    /**
     * Returns the required number of kanji IDs from the hard cycle.
     * @param nRequired The required number of kanji IDs.
     * @returns {Array} An array with the required number of kanji IDs.
     */
    function getFromHardCycle(nRequired){
        return oKanjiDifficultyManager.oStorages.hard.getFromCycle(nRequired);
    }

    /**
     * Empties the hard storage.
     */
    function clearHardStorage(){
        oKanjiDifficultyManager.oStorages.hard.setStorage([]);
    }

    /**
     * Adds an ID to the medium storage.
     * @param sId The ID of the Kanji.
     */
    function addMedium(sId){
        oKanjiDifficultyManager.oStorages.medium.store(sId);
    }

    /**
     * Adds all Kanji IDs in the input array to the medium storage.
     * @param aIds An array with Kanji IDs.
     */
    function addAllToMedium(aIds){
        oKanjiDifficultyManager.oStorages.medium.storeAll(aIds);
    }

    /**
     * Return the array with the IDs of the kanjis in the medium storage.
     * @returns {Array} Array with all the medium kanji IDs
     */
    function getMediumStorage(){
        return oKanjiDifficultyManager.oStorages.medium.getStorage();
    }

    /**
     * Returns the size of the medium storage.
     * @returns {Integer} The size of the medium storage.
     */
    function getMediumStorageSize(){
        return oKanjiDifficultyManager.oStorages.medium.getStorage().length;
    }

    /**
     * Returns the required number of kanji IDs from the medium cycle.
     * @param nRequired The required number of kanji IDs.
     * @returns {Array} An array with the required number of kanji IDs.
     */
    function getFromMediumCycle(nRequired){
        return oKanjiDifficultyManager.oStorages.medium.getFromCycle(nRequired);
    }

    /**
     * Empties the medium storage.
     */
    function clearMediumStorage(){
        oKanjiDifficultyManager.oStorages.medium.setStorage([]);
    }

    /**
     * Adds an ID to the easy storage.
     * @param sId The ID of the Kanji.
     */
    function addEasy(sId){
        oKanjiDifficultyManager.oStorages.easy.store(sId);
    }

    /**
     * Adds all Kanji IDs in the input array to the easy storage.
     * @param aIds An array with Kanji IDs.
     */
    function addAllToEasy(aIds){
        oKanjiDifficultyManager.oStorages.easy.storeAll(aIds);
    }

    /**
     * Return the array with the IDs of the kanjis in the easy storage.
     * @returns {Array} Array with all the easy kanji IDs
     */
    function getEasyStorage(){
        return oKanjiDifficultyManager.oStorages.easy.getStorage();
    }

    /**
     * Returns the size of the easy storage.
     * @returns {Integer} The size of the easy storage.
     */
    function getEasyStorageSize(){
        return oKanjiDifficultyManager.oStorages.easy.getStorage().length;
    }

    /**
     * Returns the required number of kanji IDs from the easy cycle.
     * @param nRequired The required number of kanji IDs.
     * @returns {Array} An array with the required number of kanji IDs.
     */
    function getFromEasyCycle(nRequired){
        return oKanjiDifficultyManager.oStorages.easy.getFromCycle(nRequired);
    }

    /**
     * Empties the easy storage.
     */
    function clearEasyStorage(){
        oKanjiDifficultyManager.oStorages.easy.setStorage([]);
    }

    /**
     * Adds a result to the kanji statistics. If the difficulty of the kanji has changed wit the new result, the
     * storages will be updated.
     * @param sKanjiId The Kanji ID to update.
     * @param nResult The result in the review.
     */
    function addResult(sKanjiId, nResult){
        var bHasStatistics = oKanjiDifficultyManager.oKanjiStatisticsCollection.hasStatistics(sKanjiId);
        var oStatus = oKanjiDifficultyManager.oKanjiStatisticsCollection.updateKanjiStatistics(sKanjiId, nResult);

        if(oStatus.prevDifficulty !== oStatus.newDifficulty || !bHasStatistics){
            oKanjiDifficultyManager.oStorages[oStatus.prevDifficulty].removeFromStorage(sKanjiId);
            oKanjiDifficultyManager.oStorages[oStatus.newDifficulty].store(sKanjiId);
        }
    }

    /**
     * Instructs the Kanji Statistics collection to save the Kanji Statistics.
     */
    function saveStatistics(){
        oKanjiDifficultyManager.oKanjiStatisticsCollection.saveToLocalStorage();
    }

    /**
     * Updates the data in the ReviewData object with the information extracted from the DifficultyStorages.
     * @param oReviewData The ReviewData object to update.
     */
    function updateReviewData(oReviewData){
        oReviewData.setHardStorage(oKanjiDifficultyManager.oStorages.hard.getStorage());
        oReviewData.setMediumStorage(oKanjiDifficultyManager.oStorages.medium.getStorage());
        oReviewData.setEasyStorage(oKanjiDifficultyManager.oStorages.easy.getStorage());

        oReviewData.setHardCycle(oKanjiDifficultyManager.oStorages.hard.getCurrentCycle());
        oReviewData.setMediumCycle(oKanjiDifficultyManager.oStorages.medium.getCurrentCycle());
        oReviewData.setEasyCycle(oKanjiDifficultyManager.oStorages.easy.getCurrentCycle());
    }

    /**
     * Adds to the hard storage all new kanjis learned since the last review.
     * @param nPrevLearned The kanjis learned in the previous review.
     * @param nNewLearned The kanjis learned in the current review.
     */
    function storeNewLearnedKanji(nPrevLearned, nNewLearned){
        var aNewLearnedKanjis = [];

        for(var i = nNewLearned; i > nPrevLearned; i--){
            aNewLearnedKanjis.push(i.toString());
        }

        oKanjiDifficultyManager.oStorages.hard.storeAll(aNewLearnedKanjis);
    }

    // PRIVATE //

    /**
     * Gets the elements in the Option object and assigns them to object properties so then can be used in the class
     * methods.
     * @param oOptions The object containing the class dependencies.
     */
    function initOptions(oOptions){
        if(oOptions instanceof Object){
            if(oOptions.hardStorage){
                oKanjiDifficultyManager.oStorages.hard = oOptions.hardStorage;
            }
            if(oOptions.mediumStorage){
                oKanjiDifficultyManager.oStorages.medium = oOptions.mediumStorage;
            }
            if(oOptions.easyStorage){
                oKanjiDifficultyManager.oStorages.easy = oOptions.easyStorage;
            }
            if(oOptions.kanjiStatisticsCollection){
                oKanjiDifficultyManager.oKanjiStatisticsCollection = oOptions.kanjiStatisticsCollection;
            }
        }
    }
}