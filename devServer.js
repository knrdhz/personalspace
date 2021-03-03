const build = require('./scripts/build')
const server = require('./scripts/server')

async function runDevServer() {
    await build.start()
    await server.startServer()
}

runDevServer().then(() => {
    console.log('Server up and running')
})
