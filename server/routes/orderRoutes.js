import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createCashOrder,
  filterOrderForLoggedUser,
  getAllOrders,
  getCheckoutSession,
  getUserOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(createCashOrder)
  .get(filterOrderForLoggedUser, getAllOrders);
router.route("/:id").get(getUserOrder);
router.patch("/:id/pay", restrictTo("admin"), updateOrderToPaid);
router.patch("/:id/deliver", restrictTo("admin"), updateOrderToDelivered);

router.get("/checkout-session/:cartId", getCheckoutSession);

export default router;
