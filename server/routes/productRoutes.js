import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect } from "../controllers/authController.js";
import {
  resizeProductImages,
  uploadProductImages,
} from "../utilities/imageUpload.js";
import reviewRoutes from "./reviewRoutes.js";

const router = express.Router();

router.use("/:productId/reviews", reviewRoutes);

router
  .route("/")
  .get(getProducts)
  .post(protect, uploadProductImages, resizeProductImages, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(protect, uploadProductImages, resizeProductImages, updateProduct)
  .delete(protect, deleteProduct);

export default router;
