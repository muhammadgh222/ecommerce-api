import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "./handleFactory.js";
import Coupon from "./../models/couponModel.js";

export const createCoupon = createOne(Coupon);
export const getCoupons = getAll(Coupon);
export const getCoupon = getOne(Coupon);
export const updateCoupon = updateOne(Coupon);
export const deleteCoupon = deleteOne(Coupon);
