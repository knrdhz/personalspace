const express = require('express')
const path = require('path')
const logger = require('./logger')
const helmet = require('helmet')
const fs = require('fs')
const https = require('https')
const open = require('open')
const livereload = require('livereload')
const connectLivereload = require('connect-livereload')

async function startServer() {
    console.log('SERVER STARTED')
    const liveReloadServer = livereload.createServer()
    liveReloadServer.watch(path.join(__dirname, 'public'))
    liveReloadServer.server.once('connection', () => {
        setTimeout(() => {
            liveReloadServer.refresh('/')
        }, 100)
    })
    // Load the middleware
    const app = express()
    const PORT = 8082
    app.use(connectLivereload())

    app.use(logger)
    app.use(helmet())
    app.use(
        express.static(path.join(__dirname, '../public'), {
            // Do not display index.html in URL
            extensions: ['html', 'htm']
        })
    )

    // Register paths
    app.get('/', (req, res) => {
        res.send(path.join(__dirname, '../public'))
    })

    app.get('/feed', (req, res) => {
        console.log('Feed is here')
        const filepath = path.join(__dirname, '../public/rss.xml')
        fs.readFile(filepath, function(err, data) {
            if (err) {
                response.statusCode = 404
                return response.end('RSS feed not found or you made an invalid request.')
            }

            let mediaType = 'text/xml'

            res.setHeader('Content-Type', mediaType)
            res.end(data)
        })
    })

    app.get('/admin', (req, res) => {
        res.send('Oh you, tricky fellow...')
    })

    app.listen(PORT, () => {
        console.log(`SERVER RUNNING AT http://localhost:${PORT}`)
    })
}

exports.startServer = startServer
