describe('KanjiCollection', function(){

    it('can create a KanjiCollection object', function(){
        expect(new KanjiCollection()).toBeDefined();
    });

    it('can put and retrieve a Kanji from the KanjiCollection', function(){
        var oKanjiCollection = new KanjiCollection();

        oKanjiCollection.putKanji(new Kanji('5', '水', 'water'));

        var oKanji = oKanjiCollection.getKanji('5');

        expect(oKanji).toBeDefined();
        expect(oKanji.getId()).toEqual('5');
        expect(oKanji.getCharacter()).toEqual('水');
        expect(oKanji.getKeyword()).toEqual('water');

        oKanjiCollection.putKanji(new Kanji('7', '雷', 'thunder'));

        oKanji = oKanjiCollection.getKanji('7');

        expect(oKanji).toBeDefined();
        expect(oKanji.getId()).toEqual('7');
        expect(oKanji.getCharacter()).toEqual('雷');
        expect(oKanji.getKeyword()).toEqual('thunder');

        oKanji = oKanjiCollection.getKanji('5');

        expect(oKanji).toBeDefined();
        expect(oKanji.getId()).toEqual('5');
        expect(oKanji.getCharacter()).toEqual('水');
        expect(oKanji.getKeyword()).toEqual('water');
    });

    it("can get the size of the collection", function () {
        var oKanjiCollection = new KanjiCollection();

        expect(oKanjiCollection.getSize()).toEqual(0);

        oKanjiCollection.putKanji(new Kanji('5', '水', 'water'));

        expect(oKanjiCollection.getSize()).toEqual(1);
    });

});