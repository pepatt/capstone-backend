import express from 'express';
import * as weatherController from '../controllers/weatherController.js';
const router = express.Router();

router.route("/").get(weatherController.index);
router.route("/dataDependant").post(weatherController.activeDates);
router.route("/dateDependantWeather").post(weatherController.weatherDates);
router.route("/notApplied").post(weatherController.notApplied);
router.route("/applied").post(weatherController.applied);
router.route("/dataDependantDelete").post(weatherController.activeDatesDelete);

export default router;