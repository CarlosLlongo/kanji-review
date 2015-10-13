/**
 * Mocks an object. It will create a new object with the same functions as the original object, but these functions
 * do nothing.
 * @param oObject The original object to mock.
 * @returns {Object} The mock object to simulate the original object.
 */
function mockObject(oObject){
    for(var sKey in oObject){
        if(typeof oObject[sKey] === 'function'){
            oObject[sKey] = function(){};
        }
    }

    return oObject;
}

/**
 * Forces a function of an object to always return the given value.
 * @param oObject The object we want to modify.
 * @param sMethodName The name of the method to replace.
 * @param mReturns The value to be returned by the method.
 * @returns {Object} The modified object.
 */
function createStub(oObject, sMethodName, mReturns){
    if(typeof oObject[sMethodName] !== 'function'){
        throw 'Function ' + sMethodName + ' does not exist.';
    }

    oObject[sMethodName] = function(){
        return mReturns;
    }

    return oObject;
}

/**
 * Modifies an object so that one of its functions will activate a flag when the function is called.
 * @param oObject The object to be modified.
 * @param sMethodName The name of the method to spy.
 */
function spyFunction(oObject, sMethodName){
    if(typeof oObject[sMethodName] !== 'function'){
        throw 'Function ' + sMethodName + ' does not exist.';
    }

    oObject['wasCalled'+sMethodName] = false;
    oObject[sMethodName] = function(){
        oObject['wasCalled'+sMethodName] = true;
    }
}

/**
 * Checks if the method of an object was previously called. For this to work, the method has to be spyed first using
 * the spyFunction method.
 * @param oObject The Object that contains the method.
 * @param sMethodName The name of the method to check.
 * @returns {Bool} True if the method was previoulsy called, false otherwise.
 */
function wasCalled(oObject, sMethodName){
    return oObject['wasCalled'+sMethodName];
}