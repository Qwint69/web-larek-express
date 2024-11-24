require("dotenv").config();

export const address =
  process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/weblarek";
export const uploadPath = process.env.UPLOAD_PATH || "uploads/";
export const uploadPathTemp = process.env.UPLOAD_PATH_TEMP || "temp/";
export const origin = process.env.ORIGIN_ALLOW || "http://localhost:5173";
export const port = parseInt(process.env.PORT || "3000", 10);
