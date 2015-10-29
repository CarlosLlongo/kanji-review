describe('ArrayUtils', function(){

    it('shuffle function is defined', function(){
        expect(typeof shuffle).toBeDefined();
    });

    it("shuffle array works", function () {
        var aNumbers = [1];

        expect(shuffle(aNumbers)).toEqual([1]);

        aNumbers = [1, 2, 3, 4];

        var aShuffledNumbers = shuffle(aNumbers);

        for(var i = 0; i < aNumbers.length; i++){
            expect(aShuffledNumbers.indexOf(aNumbers[i])).not.toEqual(-1);
        }

        var oVariations = {};
        var sKey;
        var nIterations = 1000000;

        for(i = 0; i < nIterations; i++){
            aShuffledNumbers = shuffle(aNumbers);

            sKey = aShuffledNumbers.join();

            if(!oVariations[sKey]){
                oVariations[sKey] = 1;
            }
            else{
                oVariations[sKey]++;
            }
        }

        var nPermutations = factorial(aNumbers.length);

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

    it("can add all elements in an array", function () {
        expect(sumArray([])).toEqual(0);
        expect(sumArray([1])).toEqual(1);
        expect(sumArray([1, 2])).toEqual(3);
        expect(sumArray([1, 2, 3, 4, 5])).toEqual(15);
    });

    it("can fill an array", function () {
        var aNumbers = fillArray(0, 0);
        expect(aNumbers).toEqual([]);

        aNumbers = fillArray(3, 1);
        expect(aNumbers).toEqual([3]);

        aNumbers = fillArray(6, 5);
        expect(aNumbers).toEqual([6,7,8,9,10]);
    });

    it("can create a random array", function () {
        var aRandomArray = generateRandomArray(0,0,1);
        expect(containSameElements(aRandomArray, [0])).toBe(true);
        aRandomArray = generateRandomArray(0,1,2);
        expect(containSameElements(aRandomArray, [0, 1])).toBe(true);
        aRandomArray = generateRandomArray(6,11,6);
        expect(containSameElements(aRandomArray, [6,7,8,9,10,11])).toBe(true);
        aRandomArray = generateRandomArray(6,11,3);
        expect(aRandomArray.length).toBe(3);
        aRandomArray = generateRandomArray(6,11,20);
        expect(containSameElements(aRandomArray, [6,7,8,9,10,11])).toBe(true);
    });

    it("can get and remove a random element", function () {
        var aOriginal = [];
        var nValue = getAndRemoveRandomValue(aOriginal);
        expect(nValue).toBe(null);

        aOriginal = [1];
        nValue = getAndRemoveRandomValue(aOriginal);
        expect(nValue).toBe(1);
        expect(aOriginal.length).toBe(0);

        aOriginal = [1, 2, 3];
        nValue = getAndRemoveRandomValue(aOriginal);
        expect(nValue).toBeLessThan(4);
        expect(nValue).toBeGreaterThan(0);
        expect(aOriginal.length).toBe(2);

        var oVariations = {};
        var sKey;
        var nIterations = 5000;

        for(var i = 0; i < nIterations; i++){
            aOriginal = [1, 2, 3, 4];
            nValue = getAndRemoveRandomValue(aOriginal);

            expect(aOriginal.indexOf(nValue)).toBe(-1);

            sKey = aOriginal.join();

            if(!oVariations[sKey]){
                oVariations[sKey] = 1;
            }
            else{
                oVariations[sKey]++;
            }
        }

        var nPermutations = aOriginal.length + 1;

        expect(Object.keys(oVariations).length).toEqual(nPermutations);

        var nOptimalVariation = nIterations / nPermutations;
        var nVariationError = nOptimalVariation * 0.1;
        var nLowerVariation = nOptimalVariation - nVariationError;
        var nUpperVariation = nOptimalVariation + nVariationError;

        for(var sVariation in oVariations){
            expect(oVariations[sVariation]).toBeLessThan(nUpperVariation);
            expect(oVariations[sVariation]).toBeGreaterThan(nLowerVariation);
        }
    });

    it("can check if both array contain same elements", function () {
        expect(containSameElements([], [])).toBe(true);
        expect(containSameElements([], [1])).toBe(false);
        expect(containSameElements([2], [1])).toBe(false);
        expect(containSameElements([2, 1], [1, 2])).toBe(true);
        expect(containSameElements([2, 1, 5, 8], [5, 1, 2, 8])).toBe(true);
        expect(containSameElements([2, 1, 6, 5, 8], [5, 1, 2, 8])).toBe(false);
    });

    it("can remove duplicates", function () {
        expect(removeDuplicates([])).toEqual([]);
        expect(removeDuplicates([1])).toEqual([1]);
        expect(removeDuplicates([1, 1])).toEqual([1]);
        expect(removeDuplicates([1, 2, 1])).toEqual([1, 2]);
        expect(removeDuplicates([3, 2, 1, 2, 6, 5, 1, 3])).toEqual([3, 2, 1, 6, 5]);
    });

    it("can get difference between arrays", function () {
        expect(arrayDiff([], [])).toEqual([]);
        expect(arrayDiff([1], [])).toEqual([1]);
        expect(arrayDiff([1], [2])).toEqual([1, 2]);
        expect(arrayDiff([1], [1, 2])).toEqual([2]);
        expect(arrayDiff([1,3,4,5,6,7], [1,2,5,7])).toEqual([2,3,4,6]);
        expect(arrayDiff([1,3,4,5,6,7], [1,2,5,7])).toEqual(arrayDiff([1,2,5,7], [1,3,4,5,6,7]));
    });
});