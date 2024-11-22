import express from "express";
import { createOrder } from "../controllers/order";
import { celebrate } from "celebrate";
import { orderValidationSchema } from "../middlewares/validation";

const router = express.Router();

router.post("/order", celebrate(orderValidationSchema), createOrder);

export default router;
