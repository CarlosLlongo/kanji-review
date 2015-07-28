function KanjiDifficultyStorage(){

    var oKanjiDifficultyStorage = this;

    oKanjiDifficultyStorage.aStorage = [];
    oKanjiDifficultyStorage.aCurrentCycle = [];

    oKanjiDifficultyStorage.store = store;
    oKanjiDifficultyStorage.storeAll = storeAll;
    oKanjiDifficultyStorage.getStorage = getStorage;
    oKanjiDifficultyStorage.getFromCycle = getFromCycle;
    oKanjiDifficultyStorage.setCurrentCycle = setCurrentCycle;
    oKanjiDifficultyStorage.getCurrentCycle = getCurrentCycle;
    oKanjiDifficultyStorage.setStorage = setStorage;
    oKanjiDifficultyStorage.getStorage = getStorage;

    function store(sId){
        oKanjiDifficultyStorage.aStorage.push(sId);
    }

    function storeAll(aIds){
        oKanjiDifficultyStorage.aStorage = oKanjiDifficultyStorage.aStorage.concat(aIds);
    }

    function getStorage(){
        return oKanjiDifficultyStorage.aStorage;
    }

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
            return oKanjiDifficultyStorage.aStorage.slice();
        }
        else{
            aCycleIds = oKanjiDifficultyStorage.aCurrentCycle.slice();

            oKanjiDifficultyStorage.aCurrentCycle = oKanjiDifficultyStorage.aStorage.slice();

            var aPool = arrayDiff(oKanjiDifficultyStorage.aCurrentCycle, oKanjiDifficultyStorage.aStorage);

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

    function setCurrentCycle(aCycle){
        oKanjiDifficultyStorage.aCurrentCycle = aCycle;
    }

    function getCurrentCycle(){
        return oKanjiDifficultyStorage.aCurrentCycle;
    }

    function setStorage(aToStore){
        oKanjiDifficultyStorage.aStorage = aToStore;
    }

}