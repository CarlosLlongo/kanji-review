describe('ReviewBatch', function(){

    it('can create a ReviewBatch object', function(){
        expect(new ReviewBatch(0, 0)).toBeDefined();
    });

    it("can create ReviewBatch with size", function () {
        var oReviewBatch = new ReviewBatch(0, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(0);
        oReviewBatch = new ReviewBatch(1, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(1);
        oReviewBatch = new ReviewBatch(53, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(53);
        oReviewBatch = new ReviewBatch(1564, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(100);
    });

    it("can get remaining kanji to fill batch", function () {
        var oReviewBatch = new ReviewBatch(0, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(100);

        oReviewBatch = new ReviewBatch(53, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(47);

        oReviewBatch = new ReviewBatch(1564, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(0);
    });

    it("can get the review batch and elements are unique", function () {
        var oReviewBatch = new ReviewBatch(0, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.getBatch()).toEqual([]);
        oReviewBatch = new ReviewBatch(1, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();
        expect(oReviewBatch.getBatch()).toEqual(['1']);
        oReviewBatch = new ReviewBatch(1364, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();
        var aAuxBatch =[];

        for(var i = 0; i < aBatch.length; i++){
            expect(aAuxBatch.indexOf(aBatch[i])).toEqual(-1);

            aAuxBatch.push(aBatch[i]);
        }
    });

    it("when learned are less than 100, review batch contains all learned", function () {
        var oReviewBatch = new ReviewBatch(68, 0, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        for(var i = 1; i <= 68; i++){
            expect(aBatch.indexOf(String(i))).not.toEqual(-1);
        }
    });

    it("when new learned kanji >= 100, batch are all new kanji", function () {
        var oReviewBatch = new ReviewBatch(100, 100, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        for(var i = 1; i <= 100; i++){
            expect(aBatch.indexOf(String(i))).not.toEqual(-1);
        }

        oReviewBatch = new ReviewBatch(350, 100, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();

        aBatch = oReviewBatch.getBatch();

        expect(aBatch.length).toEqual(100);

        for(i = 251; i <= 350; i++){
            expect(aBatch.indexOf(String(i))).not.toEqual(-1);
        }

        var oKanjiDifficultyManager = new KanjiDifficultyManager();
        oReviewBatch = new ReviewBatch(350, 130, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        aBatch = oReviewBatch.getBatch();

        expect(aBatch.length).toEqual(100);

        for(i = 0; i < aBatch.length; i++){
            expect(parseInt(aBatch[i])).toBeLessThan(351);
            expect(parseInt(aBatch[i])).toBeGreaterThan(220);
        }

        expect(oKanjiDifficultyManager.getHardStorage().length).toBe(30);
    });

    it("when new learned kanji < 100, all are added", function () {
        var oReviewBatch = new ReviewBatch(230, 10, {kanjiDifficultyManager: new KanjiDifficultyManager()});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        for(var i = 230; i > 220; i--){
            expect(aBatch.indexOf(String(i))).not.toEqual(-1);
        }
    });

    it("when hard kanji > 0 and > than remaining space, batch if filled with hard kanji", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager();
        oKanjiDifficultyManager.addAllToHard(fillArray(30, 120));
        var oReviewBatch = new ReviewBatch(145, 20, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();
        //expect(aBatch.length).toBe(100);
    });

    /*it("each review batch is different", function () {
        var oReviewBatch = new ReviewBatch(1000);
        var aBatch = oReviewBatch.getBatch();

        var oAnotherReviewBatch = new ReviewBatch(1000);
        var aAnotherBatch = oAnotherReviewBatch.getBatch();

        expect(aBatch).not.toEqual(aAnotherBatch);
    });*/


});