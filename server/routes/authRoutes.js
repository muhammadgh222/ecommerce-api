import express from "express";
import { updateInfo } from "../controllers/userController.js";
import { resizeUserPhoto, uploadUserPhoto } from "../utilities/imageUpload.js";
import {
  forgotPassword,
  login,
  protect,
  protectedRoute,
  resetPassword,
  signUp,
} from "./../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch(
  "/updateInfo",
  protect,
  uploadUserPhoto,
  resizeUserPhoto,
  updateInfo
);
export default router;
