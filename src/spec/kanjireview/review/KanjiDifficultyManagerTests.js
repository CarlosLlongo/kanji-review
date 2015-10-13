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
});