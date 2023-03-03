import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "./handleFactory.js";
import Category from "./../models/categoryModel.js";

export const createCategory = createOne(Category);
export const getCategories = getAll(Category);
export const getCategory = getOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
