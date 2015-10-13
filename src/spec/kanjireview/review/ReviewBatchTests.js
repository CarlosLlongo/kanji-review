describe('ReviewBatch', function(){

    it('can create a ReviewBatch object', function(){
        expect(new ReviewBatch(0, 0)).toBeDefined();
    });

    it("can create ReviewBatch with size", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        var oReviewBatch = new ReviewBatch(0, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(0);

        oKanjiDifficultyManager.addAllToHard([1]);
        oReviewBatch = new ReviewBatch(1, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(1);

        oKanjiDifficultyManager.addAllToHard(fillArray(2,52));
        oReviewBatch = new ReviewBatch(53, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(53);

        oKanjiDifficultyManager.addAllToHard(fillArray(54, 1510));
        oReviewBatch = new ReviewBatch(1564, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(100);
    });

    it("can get remaining kanji to fill batch", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        var oReviewBatch = new ReviewBatch(0, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(100);

        oKanjiDifficultyManager.addAllToHard(fillArray(1,53));
        oReviewBatch = new ReviewBatch(53, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(47);

        oKanjiDifficultyManager.addAllToHard(fillArray(54, 1510));
        oReviewBatch = new ReviewBatch(1564, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(0);
    });

    it("can get the review batch and elements are unique", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        var oReviewBatch = new ReviewBatch(0, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.getBatch()).toEqual([]);

        oKanjiDifficultyManager.addHard(1);
        oReviewBatch = new ReviewBatch(1, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        expect(oReviewBatch.getBatch()).toEqual([1]);

        oKanjiDifficultyManager.addAllToHard(fillArray(2, 1363));
        oReviewBatch = new ReviewBatch(1364, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        expect(aBatch.length).toBe(100);

        var aAuxBatch =[];

        for(var i = 0; i < aBatch.length; i++){
            expect(aAuxBatch.indexOf(aBatch[i])).toEqual(-1);

            aAuxBatch.push(aBatch[i]);
        }
    });

    it("when learned are less than 100, review batch contains all learned", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        oKanjiDifficultyManager.addAllToHard(fillArray(1, 68));
        var oReviewBatch = new ReviewBatch(68, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        for(var i = 1; i <= 68; i++){
            expect(aBatch.indexOf(i)).not.toEqual(-1);
        }
    });

    it("when new learned kanji >= 100, batch are all new kanji", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        oKanjiDifficultyManager.addAllToHard(fillArray(1, 100));
        var oReviewBatch = new ReviewBatch(100, 100, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        for(var i = 1; i <= 100; i++){
            expect(aBatch.indexOf(i)).not.toEqual(-1);
        }

        oReviewBatch = new ReviewBatch(350, 100, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        aBatch = oReviewBatch.getBatch();

        expect(aBatch.length).toEqual(100);

        for(i = 251; i <= 350; i++){
            expect(aBatch.indexOf(i)).not.toEqual(-1);
        }

        oReviewBatch = new ReviewBatch(350, 130, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        aBatch = oReviewBatch.getBatch();

        expect(aBatch.length).toEqual(100);

        for(i = 0; i < aBatch.length; i++){
            expect(parseInt(aBatch[i])).toBeLessThan(351);
            expect(parseInt(aBatch[i])).toBeGreaterThan(220);
        }
    });

    it("when new learned kanji < 100, all are added", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        var oReviewBatch = new ReviewBatch(230, 10, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        for(var i = 230; i > 220; i--){
            expect(aBatch.indexOf(i)).not.toEqual(-1);
        }
    });

    it("when hard kanji > 0 and > than remaining space, batch if filled with hard kanji", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        oKanjiDifficultyManager.addAllToHard(fillArray(30, 120));
        var oReviewBatch = new ReviewBatch(145, 20, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();
        expect(aBatch.length).toBe(100);
    });

    it("each review batch is different", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });
        oKanjiDifficultyManager.addAllToHard(fillArray(1, 1000));

        var oReviewBatch = new ReviewBatch(1000, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        var aBatch = oReviewBatch.getBatch();

        var oAnotherReviewBatch = new ReviewBatch(1000, 0, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oAnotherReviewBatch.populate();
        var aAnotherBatch = oAnotherReviewBatch.getBatch();

        expect(aBatch).not.toEqual(aAnotherBatch);
    });

    it("after new and hard are added, half are medium and half are easy", function () {
        var oKanjiDifficultyManager = new KanjiDifficultyManager({
            hardStorage: new KanjiDifficultyStorage(),
            mediumStorage: new KanjiDifficultyStorage(),
            easyStorage: new KanjiDifficultyStorage()
        });

        oKanjiDifficultyManager.addAllToHard(fillArray(1, 10));
        oKanjiDifficultyManager.addAllToMedium(fillArray(100, 100));
        oKanjiDifficultyManager.addAllToEasy(fillArray(200, 100));

        var oReviewBatch = new ReviewBatch(310, 10, {kanjiDifficultyManager: oKanjiDifficultyManager});
        oReviewBatch.populate();
        var aBatch = oReviewBatch.getBatch();

        expect(aBatch.length).toBe(100);

        // Expect to find the new learned kanji
        for(var i = 310; i > 300; i--){
            expect(aBatch.indexOf(i)).not.toEqual(-1);
        }

        // Expect to find the hard kanji
        for(i = 1; i <= 10 ; i++){
            expect(aBatch.indexOf(i)).not.toEqual(-1);
        }

        var nKanjiId;
        var nMediumDifficultyKanji = 0;
        var nEasyDifficultyKanji = 0;

        for(i = 0; i < aBatch.length; i++){
            nKanjiId = aBatch[i];
            if(nKanjiId >= 100 && nKanjiId < 200){
                nMediumDifficultyKanji++;
            }
            if(nKanjiId >= 200 && nKanjiId < 300){
                nEasyDifficultyKanji++;
            }
        }

        expect(nMediumDifficultyKanji).toBe(40);
        expect(nEasyDifficultyKanji).toBe(40);
    });


});