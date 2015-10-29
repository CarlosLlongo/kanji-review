describe('MathUtils', function(){

    it('factorial function is defined', function(){
        expect(new factorial()).toBeDefined();
    });

    it("can compute a factorial", function () {
        expect(factorial(1)).toEqual(1);
        expect(factorial(2)).toEqual(2);
        expect(factorial(3)).toEqual(6);
        expect(factorial(4)).toEqual(24);
    });

    it("can generate a random number", function () {
        var nRandomNumber;
        var oVariations = {};
        var sKey;
        var nIterations = 100000;
        var nLowerNumber = 5;
        var nUpperNumber = 14;

        for(var i = 0; i < nIterations; i++){
            nRandomNumber = randomInteger(nLowerNumber, nUpperNumber);

            sKey = String(nRandomNumber);

            if(!oVariations[sKey]){
                oVariations[sKey] = 1;
            }
            else{
                oVariations[sKey]++;
            }
        }

        var nPermutations = nUpperNumber - nLowerNumber + 1;

        expect(Object.keys(oVariations).length).toEqual(nPermutations);

        var nOptimalVariation = nIterations / nPermutations;
        var nVariationError = nOptimalVariation * 0.05;
        var nLowerVariation = nOptimalVariation - nVariationError;
        var nUpperVariation = nOptimalVariation + nVariationError;

        for(var sVariation in oVariations){
            expect(oVariations[sVariation]).toBeLessThan(nUpperVariation);
            expect(oVariations[sVariation]).toBeGreaterThan(nLowerVariation);
        }
    });
});