const { execSync } = require('child_process');

/**
* These functions require for the Android Debug Bridge to be installed and configured on the local machine; 
* which also means that the Enviroment Variables JAVA_HOME and ANDROID_HOME should be also properly defined.
* @returns {Array} A list of the devices attachced to the local machine via USB.
*/

function getDevicesList(){
    // Gets the list of devices currently connected to the machine via USB using ADB and returns it as a string
    let devicesList = execSync("adb devices -l", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return error.message;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return stderr;
        }
        return stdout;
    }).toString();
    
    //Transforms the string list into an array with all the connected devices and returns it
    devicesList = devicesList.split(/\r?\n/);
    devicesList.shift();
    //Clean the empty lines from the devices list
    while(devicesList[devicesList.length-1] == "" && devicesList.length > 1){
        devicesList.pop();
    }
    return devicesList;
}

/**
 * 
 * @returns {Object[]} A list of objects contaning the UUID, Manufacturer, Market Name, Model, and OS of all the Android devices currently connected to the local machine via USB
 */
function getDetailedList(){
    let devices = getDevicesList();
    if (devices.length <= 1 && (devices[0] == "" || devices[0] == " ")){
        console.warn("No Android devices are currently connected to the local machine on the USB ports")
        return [];
    }
    let deviceID;
    let detailedList = [];
    for( let i=0; i<devices.length; i++){
        deviceID = devices[i].split(" ")[0]
        let detailedDeviceInfo = {
            "deviceID" : deviceID,
            "UUID": cleanShellData(deviceID, "settings get secure android_id"),
            "manufacturer": cleanShellData(deviceID, "getprop ro.product.manufacturer"), 
            "mktName": cleanShellData(deviceID, "getprop ro.product.marketname"), 
            "model": cleanShellData(deviceID, "getprop ro.product.model"),
            "os": 'Android',
            "osVersion": 'Android ' + cleanShellData(deviceID, "getprop ro.build.version.release")
        };
        detailedList.push(detailedDeviceInfo)
     }
     return detailedList;
}

/**
 * 
 * @param {string} deviceID The device's ID listed under adb devices -l
 * @param {string} shellCommand A valid Android OS shell command
 * @returns {string} A string value from an Android Shell command
*/
function cleanShellData(deviceID, shellCommand){
    return execSync(`adb -s ${deviceID} shell ${shellCommand}`).toString().replace('\r\n', "")
}

exports.getDevicesList = getDevicesList;
exports.getDetailedList = getDetailedList;


