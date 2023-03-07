import express from "express";
import { protect } from "../controllers/authController.js";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductToWishlist,
} from "../controllers/wishListController.js";

const router = express.Router();

router.use(protect);

router.route("/").post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete("/:productId", removeProductToWishlist);

export default router;
