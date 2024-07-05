import express from 'express';
import * as usersController from '../controllers/usersController.js';
const router = express.Router();

router.route("/").get(usersController.index);


export default router;