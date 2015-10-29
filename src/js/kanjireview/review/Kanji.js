/**
 * This class represents a Kanji, with ist ID, its japanese character and the Heisig keyword.
 * @param sId The Kanji ID
 * @param sCharacter The Kanji japanese character
 * @param sKeyword The keyword
 * @constructor
 */
function Kanji(sId, sCharacter, sKeyword){
    this.sId = sId;
    this.sCharacter = sCharacter;
    this.sKeyword = sKeyword;
}

/**
 * Obtains the ID of the kanji
 * @returns {String|Kanji.sId} The ID of the kanji
 */
Kanji.prototype.getId = function(){
    return this.sId;
}

/**
 * Obtains the japanese character
 * @returns {String|Kanji.sCharacter} The japanese character
 */
Kanji.prototype.getCharacter = function(){
    return this.sCharacter;
}

/**
 * Obtains the Heisig keyword
 * @returns {String|Kanji.sKeyword} The keyword used to learn the kanji
 */
Kanji.prototype.getKeyword = function(){
    return this.sKeyword;
}