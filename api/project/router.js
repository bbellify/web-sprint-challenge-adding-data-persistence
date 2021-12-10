// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')

const router = express.Router()

router.post('/resources', (req, res, next) => {
    Project.addResource(req.body)
        .then(rec => {
            res.status(201).json(rec)
        })
        .catch(next)
})

router.get('/resources', (req, res, next) => {
    Project.getResources()
        .then(rec => {
            res.json(rec)
        })
        .catch(next)
})

router.post('/projects', (req, res, next) => {

})

router.get('/projects', (req, res, next) => {
    Project.getProjects()
        .then(rec => {
            res.json(rec)
        })
        .catch(next)
})

router.post('/tasks', (req, res, next) => {

})

router.get('/tasks', (req, res, next) => {
    Project.getTasks()
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