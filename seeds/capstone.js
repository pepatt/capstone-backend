/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

import usersData from '../seed-data/users.js'

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(usersData);
}
