describe('ReviewBatch', function(){

    it('can create a ReviewBatch object', function(){
        expect(new ReviewBatch()).toBeDefined();
    });

    it("can create ReviewBatch with size", function () {
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', []);

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});

        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(0);

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', [1]);

        oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(1);

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', fillArray(1,53));
        oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(53);

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', fillArray(1, 100));
        oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.getSize()).toEqual(100);
    });

    it("can get remaining kanji to fill batch", function () {
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', []);

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(100);

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', fillArray(1,53));
        oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(47);

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', fillArray(1,100));
        oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.remaining()).toBe(0);
    });

    it("can get the review batch and elements are unique", function () {
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', []);

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.getBatch()).toEqual([]);

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', [1]);
        oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        expect(oReviewBatch.getBatch()).toEqual([1]);

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', generateRandomArray(1, 1363, 100));
        oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
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
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', fillArray(1, 68));
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', []);

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();

        for(var i = 1; i <= 68; i++){
            expect(aBatch.indexOf(i)).not.toEqual(-1);
        }
    });

    it("when hard kanji > 0 and > than remaining space, batch if filled with hard kanji", function () {
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', generateRandomArray(30, 150, 100));
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', []);

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();

        var aBatch = oReviewBatch.getBatch();
        expect(aBatch.length).toBe(100);
    });

    it("each review batch is different", function () {
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', generateRandomArray(1, 1000, 100));
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', []);
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', []);

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        var aBatch = oReviewBatch.getBatch();

        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', generateRandomArray(1, 1000, 100));
        var oAnotherReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oAnotherReviewBatch.populate();
        var aAnotherBatch = oAnotherReviewBatch.getBatch();

        expect(aBatch).not.toEqual(aAnotherBatch);
    });

    it("after new and hard are added, half are medium and half are easy", function () {
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', generateRandomArray(1, 10, 10));
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', generateRandomArray(100, 199, 45));
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', generateRandomArray(200, 299, 45));

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        var aBatch = oReviewBatch.getBatch();

        expect(aBatch.length).toBe(100);

        // Expect to find the hard kanji
        for(var i = 1; i <= 10 ; i++){
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

        expect(nMediumDifficultyKanji).toBe(45);
        expect(nEasyDifficultyKanji).toBe(45);
    });

    it("can re-populate the batch", function () {
        var oKanjiDifficultyManagerMock = mockObject(new KanjiDifficultyManager());
        createStub(oKanjiDifficultyManagerMock, 'getFromHardCycle', generateRandomArray(1, 30, 30));
        createStub(oKanjiDifficultyManagerMock, 'getFromMediumCycle', generateRandomArray(40, 300, 70));
        createStub(oKanjiDifficultyManagerMock, 'getFromEasyCycle', []);

        var oReviewBatch = new ReviewBatch({kanjiDifficultyManager: oKanjiDifficultyManagerMock});
        oReviewBatch.populate();
        var aBatch = oReviewBatch.getBatch().slice();

        oReviewBatch.populate();
        var aAnotherBatch = oReviewBatch.getBatch().slice();

        expect(aAnotherBatch.length).toEqual(aBatch.length);
    });
});