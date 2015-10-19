describe('TestUtils', function() {

    it('Can mock object', function () {
        var oObject = {};

        oObject['testFunction'] = function(){
            return 2;
        }

        expect(oObject.testFunction()).toBe(2);

        var oMockObject = mockObject(oObject);

        expect(typeof oMockObject.testFunction).toBe('function');
        expect(typeof oMockObject.testFunction()).toBe('undefined');
    });

    it('Can stub a function', function () {
        var oObject = {};

        oObject['testFunction'] = function(){
            return 2;
        }

        expect(oObject.testFunction()).toBe(2);

        var oMockObject = mockObject(oObject);

        createStub(oMockObject, 'testFunction', 3);
        expect(oMockObject.testFunction()).toBe(3);

        createStub(oMockObject, 'testFunction', [1,2,3], true);
        expect(oMockObject.testFunction()).toBe(1);
        expect(oMockObject.testFunction()).toBe(2);
        expect(oMockObject.testFunction()).toBe(3);
        expect(oMockObject.testFunction()).toBe(1);
    });

    it('Can spy a function', function () {
        var oObject = {};

        oObject['testFunction'] = function(){
            return 2;
        }

        expect(oObject.testFunction()).toBe(2);

        var oMockObject = mockObject(oObject);

        spyFunction(oMockObject, 'testFunction');

        expect(wasCalled(oMockObject, 'testFunction')).toBe(false);

        oMockObject.testFunction();

        expect(wasCalled(oMockObject, 'testFunction')).toBe(true);
    });
});
