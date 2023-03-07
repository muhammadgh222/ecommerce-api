import express from "express";
import { protect } from "../controllers/authController.js";
import {
  createCashOrder,
  filterOrderForLoggedUser,
  getAllOrders,
  getUserOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createCashOrder)
  .get(protect, filterOrderForLoggedUser, getAllOrders);
router.route("/:id").get(protect, getUserOrder);
router.patch("/:id/pay", protect, updateOrderToPaid);
router.patch("/:id/deliver", protect, updateOrderToDelivered);

export default router;
