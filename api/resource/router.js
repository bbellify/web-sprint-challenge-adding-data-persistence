// build your `/api/resources` router here
const express = require('express')
const Project = require('./model')

const router = express.Router()

router.post('/', (req, res, next) => {
    Project.addResource(req.body)
        .then(rec => {
            res.status(201).json(rec)
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Project.getResources()
        .then(rec => {
            res.json(rec)
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router