
exports.up = async function(knex) {
    await knex.schema
        .createTable('projects', table => {
            table.increments('project_id')
            table.string('project_name').notNullable()
            table.string('project_description')
            table.boolean('project_completed').defaultTo(false)
        })
    await knex.schema
        .createTable('resources', table => {
            table.increments('id')    
            table.string('resource_name').notNullable().unique()
            table.string('resource_description')
        })
    await knex.schema
        .createTable('tasks', table => {
            table.increments('id')
            table.string('task_description').notNullable()
            table.string('task_notes')
            table.boolean('task_completed').defaultTo(false)
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')

        })
    await knex.schema
        .createTable('project_resources', table => {
            table.increments('id')

        })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
