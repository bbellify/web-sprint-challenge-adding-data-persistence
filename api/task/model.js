// build your `Task` model here
const db = require('../../data/dbConfig')

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
    getTasks,
    addTask
}