import express from "express";
import { updateInfo } from "../controllers/userController.js";
import { resizeUserPhoto, uploadUserPhoto } from "../utilities/imageUpload.js";
import {
  adminProtectedRoute,
  changePassword,
  forgotPassword,
  login,
  logout,
  protect,
  protectedRoute,
  resetPassword,
  restrictTo,
  signUp,
} from "./../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/changePassword", protect, changePassword);

router.patch(
  "/updateInfo",
  protect,
  uploadUserPhoto,
  resizeUserPhoto,
  updateInfo
);

router.get("/test", protect, restrictTo("admin"), adminProtectedRoute);

export default router;
