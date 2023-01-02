import express from "express";
import {
  Login_Controller,
  Register_Controller,
  getAllUSer_Controller,
} from "../controller/user_controller.js";
import { CheckUSer } from "../middleware/auth.js";
import {
  AddBannerController,
  ChangeImageBannerController,
  DeleteBannerController,
  DisnableBannerController,
  SelectBannerController,
  UnDisnableBannerController,
  UpdateDetailBannerController,
  UpdateTitleBannerController,
} from "../controller/banner_controller.js";
import {
  AddServiceController,
  DeleteServiceController,
  DisnableServiceController,
  GetServiceController,
  UnDisnableServiceController,
  UpdateDetailServiceController,
  UpdateNameServiceController,
} from "../controller/service_controller.js";

const router = express.Router();

const user = "/user";
router.post(user + "/register", Register_Controller);
router.post(user + "/login", Login_Controller);
router.post(user + "/getalluser", CheckUSer, getAllUSer_Controller);

const banner = "/banner";

router.post(banner + "/addbanner", CheckUSer, AddBannerController);
router.delete(banner + "/delete", CheckUSer, DeleteBannerController);
router.get(banner + "/select", CheckUSer, SelectBannerController);
router.put(banner + "/updateTitle", CheckUSer, UpdateTitleBannerController);
router.put(banner + "/updateDetail", CheckUSer, UpdateDetailBannerController);
router.put(banner+'/disnable',CheckUSer,DisnableBannerController);
router.put(banner+'/undisnable',CheckUSer,UnDisnableBannerController);
router.put(banner+'/changeimage',CheckUSer,ChangeImageBannerController)

const service = "/service";

router.post(service + "/addservice", CheckUSer, AddServiceController);
router.delete(service + "/delete", CheckUSer, DeleteServiceController);
router.get(service + "/getservice", CheckUSer, GetServiceController);
router.put(service + "/updatename", CheckUSer, UpdateNameServiceController);
router.put(service + "/updatedetail", CheckUSer, UpdateDetailServiceController);
router.put(service+'/disnable',CheckUSer,DisnableServiceController);
router.put(service+'/undisnable',CheckUSer,UnDisnableServiceController);

export default router;
