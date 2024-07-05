import initKnex from 'knex';
import configurations from '../knexfile.js';
const knex = initKnex(configurations);
import axios from 'axios';

import dotenv from 'dotenv';
import weather from '../seed-data/weather.js';
dotenv.config(); 

const index = async (req, res) => {
    const usersData = await knex("weather");
    res.send(usersData);
}

const insert = async (req, res) => {
    try {
        
        const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${process.env.VITE_BC_VAN_LAT}&lon=${process.env.VITE_BC_VAN_LON}&units=metric&appid=${process.env.VITE_OPEN_WEATHER_API_KEY}`);
        const UVResp = await axios.get(`https://currentuvindex.com/api/v1/uvi?latitude=${process.env.VITE_BC_VAN_LAT}&longitude=${process.env.VITE_BC_VAN_LON}`)
        
        const insertResp = await knex("weather").insert({
            description: weatherResp.data.weather[0].description,
            temperature: weatherResp.data.main.temp,
            UVI: UVResp.data.now.uvi,
            country: weatherResp.data.sys.country,
            city: weatherResp.data.name
        })

        const returnData = await knex.select("*").from("weather").where({"id": insertResp[0]});

        res.send(returnData);
    } catch (err) {
        res.status(401).send(`Error occurred: ${err}`)
    }
}

export {
    index,
    insert
}