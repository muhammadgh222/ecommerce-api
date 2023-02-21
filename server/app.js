import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

// Routes exports
import authRoutes from "./routes/authRoutes.js";

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
