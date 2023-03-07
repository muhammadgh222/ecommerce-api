import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

// Routes exports
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

// Utilites  exports
import ErrorHandler from "./utilities/ErrorHandler.js";
import AppError from "./utilities/AppError.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));

// Routes implementation
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);

app.get("/api/v1", (req, res) => {
  res.send({
    message: "Hello",
  });
});

// Unhandled routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(ErrorHandler);

export default app;
