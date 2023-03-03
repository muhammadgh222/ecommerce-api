import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Sub category must be unique"],
      minlength: [3, "Too short Sub Category name"],
      maxlength: [32, "Too long Sub Category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

subCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
