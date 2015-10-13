describe('ReviewData', function(){

    it("can init storages", function () {
        var oReviewDataPersistenceMock = mockObject(new ReviewDataPersistence());
        createStub(oReviewDataPersistenceMock, 'getHardStorage', [11, 12, 13, 14, 15]);
        createStub(oReviewDataPersistenceMock, 'getMediumStorage', [6, 7, 8, 9, 10]);
        createStub(oReviewDataPersistenceMock, 'getEasyStorage', [1, 2, 3, 4, 5]);

        var oReviewData = new ReviewData(oReviewDataPersistenceMock);
        expect(oReviewData.getHardStorage()).toEqual([11, 12, 13, 14, 15]);
        expect(oReviewData.getMediumStorage()).toEqual([6, 7, 8, 9, 10]);
        expect(oReviewData.getEasyStorage()).toEqual([1, 2, 3, 4, 5]);
    });

    it("can init cycles", function () {
        var oReviewDataPersistenceMock = mockObject(new ReviewDataPersistence());
        createStub(oReviewDataPersistenceMock, 'getHardCycle', [11, 12, 13, 14, 15]);
        createStub(oReviewDataPersistenceMock, 'getMediumCycle', [6, 7, 8, 9, 10]);
        createStub(oReviewDataPersistenceMock, 'getEasyCycle', [1, 2, 3, 4, 5]);

        var oReviewData = new ReviewData(oReviewDataPersistenceMock);
        expect(oReviewData.getHardCycle()).toEqual([11, 12, 13, 14, 15]);
        expect(oReviewData.getMediumCycle()).toEqual([6, 7, 8, 9, 10]);
        expect(oReviewData.getEasyCycle()).toEqual([1, 2, 3, 4, 5]);
    });

    it("can init learned kanji", function () {
        var oReviewDataPersistenceMock = mockObject(new ReviewDataPersistence());
        createStub(oReviewDataPersistenceMock, 'getLearnedKanji', 1342);

        var oReviewData = new ReviewData(oReviewDataPersistenceMock);
        expect(oReviewData.getLearnedKanji()).toEqual(1342);
    });
});