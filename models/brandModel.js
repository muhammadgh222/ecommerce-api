import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
