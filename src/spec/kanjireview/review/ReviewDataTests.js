describe('ReviewData', function(){

    it("can init storages", function () {
        var oReviewDataPersistenceMock = mockObject({getReviewData: function (){}});
        createStub(oReviewDataPersistenceMock, 'getReviewData', {
            hardStorage: [11, 12, 13, 14, 15],
            mediumStorage: [6, 7, 8, 9, 10],
            easyStorage: [1, 2, 3, 4, 5]
        });

        var oReviewData = new ReviewData({reviewDataPersistence: oReviewDataPersistenceMock});
        expect(oReviewData.getHardStorage()).toEqual([11, 12, 13, 14, 15]);
        expect(oReviewData.getMediumStorage()).toEqual([6, 7, 8, 9, 10]);
        expect(oReviewData.getEasyStorage()).toEqual([1, 2, 3, 4, 5]);
    });

    it("can init cycles", function () {
        var oReviewDataPersistenceMock = mockObject({getReviewData: function (){}});
        createStub(oReviewDataPersistenceMock, 'getReviewData', {
            hardCycle: [11, 12, 13, 14, 15],
            mediumCycle: [6, 7, 8, 9, 10],
            easyCycle: [1, 2, 3, 4, 5]
        });

        var oReviewData = new ReviewData({reviewDataPersistence: oReviewDataPersistenceMock});
        expect(oReviewData.getHardCycle()).toEqual([11, 12, 13, 14, 15]);
        expect(oReviewData.getMediumCycle()).toEqual([6, 7, 8, 9, 10]);
        expect(oReviewData.getEasyCycle()).toEqual([1, 2, 3, 4, 5]);
    });

    it("can init learned kanji", function () {
        var oReviewDataPersistenceMock = mockObject({getReviewData: function (){}});
        createStub(oReviewDataPersistenceMock, 'getReviewData', {
            learnedKanji: 1342
        });

        var oReviewData = new ReviewData({reviewDataPersistence: oReviewDataPersistenceMock});
        expect(oReviewData.getLearnedKanji()).toEqual(1342);
    });
});