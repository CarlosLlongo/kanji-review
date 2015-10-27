/**
 * This class stores the kanji of a certain difficulty and which of those kanji are pending to be reviewed in the
 * current cycle. When the current cycle is finished, it is refilled with the kanji in the store.
 * @constructor
 */
function KanjiDifficultyStorage(oOptions){

    var oKanjiDifficultyStorage = this;

    /**
     * The storage for kanji IDs of a certain difficulty.
     * @type {Array}
     */
    oKanjiDifficultyStorage.aStorage = [];

    /**
     * The kanji IDs pending to be reviewed in the current cycle.
     * @type {Array}
     */
    oKanjiDifficultyStorage.aCurrentCycle = [];

    oKanjiDifficultyStorage.store = store;
    oKanjiDifficultyStorage.storeAll = storeAll;
    oKanjiDifficultyStorage.removeFromStorage = removeFromStorage;
    oKanjiDifficultyStorage.getFromCycle = getFromCycle;
    oKanjiDifficultyStorage.setCurrentCycle = setCurrentCycle;
    oKanjiDifficultyStorage.getCurrentCycle = getCurrentCycle;
    oKanjiDifficultyStorage.setStorage = setStorage;
    oKanjiDifficultyStorage.getStorage = getStorage;

    initOptions(oOptions);

    /**
     * Adds a kanji ID to the storage.
     * @param sId The kanji ID to add.
     */
    function store(sId){
        oKanjiDifficultyStorage.aStorage.push(sId);
    }

    /**
     * Adds all the kanji IDs in the array to the storage.
     * @param aIds The array with the kanji IDs to be added.
     */
    function storeAll(aIds){
        oKanjiDifficultyStorage.aStorage = removeDuplicates(oKanjiDifficultyStorage.aStorage.concat(aIds));
    }

    /**
     * Removes a kanji Id from the storage.
     * @param sId The Kanji ID to remove.
     */
    function removeFromStorage(sId){
        if(oKanjiDifficultyStorage.aStorage.indexOf(sId) !== -1){
            oKanjiDifficultyStorage.aStorage.splice(
                oKanjiDifficultyStorage.aStorage.indexOf(sId), 1);
        }
    }

    /**
     * Returns an array with as many kanji IDs as the required number. If there are not enough kanji IDs in the current
     * cycle, more are extracted from the storage. If the number of kanji IDs required is bigger than the storage, the
     * all stored kanji IDs are returned.
     * @param nRequired The number of kanji IDs required
     * @returns {Array} An array with the required kanji IDs.
     */
    function getFromCycle(nRequired){
        var aCycleIds = [];

        if(oKanjiDifficultyStorage.aCurrentCycle.length === 0){
            oKanjiDifficultyStorage.aCurrentCycle = oKanjiDifficultyStorage.aStorage.slice();
        }

        if(nRequired <= oKanjiDifficultyStorage.aCurrentCycle.length){
            for(var i = 0; i < nRequired; i++){
                aCycleIds.push(getAndRemoveRandomValue(oKanjiDifficultyStorage.aCurrentCycle));
            }

            return aCycleIds;
        }

        if(nRequired >= oKanjiDifficultyStorage.aStorage.length){
            oKanjiDifficultyStorage.aCurrentCycle = [];
            return oKanjiDifficultyStorage.aStorage.slice();
        }
        else{
            aCycleIds = oKanjiDifficultyStorage.aCurrentCycle.slice();

            oKanjiDifficultyStorage.aCurrentCycle = oKanjiDifficultyStorage.aStorage.slice();

            var aPool = arrayDiff(aCycleIds, oKanjiDifficultyStorage.aCurrentCycle);

            var sKanjiId;
            while(aCycleIds.length < nRequired){
                sKanjiId = getAndRemoveRandomValue(aPool);
                aCycleIds.push(sKanjiId);
                oKanjiDifficultyStorage.aCurrentCycle.splice(
                    oKanjiDifficultyStorage.aCurrentCycle.indexOf(sKanjiId), 1);
            }

            return aCycleIds;
        }
    }

    /**
     * Sets the current cycle array.
     * @param aCycle The array to be set as the current cycle.
     */
    function setCurrentCycle(aCycle){
        oKanjiDifficultyStorage.aCurrentCycle = aCycle;
    }

    /**
     * Returns the current cycle array.
     * @returns {Array} The current cycle array.
     */
    function getCurrentCycle(){
        return oKanjiDifficultyStorage.aCurrentCycle;
    }

    /**
     * Sets the storage array.
     * @param aToStore The array to be set as the storage.
     */
    function setStorage(aToStore){
        oKanjiDifficultyStorage.aStorage = aToStore;
    }

    /**
     * Returns the storage array.
     * @returns {Array} The storage array.
     */
    function getStorage(){
        return oKanjiDifficultyStorage.aStorage;
    }

    /**
     * Gets the elements in the Option object and sets the storage and current cycle.
     *
     * @param oOptions The object containing the storage and cycle data.
     */
    function initOptions(oOptions){
        if(oOptions instanceof Object){
            if(oOptions.storage){
                setStorage(oOptions.storage);
            }

            if(oOptions.cycle){
                setCurrentCycle(oOptions.cycle);
            }
        }
    }
}