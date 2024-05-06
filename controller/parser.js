/**
 * @typedef Devices
 * @type {object}
 * @property {string} DeviceTestID Identifier or Name given to the device by the QA team to track test cases ran on it
 * @property {string} uuid UUID of the device
 * @property {string} OS OS Name
 * @property {string} OSVer OS Version number
 * @property {string} AutomationName Name of the Appium Driver to be used in order to execute tests on this device
 * @property {string} DeviceName The ID of the device under adb -l 
 * 
 */

const fs = require('fs')

function loadRibs(){

}

function loadElements(){

}

function loadTestData(){

}

function parseStalk(){
    
}


/**
 * 
 * @param {string} stalkName A string containing the name of the test suite to be executed
 * @param {Devices[]} devicesList An array of Devices objects containing the Appium capabilities required to start a session
*/
function runStalk(stalkName, devicesList){

}

exports.parseStalk = parseStalk
exports.runStalk = runStalk