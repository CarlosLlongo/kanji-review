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
            '2': [1, 0],
            '3': [0, 0, 0]
        };

        oKanjiStatisticsCollection.populateFromJsonObject(oJsonObject);
        oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('2');
        expect(oKanjiStatistics.getId()).toBe('2');
        expect(oKanjiStatistics.getResults()).toEqual([1, 0]);

        oKanjiStatistics = oKanjiStatisticsCollection.getKanjiStatistics('3');
        expect(oKanjiStatistics.getId()).toBe('3');
        expect(oKanjiStatistics.getResults()).toEqual([0, 0, 0]);
    });

    it("can load from local storage", function () {
        var oKanjiStatisticsDataPersistenceMock = mockObject({getKanjiStatisticsData: function(){}});
        createStub(oKanjiStatisticsDataPersistenceMock, 'getKanjiStatisticsData', {
            '1': [1, 0],
            '33': [0, 1, 0]
        });

        var oKanjiStatisticsCollection = new KanjiStatisticsCollection(oKanjiStatisticsDataPersistenceMock);

        oKanjiStatisticsCollection.loadFromLocalStorage();

        expect(oKanjiStatisticsCollection.getKanjiStatistics('1').getResults()).toEqual([1, 0]);
        expect(oKanjiStatisticsCollection.getKanjiStatistics('33').getResults()).toEqual([0, 1, 0]);
    });

    it("can save to local storage", function () {
        var oKanjiStatisticsDataPersistenceMock = mockObject({saveKanjiStatisticsData: function(){}});
        spyFunction(oKanjiStatisticsDataPersistenceMock, 'saveKanjiStatisticsData');

        var oKanjiStatisticsCollection = new KanjiStatisticsCollection(oKanjiStatisticsDataPersistenceMock);
        oKanjiStatisticsCollection.addKanjiStatistics(new KanjiStatistics('3', [1,0,0]));
        oKanjiStatisticsCollection.addKanjiStatistics(new KanjiStatistics('9', [1,1,1]));

        oKanjiStatisticsCollection.saveToLocalStorage();

        expect(wasCalled(oKanjiStatisticsDataPersistenceMock, 'saveKanjiStatisticsData')).toBe(true);
        expect(wasCalledParameter(oKanjiStatisticsDataPersistenceMock, 'saveKanjiStatisticsData', 1))
            .toEqual({'3': [1,0,0], '9': [1,1,1]});
    });

    it("can check if kanji has statistics", function () {
        var oKanjiStatisticsCollection = new KanjiStatisticsCollection();

        expect(oKanjiStatisticsCollection.hasStatistics('3')).toBe(false);
        oKanjiStatisticsCollection.updateKanjiStatistics('3', 1);
        expect(oKanjiStatisticsCollection.hasStatistics('3')).toBe(true);
        expect(oKanjiStatisticsCollection.hasStatistics('45')).toBe(false);
        oKanjiStatisticsCollection.updateKanjiStatistics('45', 0);
        expect(oKanjiStatisticsCollection.hasStatistics('45')).toBe(true);
    });

});