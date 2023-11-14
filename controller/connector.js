const { getDetailedList } = require("../util/devices.js")

let devicesList = getDetailedList();
if(devicesList.length > 0) console.log(devicesList);