/**
 * Make a copy of the array and shuffle its contents, returning the array and not modifying the original array.
 * @param aOriginal The array to shuffle
 * @returns {Array} A copy of the original array with its contents shuffled.
 */
function shuffle(aOriginal){

    var aCopy = aOriginal.slice();

    var n;
    var aux;

    for(var i = aCopy.length - 1; i > 0; i--){
        n = Math.floor(Math.random() * (i + 1));

        aux = aCopy[i];
        aCopy[i] = aCopy[n];
        aCopy[n] = aux;
    }

    return aCopy;
}

/**
 * Get the sum of all elements in the array.
 * @param aNumbers An array of numbers.
 * @returns {number} The sum of all elements in the array.
 */
function sumArray(aNumbers){
    if(aNumbers.length === 0){
        return 0;
    }

    var nSum = 0;

    for(var i = 0; i < aNumbers.length; i++){
        nSum += aNumbers[i];
    }

    return nSum;
}

/**
 * Fills an array with numbers, starting in the start value given and adding as many elements as indicated.
 * @param nStartValue The first value to insert in the array.
 * @param nNumberOfValues The total number of elements to insert in the array.
 * @returns {Array} The array with the inserted elements.
 */
function fillArray(nStartValue, nNumberOfValues){
    var aNumbers = [];

    for(var i = nStartValue; i < nStartValue + nNumberOfValues; i++){
        aNumbers.push(i);
    }

    return aNumbers;
}

/**
 * Gets a random value from the array, removes it from the array and returns it.
 * @param aOriginal The array from where to obtain the value. This array will be modified.
 * @returns {mixed} One of the values in the array.
 */
function getAndRemoveRandomValue(aOriginal){
    if(aOriginal.length === 0){
        return null;
    }

    var aRemoved = aOriginal.splice(randomInteger(0, aOriginal.length - 1), 1);

    return aRemoved[0];
}

/**
 * Checks that two arrays contain exactly the same values.
 * @param aFirst One of the arrays to check.
 * @param aSecond The other array to check.
 * @returns {boolean} True if both arrays contain the same values, false otherwise.
 */
function containSameElements(aFirst, aSecond){
    if(aFirst.length === aSecond.length){
        var aSortedFirst = aFirst.slice().sort();
        var aSortedSecond = aSecond.slice().sort();

        for(var i = 0; i < aSortedFirst.length; i++){
            if(aSortedFirst[i] !== aSortedSecond[i]){
                return false;
            }
        }

        return true;
    }

    return false;
}

/**
 * Removes duplicate values from an array.
 * @param aOriginal The original array to check for duplicates. It will not be modified.
 * @returns {Array} An array with the same values as the original, minus the duplicates.
 */
function removeDuplicates(aOriginal){
    var oSeen = {};
    var aOutput = [];
    var mValue;

    for(var i = 0; i < aOriginal.length; i++) {
        mValue = aOriginal[i];
        if(!oSeen[mValue]) {
            oSeen[mValue] = true;
            aOutput.push(mValue);
        }
    }
    return aOutput;
}

/**
 * Finds all values that are unique to one of the input arrays.
 * @param aFirst The first array to check.
 * @param aSecond The other array to check.
 * @returns {Array} An array with those values that are unique to one of the input arrays.
 */
function arrayDiff(aFirst, aSecond){
    var aNotInSecond = aFirst.filter(function(mValue) {
        return aSecond.indexOf(mValue) < 0;
    });

    var aNotInFirst = aSecond.filter(function(mValue) {
        return aFirst.indexOf(mValue) < 0;
    });

    return aNotInFirst.concat(aNotInSecond).sort();
}