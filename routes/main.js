import express from 'express';
import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);

const router = express.Router();


router.get("/", async (req, res) => {
    const usersData = await knex("users");

    res.send(usersData);
})


export default router;