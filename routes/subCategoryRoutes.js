import express from "express";
import {
  createFilterObj,
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  setCategoryIdToBody,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(protect, restrictTo("admin"), setCategoryIdToBody, createSubCategory);
router
  .route("/:id")
  .get(getSubCategory)
  .patch(protect, restrictTo("admin"), updateSubCategory)
  .delete(protect, restrictTo("admin"), deleteSubCategory);

export default router;
