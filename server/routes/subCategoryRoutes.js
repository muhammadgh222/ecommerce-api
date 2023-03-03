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
import { protect } from "../controllers/authController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(protect, setCategoryIdToBody, createSubCategory);
router
  .route("/:id")
  .get(getSubCategory)
  .patch(protect, updateSubCategory)
  .delete(protect, deleteSubCategory);

export default router;
