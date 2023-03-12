import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI.replace("<password>", process.env.DB_PASSWORD);

mongoose.set("strictQuery", false); // Deprecation warning

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected successfuly");
  });

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
