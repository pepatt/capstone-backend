import express from 'express';
import * as weatherController from '../controllers/weatherController.js';
const router = express.Router();

router.route("/").get(weatherController.index);
router.route("/insert").get(weatherController.insert);


export default router;