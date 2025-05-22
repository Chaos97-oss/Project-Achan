import express from 'express'
import signUp from "../../controller/authController/signUp.js";

import login from "../../controller/authController/login.js";

const router = express.Router();

router.post('/signup', signUp);//general loign route
router.post('/login', login);//general signup route

export default router;