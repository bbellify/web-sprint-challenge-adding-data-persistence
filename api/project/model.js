// build your `Project` model here
const db = require('../../data/dbConfig')

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

async function getProjectById(id) {
    const project = await db('projects').where('project_id', id)
    return project
}

async function addProject(project) {
    // insert into projects (project_name) values ('finish cameras');

    const newId = await db('projects')
        .insert(project)
    
    let [newProject] = await getProjectById(newId)
    
    newProject = {
        ...newProject,
        project_completed: newProject.project_completed ? true : false
    }

    return newProject

}


module.exports = {
    getProjects,
    addProject
}