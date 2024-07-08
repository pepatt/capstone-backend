import express from 'express';
import * as weatherController from '../controllers/weatherController.js';
const router = express.Router();

router.route("/").get(weatherController.index);
router.route("/notApplied").get(weatherController.notApplied);
router.route("/applied").get(weatherController.applied);


export default router;