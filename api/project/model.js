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

async function getTaskById(id) {
    const task = await db('tasks').where('task_id', id)
    return task
}

async function addTask(task) {
    // insert into tasks (task_description, project_id) values ('drill holes', 2);

    const [newId] = await db('tasks')
        .insert(task)

    let [newTask] = await getTaskById(newId)

    newTask = {
        ...newTask,
        task_completed: newTask.task_completed ? true : false
    }
    
    return newTask
}

module.exports = {
    getResources,
    getProjects,
    getTasks,
    addResource,
    addProject,
    addTask
}