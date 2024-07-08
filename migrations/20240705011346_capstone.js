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
      table
        .timestamp("updated_at")  
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("weather", (table) => {
      table.increments("id").primary();
      table.string("description").notNullable();
      table.float("temperature").notNullable();
      table.float("UVI").notNullable();
      table.string("country").notNullable();
      table.string("city").notNullable();
      table.boolean("isApplied").defaultTo("false").notNullable; 
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")  
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("weather").dropTable("users");
}
