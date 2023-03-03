import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "A product must have a name"],
      trim: true,
      minlength: [3, "Too short product name"],
      maxlength: [100, "Too long product name"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
    },
    countInStock: {
      type: Number,
      required: [true, "Product countInStock is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        required: [true, "Product must be belong to Sub Category"],
      },
    ],
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
