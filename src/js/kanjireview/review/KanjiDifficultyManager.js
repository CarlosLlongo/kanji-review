function KanjiDifficultyManager(){

    var oKanjiDifficultyManager = this;

    oKanjiDifficultyManager.oHardStorage = [];
    oKanjiDifficultyManager.oHardCurrentCycle = [];

    oKanjiDifficultyManager.oStorages = {
        hard: [],
        hardCurrentCycle: []
    };

    oKanjiDifficultyManager.addHard = addHard;
    oKanjiDifficultyManager.addAllToHard = addAllToHard;
    oKanjiDifficultyManager.getHardStorage = getHardStorage;
    oKanjiDifficultyManager.getHardStorageSize = getHardStorageSize;

    function addHard(sId){
        oKanjiDifficultyManager.oStorages['hard'].push(sId);
        oKanjiDifficultyManager.oHardStorage.push(sId);
    }

    function addAllToHard(aIds){
        oKanjiDifficultyManager.oHardStorage = oKanjiDifficultyManager.oHardStorage.concat(aIds);
    }

    function getHardStorage(){
        return oKanjiDifficultyManager.oHardStorage;
    }

    function getHardStorageSize(){
        return oKanjiDifficultyManager.oHardStorage.length;
    }
}