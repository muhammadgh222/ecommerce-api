import express from "express";
import { protect } from "../controllers/authController.js";
import {
  addToCart,
  applyCoupon,
  clearCart,
  getUserCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addToCart)
  .get(protect, getUserCart)
  .delete(protect, clearCart);

router.patch("/applyCoupon", protect, applyCoupon);

router
  .route("/:itemId")
  .patch(protect, updateCartItemQuantity)
  .delete(protect, removeCartItem);
export default router;
