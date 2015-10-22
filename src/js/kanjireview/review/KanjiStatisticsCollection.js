function KanjiStatisticsCollection(){

    var oKanjiStatisticsCollection = this;

    oKanjiStatisticsCollection.oCollection = {};

    oKanjiStatisticsCollection.addKanjiStatistics = addKanjiStatistics;
    oKanjiStatisticsCollection.getKanjiStatistics = getKanjiStatistics;
    oKanjiStatisticsCollection.updateKanjiStatistics = updateKanjiStatistics;
    oKanjiStatisticsCollection.populateFromJsonObject = populateFromJsonObject;

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
     * @param sId
     * @param bResult
     * @returns {{prevDifficulty: string, newDifficulty: string}} A duo of values, with previous and new kanji difficulty
     */
    function updateKanjiStatistics(sId, bResult){
        var oUpdateStatus = {};

        var oKanjiStatistics = oKanjiStatisticsCollection.oCollection[sId];

        if(!oKanjiStatistics){
            oKanjiStatistics = new KanjiStatistics(sId, []);
            oKanjiStatisticsCollection.oCollection[sId] = oKanjiStatistics;
        }

        oUpdateStatus['prevDifficulty'] = oKanjiStatistics.getDifficulty();

        oKanjiStatistics.addResult(bResult);

        oUpdateStatus['newDifficulty'] = oKanjiStatistics.getDifficulty();

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

}