describe('KanjiStatisticsCollection', function(){

    it('can create a KanjiStatisticsCollection object', function(){
        expect(new KanjiStatisticsCollection()).toBeDefined();
    });

    it('can add/get a Kanji Statistics', function(){
        var oKanjiStatisticsMock = mockObject(new KanjiStatistics());
        createStub(oKanjiStatisticsMock, 'getId', '1');
        var oKanjiStatisticsMock2 = mockObject(new KanjiStatistics());
        createStub(oKanjiStatisticsMock2, 'getId', '2');

        var oKanjiStatisticsCollection = new KanjiStatisticsCollection();
        oKanjiStatisticsCollection.addKanjiStatistics(oKanjiStatisticsMock);

        var oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('1');

        expect(oKanjiStatistics.getId()).toBe('1');

        oKanjiStatisticsCollection.addKanjiStatistics(oKanjiStatisticsMock2);
        oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('2');
        expect(oKanjiStatistics.getId()).toBe('2');
    });

    it('can add new result to existing kanji statistics', function(){
        var oKanjiStatisticsMock = mockObject(new KanjiStatistics());
        createStub(oKanjiStatisticsMock, 'getId', '1');
        createStub(oKanjiStatisticsMock, 'getDifficulty', ['medium', 'easy'], true);
        spyFunction(oKanjiStatisticsMock, 'addResult');

        var oKanjiStatisticsCollection = new KanjiStatisticsCollection();
        oKanjiStatisticsCollection.addKanjiStatistics(oKanjiStatisticsMock);

        var oUpdateStatus = oKanjiStatisticsCollection.updateKanjiStatistics('1', true);

        expect(oUpdateStatus['prevDifficulty']).toBe('medium');
        expect(oUpdateStatus['newDifficulty']).toBe('easy');
        expect(wasCalled(oKanjiStatisticsMock, 'addResult')).toBe(true);
    });

    it('can add new result to non existing kanji statistics', function(){
        var oKanjiStatisticsCollection = new KanjiStatisticsCollection();

        var oUpdateStatus = oKanjiStatisticsCollection.updateKanjiStatistics('1', true);

        expect(oUpdateStatus['prevDifficulty']).toBe('hard');
        expect(oUpdateStatus['newDifficulty']).toBe('hard');

        var oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('1');
        expect(oKanjiStatistics.getId()).toBe('1');
    });

    it("can populate from json object", function () {
        var oKanjiStatisticsCollection = new KanjiStatisticsCollection();

        var oJsonObject = {
            '1': []
        };

        oKanjiStatisticsCollection.populateFromJsonObject(oJsonObject);
        var oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('1');
        expect(oKanjiStatistics.getId()).toBe('1');
        expect(oKanjiStatistics.getResults()).toEqual([]);

        var oJsonObject = {
            '1': [],
            '2': [true, false],
            '3': [false, false, false]
        };

        oKanjiStatisticsCollection.populateFromJsonObject(oJsonObject);
        oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('2');
        expect(oKanjiStatistics.getId()).toBe('2');
        expect(oKanjiStatistics.getResults()).toEqual([true, false]);

        oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('3');
        expect(oKanjiStatistics.getId()).toBe('3');
        expect(oKanjiStatistics.getResults()).toEqual([false, false, false]);
    });

});