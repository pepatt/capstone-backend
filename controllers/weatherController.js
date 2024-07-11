import initKnex from 'knex';
import configurations from '../knexfile.js';
const knex = initKnex(configurations);
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config(); 

const index = async (req, res) => {
    const usersData = await knex("weather");
    res.send(usersData);
}

const notApplied = async (req, res) => {
    try {
        
        const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${process.env.VITE_BC_VAN_LAT}&lon=${process.env.VITE_BC_VAN_LON}&units=metric&appid=${process.env.VITE_OPEN_WEATHER_API_KEY}`);
        const UVResp = await axios.get(`https://currentuvindex.com/api/v1/uvi?latitude=${process.env.VITE_BC_VAN_LAT}&longitude=${process.env.VITE_BC_VAN_LON}`)
        
        const insertResp = await knex("weather").insert({
            description: weatherResp.data.weather[0].description,
            temperature: weatherResp.data.main.temp,
            UVI: UVResp.data.now.uvi,
            country: weatherResp.data.sys.country,
            city: weatherResp.data.name,
            created_at_day: req.body.created_at_day,
            created_at_month: req.body.created_at_month,
            created_at_year: req.body.created_at_year
        })

        const returnData = await knex.select("*").from("weather").where({"id": insertResp[0]});

        res.send(returnData);
    } catch (err) {
        res.status(401).send(`Error occurred: ${err}`)
    }
}

const applied = async (req, res) => {
    try {
        
        const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${process.env.VITE_BC_VAN_LAT}&lon=${process.env.VITE_BC_VAN_LON}&units=metric&appid=${process.env.VITE_OPEN_WEATHER_API_KEY}`);
        const UVResp = await axios.get(`https://currentuvindex.com/api/v1/uvi?latitude=${process.env.VITE_BC_VAN_LAT}&longitude=${process.env.VITE_BC_VAN_LON}`)
        
        const insertResp = await knex("weather").insert({
            description: weatherResp.data.weather[0].description,
            temperature: weatherResp.data.main.temp,
            UVI: UVResp.data.now.uvi,
            country: weatherResp.data.sys.country,
            city: weatherResp.data.name,
            isApplied: true,
            created_at_day: req.body.created_at_day,
            created_at_month: req.body.created_at_month,
            created_at_year: req.body.created_at_year
        })

        const returnData = await knex.select("*").from("weather").where({"id": insertResp[0]});

        res.send(returnData);
    } catch (err) {
        res.status(401).send(`Error occurred: ${err}`)
    }
}


const activeDates = async (req, res) => {
    try {
        let usersData = await knex("weather")
        .select('*')
        .where({
            created_at_month: req.body.month,
            created_at_year: req.body.year,
            isApplied: 1
        });
        res.send(usersData);
    } catch (err) {
        res.status(401).send(`Error occurred (likely day doesn't exist): ${err}`)
    }
}

const activeDatesDelete = async (req, res) => {
    try {
        await knex("weather")
        .where({
            created_at_day: req.body.day,
            created_at_month: req.body.month,
            created_at_year: req.body.year,
            isApplied: 1
        })
        .del();
        res.send("deleted successfully");
    } catch (err) {
        res.status(401).send(`Error occurred (likely day doesn't exist): ${err}`)
    }
}

const weatherDates = async (req, res) => {
    try {
        let usersData = await knex("weather")
        .select('*')
        .where({
            created_at_month: req.body.month,
            created_at_year: req.body.year,
        });
        res.send(usersData);
    } catch (err) {
        res.status(401).send(`Error occurred (likely days don't exist): ${err}`)
    }
}


export {
    index,
    notApplied,
    applied, 
    activeDates,
    activeDatesDelete, 
    weatherDates
}