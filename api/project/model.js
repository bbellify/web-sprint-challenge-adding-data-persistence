// build your `Project` model here
const db = require('../../data/dbConfig')

async function getResources() {

    // select * 
    // from resources;

    const rows = await db('resources')
    return rows
}

async function getResourceById(id) {
    const resource = await db('resources').where('resource_id', id)
    return resource
}

async function addResource(resource) {

    // insert into resources (resource_name) values ('module projects');

    const newId = await db('resources')
        .insert(resource)
    
    const [newResource] = await getResourceById(newId)
    return newResource

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

async function getTasks() {
// select 
//     t.*,
//     p.project_name,
//     p.project_description
// from tasks as t
// left join projects as p
//     on p.project_id = t.project_id;

    const rows = await db('tasks as t')
        .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')
        .leftJoin('projects as p', 'p.project_id', 't.project_id')

    const response = []

    rows.map(task => {
        response.push({
            ...task,
            task_completed: task.task_completed ? true : false
        })
    })

    return response
}

module.exports = {
    getResources,
    getProjects,
    getTasks,
    addResource,
}