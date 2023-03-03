import Product from "../models/productModel.js";
import factory from "./handleFactory.js";

export const createProduct = factory.createOne(Product);
