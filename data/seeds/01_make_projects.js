
const projects = [
  { project_name: 'Finish Sprint Challenge'}
]


const resources = [
  { resource_name: 'study guide'}
]

const tasks = [
  { task_description: 'finish endpoints', task_notes: 'start with GETs', project_id: 1 }
]

const project_resources = [
  { project_id: 1, resource_id: 1 }
]

exports.seed = async function(knex) {
  await knex('projects').insert(projects)
  await knex('resources').insert(resources)
  await knex('tasks').insert(tasks)
  await knex('project_resources').insert(project_resources)
};
