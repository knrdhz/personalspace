const build = require('./build')
const server = require('./server')

async function runDevServer() {
    await build.start()
    await server.startServer()
}

runDevServer()
