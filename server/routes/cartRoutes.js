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

router.use(protect);

router.route("/").post(addToCart).get(getUserCart).delete(clearCart);

router.patch("/applyCoupon", applyCoupon);

router.route("/:itemId").patch(updateCartItemQuantity).delete(removeCartItem);
export default router;
