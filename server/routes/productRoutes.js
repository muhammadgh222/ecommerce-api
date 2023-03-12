import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, restrictTo } from "../controllers/authController.js";
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
  .post(
    protect,
    restrictTo("admin"),
    uploadProductImages,
    resizeProductImages,
    createProduct
  );
router
  .route("/:id")
  .get(getProduct)
  .patch(
    protect,
    restrictTo("admin"),
    uploadProductImages,
    resizeProductImages,
    updateProduct
  )
  .delete(protect, restrictTo("admin"), deleteProduct);

export default router;
