import express from "express";
import { Login_Controller, Register_Controller, getAllUSer_Controller } from "../controller/user_controller.js";
import { CheckUSer } from "../middleware/auth.js";

const router = express.Router();

const user = '/user';
router.post(user+'/register',Register_Controller);
router.post(user+'/login',Login_Controller);
router.post(user+'/getalluser',CheckUSer,getAllUSer_Controller)

export default router;