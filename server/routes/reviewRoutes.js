import express from "express";
import { protect } from "../controllers/authController.js";
import {
  createFilterObj,
  createReview,
  deleteReview,
  getReview,
  getReviews,
  setUserAndProductIdToBody,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getReviews)
  .post(protect, setUserAndProductIdToBody, createReview);
router
  .route("/:id")
  .get(getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

export default router;
