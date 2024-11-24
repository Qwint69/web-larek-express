import { celebrate } from "celebrate";
import { createProduct, getAllProducts } from "../controllers/product";
import express from "express";
import { productValidationSchema } from "../middlewares/validation";

const router = express.Router();

router.get("/product", getAllProducts);
router.post("/product", celebrate(productValidationSchema), createProduct);

export default router;
