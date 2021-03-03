const build = require('./scripts/build')
async function runProd() {
    await build.start()
}

runProd()
