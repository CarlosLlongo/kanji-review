describe('KanjiDifficultyManager', function(){

    it("can create KanjiDifficultyManager object", function () {
        expect(new KanjiDifficultyManager()).toBeDefined();
    });

    it("can init storages", function () {
        var oHardStorage = new KanjiDifficultyStorage();
        var oMediumStorage = new KanjiDifficultyStorage();
        var oEasyStorage = new KanjiDifficultyStorage();

        oHardStorage.storeAll([1,2,3]);
        oMediumStorage.storeAll([4,5,6]);
        oEasyStorage.storeAll([7,8,9]);

        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: oHardStorage,
                mediumStorage: oMediumStorage,
                easyStorage: oEasyStorage
            }
        );

        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1,2,3]);
    });

    it("can add to the hard storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: new KanjiDifficultyStorage()
            }
        );
        oKanjiDifficultyManager.addHard(1);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1]);
        oKanjiDifficultyManager.addHard(2);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1, 2]);
        oKanjiDifficultyManager.addHard(8);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1, 2, 8]);
    });

    it("can add array to hard storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToHard([]);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([]);

        oKanjiDifficultyManager.addAllToHard([1]);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1]);

        oKanjiDifficultyManager.addHard(2);
        oKanjiDifficultyManager.addAllToHard([3, 4]);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1, 2, 3, 4]);
    });

    it("can get hard storage size", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToHard([]);
        expect(oKanjiDifficultyManager.getHardStorageSize()).toEqual(0);

        oKanjiDifficultyManager.addAllToHard([1]);
        expect(oKanjiDifficultyManager.getHardStorageSize()).toEqual(1);

        oKanjiDifficultyManager.addHard(2);
        oKanjiDifficultyManager.addAllToHard([3, 4]);
        expect(oKanjiDifficultyManager.getHardStorageSize()).toEqual(4);
    });

    it("can get from hard cycle", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToHard([]);
        expect(oKanjiDifficultyManager.getFromHardCycle(0)).toEqual([]);
        expect(oKanjiDifficultyManager.getFromHardCycle(1)).toEqual([]);
        oKanjiDifficultyManager.addAllToHard([1]);
        expect(oKanjiDifficultyManager.getFromHardCycle(1)).toEqual([1]);
        oKanjiDifficultyManager.addAllToHard([2,3,4,5]);
        expect(oKanjiDifficultyManager.getFromHardCycle(20)).toEqual([1,2,3,4,5]);
    });

    it("can clear hard storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToHard([]);
        oKanjiDifficultyManager.clearHardStorage();
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([]);

        oKanjiDifficultyManager.addAllToHard([1]);
        oKanjiDifficultyManager.clearHardStorage();
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([]);
    });

    it("can add to the medium storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                mediumStorage: new KanjiDifficultyStorage()
            }
        );
        oKanjiDifficultyManager.addMedium(1);
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([1]);
        oKanjiDifficultyManager.addMedium(2);
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([1, 2]);
        oKanjiDifficultyManager.addMedium(8);
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([1, 2, 8]);
    });

    it("can add array to medium storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                mediumStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToMedium([]);
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([]);

        oKanjiDifficultyManager.addAllToMedium([1]);
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([1]);

        oKanjiDifficultyManager.addMedium(2);
        oKanjiDifficultyManager.addAllToMedium([3, 4]);
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([1, 2, 3, 4]);
    });

    it("can get medium storage size", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                mediumStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToMedium([]);
        expect(oKanjiDifficultyManager.getMediumStorageSize()).toEqual(0);

        oKanjiDifficultyManager.addAllToMedium([1]);
        expect(oKanjiDifficultyManager.getMediumStorageSize()).toEqual(1);

        oKanjiDifficultyManager.addMedium(2);
        oKanjiDifficultyManager.addAllToMedium([3, 4]);
        expect(oKanjiDifficultyManager.getMediumStorageSize()).toEqual(4);
    });

    it("can get from medium cycle", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                mediumStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToMedium([]);
        expect(oKanjiDifficultyManager.getFromMediumCycle(0)).toEqual([]);
        expect(oKanjiDifficultyManager.getFromMediumCycle(1)).toEqual([]);
        oKanjiDifficultyManager.addAllToMedium([1]);
        expect(oKanjiDifficultyManager.getFromMediumCycle(1)).toEqual([1]);
        oKanjiDifficultyManager.addAllToMedium([2,3,4,5]);
        expect(oKanjiDifficultyManager.getFromMediumCycle(20)).toEqual([1,2,3,4,5]);
    });

    it("can clear medium storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                mediumStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToMedium([]);
        oKanjiDifficultyManager.clearMediumStorage();
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([]);

        oKanjiDifficultyManager.addAllToMedium([1]);
        oKanjiDifficultyManager.clearMediumStorage();
        expect(oKanjiDifficultyManager.getMediumStorage()).toEqual([]);
    });

    it("can add to the easy storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                easyStorage: new KanjiDifficultyStorage()
            }
        );
        oKanjiDifficultyManager.addEasy(1);
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([1]);
        oKanjiDifficultyManager.addEasy(2);
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([1, 2]);
        oKanjiDifficultyManager.addEasy(8);
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([1, 2, 8]);
    });

    it("can add array to easy storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                easyStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToEasy([]);
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([]);

        oKanjiDifficultyManager.addAllToEasy([1]);
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([1]);

        oKanjiDifficultyManager.addEasy(2);
        oKanjiDifficultyManager.addAllToEasy([3, 4]);
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([1, 2, 3, 4]);
    });

    it("can get easy storage size", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                easyStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToEasy([]);
        expect(oKanjiDifficultyManager.getEasyStorageSize()).toEqual(0);

        oKanjiDifficultyManager.addAllToEasy([1]);
        expect(oKanjiDifficultyManager.getEasyStorageSize()).toEqual(1);

        oKanjiDifficultyManager.addEasy(2);
        oKanjiDifficultyManager.addAllToEasy([3, 4]);
        expect(oKanjiDifficultyManager.getEasyStorageSize()).toEqual(4);
    });

    it("can get from easy cycle", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                easyStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToEasy([]);
        expect(oKanjiDifficultyManager.getFromEasyCycle(0)).toEqual([]);
        expect(oKanjiDifficultyManager.getFromEasyCycle(1)).toEqual([]);
        oKanjiDifficultyManager.addAllToEasy([1]);
        expect(oKanjiDifficultyManager.getFromEasyCycle(1)).toEqual([1]);
        oKanjiDifficultyManager.addAllToEasy([2,3,4,5]);
        expect(oKanjiDifficultyManager.getFromEasyCycle(20)).toEqual([1,2,3,4,5]);
    });

    it("can clear easy storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                easyStorage: new KanjiDifficultyStorage()
            }
        );

        oKanjiDifficultyManager.addAllToEasy([]);
        oKanjiDifficultyManager.clearEasyStorage();
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([]);

        oKanjiDifficultyManager.addAllToEasy([1]);
        oKanjiDifficultyManager.clearEasyStorage();
        expect(oKanjiDifficultyManager.getEasyStorage()).toEqual([]);
    });

    it("can update kanji statistics", function () {
        var oKanjiStatisticsCollectionMock = mockObject(new KanjiStatisticsCollection());
        createStub(oKanjiStatisticsCollectionMock, 'updateKanjiStatistics', {prevDifficulty: 'hard', newDifficulty: 'hard'});
        var oHardStorageMock = mockObject(new KanjiDifficultyStorage());
        spyFunction(oHardStorageMock, 'removeFromStorage');
        spyFunction(oHardStorageMock, 'store');
        var oMediumStorageMock = mockObject(new KanjiDifficultyStorage());
        spyFunction(oMediumStorageMock, 'store');
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: oHardStorageMock,
                mediumStorage: oMediumStorageMock,
                kanjiStatisticsCollection: oKanjiStatisticsCollectionMock
            }
        );

        oKanjiDifficultyManager.addResult('3', true);
        expect(wasCalled(oHardStorageMock, 'store')).toBe(true);
        expect(wasCalled(oMediumStorageMock, 'store')).toBe(false);
        resetCalled(oHardStorageMock, 'removeFromStorage');

        createStub(oKanjiStatisticsCollectionMock, 'updateKanjiStatistics', {prevDifficulty: 'hard', newDifficulty: 'medium'});
        oKanjiDifficultyManager.addResult('3', true);
        expect(wasCalled(oHardStorageMock, 'removeFromStorage')).toBe(true);
        expect(wasCalled(oMediumStorageMock, 'store')).toBe(true);
    });

    it("can save kanji statistics", function () {
        var oKanjiStatisticsCollectionMock = mockObject(new KanjiStatisticsCollection());
        spyFunction(oKanjiStatisticsCollectionMock, 'saveToLocalStorage');
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                kanjiStatisticsCollection: oKanjiStatisticsCollectionMock
            }
        );

        oKanjiDifficultyManager.saveStatistics();
        wasCalled(oKanjiStatisticsCollectionMock, 'saveToLocalStorage');
    });

    it("can update review data", function () {
        var oHardStorageMock = mockObject(new KanjiDifficultyStorage());
        createStub(oHardStorageMock, 'getStorage', ['1', '2', '3']);
        createStub(oHardStorageMock, 'getCurrentCycle', ['2', '3']);
        var oMediumStorageMock = mockObject(new KanjiDifficultyStorage());
        createStub(oMediumStorageMock, 'getStorage', ['4', '5', '6']);
        createStub(oMediumStorageMock, 'getCurrentCycle', ['4', '6']);
        var oEasyStorageMock = mockObject(new KanjiDifficultyStorage());
        createStub(oEasyStorageMock, 'getStorage', ['7', '8', '9']);
        createStub(oEasyStorageMock, 'getCurrentCycle', ['7']);
        var oReviewDataMock = mockObject(new ReviewData());
        spyFunction(oReviewDataMock, 'setHardStorage');
        spyFunction(oReviewDataMock, 'setMediumStorage');
        spyFunction(oReviewDataMock, 'setEasyStorage');
        spyFunction(oReviewDataMock, 'setHardCycle');
        spyFunction(oReviewDataMock, 'setMediumCycle');
        spyFunction(oReviewDataMock, 'setEasyCycle');

        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: oHardStorageMock,
                mediumStorage: oMediumStorageMock,
                easyStorage: oEasyStorageMock
            }
        );

        oKanjiDifficultyManager.updateReviewData(oReviewDataMock);
        expect(wasCalled(oReviewDataMock, 'setHardStorage')).toBe(true);
        expect(wasCalledParameter(oReviewDataMock, 'setHardStorage', 1)).toEqual(['1', '2', '3']);
        expect(wasCalled(oReviewDataMock, 'setMediumStorage')).toBe(true);
        expect(wasCalledParameter(oReviewDataMock, 'setMediumStorage', 1)).toEqual(['4', '5', '6']);
        expect(wasCalled(oReviewDataMock, 'setEasyStorage')).toBe(true);
        expect(wasCalledParameter(oReviewDataMock, 'setEasyStorage', 1)).toEqual(['7', '8', '9']);
        expect(wasCalled(oReviewDataMock, 'setHardCycle')).toBe(true);
        expect(wasCalledParameter(oReviewDataMock, 'setHardCycle', 1)).toEqual(['2', '3']);
        expect(wasCalled(oReviewDataMock, 'setMediumCycle')).toBe(true);
        expect(wasCalledParameter(oReviewDataMock, 'setMediumCycle', 1)).toEqual(['4', '6']);
        expect(wasCalled(oReviewDataMock, 'setEasyCycle')).toBe(true);
        expect(wasCalledParameter(oReviewDataMock, 'setEasyCycle', 1)).toEqual(['7']);
    });

    it("can store new learned kanjis", function () {
        var oHardStorageMock = mockObject(new KanjiDifficultyStorage());
        spyFunction(oHardStorageMock, 'storeAll');
        var oKanjiDifficultyManager = new KanjiDifficultyManager(
            {
                hardStorage: oHardStorageMock
            }
        );

        oKanjiDifficultyManager.storeNewLearnedKanji(25, 30);
        expect(wasCalled(oHardStorageMock, 'storeAll')).toBe(true);
        expect(wasCalledParameter(oHardStorageMock, 'storeAll', 1)).toEqual(['30','29','28','27','26']);

        oKanjiDifficultyManager.storeNewLearnedKanji(40, 40);
        expect(wasCalledParameter(oHardStorageMock, 'storeAll', 1)).toEqual([]);
    });
});