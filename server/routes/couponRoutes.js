import express from "express";
import { protect } from "../controllers/authController.js";
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createCoupon)
  .get(protect, getCoupons)
  .delete(protect, deleteCoupon);
router
  .route("/:id")
  .get(getCoupon)
  .patch(protect, updateCoupon)
  .delete(protect, deleteCoupon);
export default router;
