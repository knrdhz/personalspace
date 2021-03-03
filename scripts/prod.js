const build = require('./build')
async function runProd() {
    await build.start()
}

runProd()
