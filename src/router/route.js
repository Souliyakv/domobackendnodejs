import express from "express";
import { Login_Controller, Register_Controller, getAllUSer_Controller } from "../controller/user_controller.js";
import { CheckUSer } from "../middleware/auth.js";
import { AddBannerController, DeleteBannerController } from "../controller/banner_controller.js";

const router = express.Router();

const user = '/user';
router.post(user+'/register',Register_Controller);
router.post(user+'/login',Login_Controller);
router.post(user+'/getalluser',CheckUSer,getAllUSer_Controller);
const banner = '/banner';
router.post(banner+'/addbanner',CheckUSer,AddBannerController)
router.delete(banner+'/delete',CheckUSer,DeleteBannerController)

export default router;