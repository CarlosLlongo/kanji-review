/**
 * Mocks an object. It will create a new object with the same functions as the original object, but these functions
 * do nothing.
 * @param oObject The original object to mock.
 * @returns {Object} The mock object to simulate the original object.
 */
function mockObject(oObject){

    var oMockObject = {};

    for(var sKey in oObject){
        if(typeof oObject[sKey] === 'function'){
            oMockObject[sKey] = function(){};
        }
    }

    return oMockObject;
}

/**
 * Forces a function of an object to always return the given value.
 * @param oObject The object we want to modify.
 * @param sMethodName The name of the method to replace.
 * @param mReturns The value to be returned by the method.
 * @param bMultipleValues If set to true, the values obtained in the mReturns array will be returned sequentially.
 * @returns {Object} The modified object.
 */
function createStub(oObject, sMethodName, mReturns, bMultipleValues){
    bMultipleValues = typeof bMultipleValues !== 'undefined' ? bMultipleValues : false;

    if(typeof oObject[sMethodName] !== 'function'){
        throw 'Function ' + sMethodName + ' does not exist.';
    }

    if(!bMultipleValues){
        oObject[sMethodName] = function(){
            return mReturns;
        }
    }
    else{
        oObject['StubPossibleReturns'] = mReturns;
        oObject['StubCurrentReturn'] = 0;
        oObject[sMethodName] = function(){
            var mCurrentReturn = oObject['StubPossibleReturns'][oObject['StubCurrentReturn']];
            oObject['StubCurrentReturn']++;

            if(oObject['StubCurrentReturn'] >= oObject['StubPossibleReturns'].length){
                oObject['StubCurrentReturn'] = 0;
            }

            return mCurrentReturn;
        }
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
    oObject[sMethodName] = function(mParam1, mParam2, mParam3){
        oObject['wasCalled'+sMethodName] = true;
        oObject['wasCalled'+sMethodName+'Param1'] = mParam1;
        oObject['wasCalled'+sMethodName+'Param2'] = mParam2;
        oObject['wasCalled'+sMethodName+'Param3'] = mParam3;
    }
}

/**
 * Checks if the method of an object was previously called. For this to work, the method has to be spyed first using
 * the spyFunction method.
 * @param oObject The Object that contains the method.
 * @param sMethodName The name of the method to check.
 * @returns {Boolean} True if the method was previoulsy called, false otherwise.
 */
function wasCalled(oObject, sMethodName){
    return oObject['wasCalled'+sMethodName];
}

/**
 * Obtains the parameter passed to the called function.
 * @param oObject The Object that contains the method.
 * @param sMethodName The name of the method to check.
 * @param nParamPosition The position of the parameter in the method parameter list.
 * @returns {Object} The value passed as a parameter to the method.
 */
function wasCalledParameter(oObject, sMethodName, nParamPosition){
    return oObject['wasCalled'+sMethodName+'Param'+nParamPosition];
}