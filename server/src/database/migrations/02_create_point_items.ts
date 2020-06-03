import Knex from 'knex';

const tableName = 'point_items';

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, table => {
        table.increments('id').primary();
        
        table.integer('point_id').references('id').inTable('points').notNullable();
        table.integer('item_id').references('id').inTable('items').notNullable()
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tableName);
}
