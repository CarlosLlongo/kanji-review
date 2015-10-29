describe('ReviewEngine', function(){

    it('can create a ReviewEngine object', function(){
        var oReviewDataMock = mockObject(new ReviewData());
        var oReviewBatchMock = mockObject(new ReviewBatch());
        var oKanjiCollectionMock = mockObject(new KanjiCollection());

        expect(new ReviewEngine({
            reviewData: oReviewDataMock,
            kanjiCollection: oKanjiCollectionMock,
            reviewBatch: oReviewBatchMock
        })).toBeDefined();
    });

    it("can get learned kanji", function () {
        var oReviewDataMock = mockObject(new ReviewData());
        var oReviewBatchMock = mockObject(new ReviewBatch());
        var oKanjiCollectionMock = mockObject(new KanjiCollection());
        createStub(oReviewDataMock, 'getLearnedKanji', 67);

        var oReviewEngine = new ReviewEngine({
            reviewData: oReviewDataMock,
            kanjiCollection: oKanjiCollectionMock,
            reviewBatch: oReviewBatchMock
        });

        expect(oReviewEngine.getLearnedKanji()).toBe(67);
    });

    it("can set a learned kanji number", function () {
        var oReviewDataMock = mockObject(new ReviewData());
        var oReviewBatchMock = mockObject(new ReviewBatch());
        var oKanjiCollectionMock = mockObject(new KanjiCollection());
        spyFunction(oReviewDataMock, 'setLearnedKanji');

        var oReviewEngine = new ReviewEngine({
            reviewData: oReviewDataMock,
            kanjiCollection: oKanjiCollectionMock,
            reviewBatch: oReviewBatchMock
        });

        oReviewEngine.setLearnedKanji(51);

        expect(wasCalled(oReviewDataMock, 'setLearnedKanji')).toBe(true);
    });

    it("can get next kanji", function () {
        var oReviewDataMock = mockObject(new ReviewData());
        createStub(oReviewDataMock, 'getLearnedKanji', 1);

        var oKanjiMock = mockObject(new Kanji());
        createStub(oKanjiMock, 'getId', '1');
        createStub(oKanjiMock, 'getCharacter', '水');
        createStub(oKanjiMock, 'getKeyword', 'water');
        var oKanjiCollectionMock = mockObject(new KanjiCollection());
        createStub(oKanjiCollectionMock, 'getKanji', oKanjiMock);

        var oReviewBatchMock = mockObject(new ReviewBatch());
        createStub(oReviewBatchMock, 'getBatch', [1]);

        var oReviewEngine = new ReviewEngine({
            reviewData: oReviewDataMock,
            kanjiCollection: oKanjiCollectionMock,
            reviewBatch: oReviewBatchMock
        });

        var oNextKanji = oReviewEngine.getNextKanji();

        expect(oNextKanji.getId()).toEqual('1');


        // Get consecutive next kanjis
        var aKanjiMocks = [mockObject(new Kanji()), mockObject(new Kanji())];
        createStub(aKanjiMocks[0], 'getId', '1');
        createStub(aKanjiMocks[0], 'getCharacter', '水');
        createStub(aKanjiMocks[0], 'getKeyword', 'water');
        createStub(aKanjiMocks[1], 'getId', '2');
        createStub(aKanjiMocks[1], 'getCharacter', '雷');
        createStub(aKanjiMocks[1], 'getKeyword', 'thunder');
        createStub(oKanjiCollectionMock, 'getKanji', aKanjiMocks, true);
        createStub(oReviewDataMock, 'getLearnedKanji', 2);
        createStub(oReviewBatchMock, 'getBatch', [1, 2]);

        oReviewEngine = new ReviewEngine({
            reviewData: oReviewDataMock,
            kanjiCollection: oKanjiCollectionMock,
            reviewBatch: oReviewBatchMock
        });

        oNextKanji = oReviewEngine.getNextKanji();
        var sKanjiId = oNextKanji.getId();
        expect(sKanjiId).toEqual('1');

        oNextKanji = oReviewEngine.getNextKanji();
        var sNextKanjiId = oNextKanji.getId();
        expect(sNextKanjiId).toEqual('2');

        oNextKanji = oReviewEngine.getNextKanji();
        var sAnotherKanjiId = oNextKanji.getId();
        expect(['1','2'].indexOf(sAnotherKanjiId)).not.toEqual(-1);
    });

    it("can add a new result", function () {
        var oReviewDataMock = mockObject(new ReviewData());
        var oReviewBatchMock = mockObject(new ReviewBatch());
        var oKanjiCollectionMock = mockObject(new KanjiCollection());
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        spyFunction(oKanjiDifficultyManagerMock, 'addResult');

        var oReviewEngine = new ReviewEngine({
            reviewData: oReviewDataMock,
            kanjiCollection: oKanjiCollectionMock,
            reviewBatch: oReviewBatchMock,
            kanjiDifficultyManager: oKanjiDifficultyManagerMock
        });

        oReviewEngine.addResult();
        expect(wasCalled(oKanjiDifficultyManagerMock, 'addResult')).toBe(true);
    });

    it("can end review", function () {
        var oReviewBatchMock = mockObject(new ReviewBatch());
        var oReviewDataMock = mockObject(new ReviewData());
        spyFunction(oReviewDataMock, 'saveReviewData');
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        spyFunction(oKanjiDifficultyManagerMock, 'saveStatistics');
        spyFunction(oKanjiDifficultyManagerMock, 'updateReviewData');

        var oReviewEngine = new ReviewEngine({
            reviewBatch: oReviewBatchMock,
            reviewData: oReviewDataMock,
            kanjiDifficultyManager: oKanjiDifficultyManagerMock
        });

        oReviewEngine.endReview();
        expect(wasCalled(oKanjiDifficultyManagerMock, 'saveStatistics')).toBe(true);
        expect(wasCalled(oKanjiDifficultyManagerMock, 'updateReviewData')).toBe(true);
        expect(wasCalled(oReviewDataMock, 'saveReviewData')).toBe(true);
    });
});