const fs = require("fs")
const path = require("path")

async function loadDevices(){
    //Read Devices.json from project path
    let devicesPath = path.join(__dirname, "..", "project", "Devices.json")
    let devicesList = JSON.parse(fs.readFileSync(devicesPath, "utf-8"))
    return devicesList
}

function createDevicesList(){
    
}

exports.loadDevices = loadDevices