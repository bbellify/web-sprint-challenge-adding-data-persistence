// build your server here and require it from index.js
const express = require('express')
const router = require('./project/router')

const server = express()

server.use(express.json())

server.use('/api', router)

server.use('*', (req, res) => {
    res.json({ api: 'up' })
})

module.exports = server