// build your `Project` model here
const db = require('../../data/dbConfig')

async function getResources() {

    // select * 
    // from resources;

    const rows = await db('resources')
    return rows
}

async function getProjects() {
    
    // select * from projects;

    const rows = await db('projects')

    const response = []

    rows.forEach(proj => {
        response.push({
            ...proj,
            project_completed: proj.project_completed ? true : false
        })
    })

    return response
}










module.exports = {
    getResources,
    getProjects,
}