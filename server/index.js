const express = require('express')
const path = require('path')
const logger = require('./logger')
const helmet = require('helmet')
const fs = require('fs')
const https = require('https')
const http = require('http')

// Detect production or development environment
const env = process.env.NODE_ENV

// Load the middleware
const app = express()

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

app.listen(8080, () => {
    console.log('SERVER RUNNING AT 8080')
})
