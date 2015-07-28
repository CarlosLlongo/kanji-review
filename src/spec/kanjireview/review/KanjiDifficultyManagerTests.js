describe('KanjiDifficultyManager', function(){

    it("can create KanjiDifficultyManager object", function () {
        expect(new KanjiDifficultyManager()).toBeDefined();
    });

    it("can add to the hard storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager();
        oKanjiDifficultyManager.addHard(1);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1]);
        oKanjiDifficultyManager.addHard(2);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1, 2]);
        oKanjiDifficultyManager.addHard(8);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1, 2, 8]);
    });

    it("can add array to hard storage", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager();

        oKanjiDifficultyManager.addAllToHard([]);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([]);

        oKanjiDifficultyManager.addAllToHard([1]);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1]);

        oKanjiDifficultyManager.addHard(2);
        oKanjiDifficultyManager.addAllToHard([3, 4]);
        expect(oKanjiDifficultyManager.getHardStorage()).toEqual([1, 2, 3, 4]);
    });

    it("can get hard storage size", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager();

        oKanjiDifficultyManager.addAllToHard([]);
        expect(oKanjiDifficultyManager.getHardStorageSize()).toEqual(0);

        oKanjiDifficultyManager.addAllToHard([1]);
        expect(oKanjiDifficultyManager.getHardStorageSize()).toEqual(1);

        oKanjiDifficultyManager.addHard(2);
        oKanjiDifficultyManager.addAllToHard([3, 4]);
        expect(oKanjiDifficultyManager.getHardStorageSize()).toEqual(4);

    });
});