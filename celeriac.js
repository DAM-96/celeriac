const { celeriacIntroduction } = require("./controller/init")
const { runStalk } = require("./controller/parser")
const { loadDevices } = require("./controller/initializer")

// -------------------- EXECUTION START --------------------

celeriacIntroduction()
runStalk(process.argv[2], loadDevices())
