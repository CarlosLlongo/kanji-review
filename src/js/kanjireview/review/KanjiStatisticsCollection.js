/**
 * This class represents a collection of all the Kanji Statistics for those Kanjis that have been reviewed.
 * @param oKanjiStatisticsDataPersistence The persistence object tasked with saving the kanji statistics.
 * @constructor
 */
function KanjiStatisticsCollection(oOptions){

    var oKanjiStatisticsCollection = this;

    /**
     * The collection of KanjiStatistics object.
     * @type {{KanjiStatistics}}
     */
    oKanjiStatisticsCollection.oCollection = {};
    /**
     * The persistence class.
     */
    oKanjiStatisticsCollection.oKanjiStatisticsDataPersistence = null;

    oKanjiStatisticsCollection.addKanjiStatistics = addKanjiStatistics;
    oKanjiStatisticsCollection.getKanjiStatistics = getKanjiStatistics;
    oKanjiStatisticsCollection.updateKanjiStatistics = updateKanjiStatistics;
    oKanjiStatisticsCollection.populateFromJsonObject = populateFromJsonObject;
    oKanjiStatisticsCollection.loadFromLocalStorage = loadFromLocalStorage;
    oKanjiStatisticsCollection.saveToLocalStorage = saveToLocalStorage;
    oKanjiStatisticsCollection.hasStatistics = hasStatistics;

    initOptions(oOptions);

    // PUBLIC //

    /**
     * Adds a KanjiStatistics to the collection.
     * @param oKanjiStatistics The KanjiStatistics to add to the collection.
     */
    function addKanjiStatistics(oKanjiStatistics){
        oKanjiStatisticsCollection.oCollection[oKanjiStatistics.getId()] = oKanjiStatistics;
    }

    /**
     * Obtains a KanjiStatistics from the collection.
     * @param sId The ID of the Kanji whose statistics will be obtained.
     * @returns {KanjiStatistics} The KanjiStatistics for the requested ID.
     */
    function getKanjiStatistics(sId){
        return oKanjiStatisticsCollection.oCollection[sId];
    }

    /**
     * Updates a KanjiStatistics from the collection with the new result. If no statistics exist for the given kanji
     * ID, a new KanjiStatistics will be added to the collection containing the given result. The returned object
     * contains the difficulty of the kanji before the update was done and after the update was done.
     *
     * @param sId The ID of the Kanji whose statistics to update.
     * @param nResult The result of the kanji review.
     * @returns {{prevDifficulty: string, newDifficulty: string}} A duo of values, with previous and new kanji difficulty
     */
    function updateKanjiStatistics(sId, nResult){
        var oUpdateStatus = {
            prevDifficulty: '',
            newDifficulty: ''
        };

        var oKanjiStatistics = oKanjiStatisticsCollection.oCollection[sId];

        if(!oKanjiStatistics){
            oKanjiStatistics = new KanjiStatistics(sId, []);
            oKanjiStatisticsCollection.oCollection[sId] = oKanjiStatistics;
        }

        oUpdateStatus.prevDifficulty = oKanjiStatistics.getDifficulty();

        oKanjiStatistics.addResult(nResult);

        oUpdateStatus.newDifficulty = oKanjiStatistics.getDifficulty();

        return oUpdateStatus;
    }

    /**
     * Adds all KanjiStatistics described in the JSON object.
     * @param oJsonObject An object with JSON structure that contains kanji statistics information.
     */
    function populateFromJsonObject(oJsonObject){
        for(var sKey in oJsonObject){
            addKanjiStatistics(new KanjiStatistics(sKey, oJsonObject[sKey]));
        }
    }

    /**
     * Loads the statistics from local storage.
     */
    function loadFromLocalStorage(){
        var oJsonObject = oKanjiStatisticsCollection.oKanjiStatisticsDataPersistence.getKanjiStatisticsData();
        populateFromJsonObject(oJsonObject);
    }

    /**
     * Converts each KanjiStatistics to a JSON object, and saves them to local storage.
     */
    function saveToLocalStorage(){
        var oJsonObject = {};

        for(var sKey in oKanjiStatisticsCollection.oCollection){
            oJsonObject[sKey] = oKanjiStatisticsCollection.oCollection[sKey].toJsonObject();
        }

        oKanjiStatisticsCollection.oKanjiStatisticsDataPersistence.saveKanjiStatisticsData(oJsonObject);
    }

    /**
     * Checks if there are statistics for the Kanji.
     * @param sId The ID of the Kanji
     * @returns {boolean} true if there are statistics, false otherwise.
     */
    function hasStatistics(sId){
        return sId in oKanjiStatisticsCollection.oCollection;
    }

    // PRIVATE //

    /**
     * Gets the elements in the Option object and assigns them to object properties so then can be used in the class
     * methods.
     * @param oOptions The object containing the class dependencies.
     */
    function initOptions(oOptions){
        if(oOptions instanceof Object){
            if(oOptions.kanjiStatisticsDataPersistence){
                oKanjiStatisticsCollection.oKanjiStatisticsDataPersistence = oOptions.kanjiStatisticsDataPersistence;

                loadFromLocalStorage();
            }
        }
    }

}