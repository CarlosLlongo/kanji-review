'use strict';

function Kanji(sId, sCharacter, sKeyword){
    this.sId = sId;
    this.sCharacter = sCharacter;
    this.sKeyword = sKeyword;
}

Kanji.prototype.getId = function(){
    return this.sId;
}

Kanji.prototype.getCharacter = function(){
    return this.sCharacter;
}

Kanji.prototype.getKeyword = function(){
    return this.sKeyword;
}