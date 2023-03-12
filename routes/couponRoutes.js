import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

router.use(protect, restrictTo("admin"));

router.route("/").post(createCoupon).get(getCoupons).delete(deleteCoupon);
router.route("/:id").get(getCoupon).patch(updateCoupon).delete(deleteCoupon);
export default router;
