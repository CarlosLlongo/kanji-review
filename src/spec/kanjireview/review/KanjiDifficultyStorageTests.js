describe('KanjiDifficultyStorage', function() {

    it("can create KanjiDifficultyStorage object", function () {
        expect(new KanjiDifficultyStorage()).toBeDefined();
    });

    it("can init storage and cycle by parameters", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage({
            storage: [2],
            cycle: [3]
        });

        expect(oKanjiDifficultyStorage.getStorage()).toEqual([2]);
        expect(oKanjiDifficultyStorage.getCurrentCycle()).toEqual([3]);
    });

    it("can add to the storage", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();

        expect(oKanjiDifficultyStorage.getStorage()).toEqual([]);
        oKanjiDifficultyStorage.store(1);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([1]);
        oKanjiDifficultyStorage.store(2);
        oKanjiDifficultyStorage.store(3);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([1, 2, 3]);
    });

    it("can add multiple to the storage", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();
        oKanjiDifficultyStorage.storeAll([1, 2, 3, 4, 5]);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([1, 2, 3, 4, 5]);
    });

    it("can set and get current cycle", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();
        oKanjiDifficultyStorage.setCurrentCycle([]);
        expect(oKanjiDifficultyStorage.getCurrentCycle()).toEqual([]);
        oKanjiDifficultyStorage.setCurrentCycle([1]);
        expect(oKanjiDifficultyStorage.getCurrentCycle()).toEqual([1]);
        oKanjiDifficultyStorage.setCurrentCycle([1,2,3,4]);
        expect(oKanjiDifficultyStorage.getCurrentCycle()).toEqual([1,2,3,4]);
    });

    it("can set and get storage", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();
        oKanjiDifficultyStorage.setStorage([]);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([]);
        oKanjiDifficultyStorage.setStorage([1]);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([1]);
        oKanjiDifficultyStorage.setStorage([1,2,3,4]);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([1,2,3,4]);
    });

    it("can get from cycle", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();

        var aCycleIds = oKanjiDifficultyStorage.getFromCycle(0);
        expect(aCycleIds).toEqual([]);
        oKanjiDifficultyStorage.store(1);
        oKanjiDifficultyStorage.setCurrentCycle([]);
        aCycleIds = oKanjiDifficultyStorage.getFromCycle(1);
        expect(aCycleIds).toEqual([1]);
        aCycleIds = oKanjiDifficultyStorage.getFromCycle(0);
        expect(aCycleIds).toEqual([]);
        aCycleIds = oKanjiDifficultyStorage.getFromCycle(2);
        expect(aCycleIds).toEqual([1]);
        oKanjiDifficultyStorage.storeAll([2, 3, 4, 5]);
        oKanjiDifficultyStorage.setCurrentCycle([]);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([1, 2, 3, 4, 5]);

        aCycleIds = oKanjiDifficultyStorage.getFromCycle(1);
        aCycleIds = aCycleIds.concat(oKanjiDifficultyStorage.getFromCycle(4));
        expect(containSameElements(aCycleIds, [1,2,3,4,5])).toBe(true);

        oKanjiDifficultyStorage.setStorage([1,2,3,4,5,6]);
        oKanjiDifficultyStorage.setCurrentCycle([2,4,5]);
        aCycleIds = oKanjiDifficultyStorage.getFromCycle(8);
        expect(containSameElements(aCycleIds, [1,2,3,4,5,6])).toBe(true);
        expect(oKanjiDifficultyStorage.getCurrentCycle().length).toBe(0);

        oKanjiDifficultyStorage.setCurrentCycle([2,4,5,6]);
        oKanjiDifficultyStorage.getFromCycle(3);
        expect(oKanjiDifficultyStorage.getCurrentCycle().length).toBe(1);
    });

    it("can get unique cycle + storage when required is bigger than storage", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();
        oKanjiDifficultyStorage.setStorage([1,2,3,4,5,6]);
        oKanjiDifficultyStorage.setCurrentCycle([2,4,5]);
        var aCycleIds = oKanjiDifficultyStorage.getFromCycle(8);

        expect(containSameElements(aCycleIds, [1,2,3,4,5,6]));
    });

    it("can get unique cycle + storage when required is bigger than cycle", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();
        oKanjiDifficultyStorage.setStorage([1,2,3,4,5,6,7,8,9,10]);
        oKanjiDifficultyStorage.setCurrentCycle([1,3,5,7,9]);
        var aCycleIds = oKanjiDifficultyStorage.getFromCycle(8);

        expect(aCycleIds.length).toBe(8);
        expect(oKanjiDifficultyStorage.getCurrentCycle().length).toBe(7);
    });

    it("can remove from storage", function () {
        var oKanjiDifficultyStorage = new KanjiDifficultyStorage();
        oKanjiDifficultyStorage.setStorage([1,2,3,4,5,6,7,8,9,10]);

        oKanjiDifficultyStorage.removeFromStorage(3);
        expect(oKanjiDifficultyStorage.getStorage()).toEqual([1,2,4,5,6,7,8,9,10]);
    });

});