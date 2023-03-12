import express from "express";
import {
  updateInfo,
  getProfile,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
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

router.use(protect);
router.patch("/changePassword", changePassword);

router.get("/me", getProfile, getUser);
router.patch(
  "/updateInfo",

  uploadUserPhoto,
  resizeUserPhoto,
  updateInfo
);

router.use(restrictTo("admin"));
router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
export default router;
