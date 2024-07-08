import initKnex from 'knex';
import configurations from '../knexfile.js';
const knex = initKnex(configurations);

const index = async (req, res) => {
    const usersData = await knex("users");
    res.send(usersData);
}


export {
    index
}