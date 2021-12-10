// build your `Resource` model here
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

module.exports = {
    getResources,
    addResource
}