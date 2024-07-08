/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

import usersData from '../seed-data/users.js'
import weatherData from '../seed-data/weather.js'

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(usersData);
  await knex('weather').del()
  await knex('weather').insert(weatherData);
}
