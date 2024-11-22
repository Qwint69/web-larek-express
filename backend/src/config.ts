require("dotenv").config();

export const address =
  process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/weblarek";
export const uploadPath = process.env.UPLOAD_PATH;
export const uploadPathTemp = process.env.UPLOAD_PATH_TEMP;
export const origin = process.env.ORIGIN_ALLOW;
export const port = process.env.PORT || 3000;
