describe('ReviewEngine', function(){

    it('can create a ReviewEngine object', function(){
        expect(new ReviewEngine()).toBeDefined();
    });

    it("can set a learned kanji number", function () {
        var oKanjiCollection = new KanjiCollection();

        var oReviewEngine = new ReviewEngine(51, oKanjiCollection);

        expect(oReviewEngine.getLearnedKanji()).toEqual(51);
    });

    it("can get next kanji", function () {
        var oKanjiCollection = new KanjiCollection();

        oKanjiCollection.putKanji(new Kanji('1', '雨', 'rain'));
        oKanjiCollection.putKanji(new Kanji('2', '雷', 'thunder'));
        oKanjiCollection.putKanji(new Kanji('3', '雪', 'snow'));
        oKanjiCollection.putKanji(new Kanji('4', '水', 'water'));

        var oReviewEngine = new ReviewEngine(oKanjiCollection);

        var oNextKanji = oReviewEngine.getNextKanji();

        expect(typeof oNextKanji).toEqual('object');
        expect(typeof oNextKanji.getId()).toEqual('string');
        expect(typeof oNextKanji.getCharacter()).toEqual('string');
        expect(typeof oNextKanji.getKeyword()).toEqual('string');

        var oAnotherKanji = oReviewEngine.getNextKanji();

        //expect(oAnotherKanji).not.toEqual(oNextKanji);
    });



});