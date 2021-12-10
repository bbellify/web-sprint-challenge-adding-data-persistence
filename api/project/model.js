// build your `Project` model here
const db = require('../../data/dbConfig')

async function getResources() {
// select * 
// from resources;
const rows = await db('resources')
return rows
}










module.exports = {
    getResources,
}