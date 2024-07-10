/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("weather", (table) => {
      table.increments("id").primary();
      table.string("description").notNullable();
      table.float("temperature").notNullable();
      table.float("UVI").notNullable();
      table.string("country").notNullable();
      table.string("city").notNullable();
      table.boolean("isApplied").defaultTo("false").notNullable; 
      table.integer('created_at_day').notNullable();
      table.integer('created_at_month').notNullable();
      table.integer('created_at_year').notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("weather").dropTable("users");
}
