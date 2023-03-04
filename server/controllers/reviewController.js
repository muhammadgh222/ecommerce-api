import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "./handleFactory.js";
import Review from "../models/reviewModel.js";

export const setUserAndProductIdToBody = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};
export const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

export const createReview = createOne(Review);
export const getReviews = getAll(Review);
export const getReview = getOne(Review);
export const updateReview = updateOne(Review);
export const deleteReview = deleteOne(Review);
