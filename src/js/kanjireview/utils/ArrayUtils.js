'use strict';

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

function fillArray(nStartValue, nNumberOfValues){
    var aNumbers = [];

    for(var i = nStartValue; i < nStartValue + nNumberOfValues; i++){
        aNumbers.push(i);
    }

    return aNumbers;
}

function getAndRemoveRandomValue(aOriginal){
    if(aOriginal.length === 0){
        return null;
    }

    var aRemoved = aOriginal.splice(randomInteger(0, aOriginal.length - 1), 1);

    return aRemoved[0];
}

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

function arrayDiff(aFirst, aSecond){
    var aNotInSecond = aFirst.filter(function(mValue) {
        return aSecond.indexOf(mValue) < 0;
    });

    var aNotInFirst = aSecond.filter(function(mValue) {
        return aFirst.indexOf(mValue) < 0;
    });

    return aNotInFirst.concat(aNotInSecond).sort();
}