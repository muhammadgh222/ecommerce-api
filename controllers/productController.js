import Product from "../models/productModel.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "./handleFactory.js";

export const createProduct = createOne(Product);
export const getProducts = getAll(Product, "Products");
export const getProduct = getOne(Product, "reviews");
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
