import express from "express";
import { protect } from "../controllers/authController.js";
import {
  deleteCategory,
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import subcategoriesRoutes from "./subCategoryRoutes.js";

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoutes);

router.route("/").get(getCategories).post(protect, createCategory);
router
  .route("/:id")
  .get(getCategory)
  .patch(protect, updateCategory)
  .delete(deleteCategory);

export default router;
