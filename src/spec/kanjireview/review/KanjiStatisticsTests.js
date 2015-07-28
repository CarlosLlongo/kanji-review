describe('KanjiStatistics', function(){

    it('can create a KanjiStatistics object', function(){
        expect(new KanjiStatistics()).toBeDefined();
    });

    it("can create a KanjiStatistics with parameters", function () {
        var oKanjiStatistics = new KanjiStatistics('1', [1, 1, 0]);

        expect(oKanjiStatistics.getId()).toEqual('1');
        expect(oKanjiStatistics.getResults()).toEqual([1, 1, 0]);
    });

    it("can add a new result", function () {
        var oKanjiStatistics = new KanjiStatistics('1', [1, 1, 0]);

        oKanjiStatistics.addResult(1);
        expect(oKanjiStatistics.getResults()).toEqual([1, 0, 1]);
        oKanjiStatistics.addResult(1);
        expect(oKanjiStatistics.getResults()).toEqual([0, 1, 1]);
        oKanjiStatistics.addResult(0);
        expect(oKanjiStatistics.getResults()).toEqual([1, 1, 0]);
    });

    it("can set results", function () {
        var oKanjiStatistics = new KanjiStatistics('1', [1, 1, 0]);

        oKanjiStatistics.setResults([0, 1, 1]);

        expect(oKanjiStatistics.getResults()).toEqual([0, 1, 1]);
    });

    it("can get kanji difficulty", function () {
        var oKanjiStatistics = new KanjiStatistics('1', []);
        expect(oKanjiStatistics.getDifficulty()).toEqual('hard');

        oKanjiStatistics.addResult(1);
        expect(oKanjiStatistics.getDifficulty()).toEqual('hard');

        oKanjiStatistics.addResult(1);
        expect(oKanjiStatistics.getDifficulty()).toEqual('medium');

        oKanjiStatistics.addResult(1);
        expect(oKanjiStatistics.getDifficulty()).toEqual('easy');

        oKanjiStatistics.addResult(0);
        expect(oKanjiStatistics.getDifficulty()).toEqual('medium');

        oKanjiStatistics.addResult(0);
        expect(oKanjiStatistics.getDifficulty()).toEqual('hard');

        oKanjiStatistics.setResults([1, 1, 1]);
        expect(oKanjiStatistics.getDifficulty()).toEqual('easy');
    });

});