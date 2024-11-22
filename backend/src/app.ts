import express from "express";
import mongoose from "mongoose";
import product from "./routes/product";
import path from "path";
import order from "./routes/order";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { errorLogger, requestLogger } from "./middlewares/logger";
import { address, port, origin } from "./config";

var cors = require("cors");
const app = express();

mongoose
  .connect(address)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(express.json());
app.use(cors(origin));
app.use(requestLogger);
app.use("/", product);
app.use("/", order);
app.use(express.static(path.join(__dirname, "public")));
app.use("*", (req, res, next) => {
  next(new NotFoundError("Маршрут не найден"));
});
app.use(errorLogger);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
