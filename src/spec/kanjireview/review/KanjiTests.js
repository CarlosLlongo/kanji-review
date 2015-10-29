describe('Kanji', function(){

    it('can create a Kanji object', function(){
        expect(new Kanji()).toBeDefined();
    });

    it('can create a Kanji object with id', function(){
        var oKanji = new Kanji('1');
        expect(oKanji.getId()).toEqual('1');
    });

    it('can create a Kanji object with id and character and keyword', function(){
        var oKanji = new Kanji('54', '水', 'water');
        expect(oKanji.getId()).toEqual('54');
        expect(oKanji.getCharacter()).toEqual('水');
        expect(oKanji.getKeyword()).toEqual('water');
    });
});