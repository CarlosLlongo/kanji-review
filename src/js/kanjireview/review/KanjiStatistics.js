function KanjiStatistics(sKanjiId, aKanjiResults){

    var oKanjiStatistics = this;

    oKanjiStatistics.sKanjiId = sKanjiId;
    oKanjiStatistics.aKanjiResults = aKanjiResults;

    oKanjiStatistics.getId = getId;
    oKanjiStatistics.getResults = getResults;
    oKanjiStatistics.addResult = addResult;
    oKanjiStatistics.setResults = setResults;
    oKanjiStatistics.getDifficulty = getDifficulty;

    function getId(){
        return oKanjiStatistics.sKanjiId;
    }

    function getResults(){
        return oKanjiStatistics.aKanjiResults;
    }

    function addResult(nResult){
        oKanjiStatistics.aKanjiResults.push(nResult);

        if(oKanjiStatistics.aKanjiResults.length > 3){
            oKanjiStatistics.aKanjiResults.shift();
        }
    }

    function setResults(aResults){
        oKanjiStatistics.aKanjiResults = aResults;
    }

    function getDifficulty(){
        var nSum = sumArray(oKanjiStatistics.aKanjiResults);

        if(nSum === 3){
            return 'easy';
        }
        if(nSum === 2){
            return 'medium';
        }

        return 'hard';
    }
}