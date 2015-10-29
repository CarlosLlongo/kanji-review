/**
 * This class contains the statistics for a Kanji. It will store up to the last 3 results for the kanji in the
 * reviews.
 *
 * @param sKanjiId The ID of the Kanji
 * @param {Array} aKanjiResults An array of integers. A 1 indicates a successful writing. A 0 is a wrong writing.
 * @constructor
 */
function KanjiStatistics(sKanjiId, aKanjiResults){

    var oKanjiStatistics = this;

    /**
     * The ID of the Kanji.
     * @type {String}
     */
    oKanjiStatistics.sKanjiId = sKanjiId;
    /**
     * An array of booleans indicating the Kanji results in previous reviews.
     * @type {Array}
     */
    oKanjiStatistics.aKanjiResults = aKanjiResults;

    oKanjiStatistics.getId = getId;
    oKanjiStatistics.getResults = getResults;
    oKanjiStatistics.addResult = addResult;
    oKanjiStatistics.setResults = setResults;
    oKanjiStatistics.getDifficulty = getDifficulty;
    oKanjiStatistics.toJsonObject = toJsonObject;

    /**
     * Obtains the ID of the Kanji.
     * @returns {String|KanjiStatistics.sKanjiId|*}
     */
    function getId(){
        return oKanjiStatistics.sKanjiId;
    }

    /**
     * Obtains the array of booleans representing the Kanji review results.
     * @returns {Array|KanjiStatistics.aKanjiResults|*}
     */
    function getResults(){
        return oKanjiStatistics.aKanjiResults;
    }

    /**
     * Adds a new result to the result array. Since only the last 3 results are stored, y the array gets bigger, the
     * oldest result is removed.
     * @param {Integer} nResult The result to be added.
     */
    function addResult(nResult){
        oKanjiStatistics.aKanjiResults.push(nResult);

        if(oKanjiStatistics.aKanjiResults.length > 3){
            oKanjiStatistics.aKanjiResults.shift();
        }
    }

    /**
     * Sets the results for this Kanji statistics.
     * @param {Array} aResults The results for the Kanji.
     */
    function setResults(aResults){
        oKanjiStatistics.aKanjiResults = aResults;
    }

    /**
     * Calculates the difficulty of the Kanji based on the previous reviews of the kanji.
     * Not previously reviewed or only 1 correct review: Hard
     * Two correct reviews: Medium
     * Three correct reviews: Easy
     * @returns {string} Returns the difficulty of the kanji.
     */
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

    /**
     * Converts the object to a JSON object representation. In this case, it's simply the array of results.
     * @returns {Array|KanjiStatistics.aKanjiResults|*} The array of kanji review rewsults.
     */
    function toJsonObject(){
        return oKanjiStatistics.aKanjiResults;
    }
}