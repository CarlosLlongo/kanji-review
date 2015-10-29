function factorial(n){
    var nFactorial = n;

    for(var i = n - 1; i > 0; i--){
        nFactorial *= i;
    }

    return nFactorial;
}

function randomInteger(nLowerLimit, nUpperLimit){
    return Math.floor(Math.random() * (nUpperLimit - nLowerLimit + 1)) + nLowerLimit;
}